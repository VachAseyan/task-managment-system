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
    const [dragOverStatus, setDragOverStatus] = useState(null);

    const handleDragStart = (e, task) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", task.id);
        e.currentTarget.classList.add(style.dragging);
    };

    const handleDragOver = (e, status) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setDragOverStatus(status);
    };

    const handleDragEnd = () => {
        setDragOverStatus(null);
        document.querySelectorAll(`.${style.dragging}`).forEach(el => {
            el.classList.remove(style.dragging);
        });
    };

    const handleDrop = (e, status) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("text/plain");
        const task = tasks.find(t => t.id.toString() === taskId);

        if (task && task.status !== status) {
            dispatch({
                type: ACTIONS.UPDATE_TASK,
                payload: { id: task.id, status: status }
            });
        }
        setDragOverStatus(null);
    };

    const usersData = [
        { userId: 1, name: "Vache Aseyan" },
        { userId: 2, name: "Lilit Khalafyan" },
        { userId: 3, name: "Vahe Nersesyan" },
        { userId: 4, name: "Hakob Mkrtchyan" },
        { userId: 5, name: "Samvel Gasparyan" },
        { userId: 6, name: "Sofi Manukyan" },
        { userId: 7, name: "Sergey Hovhannisyan" },
        { userId: 8, name: "Arman Marutyan" },
        { userId: 9, name: "Tatev Sargsyan" },
        { userId: 10, name: "Lilia Khachatryan" },
    ];

    const statusOptions = [
        { key: "todo", label: "To Do", className: style.todoColumn },
        { key: "doing", label: "Doing", className: style.doingColumn },
        { key: "done", label: "Done", className: style.doneColumn },
        { key: "blocked", label: "Blocked", className: style.blockedColumn },
    ];

    const toggleAddMode = (status = null) => {
        setFixedStatus(status);
        setIsAddMode(!isAddMode);
    };

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

    const deleteTask = (id) => {
        dispatch({ type: ACTIONS.DELETE_TASK, payload: { id } });
    };

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

    const deleteAll = () => {
        dispatch({ type: ACTIONS.DELETE_ALL })
    }

    const resetForm = () => {
        setTitleInput("");
        setDescriptionInput("");
        setStatusInput("todo");
        setPriorityInput("low");
        setUserInput("");
        setIsAddMode(false);
        setFixedStatus(null);
    };

    const handleTitleInputChange = (e) => setTitleInput(e.target.value);
    const handleDescriptionInputChange = (e) => setDescriptionInput(e.target.value);
    const handleUserChange = (e) => setUserInput(e.target.value);
    const handlePriorityChange = (e) => setPriorityInput(e.target.value);
    const handleStatusChange = (e) => setStatusInput(e.target.value);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        } else {
            localStorage.removeItem("tasks");
        }
    }, [tasks]);

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1 className={style.appTitle}>Task Board</h1>
                <div className={style.headerActions}>
                    <button className={style.addButton} onClick={() => toggleAddMode()}>
                        Add Task
                    </button>
                    {tasks.length > 0 && (
                        <button className={style.deleteAllButton} onClick={deleteAll}>
                            Delete All Tasks
                        </button>
                    )}
                </div>
            </div>

            {isAddMode && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <div className={style.modalHeader}>
                            <h2 className={style.modalTitle}>Add New Task</h2>
                            <button className={style.closeButton} onClick={toggleAddMode}>
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



                    <div
                        className={`${style.column} ${className} ${dragOverStatus === key ? style.dragOver : ''}`}
                        key={key}
                        onDragOver={(e) => handleDragOver(e, key)}
                        onDrop={(e) => handleDrop(e, key)}
                        onDragLeave={() => setDragOverStatus(null)}
                    >
                        <div className={style.columnHeader}>
                            <h3 className={style.columnTitle}>{label}</h3>
                            {key !== 'blocked' && (
                                <button className={style.addColumnButton} onClick={() => toggleAddMode(key)}>
                                    Add task
                                </button>
                            )}

                        </div>
                        <div className={style.taskList}>
                            {tasks.filter(task => task.status === key).length > 0 ? (
                                tasks
                                    .filter(task => task.status === key)
                                    .map(task => (
                                        <div
                                            key={task.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, task)}
                                            onDragEnd={handleDragEnd}
                                            className={style.taskContainer}
                                        >
                                            <Task
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
                                        </div>
                                    ))
                            ) : (
                                <div className={style.emptyState}>
                                    <p className={style.emptyText}>No tasks</p>

                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tasks;