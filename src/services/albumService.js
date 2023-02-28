import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getAlbums = createAsyncThunk(
    'albums/getAlbums',
    async ()=>{
        const res = await customAxios.get('albums');
        return res.data
    }
);
export const findByIdAlbum = createAsyncThunk(
    'albums/findByIdAlbum',
    async (data)=>{
        const res = await customAxios.get('albums/'+data);
        console.log(1, res.data)
        return res.data;
    }
)

export const addAlbum = createAsyncThunk(
    'album/addAlbum',
    async (data)=>{
        const res = await customAxios.post('albums', data);
        return res.data
    }
);
export const removeAlbum = createAsyncThunk(
    'albums/removeAlbums',
    async (data)=>{
        const res = await customAxios.delete('albums/'+ data);
        return data
    }
);

export const editAlbum = createAsyncThunk(
    'albums/editAlbums',
    async (data)=>{
        await customAxios.put('albums/' + data[1], data[0]);
        const res = await customAxios.get('albums');
        return res.data

    }
)