import Logo from "../../../component/common/Logo"

import CustomInput from "../../../component/common/CustomInput";
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Link } from 'react-router-dom'
import SmallLoader from "../../../component/common/SmallLoader";
import SearchDropDown from "../../../component/common/SearchDropDown";
import { isAllowedPhone, _lang } from "../../../config/helper";

const SignUpPage = (props) => {
    return (
        <>
            <div className="row p-primary">
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

                        <div className=" m-v-primary row">
                            <CustomInput
                                disabled={props.loading}
                                value={props.handleValues('get', 'email')}
                                onChange={(e) => { props.handleValues('set', 'email', e.target.value) }}
                                type="text"
                                label={_lang('email')}
                            />
                        </div>

                        <div className=" m-v-primary row">
                            <CustomInput
                                disabled={props.loading}
                                value={props.handleValues('get', 'phone_no')}
                                onChange={(e) => { if (isAllowedPhone(e.target.value)) { props.handleValues('set', 'phone_no', e.target.value) } }}
                                type="tel"
                                label={_lang('phone')}
                            />
                        </div>

                        <div className=" m-v-primary row">
                            <CustomInput
                                disabled={props.loading}
                                value={props.handleValues('get', 'password')}
                                onChange={(e) => { props.handleValues('set', 'password', e.target.value) }}
                                type="password"
                                label={_lang('password')}

                            />
                        </div>
                        <div className=" m-v-primary row">
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
            </div>
        </>
    )
}
export default SignUpPage