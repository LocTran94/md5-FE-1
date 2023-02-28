import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const login = createAsyncThunk(
    'users/login',
    async (data)=>{
        const res = await customAxios.post('users/login', data);
        return res
    }
)