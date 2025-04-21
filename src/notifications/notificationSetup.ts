
import * as Notifications from "expo-notifications";

export async function configurarCategoriasDeNotificacoes() {
    await Notifications.setNotificationCategoryAsync("habito-response", [
        {
            identifier: "sim",
            buttonTitle: "Sim",
            options: { isDestructive: false, opensAppToForeground: false }
        },
        {
            identifier: "nao",
            buttonTitle: "Não",
            options: { isDestructive: true, opensAppToForeground: false }
        }
    ]);
}
