import { Button, Typography } from "@mui/material"
import CustomInput from "../../../component/common/CustomInput"
import SmallLoader from "../../../component/common/SmallLoader"
import { _lang } from "../../../config/helper"

const ForgetPasswordEmail = (props) => {
    return (
        <>
            <form className="row df column m-v-primary">
                <div className="row center df" style={{ height: "25px" }}>
                    <Typography variant="h4" align="center" color={"red"}>{props.handleValues('get', 'err')}</Typography>
                </div>

                <div className="line-margin row">
                    <CustomInput
                        disabled={props.loading}
                        value={props.handleValues('get', 'user_code')}
                        onChange={(e) => { props.handleValues('set', 'user_code',e.target.value) }}
                        type="text"
                        label={_lang("email_or_code")}
                    />
                </div>
                <div className="row df center" style={{ height: '25px' }}>{props.loading && <SmallLoader /> }</div>
                <div className="row m-v-primary " style={{ marginBottom: "0px" }}>
                    {<Button disabled={props.loading} variant="contained" onClick={props.sendOtp} className="row" >{_lang('send_otp')}</Button>}
                </div>
            </form>
        </>
    )
}
export default ForgetPasswordEmail