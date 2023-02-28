import { useContext, useState } from "react";
import { Auth } from "../contexts/Auth";
// import { useFcmToken } from "./useFcmToken";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useContext(Auth);
  // const { requestPermission } = useFcmToken();

  const signup = async (username, email, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    // const fcmToken =
    // await requestPermission();

    
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
        key: "",
        // fcmToken: fcmToken,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json);
    }
    if (response.ok) {
      // Save the user and token in the localstorage
      localStorage.setItem("user", JSON.stringify(json));

      // Updating the global Auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { error, isLoading, signup };
};
