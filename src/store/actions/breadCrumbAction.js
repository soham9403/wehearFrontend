export const setBreadCrumb = (data) => {

    return {
        type: "SET_BREADCRUMB",
        value: data
    }
}
export const appendBreadCrumb = (data)=>{
    return {
        type: "APPEND_BREADCRUMB",
        value: data
    }
}