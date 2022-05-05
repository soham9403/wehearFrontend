import { Button, Typography } from "@mui/material"
import CustomInput from "../../../component/common/CustomInput"
import SmallLoader from "../../../component/common/SmallLoader"
import { _lang } from "../../../config/helper"
const ForgetPasswordCreateNewPassword = (props) => {
    return (
        <>
            <form onSubmit={props.changePassword} className="row df column">
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
                            value={props.handleValues('get', 'new_pass')}
                            onChange={(e) => { props.handleValues('set', 'new_pass', e.target.value) }}
                            type="password"
                            label={_lang("password")}
                        />
                    </div>
                    <div className="form-filed row">
                        <CustomInput
                            disabled={props.loading}
                            value={props.handleValues('get', 'confirm_pass')}
                            onChange={(e) => { props.handleValues('set', 'confirm_pass', e.target.value) }}
                            type="password"
                            label={_lang("confirm_pass")}
                        />
                    </div>


                </div>

                <div className="df column">
                    <button type="submit" className="auth-submit-btn df center text-light row pointer h3 btn-gradient">{!props.loading && _lang('update')} {props.loading && <span style={{ marginLeft: "10px" }}> <SmallLoader /> </span>}</button>
                </div>
            </form>
            {/* <form className="row df column m-v-primary">

                

                <div className="row center df" style={{ height: "25px" }}>
                    <Typography variant="h4" align="center" color={"red"}>{props.handleValues('get', 'err')}</Typography>
                </div>

                <div className="line-margin row">
                    <CustomInput
                        disabled={props.loading}
                        value={props.handleValues('get', 'new_pass')}
                        onChange={(e) => { props.handleValues('set', 'new_pass', e.target.value) }}
                        type="password"
                        label={_lang("password")}
                    />
                </div>
                <div className="line-margin row">
                    <CustomInput
                        disabled={props.loading}
                        value={props.handleValues('get', 'confirm_pass')}
                        onChange={(e) => { props.handleValues('set', 'confirm_pass', e.target.value) }}
                        type="password"
                        label={_lang("confirm_pass")}
                    />
                </div>
                
                <div className="row df center" style={{ height: '25px' }}>{props.loading && <SmallLoader />}</div>
                <div className="row m-v-primary " style={{ marginBottom: "0px" }}>
                    {<Button disabled={props.loading} variant="contained" onClick={props.changePassword} className="row" >{_lang('update')}</Button>}
                </div>
            </form> */}
        </>
    )
}
export default ForgetPasswordCreateNewPassword