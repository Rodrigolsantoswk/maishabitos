import colors from "@/constants/colors";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Alert,
    StatusBar,
    ScrollView,
    SafeAreaView
}
    from "react-native";
import { Link } from 'expo-router'
import { useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { ContentViewer, 
    ThemedLogo, 
    ThemedButton, 
    CirclesDecoration,
    ImageViewer
}from '@/components'

const PlaceholderImage = require("@/assets/images/logo.webp");

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignin() {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            let erro: string = "";
            switch (error.message) {
                case "Invalid login credentials":
                    erro = "Credenciais inválidas";
                    break;
                default:
                    erro = "Ocorreu um erro inesperado";
            }
            Alert.alert("Erro", erro);
            setLoading(false);
            return;
        }

        setLoading(false);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <CirclesDecoration/>
                            <View style={styles.logoContainer}>
                                <ThemedLogo fontSize={78} />
                                <ImageViewer imgSource={PlaceholderImage} widthPercent={55} />
                            </View>
                        </View>
                        <ContentViewer
                            backgroundColor={colors.white}
                            paddingTop={34}
                            paddingHorizontal={18}
                            gap={18}>
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
                                title="Acessar"
                                onPress={handleSignin}
                                loading={loading}
                                />
                            <Link href={'/(auth)/signup/page'} style={styles.link}>
                                <Text>Ainda não possui uma conta? Cadastre-se</Text>
                            </Link>
                        </ContentViewer>
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
        backgroundColor: colors.blue,
    },
    header: {
        paddingLeft: 14,
        paddingRight: 14,
        backgroundColor: colors.blue,
    },
    logoContainer: {
        alignItems: 'center',
    },
    slogan: {
        fontSize: 34,
        color: colors.white,
        marginBottom: 34,
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
    },
    link: {
        marginTop: 16,
        textAlign: 'center',
    }
})
