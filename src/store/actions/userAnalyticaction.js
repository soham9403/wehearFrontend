export const setuserAnalyticAction = (user_code, value) => {
    
    return {
        type: "SET_USER_ANALYTIC_INFO",
        value: {
            user_code,
            value
        }
    }
}