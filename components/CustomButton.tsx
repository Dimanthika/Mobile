import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const CustomButton: React.FC<{
  title: string;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
  handlePress: () => void;
}> = ({
  title,
  handlePress,
  containerStyles = "",
  textStyles = "",
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      className="rounded-md py-3 flex items-center justify-center bg-secondary-600"
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
        },
        isLoading ? { opacity: 0.5 } : {},
        containerStyles as StyleProp<ViewStyle>,
      ]}
      disabled={isLoading}
    >
      <View className="flex flex-row items-center justify-center space-x-2">
        {isLoading && (
          <ActivityIndicator
            animating={isLoading}
            color="#4d4f53"
            size="small"
            style={{ marginLeft: 8 }}
          />
        )}
        <Text
          className="font-psemibold font-primary text-base"
          style={[textStyles as StyleProp<TextStyle>]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
