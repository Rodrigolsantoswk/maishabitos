import * as Notifications from "expo-notifications";
import { getHabitosComRotinas } from "@/src/services/habitoRotinaService";
import { useContextUser } from "../state/user";

// Função para agendar as notificações do usuário
export async function agendarNotificacoesDoUsuario() {
    const { state: userState } = useContextUser();

    const resposta = await getHabitosComRotinas(userState.user?.id ?? "");
    if (resposta.success === 0 || !resposta.data) {
        console.error("Erro ao buscar hábitos nas notificações:", resposta.message);
        return;
    }

    const rotinas = resposta.data;

    for (const rotina of rotinas) {
        const { id, horario, habito, dia } = rotina;

        const [hora, minuto] = horario.split(":").map(Number);
        const diasDaSemana = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
        const weekdayIndex = diasDaSemana.indexOf(dia.nome_dia.toLowerCase());

        if (weekdayIndex === -1) continue;
        const content = {
            title: `Você fez o hábito "${habito.nome}"?`,
            body: "Toque para responder.",
            data: { idHabito: habito.id, idRotina: id },
            categoryIdentifier: "habito-response"
        };
        console.log("Agendando notificação com conteúdo:", content);
        await Notifications.scheduleNotificationAsync({
            content: {
                title: `Você fez o hábito "${habito.nome}"?`,
                body: "Toque para responder.",
                data: { idHabito: habito.id, idRotina: id },
                categoryIdentifier: "habito-response"
            },
            trigger: {
                channelId: 'default',
                repeats: true,
                weekday: weekdayIndex + 1,
                hour: hora,
                minute: minuto,
            }
        });
    }
}
