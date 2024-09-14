import { AxiosError } from "axios";
import axios from "./axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/context/authStore";
import useAuth from "./useAuth";

const useSetup = () => {
  const { token: authToken } = useAuthStore();
  const { handleUnauthenticated } = useAuth();

  const router = useRouter();

  const addSite = async (name: string, url: string, description: string) => {
    try {
      const response = await axios.post(
        "/sites/",
        {
          name: name,
          url: url,
          description: description,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: "Token " + authToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast("Site added sccessfully.");
      }

      return response;
    } catch (err) {
      const axiosError = err as AxiosError;
      const isUnauthenticated = await handleUnauthenticated(axiosError);

      if (isUnauthenticated) {
        return;
      }

      toast.error(
        "This site might be already registered, please check and try again!"
      );
    }
  };

  const getSites = async () => {
    try {
      const response = await axios.get("/sites/", {
        headers: {
          Authorization: "Token " + authToken,
          accept: "application/json",
        },
      });

      return response;
    } catch (err) {
      const axiosError = err as AxiosError;
      const isUnauthenticated = await handleUnauthenticated(axiosError);

      if (isUnauthenticated) {
        return;
      }

      toast.error(
        "This site might be already registered, please check and try again!"
      );
    }
  };

  const getSite = async (id: number) => {
    try {
      const response = await axios.get("/sites/" + id, {
        headers: {
          Authorization: "Token " + authToken,
          accept: "application/json",
        },
      });

      return response;
    } catch (err) {
      const axiosError = err as AxiosError;
      const isUnauthenticated = await handleUnauthenticated(axiosError);

      if (isUnauthenticated) {
        return;
      }

      toast.error(
        "This site might be already registered, please check and try again!"
      );
    }
  };

  return {
    addSite,
    getSites,
    getSite,
  };
};

export default useSetup;
