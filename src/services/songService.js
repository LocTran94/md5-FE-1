import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getSongs = createAsyncThunk(
    'songs/getSongs',
    async ()=>{
        const res = await customAxios.get('songs');
        return res.data
    }
);
export const addSong = createAsyncThunk(
    'songs/addSongs',
    async (data)=>{
        console.log(data)
        const res = await customAxios.post('songs', data);
        return res.data
    }
);
export const removeSong = createAsyncThunk(
    'blogs/removeBlogs',
    async (data)=>{
        console.log('data', data);
        const res = await customAxios.delete('/songs/'+ data);
        return data
    }
)
//
// export const findByIdBlog = createAsyncThunk(
//     'blogs/findByIdBlog',
//     async (data)=>{
//         const res = await customAxios.get('/blogs/findById/'+data.id);
//         return res.data;
//     }
// )
//
// export const editBlog = createAsyncThunk(
//     'blogs/editBlogs',
//     async (data)=>{
//         await customAxios.put('/blogs/' + data.id, data);
//         const res = await customAxios.get('blogs');
//         return res.data
//     }
// )