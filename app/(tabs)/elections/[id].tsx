import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import Candidate from "@/models/candidate";
import { activeCandidates } from "@/services/candidate";
import { vote, voteEligibility } from "@/services/voter";
import * as LocalAuthentication from "expo-local-authentication";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SelectedCandidate = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { electionDate } = useLocalSearchParams<{ electionDate: string }>();
  const { description } = useLocalSearchParams<{ description: string }>();
  const [eligibility, setEligibility] = useState<Boolean>(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [voting, setVoting] = useState<boolean>(false);

  const getCandidates = async () => {
    try {
      setLoading(true);
      const find = await activeCandidates(id || "");
      setCandidates(find);
    } catch (error) {
      Alert.alert("Error", error as string);
    } finally {
      setLoading(false);
    }
  };

  const checkEligibility = async () => {
    try {
      const find = await voteEligibility(id || "");
      setEligibility(find);
    } catch (error) {
      setEligibility(false);
      Alert.alert("Error", error as string);
    }
  };

  const checkDates = (date?: string) => {
    let electionDate = new Date(date ? date : "");
    let today = new Date();

    return (
      electionDate.getFullYear() === today.getFullYear() &&
      electionDate.getMonth() === today.getMonth() &&
      electionDate.getDate() === today.getDate()
    );
  };

  const getCandidateName = (id: number) => {
    let find = candidates.find((candidate) => candidate.id == id);
    return find ? find.name : "";
  };

  const confirmVote = async () => {
    try {
      setVoting(true);
      const authenticated = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to continue voting",
      });
      if (authenticated.success) {
        await vote(parseInt(id || ""), selected || 0);
        Alert.alert("Success", "Voting successful!");
        router.push("/elections");
      } else {
        Alert.alert("Biometric authentication failed");
      }
    } catch {
      Alert.alert("Error", "Voting failed!");
    } finally {
      setVoting(false);
    }
  };

  useEffect(() => {
    getCandidates();
    checkEligibility();
  }, [id]);

  return (
    <SafeAreaView className="bg-secondary-50 h-full">
      <View className="bg-white py-6 px-4 shadow-sm">
        <Text className="text-2xl font-psemibold text-primary">
          {description}
        </Text>
      </View>
      {!checkDates(electionDate) ? (
        <View className="mx-2 mt-4 p-2 rounded-md border border-[#ef4444] shadow-md bg-white flex flex-row items-center">
          <Image
            source={icons.warning}
            resizeMode="contain"
            tintColor={"#ef4444"}
            className="w-6 h-6 mr-3"
          />
          <Text className="text-sm font-pmedium text-[#ef4444] ">
            {
              "Voting has not started yet. Stay tuned\nuntil the election starting date."
            }
          </Text>
        </View>
      ) : (
        ""
      )}

      {!eligibility && checkDates(electionDate) ? (
        <View className="mx-2 mt-4 p-2 rounded-md border border-[#ef4444] shadow-md bg-white flex flex-row items-center">
          <Image
            source={icons.warning}
            resizeMode="contain"
            tintColor={"#ef4444"}
            className="w-6 h-6 mr-3"
          />
          <Text className="text-sm font-pmedium text-[#ef4444] ">
            {"You already voted for this election."}
          </Text>
        </View>
      ) : (
        ""
      )}
      {loading && candidates.length <= 0 ? (
        <ActivityIndicator className="my-8" />
      ) : (
        ""
      )}
      <FlatList
        className="mb-4"
        data={candidates}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={
              selected === item.id
                ? "p-2 shadow-sm mt-4 mx-2 rounded-md bg-secondary flex flex-row items-center justify-center"
                : "p-2 shadow-sm mt-4 mx-2 rounded-md bg-white border border-secondary flex flex-row items-center justify-center"
            }
            onPress={() => {
              setSelected(item.id || null);
            }}
          >
            <View className="grow pr-2">
              <Text className="text-[18px] font-psemibold">{item.name}</Text>
              <Text
                className={
                  selected === item.id
                    ? "text-base font-pregular text-white mt-1"
                    : "text-base font-pregular text-slate-500 mt-1"
                }
              >
                {item.electionParty}
              </Text>
            </View>
            <View
              className={
                selected === item.id
                  ? "flex-none flex flex-col items-center justify-center border border-left-1 border-white rounded-md p-2 align-items"
                  : "flex-none flex flex-col items-center justify-center border border-left-1 border-secondary rounded-md p-2 align-items"
              }
            >
              <Text
                className={
                  selected === item.id
                    ? "text-4xl font-pbold text-white mt-3"
                    : "text-4xl font-pbold text-secondary mt-3"
                }
              >
                {item.candidateNo}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        refreshing={loading}
        onRefresh={getCandidates}
      />
      {selected !== null && checkDates(electionDate) && eligibility && (
        <View className="w-full my-3 px-2 mt-0">
          <CustomButton
            title={"Vote for '" + getCandidateName(selected) + "'"}
            handlePress={() => {
              confirmVote();
            }}
            containerStyles="mt-8"
            isLoading={voting}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SelectedCandidate;
