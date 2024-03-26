import { dictionary } from "./utils";

type AppState = {
    userId: string | null;
    isAuthenticated: boolean;
}

export const initialState: AppState = {
    userId: localStorage.getItem('userId')
            ? localStorage.getItem('userId')
            : "null",
    isAuthenticated: localStorage.getItem('isAuthenticated')
            ? dictionary[localStorage.getItem('isAuthenticated')!]
            : false
}