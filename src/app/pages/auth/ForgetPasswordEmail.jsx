import { Button, Typography } from "@mui/material"
import CustomInput from "../../../component/common/CustomInput"
import SmallLoader from "../../../component/common/SmallLoader"
import { _lang } from "../../../config/helper"

const ForgetPasswordEmail = (props) => {
    return (
        <>
            <form onSubmit={props.sendOtp} className="row df column">
                <div className="h2-container">
                    <h2 className="h2">&nbsp;
                    </h2>
                    <div className="row center df" style={{ height: "25px" }}>
                        <h4 align="center" className="text-danger  row df h4" color={"red"}>{props.handleValues('get', 'err')}</h4>
                    </div>
                </div>

                <div className="df column row" style={{ overflowY: "scroll", paddingTop: ".7vh" }}>


                    <div className="form-filed row">
                        <CustomInput
                            disabled={props.loading}
                            value={props.handleValues('get', 'user_code')}
                            onChange={(e) => { props.handleValues('set', 'user_code', e.target.value) }}
                            type="text"
                            label={_lang("email_or_code")}
                        />
                    </div>


                </div>

                <div className="df column">
                    <button type="submit" className="auth-submit-btn df center text-light row pointer h3 btn-gradient">{!props.loading && _lang('send_otp')} {props.loading && <span style={{ marginLeft: "10px" }}> <SmallLoader /> </span>}</button>
                </div>
            </form>
            {/* <form className="row df column m-v-primary">
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
            </form> */}
        </>
    )
}
export default ForgetPasswordEmail