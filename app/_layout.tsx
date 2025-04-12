import { router, Stack } from 'expo-router'
import { AuthProvider, useAuth } from '@/src/contexts/AuthContext'
import { useEffect } from 'react'
import { supabase } from '@/src/lib/supabase'
import UserProvider from '@/src/state/user'
import { User } from '@/src/model/user'
import { getUserById } from '@/src/services/userService'

export default function RootLayout() {
  return (
    <AuthProvider>
      <UserProvider>
        <MainLayout />
      </UserProvider>
    </AuthProvider>
  )
}

function MainLayout() {
  const { setAuth } = useAuth()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          const supabaseUser = session.user
          setAuth(supabaseUser)
          try {
            const user: User = await getUserById(supabaseUser.id)
            console.log(user)
            if (user.isfirstlogin) {
              console.log("isfirstlogin:", user.isfirstlogin, "WelcomePage")
              router.replace('/welcome/_welcomepg')
            } else {
              console.log("profile.page")
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
