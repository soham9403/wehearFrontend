

import { Button, Grid, TablePagination, Typography } from "@mui/material"
import { dateToDDMMYYYY, _lang } from "../../../config/helper"
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
import Loader from "../../../component/common/Loader";

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    const user = useSelector(state => state.user).data

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {row.to.name + `(${row.to.usercode})`}
                </TableCell>

                <TableCell >{row.from.name + `(${row.from.usercode})`}</TableCell>
                <TableCell >{row.count}</TableCell>
                <TableCell >{row.by.name + `(${row.by.usercode})`}</TableCell>
                <TableCell >{dateToDDMMYYYY(row.createdAt)}</TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >

                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <div className="row column">
                                <Typography variant="h4">{_lang('actions')}</Typography>
                                <div className="row">
                                    {(user.role == constants.user_role.ADMIN || user.role == constants.user_role.SUPER_ADMIN) && <Button variant="contained" sx={{ m: 1 }}
                                        onClick={() => { props.onRevertButtonClick(row) }}
                                    >{_lang('revert')}</Button>}

                                 
                                </div>

                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
const TransferLogs = (props) => {

    return (
        <>
            <div className="df flex-1 p-v-primary" style={{ overflowY: "scroll" }}>
                <div className="we_container mt-3 table-card">

                    <div className="row space-between  mb-3 df" >
                        <div className="flex-1 df">
                            <Typography variant="h3">{_lang('transfer_logs')}</Typography>
                        </div>
                       
                    </div>
                    {props.filters && props.count && props.count>0 && <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={props.count}
                        rowsPerPage={props.filters.page_size}
                        page={(props.filters.page_no) - 1}
                        onPageChange={(e, page) => { props.handleFilters('page_no', page + 1) }}
                        onRowsPerPageChange={(e) => { props.handleFilters('page_size', e.target.value) }}
                    />}
                    <TableContainer component={Paper}>

                        <Table aria-label="collapsible table">

                            <TableHead>

                                <TableRow>

                                    <TableCell>{_lang('to')}</TableCell>
                                    <TableCell >{_lang('from')}</TableCell>
                                    <TableCell >{_lang('count')}</TableCell>
                                    <TableCell >{_lang('by')}</TableCell>
                                    <TableCell >{_lang('date')}</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!props.loading && props.data && props.data && props.data.map((row, index) => (
                                    <Row key={row._id} {...props} row={{ ...row }} />
                                ))}

                                {
                                    props.loading && <TableRow  > <TableCell colSpan={5}><div className="df row center">
                                        <Loader />
                                    </div></TableCell></TableRow>
                                }
                            </TableBody>
                        </Table>

                    </TableContainer>
                </div>
            </div>
        </>
    )
}
export default TransferLogs