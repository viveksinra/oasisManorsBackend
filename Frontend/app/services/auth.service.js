import axios, { AxiosInstance } from "axios";
import qs from "qs";
import {
  getAuthorizationHeader,
  getHeaderUrlEncoded,
} from "../utils/getAuthorizationHeader";

export class AuthService {
  instance;
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  login = async (email, password) => {
    return this.instance
      .post(
        `/api/v1/auth/passwordAuth/login`,
        qs.stringify({
          emu:email,
          password,
        }),
        {
          headers: getHeaderUrlEncoded(),
        }
      )
      .then((res) => {
        return {
          id: res.data.id,
          name: res.data.name,
          accessToken: res.data.token,
          success: res.data.success,
          message:res.data.message,
          userImage:res.data.userImage,
          designation:res.data.designation,
          variant:res.data.variant,
        };
      })
      .catch((err) => {
        return err;
      });
  };
}
