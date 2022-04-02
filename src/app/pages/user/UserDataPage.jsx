
import { Button, Grid, TablePagination, TextField, Typography } from "@mui/material"
import { _lang } from "../../../config/helper"
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import constants from "../../../config/constants";
function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    const user = useSelector(state => state.user).data

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell ><Link to={"/dashboard/" + row.usercode}>{row.usercode}</Link></TableCell>
                <TableCell >{row.email}</TableCell>
                <TableCell >{row.phone_no}</TableCell>
                <TableCell >{_lang('role_' + row.role)}</TableCell>

                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >

                        {(!row.verfied || (user.role == constants.user_role.ADMIN || user.role == constants.user_role.SUPER_ADMIN)) && <>{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</>}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <div className="row df column">

                                <Table aria-label="table" sx={{ mb: 2 }}>
                                    {row.territory != '' && <TableRow>
                                        <TableCell>  <span className="font-bold" variant="h3">{_lang('territory')}</span></TableCell>
                                        <TableCell>  <span variant="h4">{_lang(row.territory)}</span></TableCell>
                                    </TableRow>}
                                    <TableRow>
                                        <TableCell>  <span className="font-bold" variant="h3">{_lang('company_name_field')}</span></TableCell>
                                        <TableCell>  <span variant="h4">{_lang(row.company_name)}</span></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>  <span className="font-bold" variant="h3">{_lang('gst_no')}</span></TableCell>
                                        <TableCell>  <span variant="h4">{_lang(row.gst_no)}</span></TableCell>
                                    </TableRow>
                                </Table>
                                <Typography variant="h3">{_lang('actions')}</Typography>
                                <div className="row">
                                    {(user.role == constants.user_role.ADMIN || user.role == constants.user_role.SUPER_ADMIN) && <Button variant="contained" sx={{ m: 1 }}
                                        onClick={() => { props.onUpdateBtnClick(row) }}
                                    >{_lang('update')}</Button>}
                                    {(user.role != constants.user_role.RETELLER_ROLE && !row.verfied) && <Button variant="contained" sx={{ m: 1 }}
                                        onClick={() => { props.onVerifyBtnClick(row) }}
                                    >{_lang('verify')}</Button>}
                                    {(user.role == constants.user_role.SUPER_ADMIN) && <Button variant="contained" sx={{ m: 1 }} color="error"
                                        onClick={() => { props.onDeleteBtnClick(row) }}
                                    >{_lang('delete')}</Button>}
                                </div>

                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
const UserDataPage = (props) => {
    const user = useSelector(state => state.user).data
    return <>
        <div className="df flex-1 p-v-primary" style={{ overflowY: "scroll" }}>
            <div className="we_container">
                <Grid container spacing={2}>


                    {props.usercount && props.usercount.length > 0 &&
                        <>
                            <Grid xs={6} md={3} container item>

                                <Button variant={props.filters.role == '' ? 'contained' : 'outlined'} onClick={() => { if (props.filters.role != '') { props.handleFilters('role', '') } }} className='df fit-content center column p-primary border-primary radius-primary' style={{ textTransform: "none" }}>

                                    <Typography variant='h3' >{props.usercount.reduce((sum, ele) => { return sum + parseInt(ele.count) }, 0)}</Typography>
                                    <div className="m-v-primary" style={{ marginBottom: "0px" }}>
                                        <Typography variant='h4'   >{_lang('all')}</Typography>
                                    </div>

                                </Button>

                            </Grid>
                            {props.usercount.map((data, index) => {
                                return (
                                    <>
                                        <Grid xs={6} md={3} container key={index} item>

                                            <Button
                                                variant={props.filters.role == data._id.role && props.filters.verified == data._id.verfied ? 'contained' : 'outlined'} onClick={() => { if (props.filters.role != data._id.role || props.filters.verified != data._id.verfied) { props.handleFilters(['role', 'verified'], [data._id.role, data._id.verfied]) } }}
                                                className='df fit-content center column p-primary border-primary radius-primary' style={{ textTransform: "none" }}
                                            >

                                                <Typography variant='h3' >{data.count}</Typography>
                                                <div className="m-v-primary" style={{ marginBottom: "0px" }}>
                                                    <Typography variant='h4'   >{_lang('role_' + data._id.role)}{!data._id.verfied && <span style={{ color: 'red' }}> *</span>}</Typography>
                                                </div>

                                            </Button>

                                        </Grid>
                                    </>
                                )
                            })}
                        </>


                    }
                </Grid>



                <div className="row space-between m-v-primary df" >
                    <div className="flex-1 df">
                        <Typography variant="h3">{_lang('user_list')}</Typography>
                    </div>
                    {(user.role == constants.user_role.SUPER_ADMIN || user.role == constants.user_role.TEAM_ADMIN || user.role == constants.user_role.ADMIN) && <Button variant="contained"
                        onClick={() => { props.onCreateBtnClick() }}
                    >{_lang('create_user')}</Button>}
                </div>
                <div className="row space-between df">
                    <div></div>

                    <TextField value={props.filters.search} onChange={(e) => { props.handleFilters('search', e.target.value) }} id="filled-basic" label={_lang('search')} variant="outlined" />
                </div>
                {props.userData && props.userData.total && <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={props.userData.total}
                    rowsPerPage={props.userData.page_size}
                    page={(props.userData.page_no) - 1}
                    onPageChange={(e, page) => { props.handleFilters('page_no', page + 1) }}
                    onRowsPerPageChange={(e) => { props.handleFilters('page_size', e.target.value) }}
                />}
                <TableContainer component={Paper}>

                    <Table aria-label="collapsible table">

                        <TableHead>

                            <TableRow>

                                <TableCell>{_lang('name')}</TableCell>
                                <TableCell >{_lang('usercode')}</TableCell>
                                <TableCell >{_lang('email')}</TableCell>
                                <TableCell >{_lang('phone')}</TableCell>
                                <TableCell >{_lang('role')}</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.userData && props.userData.result && props.userData.result.map((row, index) => (
                                <Row key={row._id} {...props} row={{ ...row, id: props.userData }} />
                            ))}
                        </TableBody>
                    </Table>
                    {props.userData && props.userData.total && <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={props.userData.total}
                        rowsPerPage={props.userData.page_size}
                        page={(props.userData.page_no) - 1}
                        onPageChange={(e, page) => { props.handleFilters('page_no', page + 1) }}
                        onRowsPerPageChange={(e) => { props.handleFilters('page_size', e.target.value) }}
                    />}
                </TableContainer>
            </div>
        </div>
    </>
}
export default UserDataPage