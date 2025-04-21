import style from "./Done.module.css";

function Done({ title, description, priority, status, usersData, user }) {
    const assignedUser = usersData.find(u => u.name === user);

    return (
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
                        {assignedUser.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <span className={style.assigneeLabel}>Assigned to:</span>
                        <span className={style.assigneeName}>{assignedUser.name}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Done;