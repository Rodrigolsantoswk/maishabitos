import colors from "@/constants/colors";
import { 
    Text,
    View,
    StyleSheet, 
    TextInput, 
    Pressable, 
    SafeAreaView,
    ScrollView,
    Alert
} from "react-native";
import { router } from 'expo-router'
import { useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { ThemedLogo } from "@/components/ThemedLogo";
import { ThemedButton } from "@/components/ThemedButton";
import { CirclesDecoration } from "@/components/CirclesDecoration";
import { ReturnButton } from "@/components/ReturnButton";

export function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignUp() {
        setLoading(true);
        const { data, error } = await supabase.auth.signUp(
            {
                email: email,
                password: password,
                options:{
                    data:{
                        name: name
                    }
                }
            }
        )

        if(error){
            Alert.alert('Error', error.message);
            setLoading(false);
            return;
        }

        setLoading(false);
        router.replace('/(auth)/signin/page');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <CirclesDecoration/>
                    <ReturnButton/>
                    <View style={styles.logoContainer}>
                        <ThemedLogo fontSize={78} />
                        <Text style={styles.slogan}>Criar uma conta</Text>
                    </View>
                </View>

                <View style={styles.form}>
                    <View>
                        <Text>Nome completo</Text>
                        <TextInput
                            placeholder="Digite seu nome completo..."
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View>
                        <Text>Email</Text>
                        <TextInput
                            placeholder="Digite seu email..."
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View>
                        <Text>Senha</Text>
                        <TextInput
                            placeholder="Digite sua senha..."
                            style={styles.input}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <ThemedButton
                        title="Cadastrar"
                        onPress={handleSignUp}
                        loading={loading}
                        width="100%" 
                        height={48}
                    />
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 34,
        backgroundColor: colors.blue,
    },
    header: {
        paddingLeft: 14,
        paddingRight: 14,
    },
    logoContainer:{
        alignItems: 'center', 
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 8,
    },
    slogan: {
        fontSize: 34,
        color: colors.white,
        marginBottom: 34,
    },
    form: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 34,
        paddingLeft: 14,
        paddingRight: 14,
    },
    label: {
        color: colors.zinc,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 8,
        paddingTop: 14,
        paddingBottom: 14,
    }
})