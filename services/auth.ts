import axios from "axios";
import { router } from "expo-router";
import { api, axiosInstance } from "./api";
import { deleteAuthToken, getAuthToken, setAuthToken } from "./token";

/**
 * Logs in a user with the provided email and password.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<void>} A Promise that resolves when the login is successful.
 * @throws {Error} If there is an error during the login process.
 */
export const login = async (email: string, password: string) => {
  try {
    const publicKey = await getAuthToken("public_key");
    const response = await axiosInstance.post("voter/sign-in", {
      email,
      password,
      publicKey,
    });
    await setAuthToken("token", response.data.token);
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };
    if (axios.isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }
    throw formattedError;
  }
};

/**
 * Generates keys for the voter by making a POST request to the "voter-keys" endpoint.
 * The generated keys are then registered and stored as auth tokens.
 *
 * @return {Promise<void>} A Promise that resolves when the keys are successfully generated and registered.
 * @throws {Error} If there is an error during the key generation process.
 */
export const generateKeys = async () => {
  try {
    const response = await api.post("voter-keys");
    await registerComplete(response.data.public_key);
    await setAuthToken("private_key", response.data.private_key);
    await setAuthToken("public_key", response.data.public_key);
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };
    if (axios.isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }
    throw formattedError.message;
  }
};

/**
 * Registers a voter by sending their public key to the API.
 *
 * @param {string} public_key - The public key of the voter.
 * @return {Promise<void>} A promise that resolves when the registration is complete.
 */
const registerComplete = async (public_key: string) => {
  await api.post("voter-register", {
    public_key: public_key,
  });
};

/**
 * Logs out the user by deleting the authentication tokens and redirecting to the login page.
 *
 * @return {Promise<void>} A promise that resolves when the logout process is complete.
 */
export const logout = async () => {
  await deleteAuthToken("token");
  router.replace("/");
};

/**
 * Removes the account by deleting the authentication tokens and redirects to the login page.
 *
 * @return {Promise<void>} A promise that resolves when the account removal process is complete.
 */
export const removeAccount = async () => {
  await deleteAuthToken("private_key");
  await deleteAuthToken("public_key");
  await deleteAuthToken("token");
  router.replace("/");
};
