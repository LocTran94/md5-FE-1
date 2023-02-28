import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getSongs, removeSong} from "../../../services/songService";
import {Link, useNavigate} from "react-router-dom";
import swal from "sweetalert";
import {getAlbums, removeAlbum} from "../../../services/albumService";







export default function ListSong(){

    const user = useSelector(state => {
        return state.user.currentUser
    })

    const dispatch = useDispatch()
    const songs = useSelector(state => {

        return state.song.songs
    })


    useEffect( ()=>{
        dispatch(getSongs())
    },[dispatch])
    return(
        <>

            <table className="table table-dark">
                <thead>
                <tr>
                    <th scope="col">Thứ Tự</th>
                    <th scope="col">Song Name</th>
                    <th scope="col">Sound</th>
                    <th scope="col">Singer</th>
                    <th scope="col">Author</th>
                    <th scope="col">Category</th>
                    <th colSpan={2} style={{textAlign:"center"}}>action</th>

                </tr>
                </thead>
                <tbody>
                {songs!== undefined && songs.map(item =>(
                    <tr>
                        <th scope="col">{item.idSong}</th>
                        <th scope="col">{item.nameSong}</th>
                        <th scope="col"> <div className="ml-3 form-group">
                            <audio id="my_audio" controls preload="none">
                                <source src="" type="audio/mp3"/>
                            </audio>
                        </div>
                            <div className="ml-3 form-group">
                                <button className="btn btn-primary" onClick="play_audio('play')">PLAY</button>
                                <button className="btn btn-danger" onClick="play_audio('stop')">STOP</button>
                            </div></th>
                        <th scope="col">{item.singer}</th>
                        <th scope="col">{item.author}</th>
                        <th scope="col">{item.nameCategory}</th>
                        <th><Link to={`delete-song/${item.idSong}`}>
                            <button onClick={() => {
                                swal({
                                    title: "Are you sure?",
                                    text: "!!!",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                }).then((willDelete) => {
                                    if (willDelete) {
                                        dispatch(removeSong(item.idSong)).then(() => {
                                            dispatch(getSongs()).then(() => {

                                            })
                                        })
                                        swal("Xoa thanh cong!", {
                                            icon: "success",
                                        });
                                    } else {
                                        swal("Khong xoa thanh cong!");
                                        dispatch(getSongs).then(() => {

                                        })
                                    }
                                });
                            }}>Delete
                            </button>
                        </Link></th>
                        <th><Link to={`/home/edit-song/${item.idAlbum}`}>
                            <button>Edit</button>
                        </Link>
                        </th>
                    </tr>
                ))}
                </tbody>
            </table>

        </>
    )
}