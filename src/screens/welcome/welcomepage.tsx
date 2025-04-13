import colors from "@/constants/colors"
import { useAuth } from "@/src/state/auth/ctx"
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert
} from "react-native"
import { router } from "expo-router"
import { ContentViewer, 
  ThemedLogo, 
  ThemedButton, 
  CirclesDecoration 
}from '@/components'
import { updateFirstLogin } from "@/src/services/userService"



export function Welcome() {
  const { user } = useAuth()

  function handleContinue() {
    console.log("handleContinue: ", user);
    if (!user) {
        Alert.alert("Problema com o usuário, contacte o administrador.");
        return;
    } ;
    updateFirstLogin(user.id)
      .then(() => {
        router.replace('/(panel)/profile/profilepg');
      })
      .catch(console.error);
  }
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, backgroundColor: colors.blue }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <CirclesDecoration />
              <View style={styles.logoContainer}>
                <ThemedLogo fontSize={56} />
              </View>
            </View>
            <ContentViewer
                backgroundColor={colors.transparent}
                paddingTop={34}
                paddingHorizontal={18}
                gap={18}
              >
              <Text style={styles.title}>Bem-vindo(a)!</Text>
              <Text style={styles.text}>
                No aplicativo +Hábitos, você pode controlar todas as suas rotinas diárias, ficando por dentro de como está evoluindo em relação aos seus objetivos.{"\n\n"}
                Com ele, você consegue:{"\n\n"}
                • Definir e personalizar hábitos diários com lembretes automáticos para não esquecer de nada importante.{"\n\n"}
                • Acompanhar seu progresso de maneira visual com gráficos e estatísticas detalhadas, ajudando você a ver o quanto está avançando.{"\n\n"}
                • Criar hábitos saudáveis e melhorar sua produtividade, equilibrando sua rotina de forma mais eficaz e sem estresse.{"\n\n"}
                O +Hábitos é o seu parceiro ideal para tornar seus objetivos mais tangíveis e acompanhar cada passo do seu crescimento pessoal.
              </Text>
              <ThemedButton
                title="Continuar"
                onPress={handleContinue}
              />
            </ContentViewer>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
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
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 34,
    paddingHorizontal: 18,
    gap: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.white,
    lineHeight: 24,
    textAlign: 'left',
  },
})
