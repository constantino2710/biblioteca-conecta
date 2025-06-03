import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return <Stack >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
      <Stack.Screen name="favoritos" options={{ headerShown: false }} />
      <Stack.Screen name="consultar-livros" options={{ headerShown: false }} />
      <Stack.Screen name="add" options={{ headerShown: false }} />
      <Stack.Screen name="EditarLivro" options={{ headerShown: false }} />
  </Stack>;
}
