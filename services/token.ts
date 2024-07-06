import * as SecureStore from "expo-secure-store";

export const setAuthToken = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getAuthToken = async (key: string): Promise<string | null> => {
  return await SecureStore.getItemAsync(key);
};

export const deleteAuthToken = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};
