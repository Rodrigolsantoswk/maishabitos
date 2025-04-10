import { supabase } from '@/src/lib/supabase'
import { User } from '../model/user'

export async function getUserById(id: string): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function updateFirstLogin(id: string) {
  const { error } = await supabase
    .from('users')
    .update({ isfirstlogin: false })
    .eq('id', id)

  if (error) throw error
}
