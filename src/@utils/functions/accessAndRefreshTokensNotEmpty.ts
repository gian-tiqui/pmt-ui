import { NAMESPACE } from "../namespace/namespace";
import Cookies from "js-cookie";

const accessAndRefreshTokensNotEmpty = (): boolean => {
  const accessToken: string | null = localStorage.getItem(NAMESPACE);
  const refreshToken: string | undefined = Cookies.get(NAMESPACE);

  return accessToken !== null && refreshToken !== undefined;
};

export default accessAndRefreshTokensNotEmpty;
