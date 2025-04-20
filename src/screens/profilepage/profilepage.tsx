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
  FlatList
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import {
  CirclesDecoration,
  ThemedButton,
  ThemedLogo,
  ContentViewer
} from "@/components";
import { useContextHabitRoutine } from "@/src/state/habits/ctx";
import { useEffect, useMemo } from "react";
import { useContextUser } from "@/src/state/user";

interface RotinasAgrupadas {
  idHabito: string;
  nome_do_habito: string;
  horarios: string[];
  diasDaSemana: string[];
  idsDasRotinas: string[];
}

export function Profile() {
  const { setAuth, user } = useAuth();
  const { state: habitState } = useContextHabitRoutine();
  const { state: userState } = useContextUser();

  console.log(userState);

  const listadeHabitos: Record<string, RotinasAgrupadas> = {};
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
          <ThemedButton title="Deletar" onPress={() => { }} />
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    paddingTop: 34,
    backgroundColor: colors.blue,
  },
  header: {
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: colors.blue,
    borderBottomColor: colors.sky,
    borderBottomWidth: 2
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
    textAlign: 'center'
  },
  nome: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 24
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
    textDecorationLine: 'underline'
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
