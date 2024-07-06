import Election from "@/models/election";
import { isAxiosError } from "axios";
import { api } from "./api";
import { getAuthToken } from "./token";

export const activeElections = async (): Promise<Election[]> => {
  try {
    const response = await api.get("active-election");

    return response.data.elections as Election[];
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

export const completeElections = async (): Promise<Election[]> => {
  try {
    const response = await api.get("complete-elections");

    return response.data.elections as Election[];
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

export const electionSummary = async (id: string) => {
  try {
    const response = await api.get("resultsSummary/" + id);

    return response.data.candidateResults;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const electionPollSummary = async (id: string) => {
  try {
    const response = await api.get("resultsElectorate/" + id);

    return response.data.electorateResults;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const electionDistrictSummary = async (id: string) => {
  try {
    const response = await api.get("resultsElectDist/" + id);

    return response.data.electDistResults;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};
