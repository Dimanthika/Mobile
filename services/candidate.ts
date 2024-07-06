import Candidate from "@/models/candidate";
import { isAxiosError } from "axios";
import { api } from "./api";

export const activeCandidates = async (id: string): Promise<Candidate[]> => {
  try {
    const response = await api.get("voter/election-candidate/" + id);

    return response.data.candidates as Candidate[];
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
