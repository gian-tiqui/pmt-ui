import { jwtDecode } from "jwt-decode";
import { NAMESPACE } from "../namespace/namespace";
import { DecodeAccessToken } from "../../types/types";

const decodeAccessToken = async (): Promise<DecodeAccessToken | undefined> => {
  const accessToken: string | null = localStorage.getItem(NAMESPACE);

  if (accessToken) {
    const decoded: DecodeAccessToken = await jwtDecode(accessToken);

    return decoded;
  }
};

export default decodeAccessToken;
