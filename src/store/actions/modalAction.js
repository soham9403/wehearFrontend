export const openModal = (type = '', onAction = () => { }, component = null,defaultData={}) => {
    return {
        type: 'OPEN_MODAL',
        value: {
            type,
            onAction,
            component,
            defaultData
        }
    }
}

export const closeModel = () => {
    return {
        type: 'HIDE_MODAL'
    }
}   