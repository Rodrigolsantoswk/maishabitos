import * as Notifications from "expo-notifications";
import { salvarHabitoRotinaEvent } from "@/src/services/habitoRotinaEventService";
import { HabitoRotina } from "@/src/model/habitRoutine";
import { HabitoRotinaEvents } from "@/src/model/habitRoutineEvents";
import { Habito } from "@/src/model/habit";
import { User } from "@/src/model/user";
import { useContextUser } from "@/src/state/user";

const {state: userState } = useContextUser();

Notifications.addNotificationResponseReceivedListener(async response => {
    const { idHabito, idHabitoRotina } = response.notification.request.content.data;
    const acao = response.actionIdentifier;
    const habito = new Habito(idHabito, '', userState.user as User); 
    const habitoRotina = new HabitoRotina(idHabitoRotina, habito);
    console.log(`Usuário respondeu a notificação: Hábito ID: ${idHabito}, Rotina ID: ${idHabitoRotina}, Ação: ${acao}`);
    if (acao === "sim" || acao === "nao") {
        try {
            const habitoRotinaEvent = new HabitoRotinaEvents(
                undefined, 
                habitoRotina,
                new Date(),
                acao
            );

            const resposta = await salvarHabitoRotinaEvent(habitoRotinaEvent);

            if (resposta.success === 1) {
                console.log("Resposta salva com sucesso.");
            } else {
                console.error("Erro ao salvar resposta:", resposta.message);
            }
        } catch (error) {
            console.error("Erro ao processar a resposta da notificação:", error);
        }
    }
});
