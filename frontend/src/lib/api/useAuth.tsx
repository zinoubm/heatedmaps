import { AxiosError } from "axios";
import axios from "./axios";
import useToken from "./useToken";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/context/authStore";
import { isNull } from "util";

const useAuth = () => {
  const { setToken, token: authToken, reset } = useAuthStore();

  const router = useRouter();

  const signUp = async (user: {
    first_name: string;
    last_name: string;
    email: string;
    password1: string;
    password2: string;
  }) => {
    try {
      const response = await axios.post(
        "/auth/register/",
        {
          ...user,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      router.push("/email/sent");

      if (response.status === 201) {
        toast(
          "Congratulation for joining us, please verify your email address."
        );
      }

      return response;
    } catch (err) {
      const axiosError = err as AxiosError;

      if (axiosError.response?.status === 400) {
        toast.error("This email already exists");
      } else {
        toast.error("Sorry, There was an error. Please check your Input!");
      }
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      const response = await axios.post(
        "/auth/register/verify-email/",
        {
          key: token,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast("Congratulations, your email Is verified now!");
      }

      return response;
    } catch (err) {
      const axiosError = err as AxiosError;

      if (axiosError.response?.status === 404) {
        toast.error("This email Is likely to be already verified!");
        router.push("/sign-in");
      }
    }
  };

  const googleSignIn = async (token: string) => {
    try {
      const response = await axios.post(
        "/auth/google/login/",
        {
          token: token,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        toast("Sign In was succeful.");

        setToken(response.data.key);
        router.push("/setup");
      }

      return response;
    } catch (err) {
      toast("Something went wrong, please try again!");
    }
  };

  const signIn = async (user: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        "/auth/login/",

        {
          ...user,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        toast("Sign In was succeful.");

        setToken(response.data.key);
        router.push("/setup");
      }

      return response;
    } catch (error) {
      toast.error("wrong email or password!");
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const response = await axios.post(
        "/auth/password/reset/",
        {
          email: email,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        toast("We sent an email, please check your Inbox.");
        // console.log(response.data);

        // setToken(response.data.key);
        // navigate("/");
      }

      return response;
    } catch (error) {
      toast.error("Email not found");
    }
  };

  const verifyPassowrdReset = async (
    new_password1: string,
    new_password2: string,
    uid: string,
    token: string
  ) => {
    try {
      const response = await axios.post(
        "/auth/password/reset/confirm/",
        {
          new_password1: new_password1,
          new_password2: new_password2,
          uid: uid,
          token: token,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        toast("Congratulations, your password has been reset.");
        // console.log(response.data);

        // setToken(response.data.key);
        // navigate("/");
      }

      return response;
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await axios.get("/auth/user/", {
        headers: {
          accept: "application/json",
          Authorization: "Token " + authToken,
        },
      });

      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;

      if (axiosError.response?.status === 401) {
        toast.error("Authentication expired, please sign In again!");
        reset();
        router.push("/sign-in");
        return null;
      }
    }
  };

  //   const updateUserInfo = async (user) => {
  //     //! this function sends the request in a multipart/form-data
  //     const form = new FormData();
  //     for (let key in user) {
  //       form.set(key, user[key]);
  //     }

  //     const token = getToken();
  //     try {
  //       const response = await axios.patch("/auth/user/", form, {
  //         headers: {
  //           Authorization: "Token " + token,
  //           accept: "application/json",
  //           "Content-Type": "multipart/form-data",
  //           "X-CSRFTOKEN":
  //             "JyrG5RuoxfXcbuMSiOtLYHeszliqZ8Y5eeBIIopWG75r9yHUGbPfohOtanhfU9PQ",
  //         },
  //       });

  //       if (response.status === 200) toast.success("updated your information");
  //       return response.data;
  //     } catch (err) {
  //       toast.error("error");
  //       console.log(err);
  //     }
  //   };

  const signOut = async () => {
    try {
      const response = await axios.post("/auth/logout/", "", {
        headers: {
          accept: "application/json",
          Authorization: "Token " + authToken,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      reset();
      router.push("/sign-in");

      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const axiosStatus = axiosError.response?.status;

      if (axiosStatus === 403 || axiosStatus === 401) {
        toast.error("Authentication has expired, please sign In!");
        reset();
        router.push("/sign-in");
        return null;
      }
    }
  };

  const handleUnauthenticated = async (axiosError: AxiosError) => {
    const axiosStatus = axiosError.response?.status;

    if (axiosStatus === 403 || axiosStatus === 401) {
      toast.info("Authentication has expired, please sign In.");
      await signOut();
      return true;
    }

    return false;
  };

  return {
    signUp,
    verifyEmail,
    signIn,
    resetPassword,
    verifyPassowrdReset,
    googleSignIn,
    getCurrentUser,
    // updateUserInfo,
    signOut,
    handleUnauthenticated,
  };
};

export default useAuth;
