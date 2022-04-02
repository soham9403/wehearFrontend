

import { Button, FormControl, InputLabel, MenuItem, popoverClasses, Select, Switch, Tab, Tabs, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { dateToDDMMYYYY, _lang } from '../../../config/helper'


import { TablePagination } from "@mui/material"

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

import constants from "../../../config/constants";
import SmallLoader from '../../../component/common/SmallLoader'
import AnalysisCount from './AnalysisCount'
function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    const user = useSelector(state => state.user).data

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {row.box_qr_code_id}
                </TableCell>
                <TableCell >{row.mac_id}</TableCell>
                <TableCell >{dateToDDMMYYYY(_lang(row.packing_date))}</TableCell>
                <TableCell >{row.current_location}</TableCell>

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
            <TableRow sx={{ backgroundColor: "lightgray" }}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <div className="row df column">

                                {<>
                                    <Typography variant="h3">{_lang('product')}</Typography>

                                    <Table aria-label="table" sx={{ mb: 2 }}>

                                        <>
                                            <TableRow>
                                                <TableCell>  <span className="font-bold" variant="h3">{_lang('name')}</span></TableCell>
                                                <TableCell>  <span variant="h4">{_lang(row.product_id.name)}</span></TableCell>
                                            </TableRow>
                                        </>

                                    </Table>


                                </>}
                                {row.current_location == 'sold' && <>
                                    <Typography variant="h3">{_lang('customer_detils')}</Typography>

                                    <Table aria-label="table" sx={{ mb: 2 }}>

                                        <>
                                            <TableRow>
                                                <TableCell>  <span className="font-bold" variant="h3">{_lang('name')}</span></TableCell>
                                                <TableCell>  <span variant="h4">{_lang(row.customer_name)}</span></TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell>  <span className="font-bold" variant="h3">{_lang('email')}</span></TableCell>
                                                <TableCell>  <span variant="h4">{_lang(row.customer_email)}</span></TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell>  <span className="font-bold" variant="h3">{_lang('address')}</span></TableCell>
                                                <TableCell>  <span variant="h4">{_lang(row.customer_address)}</span></TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell>  <span className="font-bold" variant="h3">{_lang('phone')}</span></TableCell>
                                                <TableCell>  <span variant="h4">{_lang(row.customer_phone_no)}</span></TableCell>
                                            </TableRow>
                                        </>

                                    </Table>

                                    <Typography variant="h3">{_lang('sales_details')}</Typography>

                                    <Table aria-label="table" sx={{ mb: 2 }}>

                                        <>
                                            <TableRow>
                                                <TableCell>  <span className="font-bold" variant="h3">{_lang('sale_by')}</span></TableCell>
                                                <TableCell>  <span variant="h4">{_lang(row.sale_by.name) + (row.sale_by.usercode)}</span></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>  <span className="font-bold" variant="h3">{_lang('date')}</span></TableCell>
                                                <TableCell>  <span variant="h4">{dateToDDMMYYYY(_lang(row.sale_date))}</span></TableCell>
                                            </TableRow>


                                        </>

                                    </Table>
                                </>}
                                {row.allocated_user && row.current_location != 'sold' && <>
                                    <Typography variant="h3">{_lang('allocated_user')}</Typography>

                                    <Table aria-label="table" sx={{ mb: 2 }}>

                                        <>
                                            <TableRow>
                                                <TableCell>  <span className="font-bold" variant="h3">{_lang('name')}</span></TableCell>
                                                <TableCell>  <span variant="h4">{_lang(row.allocated_user.name) + ' ( ' + row.allocated_user.usercode + ' )'}</span></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>  <span className="font-bold" variant="h3">{_lang('email')}</span></TableCell>
                                                <TableCell>  <span variant="h4">{(_lang(row.allocated_user.email))}</span></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>  <span className="font-bold" variant="h3">{_lang('role')}</span></TableCell>
                                                <TableCell>  <span variant="h4">{(_lang('role_' + row.allocated_user.role))}</span></TableCell>
                                            </TableRow>


                                        </>

                                    </Table>
                                </>}





                                {<Typography variant="h3">{_lang('actions')}</Typography>}
                                <div className="row">
                                    {(user.role == constants.user_role.ADMIN || user.role == constants.user_role.SUPER_ADMIN || user.role == constants.user_role.PRODUCT_MANAGER)
                                        &&
                                        <>

                                            {row.current_location == 'checked' &&
                                                <Button variant="contained" sx={{ m: 1 }}
                                                    onClick={() => { props.onTransfer('store', row) }}
                                                >{_lang('transfer_to_store')}</Button>}

                                            {(row.current_location == 'checked' || (row.current_location != 'with_destributor' && row.current_location != 'with_reteller' && row.current_location != 'sold')) &&
                                                <Button variant="contained" sx={{ m: 1 }}
                                                    onClick={() => { props.onTransfer('destributor', row) }}
                                                >{_lang('transfer_to_destributor')}</Button>}



                                        </>
                                    }
                                    {(user.role == constants.user_role.ADMIN || user.role == constants.user_role.SUPER_ADMIN || user.role == constants.user_role.DESTRIBUTOR_ROLE)
                                        && <>
                                            {row.current_location != 'with_reteller' && row.current_location != 'sold' &&
                                                <Button variant="contained" sx={{ m: 1 }}
                                                    onClick={() => { props.onTransfer('reteller', row) }}
                                                >{_lang('transfer_to_reteller')}</Button>}
                                        </>

                                    }
                                    {(user.role == constants.user_role.ADMIN || user.role == constants.user_role.SUPER_ADMIN || user.role == constants.user_role.RETELLER_ROLE)
                                        &&
                                        <>
                                            {row.current_location != 'sold' &&
                                                <Button variant="contained" sx={{ m: 1 }}
                                                    onClick={() => { props.onTransfer('sold', row) }}
                                                >{_lang('sold')}</Button>}
                                        </>

                                    }
                                    {/* {(user.role != constants.user_role.RETELLER_ROLE && !row.verfied) && <Button variant="contained" sx={{ m: 1 }}
                                        onClick={() => { props.onVerifyBtnClick(row) }}
                                    >{_lang('verify')}</Button>}
                                    {(user.role == constants.user_role.SUPER_ADMIN) && <Button variant="contained" sx={{ m: 1 }} color="error"
                                        onClick={() => { props.onDeleteBtnClick(row) }}
                                    >{_lang('delete')}</Button>} */}
                                </div>

                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const UserDashboard = (props) => {
    const user = useSelector(state => state.user).data
    const userInventoryData = props.userInventoryData
    const params = useParams()
    const navigate = useNavigate()
    return (
        <div className="we_container m-v-primary">
            <AnalysisCount {...props} />
            <div className='row'>
                {/* <div className='m-v-primary row'>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={1} onChange={() => { navigate('/') }} aria-label="basic tabs example">
                            <Tab label={<Typography sx={{ textTransform: "none" }} variant='h4'>{_lang('latest_sales')}</Typography>} {...a11yProps(0)} />
                            <Tab label={<Typography sx={{ textTransform: "none" }} variant='h4'>{_lang('all')}</Typography>} {...a11yProps(1)} />
                        </Tabs>
                    </Box>

                </div> */}
                <div className='df flex-end' style={{ justifyContent: "flex-end" }}>
                    <div className='m-h-primary'>
                        <TextField value={props.filters.box_qr_code_id} onChange={(e) => { props.handleFilters('box_qr_code_id', e.target.value) }} id="filled-basic" label={_lang('search_by_qr_code')} variant="outlined" />
                    </div>
                    <div>
                        <TextField value={props.filters.search} onChange={(e) => { props.handleFilters('search', e.target.value) }} id="filled-basic" label={_lang('search')} variant="outlined" />
                    </div>
                </div>
                <div className='df flex-end space-between' >
                    <div className='mass-transfer df column'>
                        <Button variant='contained' color='primary' onClick={props.onMassTransffer}>

                            {_lang('mass_transfer')}

                        </Button>
                        <Button variant='contained' sx={{ mt: 1 }} color='primary' onClick={props.exportCsv}>

                            {_lang('export')}

                        </Button>
                    </div>
                    <div>
                        <div className='df column center'>
                            <Typography variant='subtitle2'> {_lang('only_b2c')}</Typography>
                            <Switch
                                checked={props.filters.is_b2c == 'true'}
                                onChange={(e) => { props.handleFilters('is_b2c', e.target.checked ? 'true' : 'false') }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-helper-label">{_lang('status')}</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={props.filters.current_location}
                                label={_lang('status')}
                                onChange={(e) => { props.handleFilters('current_location', e.target.value) }}
                            >
                                <MenuItem value="" selected>
                                    <em>{_lang('all')}</em>
                                </MenuItem>

                                {user.role != constants.user_role.DESTRIBUTOR_ROLE && user.role != constants.user_role.RETELLER_ROLE &&

                                    <MenuItem value={'checked'}>{_lang('checked')}</MenuItem>}
                                {user.role != constants.user_role.DESTRIBUTOR_ROLE && user.role != constants.user_role.RETELLER_ROLE && <MenuItem value={'store'}>{_lang('store')}</MenuItem>}


                                {user.role != constants.user_role.DESTRIBUTOR_ROLE && user.role != constants.user_role.RETELLER_ROLE && <MenuItem value={'with_destributor'}>{_lang('with_destributor')}</MenuItem>}
                                {user.role != constants.user_role.DESTRIBUTOR_ROLE && user.role != constants.user_role.RETELLER_ROLE && <MenuItem value={'with_reteller'}>{_lang('with_reteller')}</MenuItem>}


                                <MenuItem value={'sold'}>{_lang('sold')}</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-helper-label">{_lang('type')}</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={props.filters.inventoryType}
                                label={_lang('type')}
                                onChange={(e) => { props.handleFilters('inventoryType', e.target.value) }}
                            >
                                <MenuItem value="" selected>
                                    <em>{_lang('all')}</em>
                                </MenuItem>

                                <MenuItem value={'product'}>{_lang('product')}</MenuItem>
                                <MenuItem value={'marketing_material'}>{_lang('marketing_material')}</MenuItem>

                            </Select>
                        </FormControl>
                    </div>

                </div>
                {props.data && props.data.total != 0 &&
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={props.data.total}
                        rowsPerPage={props.filters.page_size}
                        page={(props.filters.page_no) - 1}
                        onPageChange={(e, page) => { props.handleFilters('page_no', page + 1) }}
                        onRowsPerPageChange={(e) => { props.handleFilters('page_size', e.target.value) }}
                    />}
                <TableContainer component={Paper}>

                    <Table aria-label="collapsible table">

                        <TableHead>

                            <TableRow>

                                <TableCell>Box QR</TableCell>
                                <TableCell >MAC id</TableCell>
                                <TableCell >Packing Date</TableCell>
                                <TableCell >location</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!props.loading && props.data && props.data.result && props.data.result.map((row, index) => (
                                <Row key={row._id} {...props} row={{ ...row, id: props.data }} />
                            ))}
                            {
                                props.loading && <TableRow> <TableCell colSpan={4} className='df center row '><SmallLoader /></TableCell></TableRow>
                            }
                        </TableBody>
                    </Table>
                    {props.data && props.data.total != 0 && <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={props.data.total}
                        rowsPerPage={props.filters.page_size}
                        page={(props.filters.page_no) - 1}
                        onPageChange={(e, page) => { props.handleFilters('page_no', page + 1) }}
                        onRowsPerPageChange={(e) => { props.handleFilters('page_size', e.target.value) }}
                    />}
                </TableContainer>
            </div>
        </div>
    )
}
export default UserDashboard