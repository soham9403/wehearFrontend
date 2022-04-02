import { Button, FormControl, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useSelector } from "react-redux"
import CustomInput from "../../../component/common/CustomInput"
import SearchDropDown from "../../../component/common/SearchDropDown"
import SmallLoader from "../../../component/common/SmallLoader"
import constants from "../../../config/constants"
import { getObjectBykey, isAllowedPhone, _lang } from "../../../config/helper"

const CreateAndUpdateUser = (props) => {
    const { user } = useSelector(state => state)
    return (
        <>
            <div className={'column  row m-v-primary'} style={{ maxWidth: "500px", height: "100%", overflowY: "scroll", width: '90%' }}>

                <div className="df column p-primary radius-primary  row" id="scrollable_form" style={{ overflowY: "scroll", maxHeight: "90%", background: "white" }}>
                    <Typography variant="h2">{props.calledFromUpdate ? _lang('update_user') : _lang('create_user')}</Typography>
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
                                disabled={props.loading || props.calledFromUpdate}
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

                        {!props.calledFromUpdate && <div className=" m-v-primary row">
                            <CustomInput
                                disabled={props.loading}
                                value={props.handleValues('get', 'password')}
                                onChange={(e) => { props.handleValues('set', 'password', e.target.value) }}
                                type="password"
                                label={_lang('password')}

                            />
                        </div>}




                        <div className=" m-v-primary row">
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
                                    list={Object.keys(constants.user_role).filter((val) =>  constants.user_role[val] > user.data.role ).map((label, index) => {
                                        return {
                                            label: label,
                                            index: constants.user_role[label]
                                        }
                                    })}

                                    value={props.handleValues('get', 'role') == '' ? null : props.handleValues('get', 'role')}
                                    label={_lang('role')}

                                    onChange={(val) => { props.handleValues('set', 'role', val) }}
                                />
                            </FormControl>
                        </div>


                        {props.handleValues('get', 'role') && props.handleValues('get', 'role').index == constants.user_role.DESTRIBUTOR_ROLE &&

                            <>
                                <div className=" m-v-primary row">
                                    <CustomInput
                                        disabled={props.loading}
                                        value={props.handleValues('get', 'territory')}
                                        onChange={(e) => { props.handleValues('set', 'territory', e.target.value) }}
                                        type="territory"
                                        label={_lang('territory')}

                                    />
                                </div>
                            </>}

                        {props.handleValues('get', 'role') && (props.handleValues('get', 'role').index == constants.user_role.DESTRIBUTOR_ROLE || props.handleValues('get', 'role').index == constants.user_role.RETELLER_ROLE) &&
                            <>
                                <div className=" m-v-primary row">
                                    <CustomInput
                                        disabled={props.loading}
                                        value={props.handleValues('get', 'company_name')}
                                        onChange={(e) => { props.handleValues('set', 'company_name', e.target.value) }}
                                        type="text"
                                        label={_lang('company_name_field')}

                                    />
                                </div>
                                <div className=" m-v-primary row">
                                    <CustomInput
                                        disabled={props.loading}
                                        value={props.handleValues('get', 'gst_no')}
                                        onChange={(e) => { props.handleValues('set', 'gst_no', e.target.value) }}
                                        type="text"
                                        label={_lang('gst_no')}

                                    />
                                </div>
                            </>}

                        {
                            props.handleValues('get', 'role') && props.handleValues('get', 'role').index == constants.user_role.RETELLER_ROLE &&
                            <div className=" m-v-primary row">
                                <FormControl fullWidth={true} >
                                    <SearchDropDown

                                        getOptionLabel={(val) => {
                                            const option = getObjectBykey('_id', val, props.destributorList)
                                            if (option['name'] && option['usercode'] && option['name'] != "" && option['usercode'] != "") {
                                                return option['name'] + " (" + option['usercode'] + ")"
                                            }
                                            return ""
                                        }}
                                        renderOption={(defaultProps, val) => {
                                            const option = getObjectBykey('_id', val, props.destributorList)
                                            return (
                                                <Box component="li" {...defaultProps}>
                                                    {option['name'] && option['usercode'] && option['name'] != "" && option['usercode'] != "" ?
                                                        option['name'] + " (" + option['usercode'] + ")" : ""
                                                    }
                                                </Box>)
                                        }
                                        }
                                        list={props.destributorList && props.destributorList.length > 0 ? props.destributorList.map((val) => val._id) : []}

                                        value={props.handleValues('get', 'destributor_id')}
                                        label={_lang('destributor')}

                                        onChange={(val) => { props.handleValues('set', 'destributor_id', val) }}
                                    />
                                </FormControl>
                            </div>
                        }








                        <div className="row df center" style={{ height: '25px' }}>{props.loading && <SmallLoader />}</div>
                        <div className="row m-v-primary " style={{ marginBottom: "0px", zIndex: "11", backgroundColor: "white" }}>
                            {<Button disabled={props.loading} variant="contained" onClick={() => { if (props.calledFromUpdate) { props.updateUser() } else { props.creatUser() } }} className="row" >
                                {props.calledFromUpdate ? _lang('update') : _lang('create_user')}
                            </Button>}
                        </div>


                    </form>
                </div>

            </div>
        </>
    )
}
export default CreateAndUpdateUser