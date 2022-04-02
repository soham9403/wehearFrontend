
const initialState = {
    data: [
        // {
        //     isLink: true,
        //     redirect: '',
        //     label: 'Dashboard'
        // }
    ],
}
const breadCrumbReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_BREADCRUMB": return { ...state, data: action.value };
        case 'APPEND_BREADCRUMB':

            const oldBreadCrumb = [...state.data]
            for (let i = 0; i < oldBreadCrumb.length; i++) {
                const obj =  oldBreadCrumb[i]
                if (obj.isLink == false && obj.redirect != "") {
                    oldBreadCrumb[i].isLink = true
                }
            }
            return { ...state, data: [...oldBreadCrumb, ...action.value] }
        default: return { ...state }
    }
}
export default breadCrumbReducer