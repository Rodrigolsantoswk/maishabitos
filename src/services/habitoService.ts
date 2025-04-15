import { supabase } from '@/src/lib/supabase';
import { Habito } from '../model/habit';

export async function salvarHabito(habito: Habito) {
    try {
        const { error } = await supabase
            .from('habito')
            .insert([{
                id: habito.id,
                nome_do_habito: habito.nome_do_habito,
                user_id: habito.user.id,
            }]);

        if (error) {
            return { success: 0, message: error.message };
        }

        return { success: 1 };
    } catch (error: any) {
        console.error("Erro ao salvar hábito:", error);
        return { success: 0, message: error.message || "Erro inesperado ao salvar hábito" };
    }
}

export async function getHabitosPorUsuario(usuarioId: string) {
    try {
        const { data, error } = await supabase
            .from('habitos')
            .select('*')
            .eq('usuario_id', usuarioId);

        if (error) {
            return { success: 0, message: error.message };
        }

        return { success: 1, data };
    } catch (error: any) {
        console.error("Erro ao buscar hábitos:", error);
        return { success: 0, message: error.message || "Erro inesperado ao buscar hábitos" };
    }
}

export async function getHabitoById(habitoId: string) {
    try {
        const { data, error } = await supabase
            .from('habito')
            .select('*')
            .eq('id', habitoId)
            .single();

        if (error) {
            return { success: 0, message: error.message };
        }

        return { success: 1, data: data as Habito};
    } catch (error: any) {
        console.error("Erro ao buscar hábito por ID:", error);
        return { success: 0, message: error.message || "Erro inesperado ao buscar hábito" };
    }
}
