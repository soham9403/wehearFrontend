import { Button, Typography } from "@mui/material"
import CustomInput from "../../../component/common/CustomInput"
import SmallLoader from "../../../component/common/SmallLoader"
import { _lang } from "../../../config/helper"
const ForgetPasswordCreateNewPassword = (props) => {
    return (
        <>
            <form className="row df column m-v-primary">

                

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
            </form>
        </>
    )
}
export default ForgetPasswordCreateNewPassword