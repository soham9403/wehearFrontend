

import { Button, Grid, TablePagination, Typography } from "@mui/material"
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

                <TableCell >{row.color !='' &&<div style={{ height: '30px', width: '30px', background: constants.color[row.color] }}></div>}</TableCell>
                <TableCell >{row.type}</TableCell>

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
                            <div className="row column">
                                <Typography variant="h4">{_lang('actions')}</Typography>
                                <div className="row">
                                    {(user.role == constants.user_role.ADMIN || user.role == constants.user_role.SUPER_ADMIN) && <Button variant="contained" sx={{ m: 1 }}
                                        onClick={() => { props.onUpdateBtnClick(row) }}
                                    >{_lang('update')}</Button>}

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
const ProductPage = (props) => {
    console.log(props.data)
    return (
        <>
            <div className="df flex-1 p-v-primary" style={{ overflowY: "scroll" }}>
                <div className="we_container mt-3 table-card">




                    <div className="row space-between  mb-3 df" >
                        <div className="flex-1 df">
                            <Typography variant="h3">{_lang('product_list')}</Typography>
                        </div>
                        <Button variant="contained"
                            onClick={() => { props.onCreateBtnClick() }}
                        >{_lang('add_product')}</Button>
                    </div>

                    <TableContainer component={Paper}>

                        <Table aria-label="collapsible table">

                            <TableHead>

                                <TableRow>

                                    <TableCell>Name</TableCell>
                                    <TableCell >Color</TableCell>
                                    <TableCell >type</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.data && props.data && props.data.map((row, index) => (
                                    <Row key={row._id} {...props} row={{ ...row }} />
                                ))}
                            </TableBody>
                        </Table>

                    </TableContainer>
                </div>
            </div>
        </>
    )
}
export default ProductPage