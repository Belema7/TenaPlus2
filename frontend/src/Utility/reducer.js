import { Type } from './action.type';

export const initialState = {
  user: null,
  loading: false,
  error: null,
  motivationTrigger: 0, // 👈 NEW
  tasks: []
};


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Type.SET_USER: 
            return {
                ...state,
                user: action.user,
                error: null
            };
        case Type.SET_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case Type.SET_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case Type.SET_TASKS:
              return {
                ...state,
                tasks: action.tasks
            };
        case Type.TRIGGER_MOTIVATION_REFRESH:
            return {
                ...state,
                motivationTrigger: state.motivationTrigger + 1
            };

        case Type.UPDATE_TASK:
            return {
              ...state,
              tasks: state.tasks.map(task =>
                task.id === action.taskId ? { ...task, ...action.updates } : task
              ),
      };
        default:
            return state;
    }
};