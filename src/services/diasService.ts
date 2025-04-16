import { supabase } from "@/src/lib/supabase";
import { Dia, TDiaAttr } from "../model/days/days";

export async function getDiasDaSemana(): Promise<{ success: number; data?: TDiaAttr[]; message?: string }> {
  try {
    const { data, error } = await supabase.from("dias").select("*");

    if (error || !data) {
      return { success: 0, message: error?.message || "Erro ao buscar dias" };
    }

    const dias = (data as TDiaAttr[]).map(dia => new Dia(dia.nome_dia).datacpy);

    return { success: 1, data: dias };

  } catch (error: any) {
    console.error("Erro ao buscar dias:", error);
    return { success: 0, message: error.message || "Erro inesperado ao buscar dias" };
  }
}
