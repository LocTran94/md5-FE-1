import {createSlice} from "@reduxjs/toolkit";
import {addBlog, addSong, editBlog, findByIdBlog, getBlogs, getSongs, removeSong} from "../../services/songService";

const initialState = {
    songs: [],
    song: {}
}
const songSlice = createSlice({
    name: 'songs',
    loading: true,
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getSongs.fulfilled,(state,action)=>{
            state.songs = action.payload
            state.loading = false
        });
        // builder.addCase(findByIdBlog.fulfilled,(state,action)=>{
        //     state.songs = action.payload
        // });
        builder.addCase(addSong.fulfilled,(state,action)=>{
            state.songs.push(action.payload)

        });
         builder.addCase(removeSong.fulfilled,(state,action)=>{
        state.songs.splice(action.payload)

    });
        // builder.addCase(editBlog.fulfilled,(state,action)=>{
        //     state.blogs = action.payload
        // });
    }

})
export default songSlice.reducer;