

const initialState = {
    data: {},
  
}
const CurrentUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SELECT_USER": return { ...state, data: action.value};
        case "REMOVE_USER": return { ...state, data: {}};
        default: return { ...state }
    }
}
export default CurrentUserReducer