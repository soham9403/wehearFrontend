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
import SearchDropDown from '../../../../component/common/SearchDropDown'
function Row(props) {
    const { row } = props
    const [open, setOpen] = useState(false)

    const user = useSelector(state => state.user).data

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component='th' scope='row'>
                    {row.box_qr_code_id}
                </TableCell>
                <TableCell>{row.mac_id}</TableCell>

                <TableCell>{row.allocated_user ?_lang(row.allocated_user.name) +
                    ' ( ' +
                    row.allocated_user.usercode +
                    ' )':''}</TableCell>

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
            <TableRow sx={{ backgroundColor: 'lightgray' }}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <div className='row df column'>
                                <Grid container spacing={2}>
                                    <Grid container item md={6}>
                                        {row.allocated_user && row.current_location != 'sold' && (
                                            <>
                                                <Typography variant='h3'>
                                                    {_lang('allocated_user')}
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
                                                                <span variant='h4'>
                                                                    {_lang(row.allocated_user.name) +
                                                                        ' ( ' +
                                                                        row.allocated_user.usercode +
                                                                        ' )'}
                                                                </span>
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
                                                                    {_lang(row.allocated_user.email)}
                                                                </span>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>
                                                                {' '}
                                                                <span className='font-bold' variant='h3'>
                                                                    {_lang('role')} :
                                                                </span>
                                                            </TableCell>
                                                            <TableCell>
                                                                {' '}
                                                                <span variant='h4'>
                                                                    {_lang('role_' + row.allocated_user.role)}
                                                                </span>
                                                            </TableCell>
                                                        </TableRow>
                                                    </>
                                                </Table>
                                            </>
                                        )}
                                    </Grid>
                                    <Grid container item md={6}>
                                        <div className='df column row'>
                                            {
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
                                                            <TableRow>
                                                                <TableCell>
                                                                    {' '}
                                                                    <span className='font-bold' variant='h3'>
                                                                        {_lang('packing_date')} :
                                                                    </span>
                                                                </TableCell>
                                                                <TableCell>{dateToDDMMYYYY(_lang(row.packing_date))}</TableCell>
                                                            </TableRow>
                                                        </>
                                                    </Table>
                                                </>
                                            }
                                            {/* {<Typography variant='h3'>{_lang('actions')}</Typography>}
                                            <div className='row'>
                                                {accessControllByRole(user.role, "STORE_AND_DESTRIBUTOR_TRANSFER_BUTTON") && (
                                                    <>
                                                        {row.current_location == 'checked' && (
                                                            <Button
                                                                variant='contained'
                                                                sx={{ m: 1 }}
                                                                onClick={() => {
                                                                    props.onTransfer('store', row)
                                                                }}
                                                            >
                                                                {_lang('transfer_to_store')}
                                                            </Button>
                                                        )}

                                                        {(row.current_location == 'checked' ||
                                                            (row.current_location != 'with_destributor' &&
                                                                row.current_location != 'with_reteller' &&
                                                                row.current_location != 'sold')) && (
                                                                <Button
                                                                    variant='contained'
                                                                    sx={{ m: 1 }}
                                                                    onClick={() => {
                                                                        props.onTransfer('destributor', row)
                                                                    }}
                                                                >
                                                                    {_lang('transfer_to_destributor')}
                                                                </Button>
                                                            )}
                                                    </>
                                                )}
                                                {accessControllByRole(user.role, "RETAILLER_TRANSFER_BUTTON") && (
                                                        <>
                                                            {row.current_location != 'with_reteller' &&
                                                                row.current_location != 'sold' && (
                                                                    <Button
                                                                        variant='contained'
                                                                        sx={{ m: 1 }}
                                                                        onClick={() => {
                                                                            props.onTransfer('reteller', row)
                                                                        }}
                                                                    >
                                                                        {_lang('transfer_to_reteller')}
                                                                    </Button>
                                                                )}
                                                        </>
                                                    )}
                                                {accessControllByRole(user.role, "SELL_BUTTON") && (
                                                        <>
                                                            {row.current_location != 'sold' && (
                                                                <Button
                                                                    variant='contained'
                                                                    sx={{ m: 1 }}
                                                                    onClick={() => {
                                                                        props.onTransfer('sold', row)
                                                                    }}
                                                                >
                                                                    {_lang('sold')}
                                                                </Button>
                                                            )}
                                                        </>
                                                    )}
                                                {(user.role != constants.user_role.RETELLER_ROLE && !row.verfied) && <Button variant="contained" sx={{ m: 1 }}
                                          onClick={() => { props.onVerifyBtnClick(row) }}
                                      >{_lang('verify')}</Button>}
                                      {(user.role == constants.user_role.SUPER_ADMIN) && <Button variant="contained" sx={{ m: 1 }} color="error"
                                          onClick={() => { props.onDeleteBtnClick(row) }}
                                      >{_lang('delete')}</Button>}

                                            </div> */}
                                        </div>
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

const ChannelStock = props => {
    const user = useSelector(state => state.user).data
    const categories = useSelector(state => state.category).data
    return (
        <>
            <div className='we_container '>
                <div className="row  df user_data_container">
                    <Grid container spacing={2} sx={{ justifyContent: "center" }}>


                        {categories && categories.length > 0 &&
                            <>
                                <Grid xs={6} md={2.4} container item>


                                    <button
                                        onClick={() => { if (props.filters.category != '') { props.handleFilters('category', '') } }}
                                        className={props.filters.category == '' ? 'analytic-btn df center column radius-1 bg-light row analytic-btn-active ' : 'pointer analytic-btn df center column radius-1 bg-light row'}>

                                        <h1 className='h4'>
                                            {_lang('all')}
                                        </h1>

                                    </button>

                                </Grid>
                                {categories.map((category, index) => {
                                    return (
                                        <>
                                            <Grid xs={6} md={2.4} container key={category._id} item>


                                                <button
                                                    onClick={() => { props.handleFilters('category', category._id) }}
                                                    className={props.filters.category == category._id ? 'analytic-btn df center column radius-1 bg-light row analytic-btn-active ' : 'pointer analytic-btn df center column radius-1 bg-light row'}>

                                                    <h1 className='h4'>
                                                        {category.name}
                                                    </h1>

                                                </button>
                                            </Grid>
                                        </>
                                    )
                                })}
                            </>


                        }
                    </Grid>
                </div>
                <div className='row'>
                    <div className="filter-area df row">
                        <div className='df column'>
                            <div className='h-100 df column space-between'>
                                <button onClick={props.onMassTransffer} className='mb-3 h5 df center letter-space-2 extraa-btns radius-3 pointer df  bg-secondary text-light'>
                                    {_lang('mass_transfer')}
                                </button>
                                <button onClick={props.exportCsv} className=' h5 df center letter-space-2 extraa-btns radius-3 pointer df  bg-secondary text-light'>
                                    {_lang('export')}
                                </button>

                            </div>
                        </div>
                        <div className='df column flex-1' style={{ alignItems: "flex-end" }}>
                            <div className='df row' style={{ maxWidth: "48vw", width: "100%" }}>
                                <div className='df flex-1 mr-2'>
                                    <FormControl fullWidth={true} >
                                        <SearchDropDown

                                            getOptionLabel={(option) => {

                                                return _lang(option)
                                            }}
                                            renderOption={(defaultProps, option) => (
                                                <Box component="li" {...defaultProps}>{ _lang(option)}</Box>
                                            )}
                                            list={props.sortByList ? props.sortByList : []}

                                            value={props.filters.sort_by}
                                            label={_lang('sort_by')}

                                            onChange={(val) => { props.handleFilters('sort_by', val) }}
                                        />
                                    </FormControl>
                                </div>
                                <div className='df flex-1'>
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
                                </div>

                            </div>
                            <div className='df row flex-end'>
                                {accessControllByRole(user.role, "RETE_DES_CHANNEL_TOGGLE_BTN", true) && <div className='custom-toggle-button-container radius-3 custom-toggle-button-container-mt custom-toggle-button-container-mr'>
                                    <button onClick={e => {
                                        props.handleFilters('sub_location', 'with_reteller')
                                    }} className={`custom-toggle-button h6 ${props.filters.sub_location == 'with_reteller' ? 'bg-secondary text-light' : 'pointer text-secondary'}`}>{_lang('reteller')}</button>
                                    <button onClick={e => {
                                        props.handleFilters('sub_location', 'with_destributor')
                                    }} className={`custom-toggle-button h6 ${props.filters.sub_location == 'with_destributor' ? 'bg-secondary text-light' : 'pointer text-secondary'}`}>{_lang('destributor')}</button>

                                </div>}

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
                                {_lang('channel_stock')}
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
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Box QR</TableCell>
                                        <TableCell>MAC id</TableCell>

                                        <TableCell>Allocated Merchant</TableCell>
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
export default ChannelStock
