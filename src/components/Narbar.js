import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";



export default function Navbar() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const user= useSelector(state =>{

        return state.user.user;

    })

    return (
        <>
            <div className="row">
                <div className='col-12'>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="">LoL</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="add-song">Add Song</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="add-album">Add Album</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="list-album">List Album</Link>
                                    </li>
                                </ul>

                                <form className="d-flex" role="search">
                                    <h5 style={{marginLeft: 10}}>Tài Khoản: </h5><h5 style={{marginLeft: 10}}>{user !== undefined &&user.username}</h5>
                                    <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" style={{marginLeft: 10, variant: "primary"}}   onClick={()=>{
                                        localStorage.clear();
                                        navigate('/')
                                    }
                                    }>Logout</button>

                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

        </>
    )
}