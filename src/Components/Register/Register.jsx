import { useEffect, useState } from "react"
import logo from "../../assets/images/logo.png"
import "../Login/Login.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"


const Register = () =>{
    const navigate = useNavigate()
    const [formData,setFormData] = useState({
        username:"",
        password:"",
        confirmPassword:""
    })

    const changeHandler = (e) =>{
        const {name,value} = e.target;
        setFormData(pState=>{
            return {...pState,[name]:value}
        })
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        if(formData.password!=formData.confirmPassword){
            alert("password does not match")
        }else{
            delete formData.confirmPassword
            axios.post("/user/register",formData).then(res=>{
                console.log(res.data);
                navigate("../")
            })
        }
    }

    useEffect(()=>{
        document.title = "task register"
    },[])

    return <div className="login">
                <section className="login-section">
                    <img className="login-section_logo" src={logo} alt="" />
                </section>
                <form className="login-form" onSubmit={submitHandler}>
                    <div className="login-imgWrapper">
                        <img src={logo} alt="" className="login-img"/>
                    </div>
                    <h1 className="login-section_heading">Register</h1>
                    
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
                    <label htmlFor="password" className="login-form_label">
                        confirm password
                    </label>
                    <input 
                        type="password" 
                        name="confirmPassword"
                        className="login-form_input"
                        value={formData.confirmPassword} 
                        placeholder="enter your password" 
                        required 
                        onChange={changeHandler}
                    />
                    <input type="submit" value="Register" className="login-form_btn"/>
                    <p>Already have an account? <Link className="login-form_link" to="../">Login</Link></p>
                </form>
            </div>
}


export default Register