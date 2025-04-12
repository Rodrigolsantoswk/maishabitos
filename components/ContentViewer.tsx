import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'

type ContentViewerProps = {
  children: React.ReactNode
  backgroundColor?: string
  paddingTop?: number
  paddingHorizontal?: number
  gap?: number
}

export function ContentViewer({
  children,
  backgroundColor = '#FFFFFF',
  paddingTop = 34,
  paddingHorizontal = 18,
  gap = 18
}: ContentViewerProps) {
  
  const dynamicStyle: ViewStyle = {
    backgroundColor,
    paddingTop,
    paddingHorizontal,
    rowGap: gap,
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  }

  return  <View style={[styles.base, dynamicStyle]}>
            {children}
          </View>
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
})
