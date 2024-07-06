import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

import { icons } from "@/constants";

interface FormFieldProps extends TextInputProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-1 ${otherStyles}`}>
      <Text className="text-base text-primary font-pmedium">{title}:</Text>

      <View className="w-full h-12 px-4 bg-secondary-100 rounded-md border border-primary focus:border-secondary flex flex-row items-center shadow-md	">
        <TextInput
          className="flex-1 text-black font-pregular text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
      </View>
    </View>
  );
};

export default FormField;
