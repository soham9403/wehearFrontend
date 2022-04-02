import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { _lang } from "../../../config/helper";
import { sendOtp, updatePassword, verifyOtp } from "../../apis/authApis";

import ForgetPasswordMain from "../../pages/auth/ForgetPasswordMain";

const ForgetPasswordController = () => {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        user_code: "",
        email_sent_message: "",
        user_id: "",
        otp: "",
        new_pass: "",
        confirm_pass: "",
        err: ""
    })
    const handleValues = (method = "set", filedName, value = "") => {
        if (method == "set") {
            const currentData = { ...inputs }

            currentData[filedName] = value
            if (filedName !== 'err') {
                currentData['err'] = ''
            }
            setInputs(currentData)
            return 0;
        } else {
            return inputs[filedName]
        }
    }
    const sendOtpFun = async () => {

        if (inputs.user_code == "") {
            handleValues('set', 'err', _lang('email_usercode_required'))
            return 0
        } else {
            handleValues('set', 'err', '')
        }

        setLoading(true)
        const response = await sendOtp(inputs.user_code)
        if (response.status == 1) {
            setInputs({ ...inputs, err: "", user_id: response.data.user_id, email_sent_message: response.message })
            setStep(2)
        } else {
            if (response.code == 400) {
                handleValues('set', 'err', _lang(response.data[0].msg))
            }
        }
        setLoading(false)
    }

    const verifyOtpFun = async () => {

        if (inputs.otp.trim() == "") {
            handleValues('set', 'err', _lang('otp_required'))
            return 0
        } else {
            handleValues('set', 'err', '')
        }
        setLoading(true)
        const response = await verifyOtp(inputs.user_id, inputs.otp)
        if (response.status == 1) {
            setInputs({ ...inputs, err: "" })
            setStep(3)
        } else {
            if (response.code == 400) {
                handleValues('set', 'err', _lang(response.data[0].msg))
            }
        }
        setLoading(false)
    }

    const changePassword = async () => {

        if (inputs.new_pass.trim() == "") {
            handleValues('set', 'err', _lang('password_required'))
            return 0
        } else if (inputs.new_pass.trim() != inputs.confirm_pass.trim()) {
            handleValues('set', 'err', _lang('pass_and_wrong_pass_mismatch'))
            return 0
        } else {
            handleValues('set', 'err', '')
        }
        setLoading(true)
        const response = await updatePassword(inputs.user_id, inputs.new_pass, inputs.confirm_pass)
        if (response.status == 1) {
            setStep(4)
            setTimeout(() => {
                navigate('sign-in', { replace: true })
            }, 2000)

        } else {
            if (response.code == 400) {
                handleValues('set', 'err', _lang(response.data[0].msg))
            }
        }
        setLoading(false)
    }
    return (
        <>
            <ForgetPasswordMain
                changePassword={changePassword}
                handleValues={handleValues}
                loading={loading}
                verifyOtp={verifyOtpFun}
                step={step}
                sendOtp={sendOtpFun}
            />
        </>
    )
}
export default ForgetPasswordController;