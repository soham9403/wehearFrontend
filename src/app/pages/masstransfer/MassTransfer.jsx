import { Box, Button, TableBody, Checkbox, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, TableFooter } from "@mui/material"
import { useState } from "react";
import SearchDropDown from "../../../component/common/SearchDropDown"
import SmallLoader from "../../../component/common/SmallLoader";
import constants from "../../../config/constants"
import { _lang } from "../../../config/helper"
function Row(props) {
    const { row } = props;
    console.log(row)

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    <Checkbox checked={row.checked} onChange={(e) => { props.checkUncheck(props.index, e.target.checked) }} color="default" />

                </TableCell>
                <TableCell component="th" scope="row">
                    {row.box_qr_code_id}
                </TableCell>


            </TableRow>

        </>
    );
}
const MassTransfer = (props) => {

    return (
        <>
            <div className="we-container-small  df column radius-2">
                <div className="df row column profile-edit-form" >
                    <h4 className="h3" color={"green"} >{props.handleValues('get', 'successMsg')}</h4>
                    {
                        props.type == '' &&
                        <div className="df row">
                            <div className="row df column">
                                <h4 className="h4 df row">Whom You want to tarnsfer?</h4>

                                <div className="df row row-center">
                                    <button onClick={(e) => { props.setType('destributor') }} className="auth-submit-btn df flex-1 mr-2 center text-light  pointer h5 btn-gradient">{_lang('destributor')}</button>
                                    <button onClick={(e) => { props.setType('retteler') }} className="auth-submit-btn df flex-1 center text-light  pointer h5 btn-gradient">{_lang('reteller')}</button>
                                </div>

                            </div>
                        </div>
                    }

                    {(props.type == 'retteler' || props.type == 'destributor') && props.type != '' && props.userData.role != constants.user_role.DESTRIBUTOR_ROLE &&
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
                        props.type != '' &&

                        <div className="row df center form-filed">
                            <TextField
                                required
                                id="outlined-required"
                                label={_lang('start')}
                                value={props.handleValues('get', 'rangeFrom')}
                                onChange={(e) => { props.handleValues('set', 'rangeFrom', e.target.value) }}
                            />
                            <Typography variant="h4" sx={{ m: 1 }}>-</Typography>
                            <TextField
                                required
                                id="outlined-required"
                                label={_lang('end')}
                                value={props.handleValues('get', 'rangeTo')}
                                onChange={(e) => { props.handleValues('set', 'rangeTo', e.target.value) }}
                            />
                        </div>


                    }

                    <div className="row form-filed">
                        <Typography align="center" color={"red"}>{props.handleValues('get', 'err')}</Typography>
                    </div>

                    {props.type != '' &&
                        <div className="row center df form-filed">
                            <button className="auth-submit-btn df center text-light row pointer h3 btn-gradient" variant="contained" onClick={props.getRangedData} >
                                {_lang('show_list')}
                            </button>
                        </div>

                    }
                    {!props.loading && props.transferAvailableList.list.length > 0 &&
                        <TableContainer component={Paper}>

                            <Table aria-label="collapsible table">

                                <TableHead>

                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Box QR</TableCell>

                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {!props.loading && props.transferAvailableList && props.transferAvailableList.list.length > 0 && props.transferAvailableList.list.map((row, index) => (
                                        <Row key={row._id} {...props} index={index} row={{ ...row, id: props.data }} />
                                    ))}

                                </TableBody>
                                <TableFooter>
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
            </div>
        </>
    )
}
export default MassTransfer