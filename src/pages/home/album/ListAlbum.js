import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import {getAlbums, removeAlbum} from "../../../services/albumService";


export default function ListAlbum() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const albums = useSelector(state => {
        if (state.album !== undefined){
            return state.album.albums[0];
        }
    })

    const user = useSelector(state => {
        if (state.user.user !== undefined) {
            return state.user.user;
        }
    })

    useEffect(() => {
        dispatch(getAlbums())
    }, [])
    return (
        <>
            <div className={"row"}>
                <div className="offset-center">
                    <table className="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Name Album</th>
                            <th scope="col">Name User</th>
                            <th scope="col">Image</th>
                            <th scope="col">Count Song</th>
                            <th scope="col" colSpan={2}>Action</th>


                        </tr>
                        </thead>
                        <tbody>
                        {user !== undefined && albums &&
                            albums.map((item, index) => {

                                if (user !== undefined && item.username === user.username) {
                                    return (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.nameAlbum}</td>
                                            <td>{item.username}</td>
                                            <td><img src={item.imageAlbum} alt="" width={200} height={200}/></td>
                                            <td>{item.countSong}</td>
                                            <td><Link to={`/home/edit-album/${item.idAlbum}`}>
                                                <button>Edit</button>
                                            </Link>
                                            </td>
                                            <td><Link to={`delete-album/${item.idAlbum}`}>
                                                <button onClick={() => {
                                                    swal({
                                                        title: "Are you sure?",
                                                        text: "!!!",
                                                        icon: "warning",
                                                        buttons: true,
                                                        dangerMode: true,
                                                    }).then((willDelete) => {
                                                        if (willDelete) {
                                                            dispatch(removeAlbum(item.idAlbum)).then(() => {
                                                                dispatch(getAlbums()).then(() => {
                                                                    navigate('/home')
                                                                })
                                                            })
                                                            swal("Xoa thanh cong!", {
                                                                icon: "success",
                                                            });
                                                        } else {
                                                            swal("Khong xoa thanh cong!");
                                                            dispatch(getAlbums()).then(() => {
                                                                navigate('/home')
                                                            })
                                                        }
                                                    });
                                                }}>Delete
                                                </button>
                                            </Link></td>
                                        </tr>
                                    )
                                } else return (<></>)
                            })
                        })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}