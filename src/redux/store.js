import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import songReducer from "./song/songSlice";
import categoryReducer from "./category/categorySlice";
import albumReducer from "./album/albumSlice";


export const store = configureStore({
    reducer: {
        song: songReducer,
        user: userReducer,
        category: categoryReducer,
        album: albumReducer

    }
})