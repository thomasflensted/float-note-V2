import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { userDispatch } = useAuthContext();
    const logout = () => {
        localStorage.removeItem("user");
        userDispatch({ type: "LOGOUT" });
    }
    return { logout };
}