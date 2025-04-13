import colors from "@/constants/colors";
import { useAuth } from "@/src/contexts/AuthContext";
import { supabase } from "@/src/lib/supabase";
import {
    Text
    , View
    , StyleSheet
    , Alert
    , StatusBar
    , ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    ReturnButton,
    CirclesDecoration,
    ThemedLogo
} from "@/components";

export function CreateHabit() {

    const { setAuth, user } = useAuth();

    async function handleSignout() {
        const { error } = await supabase.auth.signOut();
        setAuth(null);
        if (error) {
            Alert.alert('Erro ao sair da conta: ', error.message);
            return;
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
                    <View style={styles.header}>
                        <CirclesDecoration />
                        <View style={styles.logoAndButton}>
                            <ThemedLogo fontSize={34} />
                            <ReturnButton />
                        </View>
                        <Text style={styles.title}>Crie o seu novo hábito</Text>
                    </View>
                    <View style={styles.container}>
                        
                        
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 34,

    },
    header: {
        paddingLeft: 14,
        paddingRight: 14,
        backgroundColor: colors.blue,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 8,
    },
    title: {
        fontSize: 34,
        color: colors.white,
        marginBottom: 34,
    },
    logoAndButton: {
        alignItems: 'flex-end',
    },
})