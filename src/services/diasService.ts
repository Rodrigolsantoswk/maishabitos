import { supabase } from "@/src/lib/supabase";
import { Dia, TDiaAttr } from "../model/days/days";

export async function getDiasDaSemana(): Promise<Dia[]> {
  const { data, error } = await supabase
    .from("dias")
    .select("*");

  if (error) throw error;

  return (data as TDiaAttr[]).map(dia => new Dia(dia.nome_dia));
}
