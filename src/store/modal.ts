import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalType, ShowModalProps } from "../interface";

const initialState: ModalType = {
    showModal: false,
    date: "",
    id: null,
};

export const modalSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        setModalState: (state, action: PayloadAction<boolean>) => {
            state.showModal = action.payload;
        },
        setOpenModal: (state, action: PayloadAction<ShowModalProps>) => {
            state.date = action.payload.date;
            state.id = action.payload.id;
        },
    },
});

export const { setModalState, setOpenModal } = modalSlice.actions;

export default modalSlice.reducer;