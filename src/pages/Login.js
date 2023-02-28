import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {login} from "../services/userService";
import {Field, Form, Formik} from "formik";
import swal from "sweetalert";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = (value)=>{
        dispatch(login(value)).then((state)=>{
            if (state.payload.data !== "User not found" && state.payload.data !== "Wrong password"){
                console.log(state.payload.data)
                swal("Đăng nhập thành công!", {
                    icon: "success",
                }).then(()=>{return  navigate('/home')});

            }else {
                swal("Sai mật khẩu hoặc tài khoản!", {
                });
                return  navigate('/')
            }
        })
    }
    return (
        <div className={'row'}>

            <div className="offset-3 col-6 mt-5">
                <h1 style={{textAlign: 'center'}}>Login</h1>
                <Formik initialValues={{username: '', password: ''}} onSubmit={(values)=>{

                    handleLogin(values)
                }}>
                    <Form>
                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputUsername">User Name: </label>
                            <Field type='text' className={'form-control'} name={'username'}/>
                        </div>
                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputPassword">Password: </label>
                            <Field type='text' className={'form-control'} name={'password'}/>
                        </div>

                        <button type="submit" className="btn btn-primary">Login</button>
                        <button type="submit" className="btn btn-primary" style={{marginLeft: 10}}>
                            Register
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}