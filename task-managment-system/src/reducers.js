const generateId = () => Math.random();

const ACTIONS = {
    ADD_TASK: "add-task",
    DELETE_TASK: "delete-task",
    UPDATE_TASK: "update-task",
    DELETE_ALL: "delete-all"
};

const reducer = (state, action) => {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case ACTIONS.ADD_TASK:
            return [
                ...state,
                {
                    id: generateId(),
                    title: payload.title,
                    description: payload.description,
                    status: payload.status,
                    priority: payload.priority,
                    user: payload.user,
                },
            ];
        case ACTIONS.DELETE_TASK:
            return state.filter(task => task.id !== payload.id);
        case ACTIONS.UPDATE_TASK:
            return state.map(task => {
                if (task.id === payload.id) {
                    return {
                        ...task,
                        title: payload.title ?? task.title,
                        description: payload.description ?? task.description,
                        status: payload.status ?? task.status,
                        priority: payload.priority ?? task.priority,
                        user: payload.user ?? task.user,
                    };
                }
                return task;
            });
        case ACTIONS.DELETE_ALL:
            return []
    }
};

export {
    ACTIONS,
    reducer
}