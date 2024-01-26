import logo from "../../assets/images/logo.png"
import './Header.css'
import Modal from "../UI/Modal/Modal"
import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"

const Header = (props) =>{
    const [showModal,setShowModal]=useState(false)

    const navigate = useNavigate()

    const logoutHandler = () =>{
        axios.get(`/user/logout`).then(res=>{
            console.log(res.data);
            props.logout()
        }).catch(e=>{
            console.log(e.message);
        })
        navigate("../")
    }


    return <header className="header">
                <div className="header-logoWrapper">
                    <img src={logo} alt="" className="header-logoWrapper_logo"/>
                </div>
                <div className="header-user">welcome {props.user.username}</div>
                <div className="header-items">
                    <button onClick={logoutHandler} className="header-items_item">logout      
                    </button>
                </div>
                {showModal?<Modal toggle={()=>setShowModal(!showModal)}>
                    <div className="task-add">
                        <form action="">

                        </form>
                    </div>
                </Modal>:null}
            </header>
}

export default Header