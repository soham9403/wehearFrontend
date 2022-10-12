import { Button, FormControl, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useSelector } from "react-redux"
import CustomInput from "../../../component/common/CustomInput"
import DynamicDropDown from "../../../component/common/DynamicDropDown"
import SearchDropDown from "../../../component/common/SearchDropDown"
import SmallLoader from "../../../component/common/SmallLoader"
import constants from "../../../config/constants"
import { getObjectBykey, isAllowedPhone, _lang } from "../../../config/helper"

const CreateAndUpdateUser = (props) => {
    const { user } = useSelector(state => state)
    return (
        <>
            <div className="we-container-small  df column radius-2">
                <h3 className="h3">{props.calledFromUpdate ? _lang('update_user') : _lang('create_user')}</h3>
                <form className="df row column profile-edit-form" onSubmit={async (e) => { e.preventDefault(); e.changeParentValue() }}>

                    <span className="h6 text-danger pt-3 pb-3">{props.handleValues('get', 'err')}&nbsp;</span>

                    <div className="line-margin row" style={{ marginBottom: "10px" }}>
                        <CustomInput
                            disabled={props.loading}
                            value={props.handleValues('get', 'name')}
                            onChange={(e) => { props.handleValues('set', 'name', e.target.value) }}
                            type="text"
                            label={_lang('name')}
                        />
                    </div>

                    <div className="form-filed row" style={{ marginBottom: "10px" }}>
                        <CustomInput
                            disabled={props.loading || props.calledFromUpdate}
                            value={props.handleValues('get', 'email')}
                            onChange={(e) => { props.handleValues('set', 'email', e.target.value) }}
                            type="text"
                            label={_lang('email')}
                        />
                    </div>

                    <div className="form-filed row" style={{ marginBottom: "10px" }}>
                        <CustomInput
                            disabled={props.loading}
                            value={props.handleValues('get', 'phone_no')}
                            onChange={(e) => { if (isAllowedPhone(e.target.value)) { props.handleValues('set', 'phone_no', e.target.value) } }}
                            type="tel"
                            label={_lang('phone')}
                        />
                    </div>

                    {!props.calledFromUpdate && <div className="form-filed row" style={{ marginBottom: "10px" }}>
                        <CustomInput
                            disabled={props.loading}
                            value={props.handleValues('get', 'password')}
                            onChange={(e) => { props.handleValues('set', 'password', e.target.value) }}
                            type="password"
                            label={_lang('password')}

                        />
                    </div>}




                    <div className="form-filed row" style={{ marginBottom: "10px" }}>
                        <FormControl fullWidth={true} >
                            <SearchDropDown

                                getOptionLabel={(option) => {
                                    return option.label

                                }}
                                renderOption={(defaultProps, option) => (

                                    <Box component="li" {...defaultProps}>
                                        {option.label}
                                    </Box>
                                )}
                                list={Object.keys(constants.user_role).map((label, index) => {
                                    return {
                                        label: _lang('role_' + constants.user_role[label]),
                                        index: constants.user_role[label]
                                    }
                                })}

                                value={props.handleValues('get', 'role') == '' ? null : props.handleValues('get', 'role')}
                                label={_lang('role')}

                                onChange={(val) => { props.handleValues('set', 'role', val) }}
                            />
                        </FormControl>
                    </div>

                    {/* -----------------------when selected role is destrubutor----------------------- */}
                    {props.handleValues('get', 'role') && props.handleValues('get', 'role').index == constants.user_role.DESTRIBUTOR_ROLE &&

                        <>
                            <div className="form-filed row">
                                <CustomInput
                                    disabled={props.loading}
                                    value={props.handleValues('get', 'territory')}
                                    onChange={(e) => { props.handleValues('set', 'territory', e.target.value) }}
                                    type="territory"
                                    label={_lang('territory')}

                                />
                            </div>
                        </>}
                    {/* -------------------------------when role is destrubutor or retailer-------------------------------------- */}
                    {props.handleValues('get', 'role') && (props.handleValues('get', 'role').index == constants.user_role.DESTRIBUTOR_ROLE || props.handleValues('get', 'role').index == constants.user_role.RETELLER_ROLE) &&
                        <>
                            <div className="form-filed row">
                                <CustomInput
                                    disabled={props.loading}
                                    value={props.handleValues('get', 'company_name')}
                                    onChange={(e) => { props.handleValues('set', 'company_name', e.target.value) }}
                                    type="text"
                                    label={_lang('company_name_field')}

                                />
                            </div>
                            <div className="form-filed row">
                                <CustomInput
                                    disabled={props.loading}
                                    value={props.handleValues('get', 'gst_no')}
                                    onChange={(e) => { props.handleValues('set', 'gst_no', e.target.value) }}
                                    type="text"
                                    label={_lang('gst_no')}

                                />
                            </div>
                        </>}


                    {/* -------------------------------when role is retailer-------------------------------------- */}
                    {
                        props.handleValues('get', 'role') && props.handleValues('get', 'role').index == constants.user_role.RETELLER_ROLE && user.role != constants.user_role.DESTRIBUTOR_ROLE &&
                        <div className="form-filed row">
                            <FormControl fullWidth={true} sx={{ zIndex: "1111" }}>

                                <DynamicDropDown placeholder="Select Parent" lazyFun={props.fetchUsers} defaultOption={[]} onSelect={(data) => { props.handleValues('set', 'parent_id', data.value) }} />
                            </FormControl>
                        </div>
                    }


                    {/* -------------------------------when role is business associative-------------------------------------- */}
{/* 
                    {
                        props.handleValues('get', 'role') && props.handleValues('get', 'role').index == constants.user_role.BUSINESS_EXECUTIVE && user.role != constants.user_role.DESTRIBUTOR_ROLE &&
                        <div className="form-filed row">
                            <FormControl fullWidth={true} sx={{ zIndex: "1111" }}>

                                <DynamicDropDown placeholder="Select Parent" lazyFun={props.fetchUsers} defaultOption={[]} onSelect={(data) => { props.handleValues('set', 'parent_id', data.value) }} />
                            </FormControl>
                        </div>
                    } */}


                    <div className="row " style={{ marginBottom: "0px", zIndex: "11", backgroundColor: "white" }}>
                        {<button disabled={props.loading} variant="contained" onClick={() => { if (props.calledFromUpdate) { props.updateUser() } else { props.creatUser() } }} className="row auth-submit-btn df center text-light row pointer h3 btn-gradient letter-space-2" >
                            {props.loading ? <SmallLoader /> : props.calledFromUpdate ? _lang('update') : _lang('create_user')}
                        </button>}
                    </div>


                </form>
            </div>

        </>
    )
}
export default CreateAndUpdateUser