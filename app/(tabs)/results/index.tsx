import Election from "@/models/election";
import { completeElections } from "@/services/election";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Results = () => {
  const [elections, setResults] = useState<Election[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getDate = (date: string) => {
    return new Date(date).getDate();
  };

  const getMonth = (date: string) => {
    return new Date(date).toLocaleString("default", { month: "long" });
  };

  const getYear = (date: string) => {
    return new Date(date).getFullYear();
  };

  const getResults = async () => {
    try {
      setLoading(true);
      const find = await completeElections();
      setResults(find);
    } catch (error) {
      Alert.alert("Error", error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <SafeAreaView className="bg-secondary-50 h-full">
      <View className="bg-white py-6 px-4 shadow-sm">
        <Text className="text-3xl font-psemibold text-primary">
          Election Results
        </Text>
      </View>
      <FlatList
        data={elections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="p-2 shadow-sm mt-4 mx-2 rounded-md bg-white border border-secondary flex flex-row items-center"
            onPress={() => {
              router.push({
                pathname: "/results/[id]",
                params: {
                  id: item.id,
                  description: item.description,
                },
              });
            }}
          >
            <View className="grow pr-2">
              <Text className="text-[18px] font-psemibold">
                {item.description}
              </Text>
            </View>
            <View className="flex-none flex flex-col items-center border border-left-1 border-secondary rounded-md p-2">
              <Text className="text-4xl font-pbold text-secondary">
                {getDate(item.electionDate)}
              </Text>
              <Text className="text-sm font-plight text-primary -mt-3">
                {getMonth(item.electionDate)}
              </Text>
              <Text className="text-sm font-pmedium text-primary">
                {getYear(item.electionDate)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        refreshing={loading}
        onRefresh={getResults}
      />
    </SafeAreaView>
  );
};

export default Results;
