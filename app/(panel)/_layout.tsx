import React from 'react';
import { Tabs } from 'expo-router';
import colors from '@/constants/colors';

export default function PanelLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: { justifyContent: 'center', alignItems: 'center', paddingTop:-5}, 
        tabBarIconStyle:{ display: "none" }
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Rotinas',
          tabBarActiveBackgroundColor: colors.sky,
          tabBarInactiveBackgroundColor: colors.purple,
          tabBarLabelStyle: { fontSize: 18, fontWeight: 'bold', marginTop: 5},
        }}
      />
      <Tabs.Screen
        name="progress/progressPage"
        options={{
          tabBarLabel: 'Progresso',
          tabBarActiveBackgroundColor: colors.sky,
          tabBarInactiveBackgroundColor: colors.purple,
          tabBarLabelStyle: { fontSize: 18, fontWeight: 'bold', marginTop: 5},
        }}
      />
    </Tabs>
  );
}
