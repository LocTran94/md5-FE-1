import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";

import {useEffect, useState} from "react";
import {storage} from "../../../firebase";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { getCategory} from "../../../services/categoryService";
import {addSong} from "../../../services/songService";
import {getAlbums} from "../../../services/albumService";


export default function AddSong() {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);

    const user = useSelector(state => {
        return state.user.user;
    })
    const category = useSelector(state => {
        return state.category.category;
    })
    const album = useSelector(state => {
        return state.album.albums[0];
    })



    useEffect(() => {
        dispatch(getCategory())
    }, [])
    useEffect(() => {
        dispatch(getAlbums())
    }, [])

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

    const handleAdd = (values) => {
        let data = {...values, user: user.idUser};

        dispatch(addSong(data)).then(() => {
            navigate('/home');
        })

    }


    return (
        <div className={'row'}>

            <div className="offset-3 col-6 mt-5">
                <h1 style={{textAlign: 'center'}}>Add Song</h1>
                <Formik initialValues={{
                    nameSong: '',
                    singer: '',
                    author: '',
                    idAlbum: '',
                    sound: '',
                    idCategory: '',
                    count: ''
                }} onSubmit={(values) => {
                    values.image = urls[1];
                    values.sound =  urls[0]
                    handleAdd(values)

                }}>

                    <Form>
                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputUsername">Name Song: </label>
                            <Field type='text' className={'form-control'} name={'nameSong'}/>
                        </div>
                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputPassword">Singer: </label>
                            <Field type='text' className={'form-control'} name={'singer'}/>
                        </div>
                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputPassword">Auth: </label>
                            <Field type='text' className={'form-control'} name={'auth'}/>
                        </div>
                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputPassword">Album: </label>
                            <Field as='select' name={'idAlbum'}>
                                <option selected> Hay chon Album...</option>
                                {album !== undefined && album.map((item) => (
                                    <option value={item.idAlbum}>{item.nameAlbum}</option>)

                                )}
                            </Field>
                        </div>


                        <br/>
                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputPassword">Sound: </label>
                            <Field type='file' onChange={handleChange} name={'sound'}>
                            </Field>
                            <button type='button' onClick={handleUpload}>Upload</button>
                        </div>


                        <br/>
                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputPassword">Count: </label>
                            <Field type='number' className={'form-control'} name={'count'}/>
                        </div>


                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputPassword">Image: </label>
                            <Field type='file' onChange={handleChange} name={'sound'}>
                            </Field>
                            <button type='button' onClick={handleUpload}>Upload</button>
                        </div>
                        {/*{urls.map((item) => (*/}
                        {/*    <>*/}
                        {/*        <img src={item} width={100} height={100}/>*/}
                        {/*    </>*/}
                        {/*))}*/}
                        <hr/>
                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputPassword">Category: </label>
                            <Field as='select' name={'idCategory'}>
                                <option selected> Hay chon Loai...</option>
                                {category !== undefined && category.map((item) => (
                                    <option value={item.idCategory}>{item.nameCategory}</option>)

                                )}
                            </Field>
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}