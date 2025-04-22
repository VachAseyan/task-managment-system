import { useState } from "react";
import style from "./EditModal.module.css";

function EditModal({
    id,
    usersData,
    titleInput,
    descriptionInput,
    status,
    priority,
    user,
    editTitleInputChange,
    editDescriptionInputChange,
    editStatusChange,
    editPriorityChange,
    editUserChange,
    handleEditModeToggle,
}) {
    const [updatedTitle, setUpdatedTitle] = useState(titleInput);
    const [updatedDescription, setUpdatedDescription] = useState(descriptionInput);
    const [updatedStatus, setUpdatedStatus] = useState(status);
    const [updatedPriority, setUpdatedPriority] = useState(priority);
    const [updatedUser, setUpdatedUser] = useState(user);

    const handleSave = () => {
        editTitleInputChange(id, updatedTitle);
        editDescriptionInputChange(id, updatedDescription);
        editStatusChange(id, updatedStatus);
        editPriorityChange(id, updatedPriority);
        editUserChange(id, updatedUser);
        handleEditModeToggle();
    };

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <div className={style.modalHeader}>
                    <h2 className={style.modalTitle}>Edit Task</h2>
                    <button className={style.closeButton} onClick={handleEditModeToggle}>
                        &times;
                    </button>
                </div>

                <div className={style.formGroup}>
                    <label className={`${style.formLabel} ${style.requiredField}`}>Task Title</label>
                    <input
                        className={style.formInput}
                        value={updatedTitle}
                        onChange={e => setUpdatedTitle(e.target.value)}
                        type="text"
                        placeholder="e.g. Implement user dashboard"
                        required
                    />
                </div>

                <div className={`${style.formGroup} ${style.descriptionGroup}`}>
                    <label className={style.formLabel}>Description</label>
                    <textarea
                        className={`${style.formInput} ${style.descriptionInput}`}
                        value={updatedDescription}
                        onChange={e => setUpdatedDescription(e.target.value)}
                        placeholder="Describe the task details..."
                        rows="4"
                    />
                </div>

                <div className={style.formGroup}>
                    <label className={style.formLabel}>Status</label>
                    <select
                        name="status"
                        className={style.formSelect}
                        value={updatedStatus}
                        onChange={e => setUpdatedStatus(e.target.value)}
                    >
                        <option value="todo">To Do</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                <div className={style.formGroup}>
                    <label className={style.formLabel}>Priority</label>
                    <select
                        name="priority"
                        className={style.formSelect}
                        value={updatedPriority}
                        onChange={e => setUpdatedPriority(e.target.value)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className={style.formGroup}>
                    <label className={style.formLabel}>Assign To</label>
                    <select
                        name="user"
                        className={`${style.formSelect} ${style.userSelect}`}
                        value={updatedUser}
                        onChange={e => setUpdatedUser(e.target.value)}
                    >
                        <option value="">Select team member</option>
                        {usersData.map((user) => (
                            <option key={user.userId} value={user.name}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className={style.submitButton}
                    disabled={!updatedTitle}
                    onClick={handleSave}
                >
                    Save Changes
                </button>
                <button
                    className={style.submitButton}
                    disabled={!updatedTitle}
                    onClick={handleEditModeToggle}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default EditModal;