import { create } from "zustand";
import { NAMESPACE } from "../namespace/namespace";
import Cookies from "js-cookie";

interface State {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

const useLoginStore = create<State>((set) => ({
  loggedIn:
    localStorage.getItem(NAMESPACE) !== null && Cookies.get(NAMESPACE) !== null,
  setLoggedIn: (loggedIn: boolean) => {
    if (localStorage.getItem(NAMESPACE) && Cookies.get(NAMESPACE))
      set({ loggedIn: true });
    else set({ loggedIn });
  },
}));

export default useLoginStore;
