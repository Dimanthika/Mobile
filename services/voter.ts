import Voter from "@/models/voter";
import { isAxiosError } from "axios";
import { api } from "./api";
import { getAuthToken } from "./token";

export const voteEligibility = async (id: string): Promise<boolean> => {
  try {
    const publicKey = await getAuthToken("public_key");
    const response = await api.post("vote-eligibility", {
      publicKey: publicKey,
      election: id,
    });
    return response.data.isVote as boolean;
  } catch (error) {
    return false;
  }
};

export const vote = async (
  election: number,
  candidate: number
): Promise<boolean> => {
  try {
    const publicKey = await getAuthToken("public_key");
    const privateKey = await getAuthToken("private_key");
    const response = await api.post("vote", {
      publicKey: publicKey,
      privateKey: privateKey,
      candidate: candidate,
      election: election,
    });
    return response.data.isVote as boolean;
  } catch (error) {
    return false;
  }
};

export const getVoter = async (): Promise<Voter> => {
  try {
    const response = await api.get("voter");
    return response.data.voter as Voter;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError.message;
  }
};
