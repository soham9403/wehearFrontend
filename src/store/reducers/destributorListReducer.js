
const initialState = {
    data: [],
}
const destributorListReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DESTRIBUTOR_LIST": return { ...state, data: action.value };
        default: return { ...state }
    }
}
export default destributorListReducer