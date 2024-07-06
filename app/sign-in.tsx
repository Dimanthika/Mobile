import { CustomButton, FormField } from "@/components";
import { images } from "@/constants";
import { login } from "@/services/auth";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    } else {
      setSubmitting(true);
      try {
        await login(form.email, form.password);
        Alert.alert("Success", "User signed in successfully");
        router.replace("/authenticate");
      } catch (error: any) {
        Alert.alert("Error", error.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <SafeAreaView className="bg-secondary-200 h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        style={{ flex: 1 }}
      >
        <View className="min-h-[90vh] max-h-[85vh] w-full flex flex-col justify-center item px-4">
          <View className="flex items-center justify-center">
            <Image className="w-32 h-32 mb-6" source={images.signIn} />
          </View>
          <Text className="text-5xl font-semibold font-pbold text-secondary flex-none text-center my-6 pt-2">
            Free Thinkers
          </Text>
          <View className="items-center justify-center">
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles=""
              keyboardType="email-address"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-4 mb-12"
              secureTextEntry
            />
            <View className="flex-none w-full">
              <CustomButton
                title="Sign In"
                handlePress={submit}
                containerStyles="mt-8"
                isLoading={isSubmitting}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
