import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export function ReturnButton({
}) {
  return (
    <Pressable
        style={styles.backButton}
        onPress={() => { router.back() }}>
        <Ionicons name="arrow-back" size={24} color={colors.white}></Ionicons>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
        backgroundColor: colors.purple,
        alignSelf: 'flex-end',
        padding: 8,
        opacity: 0.7,
        borderRadius: 8,
        marginBottom: 8,
    }
});
