import colors from "@/constants/colors";
import { getDiasDaSemana } from '@/src/services/diasService';
import { Dia } from '@/src/model/days/days';
import {
    Text,
    View,
    StyleSheet,
    Alert,
    StatusBar,
    ScrollView,
    TextInput,
    TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    ReturnButton,
    CirclesDecoration,
    ThemedLogo,
    ThemedButton
} from "@/components";
import { useEffect, useState } from "react";
import { Habito } from "@/src/model/habit";
import { useAuth } from "@/src/state/auth/ctx";
import { User } from "@/src/model/user";
import { getUserById } from "@/src/services/userService";
import { HabitoRotina } from "@/src/model/habitRoutine";
import { salvarHabitoRotina } from "@/src/services/habitoRotinaService";
import { salvarHabito } from "@/src/services/habitoService";
import LoadingPage from "../loadingpage";
import { HabitoRotinaActionTypes } from '@/src/state/habits/types';
import { useContextHabitRoutine } from '@/src/state/habits/ctx';
import { useDiasContext } from "@/src/state/days";


export function CreateHabit() {
    const { user } = useAuth();

    const [nome, setNome] = useState("");
    const [horarios, setHorarios] = useState<string[]>([]);
    const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [habitSaved, setHabitSaved] = useState(false);
    const { state: diasState } = useDiasContext();
    const dias = diasState.dias.map(dia => dia);
    const { dispatch: dispatchHabitoRotina } = useContextHabitRoutine();

    function toggleDia(dia: string) {
        setDiasSelecionados(prev =>
            prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia]
        );
    }

    function removerHorario(index: number) {
        setHorarios(prev => prev.filter((_, i) => i !== index));
    }

    function handleConfirmDate(date: Date) {
        const hora = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (horarios.length >= 5) {
            Alert.alert("Atenção", "Limite de horários atingido (5).", [{ text: "OK" }]);
        }
        if (!horarios.includes(hora) && horarios.length < 5) {
            setHorarios([...horarios, hora]);
        }
        setIsPickerVisible(false);
    }

    useEffect(() => {
        if (habitSaved) {
            setIsLoading(false);
        }
    }, [habitSaved]);

    const handleSaveHabit = async () => {
        setIsLoading(true);
        setHabitSaved(false);
        console.log({ nome, diasSelecionados, horarios });
        try {
            const nomeRegex = /^[a-zA-Z0-9\s]{1,256}$/;
            if (!nomeRegex.test(nome)) {
                Alert.alert("Atenção", "Erro ao salvar hábito: Nome do hábito inválido. Apenas texto e números são permitidos, com no máximo 256 caracteres.", [{ text: "OK" }]);
                return;
            }

            if (nome === "" && diasSelecionados.length === 0 && horarios.length === 0) {
                Alert.alert("Atenção", "Erro ao salvar hábito: Pencha todos os campos.", [{ text: "OK" }]);
                return;
            }

            if (!user) {
                Alert.alert("Atenção", "Problema com o usuário, contacte o administrador.", [{ text: "OK" }]);
                return;
            }
            //Verifica se foi possível inserir no banco de dados ou se o usuário retornado não está vazio, caso contrário retorna um erro.

            const respostaUser = await getUserById(user.id);
            if (respostaUser.success === 0 || !respostaUser.data) {
                Alert.alert("Atenção", "Problema com o usuário, contacte o administrador.", [{ text: "OK" }]);
                return;
            }

            const usuario = respostaUser.data;
            const habito = new Habito(undefined, nome, new User(usuario.id, usuario.email, usuario.name, usuario.created_at ?? undefined, usuario.isfirstlogin));

            // Verifica se foi possível inserir no banco de dados, caso contrário retorna um erro.
            const respostaHabito = await salvarHabito(habito);
            if (respostaHabito.success === 0) {
                Alert.alert("Atenção", "Erro ao salvar hábito: " + respostaHabito.message, [{ text: "OK" }]);
                return;
            }

            // Para cada dia e cada horário selecionado, cria uma nova instância de HabitoRotina e a insere no banco de dados.
            const habitosParaInserir: HabitoRotina[] = [];
            for (const dia of diasSelecionados) {
                const diaSelecionado = dias.find(d => d.nome_dia === dia);
                const diaInstancia = new Dia(diaSelecionado!.nome_dia);
                for (const horario of horarios) {
                    const habitoRotina = new HabitoRotina(undefined, habito, diaInstancia, horario);
                    habitosParaInserir.push(habitoRotina);
                }
            }
            const resposta = await salvarHabitoRotina(habitosParaInserir);

            // Em caso de erro, não insere os dados no state global.
            if (resposta.success === 0) {
                Alert.alert("Atenção", "Erro ao salvar hábito rotina: " + resposta.message, [{ text: "OK" }]);
                return;
            }
            dispatchHabitoRotina({
                type: HabitoRotinaActionTypes.ADD_MULTIPLE_HABITROUTINES,
                payload: habitosParaInserir.map(h => h.dataCpy),
            });

            Alert.alert("Hábito criado com sucesso!");
            setNome("");
            setDiasSelecionados([]);
            setHorarios([]);
            setHabitSaved(true);
        } catch (error: any) {
            Alert.alert("Erro", error.message, [{ text: "OK" }]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
            <View style={{ flex: 1 }}>
                {isLoading ? (
                    <LoadingPage />
                ) : (
                    <>
                        <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
                            <View style={styles.header}>
                                <CirclesDecoration />
                                <View style={styles.logoAndButton}>
                                    <ThemedLogo fontSize={34} />
                                    <ReturnButton />
                                </View>
                                <Text style={styles.title}>Crie o seu novo hábito</Text>
                            </View>
                            <View style={styles.container}>
                                <View style={styles.form}>

                                    <Text style={{ fontSize: 18, marginBottom: 6 }}>Nome do hábito</Text>
                                    <TextInput
                                        value={nome}
                                        onChangeText={setNome}
                                        placeholder="Ex: Beber água"
                                        style={{
                                            borderWidth: 1,
                                            borderColor: colors.gray,
                                            padding: 10,
                                            borderRadius: 8,
                                            marginBottom: 16,
                                        }}
                                    />

                                    <Text style={{ fontSize: 18, marginBottom: 6 }}>Dias da semana</Text>
                                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}>
                                        {dias.map((dia) => (
                                            <TouchableOpacity
                                                key={dia.nome_dia}
                                                onPress={() => toggleDia(dia.nome_dia)}
                                                style={{
                                                    backgroundColor: diasSelecionados.includes(dia.nome_dia) ? colors.sky : colors.gray,
                                                    padding: 10,
                                                    margin: 4,
                                                    borderRadius: 8,
                                                }}
                                            >
                                                <Text style={{
                                                    color: diasSelecionados.includes(dia.nome_dia) ? colors.white : colors.black
                                                }}>
                                                    {dia.nome_dia}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>

                                    <Text style={{ fontSize: 18, marginBottom: 6 }}>Horários</Text>
                                    <ThemedButton title="Adicionar horário +" onPress={() => setIsPickerVisible(true)} />
                                    <DateTimePickerModal
                                        isVisible={isPickerVisible}
                                        mode="time"
                                        onConfirm={handleConfirmDate}
                                        onCancel={() => setIsPickerVisible(false)}
                                    />

                                    <View style={{ marginTop: 10 }}>
                                        {horarios.map((h, index) => (
                                            <View key={index} style={styles.itensListaDeHoras}>
                                                <Text style={{ fontSize: 16, flex: 1, marginLeft: 15 }}>
                                                    {h}
                                                </Text>
                                                <TouchableOpacity onPress={() => removerHorario(index)} style={{ padding: 4 }}>
                                                    <Text style={{ color: colors.blue, fontSize: 16 }}>
                                                        Remover
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>

                                    <ThemedButton
                                        title="Salvar hábito"
                                        onPress={() => {
                                            handleSaveHabit();
                                        }}
                                    />

                                </View>
                            </View>

                        </ScrollView>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,

    },
    loadingPageComponentStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999
    },
    header: {
        paddingLeft: 14,
        paddingRight: 14,
        backgroundColor: colors.blue,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 8,
    },
    title: {
        fontSize: 34,
        color: colors.white,
        marginBottom: 34,
    },
    logoAndButton: {
        alignItems: 'flex-end',
    },
    form: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 15,
        paddingHorizontal: 18,
        gap: 15,
    },
    listaDeHoras: {

    },
    itensListaDeHoras: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
        backgroundColor: colors.gray,
        borderRadius: 8,
        padding: 4
    }
})