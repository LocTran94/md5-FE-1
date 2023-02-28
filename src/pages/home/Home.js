import Navbar from "../../components/Narbar";
import {Outlet} from "react-router-dom";

export default function Home(){
    return(
        <>
            <div className="row">
                <div className="col-12">
                    <Navbar></Navbar>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Outlet/>
                </div>
            </div>

        </>
    )
}