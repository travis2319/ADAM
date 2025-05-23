import {
    GoogleSignin,
    isErrorWithCode,
    statusCodes,
  } from "@react-native-google-signin/google-signin";
  
  export const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log(response);
      
    } catch (error: any) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.log("something went wrong");
            break;
          case statusCodes.IN_PROGRESS:
            console.log("something went wrong");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log("something went wrong");
            break;
          default:
        }
      } else {
      }
    }
  };
  