import { useEffect, useState } from "react"
import "./Tasks.css"
import Modal from "../UI/Modal/Modal"
import bin from "../../assets/images/bin.png"
import plus from "../../assets/images/plus.png"
import edit from "../../assets/images/edit.png"
import axios from "axios"

const Tasks = ()=>{
    const [tasks,setTasks] = useState([])

    const [description,setDescription] = useState("")
    const [showModal,setShowModal] = useState(false)
    const [showModal2,setShowModal2] = useState(false)
    const [updating,setUpdating] = useState(false)
    const [indexId,setIndexId] = useState({
        idx:"",
        id:""
    })
    const [formData,setFormData] = useState({
        title:"",
        description:"",
        due:""
    })



    const changeHandler = (e) =>{
        const {name,value} = e.target;
        setFormData(pState=>{
            return {...pState,[name]:value}
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("/task/create",formData).then(res=>{
            console.log(res.data);
            const newTasks = [res.data, ...tasks]; 
            setTasks(newTasks);
            setShowModal2(false);
            resetForm()
        })
      };
      
    
    
    const descriptionHandler=(description)=>{
        setDescription(description)
        setShowModal(!showModal)
    }

    const deleteTaskHandler = (id,idx) =>{
        axios.delete(`/task/${id}`,).then(res=>{
            const newTasks = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];
            setTasks(newTasks);
        }).catch(e=>{
            console.log(e.message)
        })
    }

    const editTaskToggler = (task,idx) =>{
        setUpdating(true)
        setFormData({
            title:task.title,
            description:task.description,
            due:task.due
        })
        setIndexId(pState=>{
            return {idx:idx,id:task._id}
        })
        setShowModal2(true)
        // resetForm()
        
    }

    const submitUpdateHandler = (e) =>{
        e.preventDefault()
        axios.patch(`/task/${indexId.id}`,formData).then(res=>{
                console.log(res.data);
                const newTasks = tasks;
                newTasks[indexId.idx] = res.data;
                setTasks(newTasks);
                setShowModal2(false)
                setUpdating(false)
                resetForm()
            }).catch(e=>{
                console.log(e.message)
            })
    }

    const addTaskToggler = ()=>{
        setShowModal2(!showModal2)
    }

    const resetForm = ()=>{
        setFormData({
            title:"",
            description:"",
            due:""
        })
    }

    useEffect(()=>{
        axios.get("/task").then(res=>{
            setTasks(res.data)
            console.log(res.data);
        })
    },[])

    return <div className="tasks-wrapper">
            <h1  className="tasks-heading">Task</h1>
            <div onClick={addTaskToggler} className="task-add">
                <img src={plus} alt="" />
                <p>Add Task</p>
            </div>
            <div className="tasks-items">
                {tasks.map((task,i)=>{
                    return <div key={i} className="task">
                                <header className="task-title"><strong>Title: </strong>{task.title}</header> 
                                <main className="task-description"><strong>Description: </strong>{task.description.slice(0,110)} {task.description.length>=110?<span onClick={()=>descriptionHandler(task.description)} className="task-btn">Read More</span>:null}</main>
                                <footer className="task-due"><strong>Due: </strong>{task.due}</footer>
                                <img className="task-delete" onClick={()=>deleteTaskHandler(task._id,i)} src={bin}/>
                                <img className="task-delete task-update" onClick={()=>editTaskToggler(task,i)} src={edit}/>
                            </div>
                })}
                
            </div>
            
            {showModal?<Modal toggle={()=>setShowModal(!showModal)} showModal ><div className="task-description">{description}</div></Modal>:null}
            {showModal2?<Modal toggle={()=>setShowModal2(!showModal2)} showModal2 ><div className="task-add_form">
                <form  className="task-form" onSubmit={updating?submitUpdateHandler:submitHandler} action="">
                <h1 className="login-section_heading">Add Task</h1>
                    
                    <label htmlFor="title" className="login-form_label">
                        title
                    </label>
                    <input 
                        type="text" 
                        name="title"
                        className="login-form_input"
                        value={formData.title} 
                        placeholder="enter title"
                        required 
                        onChange={changeHandler}
                    />
                    <label htmlFor="description" className="login-form_label">
                        description
                    </label>
                    <input 
                        type="text" 
                        name="description"
                        className="login-form_input"
                        value={formData.description} 
                        placeholder="enter description" 
                        required 
                        onChange={changeHandler}
                    />
                    <label htmlFor="due" className="login-form_label">
                        due date
                    </label>
                    <input 
                        type="date" 
                        name="due"
                        className="login-form_input"
                        value={formData.due} 
                        placeholder="enter due" 
                        required 
                        onChange={changeHandler}
                    />
                    <input type="submit" value={updating?"Update":"Add"} className="login-form_btn"/>
                </form>
            </div></Modal>:null}
            
    </div>
}

export default Tasks