import { CustomButton } from "@/components";
import { images } from "@/constants";
import { generateKeys } from "@/services/auth";
import { getAuthToken } from "@/services/token";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type BiometricType = "Fingerprint" | "Face" | "Iris" | null;

const Authenticate = () => {
  const [userStatus, setUserStatus] = useState<Boolean>(false);
  const [biometricType, setBiometricType] = useState<BiometricType>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  const checkToken = async () => {
    try {
      let token = await getAuthToken("token");
      let public_key = await getAuthToken("public_key");
      if (!token) {
        router.replace("/sign-in");
      }
      if (public_key) {
        setUserStatus(true);
      }
    } catch (error) {
      router.replace("/sign-in");
    }
  };

  const checkBiometrics = async () => {
    const supported = await LocalAuthentication.hasHardwareAsync();
    if (supported) {
      const biometryTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (
        biometryTypes.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        )
      ) {
        setBiometricType("Face");
      } else if (
        biometryTypes.includes(
          LocalAuthentication.AuthenticationType.FINGERPRINT
        )
      ) {
        setBiometricType("Fingerprint");
      } else if (
        biometryTypes.includes(LocalAuthentication.AuthenticationType.IRIS)
      ) {
        setBiometricType("Iris");
      }
    }
  };

  const authenticate = async () => {
    try {
      setLoading(true);
      const authenticated = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to continue with Sign in",
      });
      if (authenticated.success) {
        if (userStatus) {
          router.replace("/elections");
        } else {
          await generateKeys();
          router.replace("/elections");
        }
      } else {
        Alert.alert("Biometric authentication failed");
      }
    } catch (error) {
      Alert.alert("Error", error as string);
    } finally {
      setLoading(false);
    }
  };

  const initializeKeys = async () => {
    try {
      setLoading(true);
      const authenticated = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to continue with Sign in",
      });
      if (authenticated.success) {
        await generateKeys();
        router.replace("/elections");
      } else {
        Alert.alert("Biometric authentication failed");
      }
    } catch (error) {
      Alert.alert("Error", error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
    checkBiometrics();
  }, []);

  return (
    <SafeAreaView className="bg-secondary-50 h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        style={{ flex: 1 }}
      >
        <View className="w-full flex justify-center min-h-[100vh] px-4 flex-col">
          <Text className="my-16 text-6xl font-semibold font-pbold text-secondary flex-none">
            Free Thinkers
          </Text>
          <View className="grow my-12 items-center justify-center">
            <Image
              className="w-24 h-24 my-24"
              source={
                biometricType == "Face" || biometricType == "Iris"
                  ? images.faceID
                  : images.touchID
              }
            />
            <View className="flex-none w-full">
              {userStatus ? (
                <CustomButton
                  title="Authenticate"
                  handlePress={authenticate}
                  containerStyles="mt-8"
                  isLoading={loading ? true : false}
                />
              ) : (
                <CustomButton
                  title="Initialize Tokens"
                  handlePress={initializeKeys}
                  containerStyles="mt-8"
                  isLoading={loading ? true : false}
                />
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Authenticate;
