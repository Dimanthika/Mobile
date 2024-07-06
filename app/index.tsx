import { CustomButton } from "@/components";
import { images } from "@/constants";
import { getAuthToken } from "@/services/token";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StartingScreen = () => {
  const [token, setToken] = useState<string>("");

  const getToken = async () => {
    try {
      let token = await getAuthToken("token");
      setToken(token ? token : "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <SafeAreaView className="bg-secondary-200 h-full">
      <View className="flex-1 items-center justify-center bg-secondary-200 flex flex-col">
        <Text className="text-xl font-bold text-black mt-12 flex-none">
          Are you ready to vote?
        </Text>
        <Text className="text-base text-gray-700 text-center mt-2 mx-4 flex-none">
          Welcome to Free Thinkers, the app that makes voting secure &
          transparent. Take part in elections, wherever you are.
        </Text>
        <View className="grow flex items-center justify-center">
          <Image
            className="max-h-[350px] w-[80vw] my-8 "
            source={images.hand}
          />
        </View>
        <View className="flex-none w-full px-4 py-6">
          <CustomButton
            title={token ? "Authenticate" : "Sign In"}
            handlePress={
              () =>
                token ? router.push("/authenticate") : router.push("/sign-in")
              // router.push("/elections")
            }
            containerStyles="mt-8"
          />
        </View>
        <StatusBar backgroundColor="#b2ffdc" style="dark" />
      </View>
    </SafeAreaView>
  );
};

export default StartingScreen;
