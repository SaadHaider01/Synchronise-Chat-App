// import { set } from "mongoose";

export const createAuthSlice = (set)=>(
    {
        userInfo:undefined,
        setUserInfo:(userInfo) => set({userInfo}),
    }
);