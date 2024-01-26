import { useEffect } from "react"
import Header from "../Header/Header"
import Tasks from "../Tasks/Tasks"
import { useNavigate } from "react-router"
const Dashboard = (props)=>{
    const navigate = useNavigate()

    useEffect(() => {
        if (!props.authenticated) {
          navigate("../");
        }
      }, [props.authenticated, navigate]);
    
    return <div className="dashboard">
        <Header authenticated={props.authenticated} logout={props.logout} user={props.user}/>
        <Tasks authenticated={props.authenticated}/>
    </div>
}

export default Dashboard