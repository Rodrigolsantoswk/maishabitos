import { router, Stack } from 'expo-router'
import { AuthProvider, useAuth } from '@/src/state/auth/ctx'
import { useEffect } from 'react'
import { supabase } from '@/src/lib/supabase'
import UserProvider from '@/src/state/user'
import { User } from '@/src/model/user'
import { getUserById } from '@/src/services/userService'
import { Alert } from 'react-native'
import DiasProvider, { DiasActionTypes, useDiasContext } from '@/src/state/days'
import { getDiasDaSemana } from '@/src/services/diasService'
import HabitRoutineProvider, { HabitoRotinaActionTypes, useContextHabitRoutine } from '@/src/state/habits'
import { getHabitosPorUsuario } from '@/src/services/habitoService'
import { Dia } from '@/src/model/days'

export default function RootLayout() {
  return (
    <AuthProvider>
      <UserProvider>
        <DiasProvider>
          <HabitRoutineProvider>
            <MainLayout />
          </HabitRoutineProvider>
        </DiasProvider>
      </UserProvider>
    </AuthProvider>
  )
}

function MainLayout() {
  const { setAuth } = useAuth()
  const { dispatch: diasDispatch } = useDiasContext()
  const { dispatch: habitosDispatch } = useContextHabitRoutine()

  const carregarDias = async () => {
    const resultado = await getDiasDaSemana();
    console.log(resultado.success, resultado.data);
    if (resultado.success === 0 || !Array.isArray(resultado.data)) {
      Alert.alert("Problema com o banco de dados (dias), contacte o administrador.");
      return;
    }
  
    diasDispatch({
      type: DiasActionTypes.SET_DIAS,
      payload: resultado.data, 
    });
  };


  const carregarHabitos = async (userId: string) => {
    const resultado = await getHabitosPorUsuario(userId);
    if (resultado.success === 0 || !resultado.data) {
      Alert.alert("Problema ao carregar hábitos, contacte o administrador.");
      return;
    }

    habitosDispatch({
      type: HabitoRotinaActionTypes.SET_ALL_HABITROUTINES,
      payload: resultado.data,
    });
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          const supabaseUser = session.user
          setAuth(supabaseUser)
          try {
            const result = await getUserById(supabaseUser.id);
            if (result.success === 0 || !result.data) {
              Alert.alert("Problema com o usuário, contacte o administrador.");
              return;
            }
            const user: User = result.data;

            // Populando states
            await carregarDias();
            // await carregarHabitos(user.id);

            if (user.isfirstlogin) {
              router.replace('/welcome/_welcomepg')
            } else {
              router.replace('/(panel)/profile/profilepg')
            }
          } catch (error) {
            console.error('Erro ao buscar ou atualizar usuário:', error)
          }
          return
        }
        setAuth(null)
        router.replace('/(auth)/signin/page')
      }
    )
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/signup/page" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/signin/page" options={{ headerShown: false }} />
      <Stack.Screen name="(panel)/profile/profilepg" />
      <Stack.Screen name="welcome/_welcomepg" options={{ headerShown: false }} />
    </Stack>
  )
}
