import {createSlice} from "@reduxjs/toolkit";
import {addAlbum, editAlbum, findByIdAlbum, getAlbums, removeAlbum} from "../../services/albumService";


const initialState = {
    albums: [],
    album: {}
}
const albumSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAlbums.fulfilled,(state,action)=>{
            state.albums = action.payload
        });
        builder.addCase(findByIdAlbum.fulfilled,(state,action)=>{
            state.albums = action.payload
        });
        builder.addCase(addAlbum.fulfilled,(state,action)=>{
            state.albums.push(action.payload)

        });
        builder.addCase(removeAlbum.fulfilled,(state,action)=>{
            state.albums.splice(action.payload)

        });
        builder.addCase(editAlbum.fulfilled,(state,action)=>{
            state.albums = action.payload
        });
    }

})
export default albumSlice.reducer;