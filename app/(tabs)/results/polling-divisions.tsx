import { electionPollSummary } from "@/services/election";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

const SelectedCandidate = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { description } = useLocalSearchParams<{ description: string }>();
  const [electionResults, setElectionResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  let colors = ["#0c3866", "#49c0b6", "#ce181e", "#007cc0", "#ffc20e"];

  const getResults = async () => {
    try {
      setLoading(true);
      const find = await electionPollSummary(id || "");
      setElectionResults(find);
    } catch (error) {
      Alert.alert("Error", error as string);
    } finally {
      setLoading(false);
    }
  };

  const dataHandler = (results: any[]) => {
    return results
      .filter((result) => result.votes !== null)
      .map((result, index) => ({
        value: result.votes,
        color: colors[index % colors.length],
        text: result.candidateNo.padStart(2, "0"),
      }));
  };

  useEffect(() => {
    getResults();
  }, [id]);

  return (
    <SafeAreaView className="bg-secondary-50 h-full">
      <View className="bg-white py-6 px-4 shadow-sm">
        <Text className="text-2xl font-psemibold text-primary">
          Polling Divisions Results
        </Text>
        <Text className="text-lg font-pregular text-secondary ">
          {description}
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator className="my-8" />
      ) : (
        <FlatList
          data={electionResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="border rounded-md mx-1 my-2 border-secondary">
              <View>
                <Text className="text-primary text-2xl font-psemibold text-center my-4 ">
                  {item.name}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PieChart
                  showText
                  textColor="black"
                  radius={130}
                  textSize={20}
                  showTextBackground
                  focusOnPress
                  showValuesAsLabels
                  textBackgroundRadius={24}
                  data={dataHandler(item.results)}
                />
              </View>
              {item.results.map((result: any, index: any) => (
                <View
                  key={result.candidateNo}
                  className="px-2 shadow-sm mt-4 mx-2 rounded-md flex flex-row items-center border my-2"
                  style={{ borderColor: colors[index] }}
                >
                  <View
                    className="p-1.5 bg-primary mr-1.5  rounded-md text-center flex-none"
                    style={{ backgroundColor: colors[index] }}
                  >
                    <Text className="text-white text-2xl font-psemibold">
                      {result.candidateNo.padStart(2, "0")}
                    </Text>
                  </View>
                  <View className="grow border-r border-slate-300 pr-1 mr-1 flex flex-col justify-center">
                    <Text className="text-lg font-psemibold">
                      {result.name}
                    </Text>
                    <Text className="text-sm font-pregular">
                      {result.electionParty}
                    </Text>
                  </View>
                  <View className="py-2 flex-none">
                    <Text className="text-lg font-psemibold text-right">
                      {result.percentage > 0 ? result.percentage : 0} %
                    </Text>
                    <Text className="text-sm text-right font-pregular">
                      Votes: {result.votes ? result.votes : 0}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
          refreshing={loading}
          onRefresh={getResults}
        />
      )}
    </SafeAreaView>
  );
};

export default SelectedCandidate;
