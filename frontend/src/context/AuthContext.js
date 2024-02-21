import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const initialState = JSON.parse(localStorage.getItem("user"));
    const [state, userDispatch] = useReducer(authReducer, {
        user: initialState
    })
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            userDispatch({ type: "LOGIN", payload: user });
        }
    }, [])

    console.log("Auth status:", state);

    return (
        <AuthContext.Provider value={{ ...state, userDispatch }}>
            {children}
        </AuthContext.Provider>
    )
}