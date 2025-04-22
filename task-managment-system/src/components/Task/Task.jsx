import { useState } from "react";
import style from "./Task.module.css";
import EditModal from "../EditModal/EditModal";

function Task({
    id,
    title,
    description,
    priority,
    status,
    usersData,
    user,
    deleteTask,
    editPriorityChange,
    editStatusChange,
    editTitleInputChange,
    editDescriptionInputChange,
    editUserChange
}) {
    const assignedUser = usersData.find(u => u.name === user);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleEditModeToggle = () => {
        setIsEditMode(!isEditMode);
    };

    return (
        <>
            {!isEditMode ? (
                <div className={`${style.taskCard} ${style[`${status}Card`]}`} data-status={status}>
                    <h4 className={style.taskTitle}>{title}</h4>
                    <p className={style.taskDescription}>{description}</p>

                    <div className={style.taskMeta}>
                        <span className={`${style.taskBadge} ${style[`priority${priority.charAt(0).toUpperCase() + priority.slice(1)}`]}`}>
                            {priority} Priority
                        </span>
                    </div>

                    {assignedUser && (
                        <div className={style.assignee}>
                            <div className={style.assigneeAvatar}>
                                {assignedUser.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                                <span className={style.assigneeLabel}>Assigned to:</span>
                                <span className={style.assigneeName}>{assignedUser.name}</span>
                            </div>
                        </div>
                    )}

                    <div className={style.actions}>
                        <button className={style.deleteButton} onClick={() => deleteTask(id)}>
                            Delete
                        </button>
                        <button className={style.editButton} onClick={handleEditModeToggle}>
                            Edit
                        </button>
                    </div>
                </div>
            ) : (
                <EditModal
                    id={id}
                    titleInput={title}
                    descriptionInput={description}
                    priority={priority}
                    status={status}
                    usersData={usersData}
                    user={user}
                    deleteTask={deleteTask}
                    handleEditModeToggle={handleEditModeToggle}
                    editTitleInputChange={editTitleInputChange}
                    editDescriptionInputChange={editDescriptionInputChange}
                    editPriorityChange={editPriorityChange}
                    editStatusChange={editStatusChange}
                    editUserChange={editUserChange}
                />
            )}
        </>
    );
}

export default Task;