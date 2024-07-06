import Election from "@/models/election";
import { activeElections } from "@/services/election";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Elections = () => {
  const [elections, setElections] = useState<Election[]>([]);
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

  const getElections = async () => {
    try {
      setLoading(true);
      const find = await activeElections();
      setElections(find);
    } catch (error) {
      Alert.alert("Error", error as string);
    } finally {
      setLoading(false);
    }
  };

  const checkDates = (date: string) => {
    let electionDate = new Date(date);
    let today = new Date();

    return (
      electionDate.getFullYear() === today.getFullYear() &&
      electionDate.getMonth() === today.getMonth() &&
      electionDate.getDate() === today.getDate()
    );
  };

  useEffect(() => {
    getElections();
  }, []);

  return (
    <SafeAreaView className="bg-secondary-50 h-full">
      <View className="bg-white py-6 px-4 shadow-sm">
        <Text className="text-3xl font-psemibold text-primary">Elections</Text>
      </View>
      {loading && elections.length <= 0 ? (
        <ActivityIndicator className="my-8" />
      ) : (
        ""
      )}
      <FlatList
        data={elections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={
              checkDates(item.electionDate)
                ? "p-2 shadow-sm mt-4 mx-2 rounded-md bg-secondary flex flex-row items-center"
                : "p-2 shadow-sm mt-4 mx-2 rounded-md bg-white border border-secondary flex flex-row items-center"
            }
            onPress={() => {
              router.push({
                pathname: "/elections/[id]",
                params: {
                  id: item.id,
                  description: item.description,
                  electionDate: item.electionDate,
                },
              });
            }}
          >
            <View className="grow pr-2">
              <Text className="text-[18px] font-psemibold">
                {item.description}
              </Text>
              <Text
                className={
                  checkDates(item.electionDate)
                    ? "text-sm font-pregular text-white mt-2"
                    : "text-sm font-pregular text-slate-500 mt-2"
                }
              >
                {checkDates(item.electionDate)
                  ? "Voting is now open! Cast your vote\ntoday to make your voice heard."
                  : "Voting has not started yet. Stay tuned\nfor the upcoming election dates."}
              </Text>
            </View>
            <View
              className={
                checkDates(item.electionDate)
                  ? "flex-none flex flex-col items-center border border-left-1 border-white rounded-md p-2"
                  : "flex-none flex flex-col items-center border border-left-1 border-secondary rounded-md p-2"
              }
            >
              <Text
                className={
                  checkDates(item.electionDate)
                    ? "text-4xl font-pbold text-white"
                    : "text-4xl font-pbold text-secondary"
                }
              >
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
        onRefresh={getElections}
      />
    </SafeAreaView>
  );
};

export default Elections;
