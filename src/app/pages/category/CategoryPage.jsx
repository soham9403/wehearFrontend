

import { Button, Typography } from "@mui/material"
import { _lang } from "../../../config/helper"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import { useState } from "react";
import { useSelector } from 'react-redux'

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



                <TableCell>
                    <div className="row">
                        {(user.role == constants.user_role.ADMIN || user.role == constants.user_role.SUPER_ADMIN) && <Button variant="contained" sx={{ m: 1 }}
                            onClick={() => { props.onUpdateBtnClick(row) }}
                        >{_lang('update')}</Button>}

                        {(user.role == constants.user_role.SUPER_ADMIN) && <Button variant="contained" sx={{ m: 1 }} color="error"
                            onClick={() => { props.onDeleteBtnClick(row) }}
                        >{_lang('delete')}</Button>}
                    </div>
                </TableCell>
            </TableRow>

        </>
    );
}
const CategoryPage = (props) => {

    return (
        <>
            <div className="df flex-1 p-v-primary" style={{ overflowY: "scroll" }}>
                <div className="we_container mt-3 table-card">
                    <div className="row space-between  mb-3 df" >
                        <div className="flex-1 df">
                            <Typography variant="h3">{_lang('category_list')}</Typography>
                        </div>
                        <Button variant="contained"
                            onClick={() => { props.onCreateBtnClick() }}
                        >{_lang('add_category')}</Button>
                    </div>

                    <TableContainer component={Paper}>

                        <Table aria-label="collapsible table">

                            <TableHead>

                                <TableRow>

                                    <TableCell>Name</TableCell>
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
export default CategoryPage