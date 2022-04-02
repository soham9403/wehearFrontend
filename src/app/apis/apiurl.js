let mode = "local";
let domainUrl;
switch (mode) {
    case "local": domainUrl = "http://localhost:8000/api/"; break;

    default: domainUrl = "http://localhost:8000/api/"; break;
}

export default {
    root: domainUrl,
    signIn: domainUrl + 'auth/sign-in',
    signUp: domainUrl + 'auth/signup',
    sendotp: domainUrl + 'auth/sendotp',

    changepassword: domainUrl + 'auth/changepassword',
    verifyotp: domainUrl + 'auth/verifyotp',
    reset_token: domainUrl + "auth/reset_token",

    get_user_by_code: domainUrl + "app/user/getbycode",
    get_user_count: domainUrl + "app/user/count",
    userlist: domainUrl + "app/user/list",
    deleteuser: domainUrl + "app/user/delete",
    getUserAnalyticInfo: domainUrl + 'app/user/analytic-info',
    destributorList: domainUrl + 'auth/user/list/destributor',
    verifyUser: domainUrl + 'app/user/verify',
    updateUser: domainUrl + 'app/user/update',
    createUser: domainUrl + 'app/user/create',

    productGet: domainUrl + "app/product/show",
    productAdd: domainUrl + "app/product/create",
    productDelete: domainUrl + "app/product/delete",
    productUpdate: domainUrl + "app/product/update",

    salesList: domainUrl + 'app/sales/list',
    saleBox: domainUrl + 'app/sales/sold',
    transferBox: domainUrl + 'app/sales/transfer',
    transferBoxBulk:domainUrl + 'app/sales/transfer/bulk',
    getBoxBetweenRange: domainUrl + 'app/sales/range',
    exportBox: domainUrl + 'app/sales/export',
}