import { create } from "zustand";

export const userStore = create((set)=>({
    userInfo:{
        name:'Unknown',
        email:'baladharun2005@gmail.com'
    },
    setUserInfo :(newUserInfo)=>set((state)=>({...state.userInfo,...newUserInfo}))
}))