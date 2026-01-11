
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayoutEmpresa() {

  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="index" options={{
          title: "Início", tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }} />
        <Tabs.Screen name="configuracoes" options={{
          title: "Configurações", tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }} />
        <Tabs.Screen
          name="estilos/index.style"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="estilos/perfil.style"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="faturamento"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="estilos/faturamento.style"
          options={{
            href: null,
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </ThemeProvider>
  )

}