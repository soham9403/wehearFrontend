import Logo from "../../../component/common/Logo"

import CustomInput from "../../../component/common/CustomInput";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Link } from 'react-router-dom'
import { _lang } from "../../../config/helper";
import SmallLoader from "../../../component/common/SmallLoader";
const SignInPage = (props) => {
    return (
        <>
            <div className="row p-primary">
                <div className="we_container_small  p-primary radius-primary row border-primary ">
                    <Logo />
                    <form className="row df column m-v-primary">
                        <div className="row center df" style={{ height: "25px" }}>
                            <Typography variant="h4" align="center" color={"red"}>{props.inputs.err}</Typography>
                        </div>

                        <div className="line-margin row">
                            <CustomInput
                                disabled={props.loading}
                                value={props.inputs.email}
                                onChange={(e) => { props.setEmail(e.target.value) }}
                                type="text"
                                label={_lang("email")}
                            />
                        </div>

                        <div className=" m-v-primary row">
                            <CustomInput
                                disabled={props.loading}
                                value={props.inputs.password}
                                onChange={(e) => { props.setPassword(e.target.value) }}
                                type="password"
                                label={_lang('password')}
                            />
                        </div>
                        <div className="row df" style={{ justifyContent: "flex-end" }}>
                            <Link to={"/forget-password"}><Typography variant="subtitle2" align="center" color={"blue"}>{_lang('que_forgot_pass')}</Typography></Link>
                        </div>


                        <div className="row df center" style={{ height: '25px' }}>{props.loading && <SmallLoader /> }</div>
                        <div className="row m-v-primary " style={{ marginBottom: "0px" }}>
                            {<Button disabled={props.loading} variant="contained" onClick={props.onSignIn} className="row" >{_lang('signin')}</Button>}
                        </div>

                        <div className="row m-v-primary" style={{ marginBottom: "0px" }}>
                            <Link to={"/sign-up"}><Typography variant="subtitle2" align="center" color={"blue"}>{_lang('que_alredy_have_account')}</Typography></Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default SignInPage