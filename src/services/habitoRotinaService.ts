import { supabase } from '@/src/lib/supabase';
import { HabitoRotina } from '../model/habitRoutine';

export async function salvarHabitoRotina(habitoRotina: HabitoRotina) {
    try {
        const data = habitoRotina.toDB();
        const { error } = await supabase
            .from('habito_rotina')
            .insert([{
                habito_rotina_id: data.habito_rotina_id,
                id_habito: data.id_habito,
                id_dia: data.nome_dia,
                horario: data.horario
            }]);

        if (error) {
            return { success: 0, message: error.message };
        }

        return { success: 1 };
    } catch (error: any) {
        console.error("Erro ao salvar hábito rotina:", error);
        return { success: 0, message: error.message || "Erro inesperado ao salvar hábito rotina" };
    }
}

export async function getRotinasPorHabito(habitoId: string) {
    try {
        const { data, error } = await supabase
            .from('habito_rotina')
            .select('*')
            .eq('id_habito', habitoId);

        if (error) {
            return { success: 0, message: error.message };
        }

        return { success: 1, data: data as HabitoRotina[] };
    } catch (error: any) {
        console.error("Erro ao buscar rotinas do hábito:", error);
        return { success: 0, message: error.message || "Erro inesperado ao buscar rotinas" };
    }
}
