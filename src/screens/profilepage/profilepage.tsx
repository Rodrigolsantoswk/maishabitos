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
  ScrollView
} from "react-native";
import { router } from "expo-router";
import {
  CirclesDecoration,
  ThemedButton,
  ThemedLogo,
  ContentViewer
} from "@/components";

export function Profile() {
  const { setAuth, user } = useAuth();

  async function handleSignout() {
    const { error } = await supabase.auth.signOut();
    setAuth(null);
    if (error) {
      Alert.alert("Erro ao sair da conta", error.message);
    }
  }

  const handleCreateHabit = () => {
    router.push("/(panel)/profile/createnewhabit/createnewhabitpg");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <CirclesDecoration />
              <View style={styles.logoAndButton}>
                <ThemedLogo fontSize={34} />
                <ThemedButton
                  title="Criar Hábito"
                  onPress={handleCreateHabit}
                />
              </View>
            </View>
            <ContentViewer
              backgroundColor={colors.white}
              paddingTop={34}
              paddingHorizontal={18}
              gap={18}
            >
              <Text style={styles.pageTitle}>Página Profile</Text>
              <Text style={styles.email}>{user?.email}</Text>
              <ThemedButton title="Deslogar" onPress={handleSignout} />
            </ContentViewer>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
    backgroundColor: colors.blue,
  },
  header: {
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: colors.blue,
    alignItems: 'flex-end',
  },
  logoAndButton: {
    alignItems: 'flex-end',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 40,
  },
  email: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.zinc,
    marginBottom: 10,
  },
});
