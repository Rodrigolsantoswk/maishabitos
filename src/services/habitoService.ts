import { supabase } from '@/src/lib/supabase';
import { Habito } from '../model/habit';

export async function salvarHabito(habito: Habito) {
    const { error } = await supabase
        .from('habitos')
        .insert([{
            nome: habito.nome_do_habito,
            usuario_id: habito.user.id,
        }]);

    if (error) throw error;
}

export async function getHabitosPorUsuario(usuarioId: string) {
    const { data, error } = await supabase
        .from('habitos')
        .select('*')
        .eq('usuario_id', usuarioId);

    if (error) throw error;
    return data;
}
