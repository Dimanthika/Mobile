import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="electoral-districts"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="polling-divisions"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar backgroundColor="#ffffff" style="dark" />
    </>
  );
};
