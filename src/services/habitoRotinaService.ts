import { supabase } from '@/src/lib/supabase';
import { HabitoRotina } from '../model/habitRoutine';
import { Habito } from '../model/habit';
import { Dia } from '../model/days';
import { User } from '../model/user';

export async function salvarHabitoRotina(habitos: HabitoRotina[]) {
    try {
        const dadosParaInsert = habitos.map(h => h.toDB());
        const { error } = await supabase
            .from('habito_rotina')
            .insert(dadosParaInsert);

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

export async function getHabitosComRotinas(userId: string) {
    try {
        const { data, error } = await supabase
            .from("habito_rotina")
            .select(`
            *,
            habito (
            *,
            user_id
            ),
            dia: id_dia (
            nome_dia
            )
        `)
            .eq("habito.user_id", userId);


        if (error) {
            return { success: 0, message: error.message };
        }

        return { success: 1, data };
    } catch (error: any) {
        console.error("Erro ao buscar hábitos com rotinas:", error);
        return { success: 0, message: error.message || "Erro inesperado" };
    }
}

export async function getHabitosPorUsuario(usuario: User) {
    try {
        console.log('getHabitosPorUsuario: ', usuario.id);

        const { data, error } = await supabase
            .from('habito_rotina')
            .select(`
                habito_rotina_id,
                horario,
                habito (
                  id,
                  nome_do_habito
                ),
                dias (
                  nome_dia
                )
            `)
            .eq('habito.user_id', usuario.id);

        if (error) {
            console.error('Erro na consulta:', error.message);
            return { success: 0, message: error.message };
        }

        if (!data || data.length === 0) {
            console.warn('Nenhum hábito encontrado para o usuário:', usuario.id);
            return { success: 1, data: [] }; 
        }

        const habitoRotinas = data
            .filter((item: any) => item.habito && item.dias)
            .map((item: any) => {
                const habito = new Habito(item.habito.id, item.habito.nome_do_habito, usuario);
                const dia = new Dia(item.dias.nome_dia);

                return new HabitoRotina(
                    item.habito_rotina_id,
                    habito,
                    dia,
                    item.horario
                );
            });

        return { success: 1, data: habitoRotinas };

    } catch (error: any) {
        console.error("Erro ao buscar hábitos:", error);
        return { success: 0, message: error.message || "Erro inesperado ao buscar hábitos" };
    }
}
