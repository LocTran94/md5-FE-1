import './App.css';
import Login from "./pages/Login";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/home/Home";
import AddSong from "./pages/home/songs/AddSong";
import AddAlbum from "./pages/home/album/AddAlbum";
import ListAlbum from "./pages/home/album/ListAlbum";
import EditAlbum from "./pages/home/album/EditAlbum";
import ListSong from "./pages/home/songs/ListSong";


function App() {

    return (
        <>
            <div className='container-fluid'>
                <Routes>
                    <Route path={''} element={<Login></Login>}></Route>
                    <Route path={'register'} element={<Register/>}></Route>
                    <Route path={'home'} element={<Home/>}>
                        <Route path={'add-song'} element={<AddSong/>}></Route>
                        <Route path={''} element={<ListSong/>}></Route>
                        <Route path={'add-album'} element={<AddAlbum/>}></Route>
                        <Route path={'list-album'} element={<ListAlbum/>}></Route>
                        {/*<Route path={'my-list'} element={<MyList/>}></Route>*/}

                        <Route path={'edit-album/:id'} element={<EditAlbum/>}></Route>
                        <Route path={'delete-album/:id'}></Route>
                    </Route>
                </Routes>
            </div>
        </>
    );
}

export default App;
