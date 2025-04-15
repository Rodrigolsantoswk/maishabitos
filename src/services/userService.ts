import { supabase } from '@/src/lib/supabase'
import { User } from '../model/user'

export async function getUserById(id: string): Promise<{ success: number, data?: User, error?: any }> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return { success: 0, error };
    }

    return { success: 1, data: data as User };
  } catch (err) {
    console.log("Erro no catch:", err);
    return { success: 0, error: err };
  }
}


export async function updateFirstLogin(id: string): Promise<{ success: number, error?: any }> {
  try {
    const { error } = await supabase
      .from('users')
      .update({ isfirstlogin: false })
      .eq('id', id)

    if (error) {
      return { success: 0, error }
    }

    return { success: 1 }
  } catch (err) {
    return { success: 0, error: err }
  }
}
