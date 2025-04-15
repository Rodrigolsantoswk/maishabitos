import colors from "@/constants/colors";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";

export function LoadingPage(){

    return(
        <View style={styles.container}>
           <ActivityIndicator
            size={44}
            color={colors.purple}
           />
           <Text style={styles.loadingText}>Carregando... Aguarde um pouquinho!!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 34,
        backgroundColor: colors.sky,
        justifyContent: 'center',
        alignContent: 'center'
    },
    loadingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        textAlign: 'center',
        marginTop: 16
    }
})