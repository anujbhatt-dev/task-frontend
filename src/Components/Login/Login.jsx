import { useEffect, useState } from "react"
import logo from "../../assets/images/logo.png"
import "./Login.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"


const Login = (props) =>{
    const navigate = useNavigate()
    const [formData,setFormData] = useState({
        username:"",
        password:""
    })

    const changeHandler = (e) =>{
        const {name,value} = e.target;
        setFormData(pState=>{
            return {...pState,[name]:value}
        })
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        axios.post("/user/login",formData).then(res=>{
            console.log(res.data);
            props.authenticate(res.data)
            
        }).catch(e=>{
            console.log(e.message);
        })
    }

    useEffect(()=>{
        document.title = "task login"
    },[])

    return <div className="login">
                <section className="login-section">
                    <img className="login-section_logo" src={logo} alt="" />
                </section>
                <form className="login-form" onSubmit={submitHandler}>
                    <div className="login-imgWrapper">
                        <img src={logo} alt="" className="login-img"/>
                    </div>
                    <h1 className="login-section_heading">Login</h1>
                    
                    <label htmlFor="username" className="login-form_label">
                        Username
                    </label>
                    <input 
                        type="text" 
                        name="username"
                        className="login-form_input"
                        value={formData.username} 
                        placeholder="enter your name"
                        required 
                        onChange={changeHandler}
                    />
                    <label htmlFor="password" className="login-form_label">
                        password
                    </label>
                    <input 
                        type="password" 
                        name="password"
                        className="login-form_input"
                        value={formData.password} 
                        placeholder="enter your password" 
                        required 
                        onChange={changeHandler}
                    />
                    <input type="submit" value="Login" className="login-form_btn"/>
                    <p>Create new account. <Link className="login-form_link" to="../register">Register</Link></p>
                </form>
            </div>
}


export default Login