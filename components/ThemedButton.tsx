import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import colors from '@/constants/colors';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  width?: number | string;
  height?: number;
}

export function ThemedButton({
  title,
  onPress,
  loading = false,
  width = '100%',
  height = 48,
}: CustomButtonProps) {
  return (
    <Pressable 
      onPress={onPress} 
      style={[styles.button, { width, height } as ViewStyle]}
    >
      <Text style={styles.buttonText}>
        {loading ? 'Carregando...' : title}
      </Text>
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
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
