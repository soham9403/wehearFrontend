import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import constants from "../../../config/constants"
import { isEmail, _lang } from "../../../config/helper"
import { setdestributorListAction } from "../../../store/actions/destributorListAction"
import { signInAction } from "../../../store/actions/userReducerAction"
import { getDestributorList, signUp } from "../../apis/authApis"
import SignUpPage from "../../pages/auth/SignUpPage"

const SignUpController = () => {
    const destributor = useSelector((state) => { return state.destributor_list })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [destributorList, setdestributorList] = useState([])
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        phone_no: "",
        password: "",
        role: constants.user_role.RETELLER_ROLE,
        destributor_id: "",
        err: ''
    })
    const [loading, setLoading] = useState(false)
    const [dropDownLoading, setdropDownLoading] = useState(false)
    const handleValues = (method = "set", filedName, value = "") => {
        if (method == "set") {
            const currentData = { ...userDetails }
            currentData[filedName] = value
            setUserDetails(currentData)
            return 0;
        } else {
            return userDetails[filedName]
        }
    }

    useEffect(() => {
        (async () => {

            if (!destributor.data || destributor.data.length <= 0) {
                setdropDownLoading(true)
                const response = await getDestributorList()
                if (response.status == 1) {
                    dispatch(setdestributorListAction(response.data.result))
                }
                setdropDownLoading(false)
            }
        })()
    }, [])

    useEffect(() => {
        
        setdestributorList(destributor.data)
    }, [destributor.data])

    const onSignUp = async () => {
        if (userDetails.name == "") {
            handleValues('set', 'err', _lang('name_required'))
            return 0
        }
        if (userDetails.email == "") {
            handleValues('set', 'err', _lang('email_required'))
            return 0
        } else if (!isEmail(userDetails.email)) {
            handleValues('set', 'err', _lang('unvalid_email'))
            return 0
        }
        if (userDetails.phone_no == "") {
            handleValues('set', 'err', _lang('phone_required'))
            return 0
        }
        if (userDetails.password == "") {
            handleValues('set', 'err', _lang('password_required'))
            return 0
        }
        if (!userDetails.destributor_id || userDetails.destributor_id._id == "") {
            handleValues('set', 'err', _lang('destributor_required'))
            return 0
        }

        setLoading(true)
        const userData = { ...userDetails }

        const response = await signUp({ ...userData, destributor_id: userData.destributor_id._id })

        if (response.status === 1) {
            dispatch(signInAction(response.data))
            navigate("/dashboard", { replace: true })
        } else {
            handleValues('set', 'err', _lang(response.data[0].msg))
        }
        setLoading(false)
    }
    return (
        <SignUpPage
            onSignUp={onSignUp}
            destributorList={destributorList}
            dropDownLoading={dropDownLoading}
            loading={loading}
            handleValues={handleValues}
        />
    )
}
export default SignUpController