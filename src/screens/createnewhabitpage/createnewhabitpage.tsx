import colors from "@/constants/colors";
import { useAuth } from "@/src/contexts/AuthContext";
import { supabase } from "@/src/lib/supabase";
import { Text
    , View
    , StyleSheet
    , Button
    , Alert 
    , StatusBar
} from "react-native";

export function CreateHabit(){

    const { setAuth, user } = useAuth();

    async function handleSignout(){
        const { error } = await supabase.auth.signOut();
        setAuth(null);
        if (error){
            Alert.alert('Erro ao sair da conta: ', error.message);
            return;
        }
    }
    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
            <Text>pagina CreateHabit</Text>
            <Text>{user?.email}</Text>
            <Button
                title='Deslogar'
                onPress={handleSignout}>

            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})