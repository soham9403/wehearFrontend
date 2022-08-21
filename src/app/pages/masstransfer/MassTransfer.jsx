import { Box, Button, TableBody, Checkbox, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, TableFooter } from "@mui/material"
import { useState } from "react";
import CustomInput from "../../../component/common/CustomInput";
import SearchDropDown from "../../../component/common/SearchDropDown"
import SmallLoader from "../../../component/common/SmallLoader";
import constants from "../../../config/constants"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { accessControllByRole, _lang } from "../../../config/helper"
import { useSelector } from "react-redux";
function Row(props) {
    const { row } = props;


    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    <Checkbox checked={row.checked} onChange={(e) => { props.checkUncheck(row._id, e.target.checked) }} color="default" />

                </TableCell>
                <TableCell component="th" scope="row">
                    {row.box_qr_code_id}
                </TableCell>


            </TableRow>

        </>
    );
}
const MassTransfer = (props) => {
    const categories = useSelector(state => state.category).data
    return (
        <>
            <div className="we-container-small  df column radius-2" style={{ overflow: "hidden" }}>
                <div className="df row column profile-edit-form pt-3" style={{ overflow: "hidden" }}>
                    <h4 className="h3" color={"green"} >{props.handleValues('get', 'successMsg')}</h4>
                    {
                        props.type == '' &&
                        <div className="df row ">
                            <div className="row df column">
                                <h4 className="h4 df row">Whom You want to tarnsfer?</h4>

                                <div className="df row row-center">
                                    {accessControllByRole(props.userData.role, "STORE_AND_DESTRIBUTOR_TRANSFER_BUTTON") && <button onClick={(e) => { props.setType('destributor') }} className="auth-submit-btn df flex-1 mr-2 center text-light  pointer h5 btn-gradient">{_lang('destributor')}</button>}
                                    {accessControllByRole(props.userData.role, "RETAILLER_TRANSFER_BUTTON") && <button onClick={(e) => { props.setType('retteler') }} className="auth-submit-btn df flex-1 center text-light  pointer h5 btn-gradient">{_lang('reteller')}</button>}
                                </div>

                            </div>
                        </div>
                    }

                    {(props.type == 'retteler' || props.type == 'destributor') && props.type != '' && accessControllByRole(props.userData.role, "STORE_AND_DESTRIBUTOR_TRANSFER_BUTTON") &&
                        <div className="df row form-filed">

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
                                    list={props.destributorList ? props.destributorList.data : []}

                                    value={props.handleValues('get', props.type == 'destributor' ? 'allocated_user' : 'allocated_destributor')}
                                    label={_lang('destributor')}

                                    onChange={(val) => { props.handleValues('set', props.type == 'destributor' ? 'allocated_user' : 'allocated_destributor', val) }}
                                />
                            </FormControl>
                        </div>
                    }

                    {(props.type == 'retteler') && props.type != '' &&
                        <div className="row form-filed">

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
                                    list={props.list ? props.list : []}

                                    value={props.handleValues('get', 'allocated_user')}
                                    label={_lang('reteller')}

                                    onChange={(val) => { props.handleValues('set', 'allocated_user', val) }}
                                />
                            </FormControl>
                        </div>
                    }


                    {

                        accessControllByRole(props.userData.role, "ONLY_TEAM") && props.type != '' &&
                        <div className="row form-filed">

                            <FormControl fullWidth={true} >
                                <SearchDropDown

                                    getOptionLabel={(option) => {
                                        return option['name']
                                    }}
                                    renderOption={(defaultProps, option) => (

                                        <Box component="li" {...defaultProps}>
                                            {option['name']}
                                        </Box>
                                    )}
                                    list={categories ? categories : []}

                                    value={props.handleValues('get', 'category')}
                                    label={_lang('category')}

                                    onChange={(val) => { props.handleValues('set', 'category', val) }}
                                />
                            </FormControl>
                        </div>
                    }
                    {props.handleValues('get', 'err') && <div className="row form-filed">
                        <Typography align="center" color={"red"}>{props.handleValues('get', 'err')}</Typography>
                    </div>}
                    {
                        !(props.transferAvailableList && Object.values(props.transferAvailableList.list).length > 0) && props.type != '' && <h1 className="df center row h2">
                            No Data
                        </h1>
                    }


                    {!props.loading && Object.values(props.transferAvailableList.list).length > 0 &&
                        <TableContainer component={Paper}>

                            <Table aria-label="collapsible table">

                                <TableHead className="p-sticky">

                                    <TableRow>
                                        <TableCell ></TableCell>
                                        <TableCell>Box QR</TableCell>

                                    </TableRow>

                                </TableHead>

                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={2} >
                                            <div className="df row">
                                                <div className="df mr-1">
                                                    <Checkbox title="check All" checked={!props.loading && props.transferAvailableList && Object.values(props.transferAvailableList.list).length > 0 && Object.values(props.transferAvailableList.list).filter((row, index) => {
                                                        return !row.checked
                                                    }).length == 0} onChange={(e) => { props.checkUncheckAll(e.target.checked) }} color="default" />
                                                </div>

                                                <div className="df flex-1">
                                                    <CustomInput
                                                        disabled={false}
                                                        on_side_btn_click={props.listFilter.searchStr == '' ? () => { } : () => { props.setListFilters({ ...props.listFilter, searchStr: '' }) }}
                                                        side_icon={props.listFilter.searchStr == '' ? <SearchIcon fontSize={'20'} /> : <CloseIcon fontSize={'20'} />}
                                                        value={props.listFilter.searchStr}
                                                        onChange={e => {
                                                            props.setListFilters({ ...props.listFilter, searchStr: e.target.value })
                                                            // props.handleFilters('box_qr_code_id', e.target.value)
                                                        }}
                                                        type="side-icon"
                                                        label={_lang("search_by_qr_code")}
                                                    />
                                                </div>
                                            </div>


                                        </TableCell>

                                        {/* <TableCell>Box QR</TableCell> */}

                                    </TableRow>

                                    { props.transferAvailableList && Object.values(props.transferAvailableList.list).length > 0 && Object.values(props.transferAvailableList.list).filter((row, index) => {
                                        return row.box_qr_code_id.includes(props.listFilter.searchStr)
                                    }).map((row, index) => {
                                        return <Row key={row._id} {...props} index={index} row={{ ...row, id: props.data }} />
                                    })}

                                </TableBody>
                                <TableFooter className="p-sticky-bottom bg-light">
                                    <TableCell >
                                        <Typography variant="h3" >{_lang(props.transferAvailableList.totalChecked + " / " + props.transferAvailableList.total)}</Typography>
                                    </TableCell>
                                    <TableCell >
                                        <Button variant="contained" disabled={props.loading} onClick={props.transferMass}>{_lang('transfer')}</Button>
                                    </TableCell>
                                </TableFooter>
                            </Table>

                        </TableContainer>
                    }
                    {
                        props.loading && <TableRow> <TableCell colSpan={4} className='df center row '><SmallLoader /></TableCell></TableRow>
                    }
                </div>


                {
                    props.type != '' &&
                    <>
                        <div className="row df center form-filed mt-2">
                            <div className="df flex-1">
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label={_lang('start')}
                                    value={props.handleValues('get', 'rangeFrom')}
                                    onChange={(e) => { props.handleValues('set', 'rangeFrom', e.target.value) }}
                                />
                            </div>
                            <h3 className="h4 p-3" sx={{ m: 1 }}>-</h3>
                            <div className="df flex-1">
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label={_lang('end')}
                                    value={props.handleValues('get', 'rangeTo')}
                                    onChange={(e) => { props.handleValues('set', 'rangeTo', e.target.value) }}
                                />
                            </div>
                        </div>



                        <div className="row center df form-filed">
                            <button disabled={props.listLoading} className="auth-submit-btn df center text-light row pointer h3 btn-gradient" variant="contained" onClick={props.getRangedData} >
                                {props.listLoading ? _lang('loading') : _lang('show_list')}
                            </button>
                        </div>
                    </>
                }

            </div>
        </>
    )
}
export default MassTransfer