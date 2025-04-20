import colors from "@/constants/colors";
import { useAuth } from "@/src/state/auth/ctx";
import { supabase } from "@/src/lib/supabase";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  StatusBar,
  SafeAreaView,
  FlatList,
  Pressable
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import {
  CirclesDecoration,
  ThemedButton,
  ThemedLogo,
  ContentViewer,
  ModalScreen
} from "@/components";
import { useContextHabitRoutine } from "@/src/state/habits/ctx";
import { useMemo, useState } from "react";
import { useContextUser } from "@/src/state/user";
import { Habito, THabito, emptyHabito } from "@/src/model/habit";
import { User } from "@/src/model/user";
import { deleteHabito } from "@/src/services/habitoService";
import { HabitoRotinaActionTypes } from "@/src/state/habits";

interface RotinasAgrupadas {
  idHabito: string;
  nome_do_habito: string;
  horarios: string[];
  diasDaSemana: string[];
  idsDasRotinas: string[];
}

export function Profile() {
  const { setAuth, user } = useAuth();
  const { state: habitState, dispatch: habitosDispatch } = useContextHabitRoutine();
  const { state: userState } = useContextUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState<Habito | null>(null);

  console.log("habitState:", JSON.stringify(habitState, null, 2));
  
  function handleDeleteHabit(habit: RotinasAgrupadas) {
    const user = new User(
      userState.user?.id,
      userState.user?.email,
      userState.user?.name,
      userState.user?.created_at ?? undefined,
      userState.user?.isfirstlogin
    );

    const habito = new Habito(habit.idHabito, habit.nome_do_habito, user);

    setHabitToDelete(habito);
    setModalVisible(true);
  }

  async function confirmDeleteHabit() {
    if (habitToDelete) {
      console.log("Deletando hábito:", habitToDelete);
      const result = await deleteHabito(habitToDelete);
      if (result.success === 1) {
        console.log("Hábito deletado com sucesso.");
        habitosDispatch({
          type: HabitoRotinaActionTypes.DELETE_HABITROUTINE,
          payload: habitToDelete.id,
        })
      }
      setModalVisible(false);
      setHabitToDelete(null);
    }
  }

  const listadeHabitos: Record<string, RotinasAgrupadas> = {};
  // Este método transforma esta estrutura: [{habito_rotina...: {habito},dia}, {habito_rotina: {habito},dia}] 
  // Nisso: [{habito...: dias: [], horarios: []}]
  const habitosAgrupados = useMemo(() => {
    habitState.habitRoutines.forEach((rotina) => {
      const habitoId = rotina.habito.id;
      const nomeHabito = rotina.habito.nome_do_habito;

      if (!listadeHabitos[habitoId]) {
        listadeHabitos[habitoId] = {
          idHabito: habitoId,
          nome_do_habito: nomeHabito,
          horarios: [],
          diasDaSemana: [],
          idsDasRotinas: [],
        };
      }
      if (!listadeHabitos[habitoId].horarios.includes(rotina.horario)) {
        listadeHabitos[habitoId].horarios.push(rotina.horario);
      }
      listadeHabitos[habitoId].diasDaSemana.push(rotina.dia.nome_dia.toLowerCase());
      listadeHabitos[habitoId].idsDasRotinas.push(rotina.habito_rotina_id);
    });

    return Object.values(listadeHabitos).map((item) => ({
      ...item,
      diasDaSemana: Array.from(item.diasDaSemana),
    }));
  }, [habitState.habitRoutines]);

  async function handleSignout() {
    const { error } = await supabase.auth.signOut();
    setAuth(null);
    if (error) {
      Alert.alert("Erro ao sair da conta", error.message);
    }
  }

  function diaCompleto(abreviado: string) {
    const map: Record<string, string> = {
      dom: "domingo",
      seg: "segunda-feira",
      ter: "terça-feira",
      qua: "quarta-feira",
      qui: "quinta-feira",
      sex: "sexta-feira",
      sab: "sábado",
    };
    return map[abreviado];
  }

  const handleCreateHabit = () => {
    router.push("/(panel)/profile/createnewhabit/createnewhabitpg");
  };

  const renderHabit = ({ item }: { item: RotinasAgrupadas & { diasDaSemana: string[] } }) => (
    <LinearGradient
      colors={[colors.purple, colors.blue]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.habitContainer}
    >
      <Text style={styles.habitTitle}>{item.nome_do_habito}</Text>
      <View style={styles.daysRow}>
        {["dom", "seg", "ter", "qua", "qui", "sex", "sab"].map((dia) => (
          <Text
            key={dia}
            style={[
              styles.dayText,
              item.diasDaSemana.includes(diaCompleto(dia)) && styles.dayTextSelected,
            ]}
          >
            {dia.toUpperCase()}
          </Text>
        ))}
      </View>
      <View style={styles.horariosRow}>
        <View style={styles.horariosCol}>
          {item.horarios.map((hora, index) => (
            <Text key={index} style={styles.horarioText}>
              {hora}
            </Text>
          ))}
        </View>
        <View style={styles.botaoContainer}>
          <ThemedButton
            title="Deletar"
            onPress={() => handleDeleteHabit(item)}
            icon="trash"
          ></ThemedButton>
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ModalScreen
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Confirmar exclusão"
        TextColor={colors.white}
      >
        <View style={{ padding: 20 }}>
          <Text style={{ color: colors.white, fontSize: 16, marginBottom: 20 }}>
            Deseja realmente deletar o hábito&nbsp;
            <Text style={{ fontWeight: 'bold' }}>{habitToDelete?.nome_do_habito}</Text>?
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Pressable onPress={() => setModalVisible(false)} style={{ marginRight: 10 }}>
              <Text style={{ color: colors.green, fontSize: 16 }}>Cancelar</Text>
            </Pressable>
            <Pressable onPress={confirmDeleteHabit}>
              <Text style={{ color: colors.red, fontSize: 16, fontWeight: 'bold' }}>OK</Text>
            </Pressable>
          </View>
        </View>
      </ModalScreen>

      <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <CirclesDecoration />
          <View style={styles.logoAndButton}>
            <ThemedLogo fontSize={34} />
            <ThemedButton title="Criar Hábito" onPress={handleCreateHabit} />
          </View>
        </View>
        <Text style={styles.title}>Lista de hábitos</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: colors.blue }}>
        <FlatList
          data={habitosAgrupados}
          keyExtractor={(item) => item.idHabito}
          renderItem={renderHabit}
          ListHeaderComponent={
            <View>
              <ContentViewer
                backgroundColor={colors.blue}
                paddingTop={5}
                paddingHorizontal={15}
                gap={2}>
                <Text style={styles.nome}> Bem vindo! {userState.user?.name}</Text>

              </ContentViewer>
              <ThemedButton
                title="Deslogar"
                onPress={handleSignout}
                width="100%"
                height={48} />
            </View>
          }
          contentContainerStyle={{
            paddingHorizontal: 18,
            paddingBottom: 30,
            backgroundColor: colors.blue,
            borderTopRightRadius: 16
          }}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  header: {
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: colors.blue,
    borderBottomColor: colors.sky,
    borderBottomWidth: 2,
  },
  headerContent: {
    alignItems: 'flex-end',
  },
  logoAndButton: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 34,
    color: colors.white,
    marginBottom: 34,
    textAlign: 'center',
  },
  nome: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 24,
  },
  habitContainer: {
    padding: 14,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  habitTitle: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dayText: {
    fontSize: 14,
    color: colors.gray,
    flex: 1,
    textAlign: 'center',
  },
  dayTextSelected: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
    top: -1,
    textDecorationLine: 'underline',
  },
  horariosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  horarioText: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 4,
  },
  horariosCol: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  botaoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

});
