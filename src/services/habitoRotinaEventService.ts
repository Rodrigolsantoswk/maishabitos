import { supabase } from "@/src/lib/supabase";
import { HabitoRotinaEvents } from "../model/habitRoutineEvents";

export async function salvarHabitoRotinaEvent(habitoRotinaEvent: HabitoRotinaEvents) {
    const data = habitoRotinaEvent.toDB();
    try {
        const { error } = await supabase.from('habito_rotina_event').insert(data);
        if (error) {
            return { success: 0, message: error.message };
        }
        return { success: 1 };
    } catch (error: any) {
        console.error('Erro ao salvar habito rotina event:', error);
        return { success: 0, message: error.message || 'Erro inesperado ao salvar habito rotina event' };
    }
}
