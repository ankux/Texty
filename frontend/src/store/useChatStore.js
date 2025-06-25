import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            console.log("Error in getUsers useChatStore: ", error.message);
            toast.error("Something went wrong");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            console.log("Error in getMessages useChatStore: ", error.message);
            toast.error("Something went wrong");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (userId, messageData) => {
        try {
            const res = await axiosInstance.post(`/messages/send/${userId}`, messageData);
            set({ messages: [...get().messages, res.data] });
        } catch (error) {
            console.log("Error in sendMessage useChatStore: ", error.message);
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            // if the new message is not from the selected user, return
            if(newMessage.senderId !== selectedUser._id) return;
            set({ 
                messages: [...get().messages, newMessage]
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (userId) => {
        set({ selectedUser: userId });
    },
}));