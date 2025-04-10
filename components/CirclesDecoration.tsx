import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '@/constants/colors';

export function CirclesDecoration() {
  return (
    <View style={styles.circleWrapper}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
    </View>
  );
}

const styles = StyleSheet.create({
  circleWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 150,
    height: 150,
    zIndex: 0,
  },
  circle1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 65,
    backgroundColor: colors.purple,
    opacity: 0.7,
    top: -50,
    left: -15,
  },
  circle2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 65,
    backgroundColor: colors.sky,
    opacity: 0.7,
    top: 0,
    left: -50,
  },
});