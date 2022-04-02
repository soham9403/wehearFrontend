import constants from "../../config/constants"

const initialState = {
    data: {},
}
const userAnalyticInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_ANALYTIC_INFO':
            const temp = { ...state.data };
            temp[action.value.user_code] = action.value.value
            
            return { ...state, data: temp }
            break;
        default: return { ...state }
    }
}
export default userAnalyticInfoReducer