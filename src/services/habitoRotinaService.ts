import { supabase } from '@/src/lib/supabase';
import { HabitoRotina } from '../model/habitRoutine';

export async function salvarHabitoRotina(habitoRotina: HabitoRotina) {
    const data = habitoRotina.toDB();
    const { error } = await supabase
        .from('habito_rotina')
        .insert([{
            habito_rotina_id: data.habito_rotina_id,
            habito_id: data.id_habito,
            dia: data.nome_dia,
            horario: data.horario
        }]);

    if (error) throw error;
}

export async function getRotinasPorHabito(habitoId: string) {
    const { data, error } = await supabase
        .from('habito_rotina')
        .select('*')
        .eq('habito_id', habitoId);

    if (error) throw error;
    return data;
}
