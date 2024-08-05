
const initialState= {
    tasks: JSON.parse(localStorage.getItem('tasks'))|| []
    // theme: localStorage.getItem('theme') || 'light'
}



const taskReducer=(state= initialState, action)=>{
    switch(action.type){
    case "ADD_TODO":
      // eslint-disable-next-line no-case-declarations
      const newTasks = [...state.tasks, action.payload];
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return { ...state, tasks: newTasks };

      case "DELETE_TODO":
        // eslint-disable-next-line no-case-declarations
        const updated= state.tasks.filter((elem)=>{
            return elem.id !== action.payload;
        })
        localStorage.setItem('tasks', JSON.stringify(updated));
        return {...state, tasks: updated}

        case "COMPLETED_TODO":
        // eslint-disable-next-line no-case-declarations
        const statusUpdated= state.tasks.map((elem)=>(
            elem.id=== action.payload.id? {...elem, completed: action.payload.status}: elem
        ))
        localStorage.setItem('tasks', JSON.stringify(statusUpdated));
        return {...state, tasks: statusUpdated}

        
        case "EDIT_TODO":
            // console.log(action.payload)
            // eslint-disable-next-line no-case-declarations
            const edited = state.tasks.map((elem) =>(
                // console.log(typeof elem.id)
                elem.id === action.payload.id ? { ...elem, name: action.payload.name } : elem
                
            ))
            console.log(edited)
            localStorage.setItem('tasks', JSON.stringify(edited));
            return { ...state, tasks: edited };

        case "CLEAR_ALL_TODO":
            localStorage.setItem('tasks', JSON.stringify([]));
            return { ...state, tasks: [] };
           
      default:
            return state;
    }
}

// const themeReducer = (state = initialThemeState, action) => {
//     switch (action.type) {
//         case "TOGGLE_THEME":
//             const newTheme = state.theme === 'light' ? 'dark' : 'light';
//             localStorage.setItem('theme', newTheme);
//             return { ...state, theme: newTheme };
//         default:
//             return state;
//     }
// };



export default taskReducer