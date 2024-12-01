import { useEffect, useState } from "react";
import { UserData } from "../types/datatypes.ts";
import { BackendError } from "../types/error.types";
import useFetch from "./useFetch.ts";

const useUser = () => {
  const [data, setData] = useState<UserData | null>(null); // Store fetched drivers
  const [error, setError] = useState<BackendError | null>(null); // Handle errors
  const [loading, setLoading] = useState(false); // Track loading state

  const { fetchWithAuth } = useFetch();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth("/user/get", "get");
      if (!response.ok) {
        const error: BackendError = await response.json();
        setError(error);
        return;
      }
      const user: UserData = await response.json();
      console.log(user);
      setData(user);
    } catch (err) {
      console.error("Error fetching user:", err);
      setError({ message: "An unexpected error occurred" } as BackendError);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return { data, error, fetchUser, loading };
};

export default useUser;
