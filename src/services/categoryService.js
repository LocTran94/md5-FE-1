import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getCategory = createAsyncThunk(
    'categories/',
    async ()=>{
        const res = await customAxios.get('/categories');
        return res.data
    }
)