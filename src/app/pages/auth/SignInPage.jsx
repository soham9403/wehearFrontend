import Logo from "../../../component/common/Logo"

import CustomInput from "../../../component/common/CustomInput";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Link } from 'react-router-dom'
import { _lang } from "../../../config/helper";
import SmallLoader from "../../../component/common/SmallLoader";
import logo from '../../../assets/images/common/logo_full.png';
import gradLeft from '../../../assets/images/common/auth-left.png';
import gradRight from '../../../assets/images/common/auth-right.png';
import '../../../assets/css/css/authspace.css'
const SignInPage = (props) => {
    return (
        <>
            <div className="full-page auth-container p-relative">
                <div className="auth-gradient-left">
                  <img  src={gradLeft} className="fit-content" alt="" />
                </div>
                <div className="auth-gradient-right">
                <img  src={gradRight} className="fit-content" alt="" />
                </div>
                <h1 className="center company-title display-1 df row text-gradient-primary" >WEHEAR CRM</h1>
                <div className="we_container df ">
                    <div className="df flex-1 container-left">
                        <div className="fit-content df center">
                            <img className="img" src={logo} alt="" />
                        </div>
                    </div>
                    <div className="df flex-1">
                        <div className="fit-content df center">
                            <form onSubmit={props.onSignIn} className="container-right df column">
                                <div className="h2-container">
                                    <h2 className="h2">Log In
                                    </h2>
                                    <div className="row center df" style={{ height: "25px" }}>
                                        <h4 align="center" className="text-danger  row df h4" color={"red"}>{props.inputs.err}</h4>
                                    </div>
                                </div>

                                <div className="df column row" style={{ overflowY: "scroll", paddingTop: ".7vh" }}>


                                    <div className="form-filed row">
                                        <CustomInput
                                            disabled={props.loading}
                                            value={props.inputs.email}
                                            onChange={(e) => { props.setEmail(e.target.value) }}
                                            type="text"
                                            label={_lang("email")}
                                        />
                                    </div>

                                    <div className=" form-filed row">
                                        <CustomInput
                                            disabled={props.loading}
                                            value={props.inputs.password}
                                            onChange={(e) => { props.setPassword(e.target.value) }}
                                            type="password"
                                            label={_lang('password')}
                                        />
                                    </div>
                                </div>
                                <div className="df row flex-end">
                                    <Link to={"/forget-password"} className="subtitle2 underline text-secondary">{_lang('que_forgot_pass')}</Link>
                                </div>
                                <div className="df column">
                                    <button type="submit" className="auth-submit-btn df center text-light row pointer h3 btn-gradient">{!props.loading && 'Log In'} {props.loading && <span style={{marginLeft:"10px"}}> <SmallLoader /> </span>}</button>
                                    <Link to={"/sign-up"} className="subtitle2 underline text-secondary df row center">{_lang('que_alredy_have_account')}</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="row p-primary">
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
            </div> */}
        </>
    )
}
export default SignInPage