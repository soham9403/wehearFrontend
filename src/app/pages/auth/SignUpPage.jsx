import Logo from "../../../component/common/Logo"

import CustomInput from "../../../component/common/CustomInput";
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Link } from 'react-router-dom'
import SmallLoader from "../../../component/common/SmallLoader";
import SearchDropDown from "../../../component/common/SearchDropDown";
import { isAllowedPhone, _lang } from "../../../config/helper";
import logo from '../../../assets/images/common/logo_full.png';
import gradLeft from '../../../assets/images/common/auth-left.png';
import gradRight from '../../../assets/images/common/auth-right.png';
const SignUpPage = (props) => {
    return (
        <>

                <div className="full-page auth-container p-relative">
                    <div className="auth-gradient-left">
                        <img src={gradLeft} className="fit-content" alt="" />
                    </div>
                    <div className="auth-gradient-right">
                        <img src={gradRight} className="fit-content" alt="" />
                    </div>
                    <h1 className="center company-title display-1 df row text-gradient-primary" >WEHEAR CRM</h1>
                    <div className="we_container df ">
                        <div className="df flex-1 container-left">
                            <div className="fit-content df center">
                                <img className="img" src={logo} alt="" />
                            </div>
                        </div>
                        <div className="df flex-1">
                            <div className="fit-content df">
                                <form onSubmit={props.onSignUp} className="container-right  df column">
                                    <div className="h2-container">
                                        <h2 className="h2">Create&nbsp;your&nbsp;account
                                        </h2>
                                        <div className="row center df" style={{ height: "25px" }}>
                                            <h4 align="center" className="text-danger  row df h4" color={"red"}>{props.handleValues('get', 'err')}</h4>
                                        </div>
                                    </div>

                                    <div className="df column row scrollable-container-right-signup" style={{ overflowY: "scroll", paddingTop: ".7vh" }}>

                                        <div className="form-filed row">
                                            <CustomInput
                                                disabled={props.loading}
                                                value={props.handleValues('get', 'name')}
                                                onChange={(e) => { props.handleValues('set', 'name', e.target.value) }}
                                                type="text"
                                                label={_lang('name')}
                                            />
                                        </div>

                                        <div className=" form-filed row">
                                            <CustomInput
                                                disabled={props.loading}
                                                value={props.handleValues('get', 'email')}
                                                onChange={(e) => { props.handleValues('set', 'email', e.target.value) }}
                                                type="text"
                                                label={_lang('email')}
                                            />
                                        </div>

                                        <div className=" form-filed row">
                                            <CustomInput
                                                disabled={props.loading}
                                                value={props.handleValues('get', 'phone_no')}
                                                onChange={(e) => { if (isAllowedPhone(e.target.value)) { props.handleValues('set', 'phone_no', e.target.value) } }}
                                                type="tel"
                                                label={_lang('phone')}
                                            />
                                        </div>

                                        <div className=" form-filed row">
                                            <CustomInput
                                                disabled={props.loading}
                                                value={props.handleValues('get', 'password')}
                                                onChange={(e) => { props.handleValues('set', 'password', e.target.value) }}
                                                type="password"
                                                label={_lang('password')}

                                            />
                                        </div>
                                        <div className=" form-filed row">
                                            <FormControl fullWidth={true} >
                                                <SearchDropDown

                                                    getOptionLabel={(option) => {
                                                        if (option['name'] && option['usercode'] && option['name'] != "" && option['usercode'] != "") {
                                                            return option['name'] + " (" + option['usercode'] + ")"
                                                        }
                                                        return ""
                                                    }}
                                                    renderOption={(defaultProps, option) => (

                                                        <Box component="li" {...defaultProps}>
                                                            {option['name'] && option['usercode'] && option['name'] != "" && option['usercode'] != "" ?
                                                                option['name'] + " (" + option['usercode'] + ")" : ""
                                                            }
                                                        </Box>
                                                    )}
                                                    list={props.destributorList}

                                                    value={props.handleValues('get', 'destributor_id')}
                                                    label={_lang('destributor')}

                                                    onChange={(val) => { props.handleValues('set', 'destributor_id', val) }}
                                                />
                                            </FormControl>
                                        </div>
                                        <div className=" form-filed row">
                                            <CustomInput
                                                disabled={props.loading}
                                                value={props.handleValues('get', 'company_name')}
                                                onChange={(e) => { props.handleValues('set', 'company_name', e.target.value) }}
                                                type="text"
                                                label={_lang('company_name_field')}

                                            />
                                        </div>
                                        <div className=" form-filed row">
                                            <CustomInput
                                                disabled={props.loading}
                                                value={props.handleValues('get', 'gst_no')}
                                                onChange={(e) => { props.handleValues('set', 'gst_no', e.target.value) }}
                                                type="text"
                                                label={_lang('gst_no')}

                                            />
                                        </div>
                                    </div>
                                    {/* <div className="df row flex-end">
                                        <Link to={"/forget-password"} className="subtitle2 underline text-secondary">{_lang('que_forgot_pass')}</Link>
                                    </div> */}
                                    <div className="df column">
                                        
                                        <button type="submit" className="auth-submit-btn df center text-light row pointer h3 btn-gradient">{!props.loading && _lang('register')} {props.loading && <span style={{marginLeft:"10px"}}> <SmallLoader /> </span>}</button>                                        
                                        <Link to={"/sign-in"} className="subtitle2 underline text-secondary df row center">{_lang('que_already_have_account')}</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


      
            {/* <div className="row p-primary">
                <div className="we_container_small  p-primary radius-primary row border-primary ">
                    <Logo />
                    <form className="row df column m-v-primary" style={{ marginTop: "0px" }}>
                        <div className="row center df" style={{ height: "25px" }}>
                            <Typography variant="h4" align="center" color={"red"}>{props.handleValues('get', 'err')}</Typography>
                        </div>

                        <div className="line-margin row">
                            <CustomInput
                                disabled={props.loading}
                                value={props.handleValues('get', 'name')}
                                onChange={(e) => { props.handleValues('set', 'name', e.target.value) }}
                                type="text"
                                label={_lang('name')}
                            />
                        </div>

                        <div className=" form-filed row">
                            <CustomInput
                                disabled={props.loading}
                                value={props.handleValues('get', 'email')}
                                onChange={(e) => { props.handleValues('set', 'email', e.target.value) }}
                                type="text"
                                label={_lang('email')}
                            />
                        </div>

                        <div className=" form-filed row">
                            <CustomInput
                                disabled={props.loading}
                                value={props.handleValues('get', 'phone_no')}
                                onChange={(e) => { if (isAllowedPhone(e.target.value)) { props.handleValues('set', 'phone_no', e.target.value) } }}
                                type="tel"
                                label={_lang('phone')}
                            />
                        </div>

                        <div className=" form-filed row">
                            <CustomInput
                                disabled={props.loading}
                                value={props.handleValues('get', 'password')}
                                onChange={(e) => { props.handleValues('set', 'password', e.target.value) }}
                                type="password"
                                label={_lang('password')}

                            />
                        </div>
                        <div className=" form-filed row">
                            <FormControl fullWidth={true} >
                                <SearchDropDown

                                    getOptionLabel={(option) => {
                                        if (option['name'] && option['usercode'] && option['name'] != "" && option['usercode'] != "") {
                                            return option['name'] + " (" + option['usercode'] + ")"
                                        }
                                        return ""
                                    }}
                                    renderOption={(defaultProps, option) => (

                                        <Box component="li" {...defaultProps}>
                                            {option['name'] && option['usercode'] && option['name'] != "" && option['usercode'] != "" ?
                                                option['name'] + " (" + option['usercode'] + ")" : ""
                                            }
                                        </Box>
                                    )}
                                    list={props.destributorList}

                                    value={props.handleValues('get', 'destributor_id')}
                                    label={_lang('destributor')}

                                    onChange={(val) => { props.handleValues('set', 'destributor_id', val) }}
                                />
                            </FormControl>
                        </div>






                        <div className="row df center" style={{ height: '25px' }}>{props.loading && <SmallLoader />}</div>
                        <div className="row m-v-primary " style={{ marginBottom: "0px" }}>
                            {<Button disabled={props.loading} variant="contained" onClick={props.onSignUp} className="row" >{_lang('signup')}</Button>}
                        </div>

                        <div className="row m-v-primary" style={{ marginBottom: "0px" }}>
                            <Link to={"/sign-in"}><Typography variant="subtitle2" align="center" color={"blue"}>{_lang('que_already_have_account')}</Typography></Link>
                        </div>
                    </form>
                </div>
            </div> */}
        </>
    )
}
export default SignUpPage