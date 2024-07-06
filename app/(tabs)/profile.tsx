import CustomButton from "@/components/CustomButton";
import CustomWarningButton from "@/components/CustomWarningButton";
import Voter from "@/models/voter";
import { logout, removeAccount } from "@/services/auth";
import { getVoter } from "@/services/voter";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const [voter, setVoter] = useState<Voter>();
  const [loading, setLoading] = useState<boolean>(false);

  const loadVoter = async () => {
    try {
      setLoading(true);
      const find = await getVoter();
      setVoter(find);
    } catch (error) {
      Alert.alert("Error", error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVoter();
  }, []);

  return (
    <SafeAreaView className="bg-secondary-50 h-full">
      <View className="bg-white py-6 px-4 shadow-sm">
        <Text className="text-2xl font-psemibold text-primary">
          Voter Profile
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator className="my-8" />
      ) : (
        <ScrollView>
          <View className="m-2 p-2 border rounded-md mt-4 border-secondary">
            <Text className="font-pregular text-primary bg-secondary-50 w-content w-[55px] -mt-5 text-[14px] px-1.5 ">
              Name
            </Text>
            <Text className="text-[18px] font-psemibold text-primary">
              {voter?.name}
            </Text>
          </View>

          <View className="m-2 p-2 border rounded-md mt-4 border-secondary">
            <Text className="font-pregular text-primary bg-secondary-50 w-content w-[37px] -mt-5 text-[14px] px-1.5 ">
              NIC
            </Text>
            <Text className="text-[18px] font-psemibold text-primary">
              {voter?.nic}
            </Text>
          </View>

          <View className="m-2 p-2 border rounded-md mt-4 border-secondary">
            <Text className="font-pregular text-primary bg-secondary-50 w-content w-[64px] -mt-5 text-[14px] px-1.5 ">
              Gender
            </Text>
            <Text className="text-[18px] font-psemibold text-primary">
              {voter?.gender}
            </Text>
          </View>

          <View className="m-2 p-2 border rounded-md mt-4 border-secondary">
            <Text className="font-pregular text-primary bg-secondary-50 w-content w-[98px] -mt-5 text-[14px] px-1.5 ">
              Date of Birth
            </Text>
            <Text className="text-[18px] font-psemibold text-primary">
              {voter?.dateOfBirth}
            </Text>
          </View>

          <View className="m-2 p-2 border rounded-md mt-4 border-secondary">
            <Text className="font-pregular text-primary bg-secondary-50 w-content w-[124px] -mt-5 text-[14px] px-1.5 ">
              Electoral District
            </Text>
            <Text className="text-[18px] font-psemibold text-primary">
              {voter &&
                voter.Electorate &&
                voter.Electorate.ElectorateDistrict &&
                voter.Electorate.ElectorateDistrict.name}
            </Text>
          </View>

          <View className="m-2 p-2 border rounded-md mt-4 border-secondary">
            <Text className="font-pregular text-primary bg-secondary-50 w-content w-[83px] -mt-5 text-[14px] px-1.5 ">
              Electorate
            </Text>
            <Text className="text-[18px] font-psemibold text-primary">
              {voter && voter.Electorate && voter.Electorate.name}
            </Text>
          </View>

          <View className="m-2 p-2 border rounded-md mt-4 border-secondary">
            <Text className="font-pregular text-primary bg-secondary-50 w-content w-[50px] -mt-5 text-[14px] px-1.5 ">
              Email
            </Text>
            <Text className="text-[18px] font-psemibold text-primary">
              {voter?.email}
            </Text>
          </View>
        </ScrollView>
      )}

      <View className="w-full mt-2 px-2">
        <CustomButton
          title="Log Out"
          handlePress={logout}
          containerStyles="mt-8"
        />
      </View>

      <View className="w-full my-2 px-2">
        <CustomWarningButton
          title="Remove Voter Account"
          handlePress={removeAccount}
          containerStyles="mt-8"
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
