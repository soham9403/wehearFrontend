import constants from "../../config/constants"

const initialState = {
    type: '',//UPDATE,VERIFY,CREATE,CUSTOM,
    onAction: () => { },
    component: null,
    show: false,
    defaultData: {}
}
const ModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_MODAL': return {
            type: action.value.type,
            onAction: action.value.onAction,
            component: action.value.component,
            show: true,
            defaultData: action.value.defaultData
        }
        case "HIDE_MODAL": return {
            type: '',
            onAction: () => { },
            component: null,
            show: false,
            defaultData: {}
        }

        default: return { ...state }
    }
}
export default ModalReducer