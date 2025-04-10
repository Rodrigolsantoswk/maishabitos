import colors from "@/constants/colors";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";

export function LoadingPage(){

    return(
        <View style={styles.container}>
           <ActivityIndicator
            size={44}
            color={colors.green}
           />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 34,
        backgroundColor: colors.zinc,
    },
})