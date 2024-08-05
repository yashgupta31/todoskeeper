export const addTodo=(task)=>{
    return{
        type: "ADD_TODO",
        payload: task
    }
}

export const deleteTodo=(id)=>{
    return{
        type: "DELETE_TODO",
        payload: id
    }
}

export const completedTodo=(status, id)=>{
    return{
        type: "COMPLETED_TODO",
        payload: {status, id}
    }
}

export const editTodo=(name, id)=>{
    return{
        type: "EDIT_TODO",
        payload: {name, id}
    }
}

export const clearAllTodo=()=>{
    return{
        type: "CLEAR_ALL_TODO",
        // payload: {name, id}
    }
}