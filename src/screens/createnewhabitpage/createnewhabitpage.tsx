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

export function CreateHabit() {
    const { setAuth, user } = useAuth();

    const [nome, setNome] = useState("");
    const [horarios, setHorarios] = useState<string[]>([]);
    const [dias, setDias] = useState<Dia[]>([]);
    const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    useEffect(() => {
        async function fetchDias() {
            try {
                const data = await getDiasDaSemana();
                setDias(data);
            } catch (error) {
                console.error("Erro ao buscar dias:", error);
            }
        }
        fetchDias();
    }, []);

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
        if (!horarios.includes(hora)) {
            setHorarios([...horarios, hora]);
        }
        setIsPickerVisible(false);
    }

    const handleSaveHabit = async () => {
        console.log({ nome, diasSelecionados, horarios });
        if (nome != "" && diasSelecionados.length > 0 && horarios.length > 0) {
            if (!user) {
                Alert.alert("Problema com o usuário, contacte o administrador.");
                return;
            }
            const usuario = await getUserById(user.id);
            const habito = new Habito(nome, new User(usuario.id, usuario.email, usuario.name, usuario.created_at ?? undefined, usuario.isfirstlogin));
            for (const dia of diasSelecionados) {
                for (const horario of horarios) {
                    const habitoRotina = new HabitoRotina(habito, dias.find(d => d.nome_dia === dia)!, horario);

                }
            }
            console.log("Hábito criado com sucesso!");
            // Redefine os campos
            setNome("");
            setDiasSelecionados([]);
            setHorarios([]);
        } else {
            Alert.alert("Por favor, preencha todos os campos.");
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
            <View style={{ flex: 1 }}>
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
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
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