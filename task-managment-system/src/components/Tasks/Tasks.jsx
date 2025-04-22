import { useEffect, useReducer, useState } from "react";
import style from "./Tasks.module.css";
import AddModal from "../AddModal/AddModal";
import Task from "../Task/Task";
import { ACTIONS, reducer } from "../../reducers";

function Tasks() {
    const [tasks, dispatch] = useReducer(
        reducer,
        JSON.parse(localStorage.getItem("tasks")) ?? []
    );
    const [isAddMode, setIsAddMode] = useState(false);
    const [titleInput, setTitleInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [statusInput, setStatusInput] = useState("todo");
    const [priority, setPriorityInput] = useState("low");
    const [userInput, setUserInput] = useState("");
    const [fixedStatus, setFixedStatus] = useState(null);

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
        { userId: 10, name: "Ivy Anderson" },
    ];

    const addTask = () => {
        if (titleInput && descriptionInput) {
            dispatch({
                type: ACTIONS.ADD_TASK,
                payload: {
                    title: titleInput,
                    description: descriptionInput,
                    status: fixedStatus || statusInput,
                    priority: priority,
                    user: userInput,
                },
            });
            resetForm();
        }
    };

    const resetForm = () => {
        setTitleInput("");
        setDescriptionInput("");
        setStatusInput("todo");
        setPriorityInput("low");
        setUserInput("");
        setIsAddMode(false);
        setFixedStatus(null);
    };

    const deleteTask = (id) => {
        dispatch({ type: ACTIONS.DELETE_TASK, payload: { id } });
    };

    const toggleAddMode = (status = null) => {
        setFixedStatus(status);
        setIsAddMode(!isAddMode);
    };

    const handleTitleInputChange = (e) => setTitleInput(e.target.value);
    const handleDescriptionInputChange = (e) => setDescriptionInput(e.target.value);
    const handleUserChange = (e) => setUserInput(e.target.value);
    const handlePriorityChange = (e) => setPriorityInput(e.target.value);
    const handleStatusChange = (e) => setStatusInput(e.target.value);

    const editTitleInputChange = (id, newTitle) =>
        dispatch({ type: ACTIONS.UPDATE_TASK, payload: { id, title: newTitle } });

    const editDescriptionInputChange = (id, newDescription) =>
        dispatch({ type: ACTIONS.UPDATE_TASK, payload: { id, description: newDescription } });

    const editUserChange = (id, newUser) =>
        dispatch({ type: ACTIONS.UPDATE_TASK, payload: { id, user: newUser } });

    const editPriorityChange = (id, newPriority) =>
        dispatch({ type: ACTIONS.UPDATE_TASK, payload: { id, priority: newPriority } });

    const editStatusChange = (id, newStatus) =>
        dispatch({ type: ACTIONS.UPDATE_TASK, payload: { id, status: newStatus } });

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        } else {
            localStorage.removeItem("tasks");
        }
    }, [tasks]);

    const statusOptions = [
        { key: "todo", label: "To Do", className: style.todoColumn },
        { key: "doing", label: "Doing", className: style.doingColumn },
        { key: "done", label: "Done", className: style.doneColumn },
    ];

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1>Task Board</h1>
                <button className={style.addButton} onClick={() => toggleAddMode()}>
                    Add Task
                </button>
            </div>

            {isAddMode && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <div className={style.modalHeader}>
                            <button className={style.closeButton} onClick={resetForm}>
                                ×
                            </button>
                        </div>
                        <AddModal
                            addTask={addTask}
                            usersData={usersData}
                            titleInput={titleInput}
                            descriptionInput={descriptionInput}
                            status={fixedStatus || statusInput}
                            priority={priority}
                            user={userInput}
                            toggleAddMode={resetForm}
                            handleTitleInputChange={handleTitleInputChange}
                            handleDescriptionInputChange={handleDescriptionInputChange}
                            handleStatusChange={fixedStatus ? null : handleStatusChange}
                            handlePriorityChange={handlePriorityChange}
                            handleUserChange={handleUserChange}
                            disableStatus={!!fixedStatus}
                        />
                    </div>
                </div>
            )}

            <div className={style.columns}>
                {statusOptions.map(({ key, label, className }) => (
                    <div className={`${style.column} ${className}`} key={key}>
                        <div className={style.columnHeader}>
                            <h3 className={style.columnTitle}>{label}</h3>
                            <button className={style.addColumnButton} onClick={() => toggleAddMode(key)}>
                                Add {label}
                            </button>
                        </div>
                        {tasks
                            .filter((task) => task.status === key)
                            .map((task) => (
                                <Task
                                    key={task.id}
                                    id={task.id}
                                    {...task}
                                    usersData={usersData}
                                    deleteTask={deleteTask}
                                    editPriorityChange={editPriorityChange}
                                    editStatusChange={editStatusChange}
                                    editTitleInputChange={editTitleInputChange}
                                    editDescriptionInputChange={editDescriptionInputChange}
                                    editUserChange={editUserChange}
                                />
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tasks;