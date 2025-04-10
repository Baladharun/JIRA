import { create } from "zustand";

export const userStore = create((set) => ({
    userInfo: null,
    setUserInfo: (user) => {
        console.log("Updating Zustand state with:", user);
        set({ userInfo: user });
    },
    getUserField: (field) => {
        const userInfo = get().userInfo;
        return userInfo ? userInfo[field] : undefined;
    }
}));

export const projectDetails = create((set, get) => ({
    projects: [],
    
    setProjects: (projectData) =>
        set((state) => ({
            projects: [...state.projects, projectData]
        })),

    getProjectId: (projectName) => {
        const project = get().projects.find((proj) => proj.projectName === projectName);
        return project ? project.id : null;
    }
}));

export const appStore = create((set, get) => ({
    data: {}, 
    setNestedValue: (key, value) => {
        set((state) => ({
            data: { ...state.data, [key]: value } 
        }));
    },
    getNestedValue: (key) => {
        return get().data[key]; 
    }
}));
