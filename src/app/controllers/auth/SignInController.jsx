import { useState } from "react"
import { isEmail, _lang } from "../../../config/helper"
import { signIn } from "../../apis/authApis"
import SignInPage from "../../pages/auth/SignInPage"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signInAction } from "../../../store/actions/userReducerAction"
const SignInController = () => {
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        err: ""
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSignIn = async () => {


        if (inputs.email.trim() === "") {
            setInputs({ ...inputs, err: _lang("email_required") })
            return false
        }

        if (!isEmail(inputs.email)) {
            setInputs({ ...inputs, err: _lang("unvalid_email") })
            return false
        }
        if (inputs.password.trim() === "") {
            setInputs({ ...inputs, err: _lang("password_required") })
            return false
        }
        setLoading(true)
        const response = await signIn(inputs.email, inputs.password)

        if (response.status === 1) {
            dispatch(signInAction(response.data))
            navigate("/dashboard", { replace: true })
        } else {
            setInputs({ ...inputs, err: _lang(response.data[0].msg) })
        }
        setLoading(false)

    }
    return (
        <SignInPage
            loading={loading}
            inputs={inputs}
            onSignIn={onSignIn}
            setEmail={(val) => { setInputs({ ...inputs, err: "", email: val }) }}
            setPassword={(val) => { setInputs({ ...inputs, err: "", password: val }) }}

        />)
}
export default SignInController