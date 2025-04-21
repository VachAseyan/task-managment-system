import { useState } from "react";
import style from "./Tasks.module.css"
import AddModal from "../AddModal/AddModal";
import ToDo from "../ToDo/ToDo";
import Done from "../Done/Done";
import Doing from "../Doing/Doing";

function Tasks() {
    const [tasks, setTasks] = useState([])

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "todo",
        priority: "low",
        user: ""
    });

    const [isAddMode, setIsAddMode] = useState(false)
    const [titleInput, setTitleInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");

    const genereateId = () => Math.random().toString(36).substring(2, 9)

    const usersData = [
        { userId: 1, name: "John Doe" },
        { userId: 2, name: "Jane Smith" },
        { userId: 3, name: "Alice Johnson" },
        { userId: 4, name: "Bob Brown" },
        { userId: 5, name: "Charlie Davis" },
        { userId: 6, name: "Eve Wilson" },
        { userId: 7, name: "Frank Miller" },
        { userId: 8, name: "Grace Lee" },
        { userId: 9, name: "Henry Taylor" },
        { userId: 10, name: "Ivy Anderson" }
    ]

    const addTask = () => {
        if (formData.title && formData.description) {
            setTasks([...tasks, { ...formData, id: genereateId() }])
            setTitleInput("")
            setDescriptionInput("")
        }
    }

    const toggleAddMode = () => {
        setIsAddMode(!isAddMode)
    }

    const handleTitleInputChange = (e) => {
        setTitleInput(e.target.value)
        setFormData(prev => ({ ...prev, title: e.target.value }))
    }

    const handleDescriptionInputChange = (e) => {
        setDescriptionInput(e.target.value)
        setFormData(prev => ({ ...prev, description: e.target.value }))
    }

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handlePriorityChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleStatusChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    console.log(tasks)

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1>Task Board</h1>
                <button className={style.addButton} onClick={toggleAddMode}>
                    Add Task
                </button>
            </div>

            {isAddMode && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <div className={style.modalHeader}>
                            <h2 className={style.modalTitle}>Create Task</h2>
                            <button className={style.closeButton} onClick={toggleAddMode}>
                                ×
                            </button>
                        </div>
                        <AddModal
                            {...formData}
                            addTask={addTask}
                            usersData={usersData}
                            titleInput={titleInput}
                            descriptionInput={descriptionInput}
                            handleTitleInputChange={handleTitleInputChange}
                            handleDescriptionInputChange={handleDescriptionInputChange}
                            toggleAddMode={toggleAddMode}
                            handleStatusChange={handleStatusChange}
                            handlePriorityChange={handlePriorityChange}
                            handleUserChange={handleUserChange}
                        />
                    </div>
                </div>
            )}

            <div className={style.columns}>
                <div className={`${style.column} ${style.todoColumn}`}>
                    <h3 className={style.columnTitle}>To Do</h3>
                    {tasks.filter(task => task.status === "todo").map((task) => (
                        <ToDo key={task.id} {...task} usersData={usersData} />
                    ))}
                </div>
                <div className={`${style.column} ${style.doingColumn}`}>
                    <h3 className={style.columnTitle}>Doing</h3>
                    {tasks.filter(task => task.status === "doing").map((task) => (
                        <Doing key={task.id} {...task} usersData={usersData} />
                    ))}
                </div>
                <div className={`${style.column} ${style.doneColumn}`}>
                    <h3 className={style.columnTitle}>Done</h3>
                    {tasks.filter(task => task.status === "done").map((task) => (
                        <Done key={task.id} {...task} usersData={usersData} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Tasks