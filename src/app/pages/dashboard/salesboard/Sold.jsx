import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    popoverClasses,
    Select,
    Switch,
    Tab,
    Tabs,
    TextField,
    Typography
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { accessControllByRole, dateToDDMMYYYY, _lang } from '../../../../config/helper'

import { TablePagination } from '@mui/material'

import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import constants from '../../../../config/constants'
import SmallLoader from '../../../../component/common/SmallLoader'

import CustomInput from '../../../../component/common/CustomInput'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
function Row(props) {
    const { row } = props
    const [open, setOpen] = useState(false)

    const user = useSelector(state => state.user).data

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component='th' scope='row'>
                    {dateToDDMMYYYY(_lang(row.sale_date))}

                </TableCell>
                <TableCell>{row.box_qr_code_id}</TableCell>

                <TableCell>{row.customer_name}</TableCell>
                <TableCell>{row.invoice_value}</TableCell>
                <TableCell>{row.sale_by.name + " (" + row.sale_by.usercode + ")"}</TableCell>

                <TableCell>
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        {(!row.verfied ||
                            user.role == constants.user_role.ADMIN ||
                            user.role == constants.user_role.SUPER_ADMIN) && (
                                <>{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</>
                            )}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#EBEBEB' }}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <div className='row df column'>
                                <Grid container spacing={2}>

                                    <Grid container item md={6}>  <>
                                        <Typography variant='h3'>
                                            {_lang('customer_detils')}
                                        </Typography>

                                        <Table aria-label='table' sx={{ mb: 2 }}>
                                            <>
                                                <TableRow>
                                                    <TableCell>
                                                        {' '}
                                                        <span className='font-bold' variant='h3'>
                                                            {_lang('name')} :
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        {' '}
                                                        <span variant='h4'>{_lang(row.customer_name)}</span>
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>
                                                        {' '}
                                                        <span className='font-bold' variant='h3'>
                                                            {_lang('email')} :
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        {' '}
                                                        <span variant='h4'>
                                                            {_lang(row.customer_email)}
                                                        </span>
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>
                                                        {' '}
                                                        <span className='font-bold' variant='h3'>
                                                            {_lang('address')} :
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        {' '}
                                                        <span variant='h4'>
                                                            {_lang(row.customer_address)}
                                                        </span>
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>
                                                        {' '}
                                                        <span className='font-bold' variant='h3'>
                                                            {_lang('phone')} :
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        {' '}
                                                        <span variant='h4'>
                                                            {_lang(row.customer_phone_no)}
                                                        </span>
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        </Table>
                                        <>
                                            <Typography variant='h3'>{_lang('product')}</Typography>

                                            <Table aria-label='table' sx={{ mb: 2 }}>
                                                <>
                                                    <TableRow>
                                                        <TableCell>
                                                            {' '}
                                                            <span className='font-bold' variant='h3'>
                                                                {_lang('name')} :
                                                            </span>
                                                        </TableCell>
                                                        <TableCell>
                                                            {' '}
                                                            <span variant='h4'>
                                                                {_lang(row.product_id.name)}
                                                            </span>
                                                        </TableCell>
                                                    </TableRow>
                                                </>
                                            </Table>
                                        </>

                                    </></Grid>
                                    <Grid container item md={6}>
                                        {
                                            <div className='df row column'>
                                                <Typography variant='h3'>
                                                    {_lang('sales_details')} 
                                                </Typography>

                                                <Table aria-label='table' sx={{ mb: 2 }}>
                                                    <>
                                                        <TableRow>
                                                            <TableCell>
                                                                {' '}
                                                                <span className='font-bold' variant='h3'>
                                                                    {_lang('sale_by')} :
                                                                </span>
                                                            </TableCell>
                                                            <TableCell>
                                                                {' '}
                                                                <span variant='h4'>
                                                                    {_lang(row.sale_by.name) + row.sale_by.usercode}
                                                                </span>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>
                                                                {' '}
                                                                <span className='font-bold' variant='h3'>
                                                                    {_lang('date')} :
                                                                </span>
                                                            </TableCell>
                                                            <TableCell>
                                                                {' '}
                                                                <span variant='h4'>
                                                                    {dateToDDMMYYYY(_lang(row.sale_date))}
                                                                </span>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>
                                                                {' '}
                                                                <span className='font-bold' variant='h3'>
                                                                    {_lang('invoice_value')}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell>
                                                                {' '}
                                                                <span variant='h4'>
                                                                    {row.invoice_value}
                                                                </span>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>
                                                                {' '}
                                                                <span className='font-bold' variant='h3'>
                                                                    {_lang('invoice_number')}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell>
                                                                {' '}
                                                                <span variant='h4'>
                                                                    {row.invoice_number}
                                                                </span>
                                                            </TableCell>
                                                        </TableRow>
                                                    </>
                                                </Table>
                                            </div>
                                        }
                                    </Grid>
                                </Grid>





                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    }
}
const Sold = props => {
    const user = useSelector(state => state.user).data
    // const userInventoryData = props.userInventoryData
    // const params = useParams()
    // const navigate = useNavigate()
    return (
        <>
            <div className='we_container '>
                <div className='row'>
                    <div className="filter-area df row">
                        <div className='df column'>
                            <div className='h-100 df column space-between'>
                                {/* <button onClick={props.onMassTransffer} className='mb-3 h5 df center letter-space-2 extraa-btns radius-3 pointer df  bg-secondary text-light'>
                                    {_lang('mass_transfer')}
                                </button> */}
                                <button onClick={props.exportCsv} className=' h5 df center letter-space-2 extraa-btns radius-3 pointer df  bg-secondary text-light'>
                                    {_lang('export')}
                                </button>
                                {accessControllByRole(user.role,'RETE_DES_CHANNEL_TOGGLE_BTN',true) && <div className='custom-toggle-button-container radius-3 custom-toggle-button-container-mt custom-toggle-button-container-mr'>
                                    <button onClick={() => { props.handleFilters('isB2C', false) }} className={`custom-toggle-button h6 ${!props.filters.isB2C ? 'bg-secondary text-light' : 'text-secondary pointer'}`} >All</button>
                                    <button onClick={() => { props.handleFilters('isB2C', true) }} className={`custom-toggle-button h6 ${props.filters.isB2C ? 'bg-secondary text-light' : 'text-secondary pointer'}`}>B2C</button>

                                </div>}
                            </div>
                        </div>
                        <div className='df column flex-1' style={{ alignItems: "flex-end" }}>
                            <div className='df row' style={{ maxWidth: "48vw", width: "100%" }}>
                                <CustomInput
                                    disabled={false}
                                    on_side_btn_click={props.filters.box_qr_code_id == '' ? () => { } : () => { props.handleFilters('box_qr_code_id', '') }}
                                    side_icon={props.filters.box_qr_code_id == '' ? <SearchIcon fontSize={'20'} /> : <CloseIcon fontSize={'20'} />}
                                    value={props.filters.box_qr_code_id}
                                    onChange={e => {
                                        props.handleFilters('box_qr_code_id', e.target.value)
                                    }}
                                    type="side-icon"
                                    label={_lang("search_by_qr_code")}
                                />
                                <div className="ml-1"></div>
                                <CustomInput
                                    disabled={false}
                                    on_side_btn_click={props.filters.search == '' ? () => { } : () => { props.handleFilters('search', '') }}
                                    side_icon={props.filters.search == '' ? <SearchIcon fontSize={'20'} /> : <CloseIcon fontSize={'20'} />}

                                    type="side-icon"


                                    value={props.filters.search}
                                    onChange={e => {
                                        props.handleFilters('search', e.target.value)
                                    }}
                                    id='filled-basic'
                                    label={_lang('search')}

                                />
                            </div>
                            <div className='df row flex-end'>
                                {/* <div className='custom-toggle-button-container radius-3 custom-toggle-button-container-mt custom-toggle-button-container-mr'>
                                    <button className='custom-toggle-button h6 bg-secondary text-light'>Reseller</button>
                                    <button className='custom-toggle-button h6 pointer text-secondary'>Destributor</button>

                                </div> */}

                                <div className='custom-toggle-button-container radius-3 custom-toggle-button-container-mt '>
                                    <button className={props.filters.inventoryType == '' ? 'custom-toggle-button h6 bg-secondary text-light ' : 'custom-toggle-button h6 pointer text-secondary'}



                                        onClick={e => {
                                            props.handleFilters('inventoryType', '')
                                        }}>All</button>
                                    <button className={props.filters.inventoryType == 'product' ? 'custom-toggle-button h6 bg-secondary text-light ' : 'custom-toggle-button h6 pointer text-secondary'}


                                        label={_lang('type')}
                                        onClick={e => {
                                            props.handleFilters('inventoryType', 'product')
                                        }}>Product</button>

                                    <button className={props.filters.inventoryType == 'marketing_material' ? 'custom-toggle-button h6 bg-secondary text-light ' : 'custom-toggle-button h6 pointer text-secondary'}


                                        label={_lang('type')}
                                        onClick={e => {
                                            props.handleFilters('inventoryType', 'marketing_material')
                                        }}>Marketing Material</button>

                                </div>
                            </div>
                        </div>
                    </div>



                    <div className='row table-card radius-1'>
                        <div className='df row space-between'>
                            <h3 className='h3 mb-3'>
                                {_lang('latest_sales')}
                            </h3>
                            {props.data && props.data.total != 0 && (
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component='div'
                                    count={props.data.total}
                                    rowsPerPage={props.filters.pageSize}
                                    page={props.filters.pageNo - 1}
                                    onPageChange={(e, page) => {
                                        props.handleFilters('pageNo', page + 1)
                                    }}
                                    onRowsPerPageChange={e => {
                                        props.handleFilters('pageSize', e.target.value)
                                    }}
                                />
                            )}
                        </div>

                        <TableContainer component={Paper}>
                            <Table aria-label='collapsible table'>
                                <TableHead >
                                    <TableRow>
                                        <TableCell>Sale date</TableCell>
                                        <TableCell>Product ID</TableCell>
                                        <TableCell>Customer Name</TableCell>
                                        <TableCell>Invoice value</TableCell>
                                        <TableCell>Sold by</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {!props.loading &&
                                        props.data &&
                                        props.data.result &&
                                        props.data.result.map((row, index) => (
                                            <Row
                                                key={row._id}
                                                {...props}
                                                row={{ ...row, id: props.data }}
                                            />
                                        ))}
                                    {props.loading && (
                                        <TableRow>
                                            {' '}
                                            <TableCell colSpan={4} className='df center row '>
                                                <SmallLoader />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            {props.data && props.data.total != 0 && (
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component='div'
                                    count={props.data.total}
                                    rowsPerPage={props.filters.pageSize}
                                    page={props.filters.pageNo - 1}
                                    onPageChange={(e, page) => {
                                        props.handleFilters('pageNo', page + 1)
                                    }}
                                    onRowsPerPageChange={e => {
                                        props.handleFilters('pageSize', e.target.value)
                                    }}
                                />
                            )}
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Sold
