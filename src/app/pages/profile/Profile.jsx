import AccountCircle from "@mui/icons-material/AccountCircle"
import { Button, Grid, Typography } from "@mui/material"
import CustomInput from "../../../component/common/CustomInput"
import SmallLoader from "../../../component/common/SmallLoader"
import constants from "../../../config/constants"
import { getKeyByValue, _lang } from '../../../config/helper'
import '../../../assets/css/css/profile.css'
import PenSvg from "../../../component/common/PenSvg"
const Profile = (props) => {

    return (
        <>
            <div className="df flex-1 bg-light" style={{ overflowY: "scroll" }}>
                <div className="we_container profile_container">
                    <h2 className="h2">Manage your Profile</h2>
                    <div className="row center df" style={{ height: "25px" }}>
                        <Typography variant="h4" align="center" color={"red"}>{props.handleValues('get', 'err')}</Typography>
                        <Typography variant="h4" align="center" color={"green"}>{props.handleValues('get', 'sucessMessage')}</Typography>
                    </div>
                    <div className="row m-v-primary">
                        <Grid container item spacing={3}>
                            <Grid container item>
                                
                                <div className="df row bg-gradient-primary name-box column radius-2">
                                    <h1 className="h2 text-light df space-between row-center row">{props.handleValues('get', 'name')} <button className="pointer" onClick={()=>{
                                        props.onEditBtnClick()
                                    }}><PenSvg isWhite={true} /></button></h1>
                                    <h3 className="h3 text-light">{_lang("role_" + props.handleValues('get', 'role'))}</h3>
                                </div>
                            </Grid>
                            <Grid container item>
                                <CustomInput
                                    disabled={true}
                                    value={props.handleValues('get', 'email')}
                                    onChange={(e) => { props.handleValues('set', 'email', e.target.value) }}
                                    type="text"
                                    label={_lang("email")}
                                />
                            </Grid>


                            <Grid container item>
                                <CustomInput
                                    disabled={true}
                                    defaultValue={props.handleValues('get', 'usercode')}
                                    onChange={(e) => { props.handleValues('set', 'usercode', e.target.value) }}
                                    type="text"
                                    label={_lang("usercode")}
                                />
                            </Grid>

                            <Grid container item>
                                <CustomInput
                                    disabled={true}
                                    on_side_btn_click={()=>{props.onEditBtnClick('phone_no')}}
                                    side_icon={<PenSvg />}
                                    value={props.handleValues('get', 'phone_no')}
                                    onChange={(e) => { props.handleValues('set', 'phone_no', e.target.value) }}
                                    type="side-icon"
                                    label={_lang("phone")}
                                />
                            </Grid>


                            {/* <Grid container item>
                                <CustomInput
                                    disabled={true}
                                    defaultValue={getKeyByValue(constants.user_role, )}
                                    onChange={(e) => { }}
                                    type="text"
                                    label={_lang("role")}
                                />
                            </Grid> */}
                            {(props.handleValues('get', 'role') == constants.user_role.DESTRIBUTOR_ROLE || props.handleValues('get', 'role') == constants.user_role.RETELLER_ROLE) &&
                                <Grid container item>
                                    <CustomInput
                                        disabled={true}

                                        value={props.handleValues('get', 'territory')}
                                        onChange={(e) => { props.handleValues('set', 'territory', e.target.value) }}
                                        type="text"
                                        label={_lang("territory")}
                                    />
                                </Grid>}
                            <Grid container item>
                                <CustomInput
                                    disabled={props.loading || (props.handleValues('get', 'role') != constants.user_role.DESTRIBUTOR_ROLE && props.handleValues('get', 'role') != constants.user_role.RETELLER_ROLE)}
                                    value={props.handleValues('get', 'gst_no')}
                                    onChange={(e) => { props.handleValues('set', 'gst_no', e.target.value) }}
                                    type="text"
                                    label={_lang("gst_no")}
                                />
                            </Grid>
                            <Grid container item>
                                <CustomInput
                                    disabled={props.loading || (props.handleValues('get', 'role') != constants.user_role.DESTRIBUTOR_ROLE && props.handleValues('get', 'role') != constants.user_role.RETELLER_ROLE)}
                                    value={props.handleValues('get', 'company_name')}
                                    onChange={(e) => { props.handleValues('set', 'company_name', e.target.value) }}
                                    type="text"
                                    label={_lang("company_name_field")}
                                />
                            </Grid>
                            <div className="row center df" style={{ height: "25px" }}>
                                {props.loading && <SmallLoader />}
                            </div>

                            {/* <Grid container item>
                                <Button
                                    disabled={JSON.stringify(props.initialData) === JSON.stringify(props.data) || props.loading}
                                    variant="contained" color="primary" fullWidth={true}
                                    onClick={props.updateProfile}
                                >{_lang('update')}</Button>
                            </Grid> */}
                        </Grid>
                        <div>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </>
    )
}
export default Profile