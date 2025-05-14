import {jwtDecode} from "jwt-decode";

export const verifyToken = (token: string) => {
  return jwtDecode(token);
  // const decodedToken = JSON.parse(atob(token.split(".")[1]));
  // const currentTime = Math.floor(Date.now() / 1000);
  // return decodedToken.exp > currentTime;
}