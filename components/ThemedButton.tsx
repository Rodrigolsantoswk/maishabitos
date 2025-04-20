import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Usando o Icon do FontAwesome
import colors from '@/constants/colors';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  width?: number | string;
  height?: number;
  icon?: string; // Propriedade para passar o ícone
  iconSize?: number; // Tamanho do ícone
}

export function ThemedButton({
  title,
  onPress,
  loading = false,
  width = '100%',
  height = 48,
  icon,
  iconSize = 20,
}: CustomButtonProps) {
  return (
    <Pressable 
      onPress={onPress} 
      style={[styles.button, { width, height } as ViewStyle]}
    >
      <View style={styles.content}>
        {icon && <Icon name={icon} size={iconSize} color={colors.white} style={styles.icon} />}
        <Text style={styles.buttonText}>
          {loading ? 'Carregando...' : title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 8,
    paddingRight: 8,
    paddingLeft: 8,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8, // Espaçamento entre o ícone e o título
  },
});
