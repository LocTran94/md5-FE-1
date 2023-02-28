import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";

import {useEffect, useState} from "react";
import {storage} from "../../../firebase";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {editAlbum, findByIdAlbum} from "../../../services/albumService";


export default function EditAlbum() {

    const {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);

    const user = useSelector(state => {
        return state.user.user;
    })
    const album = useSelector(state => {
        return state.album.albums
    })
    useEffect(()=>{
        dispatch(findByIdAlbum(id)).then((value)=>{
            setUrls([value.payload.imageAlbum])
        })

    },[])

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };

    const handleUpload = () => {
        const promises = [];
        if (images.length > 0) {
            images.map((image) => {
                const storageRef = ref(storage, `images/${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                promises.push(uploadTask);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    (error) => {
                        console.log(error);
                    },
                    async () => {
                        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                            setUrls(prevState => [...prevState, downloadURLs])
                            console.log("File available at", downloadURLs);
                        });
                    }
                );
            });
        }
        Promise.all(promises)
            .then(() => alert("All images uploaded"))
            .catch((err) => console.log(err));
    };

    const handleEdit = (values) => {
        let data = [{...values}, id];
        dispatch(editAlbum(data)).then(() => {
            navigate('/home');
        })

    }

    return (
        <div className={'row'}>

            <div className="offset-3 col-6 mt-5">
                <h1 style={{textAlign: 'center'}}>Edit Album</h1>
                <Formik initialValues={{
                    nameAlbum: album.nameAlbum,
                    countSong: album.countSong,
                    imageAlbum: album.imageAlbum
                }} onSubmit={(values) => {
                    values.imageAlbum = urls[1];
                    values.idUser = user.idUser;
                    handleEdit(values)
                }} enableReinitialize={true}
                >

                    <Form>
                        <div className="ml-3 form-group">
                            <h6>
                                <label htmlFor="exampleInputPassword">Name User: </label>
                                {/*<Field type='number' className={'form-control'} name={'idUser'}/>*/}
                                {user !== undefined && user.username}
                            </h6>
                        </div>
                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputUsername">Name Album: </label>
                            <Field type='text' className={'form-control'} name={'nameAlbum'}/>
                        </div>
                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputPassword">Count Song: </label>
                            <Field type='number ' className={'form-control'} name={'countSong'}/>
                        </div>

                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputPassword">Image: </label>
                            <input type='file' name="imageAlbum" onChange={handleChange}>
                            </input>
                            <button type='button' onClick={handleUpload}>Upload</button>
                        </div>
                        {urls.map((item) => (
                            <>
                                <img src={item} width={100} height={100}/>
                            </>
                        ))}
                        <hr/>
                        <br/>
                        <button type="submit" className="btn btn-primary">Edit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}