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
import { dateToDDMMYYYY, _lang } from '../../../config/helper'

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

import constants from '../../../config/constants'
import SmallLoader from '../../../component/common/SmallLoader'
import AnalysisCount from './AnalysisCount'
function Row (props) {
  const { row } = props
  const [open, setOpen] = useState(false)

  const user = useSelector(state => state.user).data

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>{dateToDDMMYYYY(_lang(row.sale_date))}</TableCell>
        <TableCell component='th' scope='row'>
          {row.box_qr_code_id}
        </TableCell>
        {/* <TableCell >{row.mac_id}</TableCell>
                <TableCell >{dateToDDMMYYYY(_lang(row.packing_date))}</TableCell>
                <TableCell >{row.current_location}</TableCell> */}

        <TableCell>{row.customer_name}</TableCell>
        <TableCell>{row.invoice_value}</TableCell>

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
                {row.current_location == 'sold' && (
                  <>
                    <Typography variant='h3'>
                      {_lang('customer_detils')}
                    </Typography>

                    <Table aria-label='table' sx={{ mb: 2 }}>
                      <>
                        <TableRow>
                          <TableCell>
                            {' '}
                            <span className='font-bold' variant='h3'>
                              {_lang('name')}
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
                              {_lang('email')}
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
                              {_lang('address')}
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
                              {_lang('phone')}
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

                    <Typography variant='h3'>
                      {_lang('sales_details')}
                    </Typography>

                    <Table aria-label='table' sx={{ mb: 2 }}>
                      <>
                        <TableRow>
                          <TableCell>
                            {' '}
                            <span className='font-bold' variant='h3'>
                              {_lang('sale_by')}
                            </span>
                          </TableCell>
                          <TableCell>
                            {' '}
                           {row.sale_by && <span variant='h4'>
                              {_lang(row.sale_by.name) + row.sale_by.usercode}
                            </span>}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            {' '}
                            <span className='font-bold' variant='h3'>
                              {_lang('date')}
                            </span>
                          </TableCell>
                          <TableCell>
                            {' '}
                            <span variant='h4'>
                              {dateToDDMMYYYY(_lang(row.sale_date))}
                            </span>
                          </TableCell>
                        </TableRow>
                      </>
                    </Table>
                  </>
                )}
                {
                  <>
                    <Typography variant='h3'>{_lang('product')}</Typography>

                    <Table aria-label='table' sx={{ mb: 2 }}>
                      <>
                        <TableRow>
                          <TableCell>
                            {' '}
                            <span className='font-bold' variant='h3'>
                              {_lang('name')}
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
                              {_lang('mac_id')}
                            </span>
                          </TableCell>
                          <TableCell>
                            {' '}
                            <span variant='h4'>{_lang(row.mac_id)}</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            {' '}
                            <span className='font-bold' variant='h3'>
                              {_lang('packing_date')}
                            </span>
                          </TableCell>
                          <TableCell>
                            {' '}
                            <span variant='h4'>
                              {dateToDDMMYYYY(_lang(row.packing_date))}
                            </span>
                          </TableCell>
                        </TableRow>
                      </>
                    </Table>
                  </>
                }

                {<Typography variant='h3'>{_lang('actions')}</Typography>}
                <div className='row'>
                  {(user.role == constants.user_role.ADMIN ||
                    user.role == constants.user_role.SUPER_ADMIN ||
                    user.role == constants.user_role.PRODUCT_MANAGER) && (
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
                  {(user.role == constants.user_role.ADMIN ||
                    user.role == constants.user_role.SUPER_ADMIN ||
                    user.role == constants.user_role.DESTRIBUTOR_ROLE) && (
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
                  {(user.role == constants.user_role.ADMIN ||
                    user.role == constants.user_role.SUPER_ADMIN ||
                    user.role == constants.user_role.RETELLER_ROLE) && (
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
  )
}
function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}
const BoxSalesList = props => {
  const user = useSelector(state => state.user).data
  const navigate = useNavigate()

  return (
    <div className='row bg-light'>
      <div className='bg-gray'>
        
          <AnalysisCount {...props} />
        
      </div>
      <div className='we_container table-card radius-1'>
        {/* <div className='m-v-primary row'>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={0} onChange={() => { navigate('all') }} aria-label="basic tabs example">
                            <Tab label={<Typography sx={{ textTransform: "none" }} variant='h4'>{_lang('latest_sales')}</Typography>} {...a11yProps(0)} />
                            <Tab label={<Typography sx={{ textTransform: "none" }} variant='h4'>{_lang('all')}</Typography>} {...a11yProps(1)} />
                        </Tabs>
                    </Box>

                </div> */}
        <div className='m-v-primary row'>
          <Typography sx={{ textTransform: 'none' }} variant='h4'>
            {_lang('latest_sales')}
          </Typography>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label='collapsible table'>
            <TableHead>
              <TableRow>
                <TableCell>Sale Date</TableCell>
                <TableCell>Box QR</TableCell>

                <TableCell>{_lang('customer_name')}</TableCell>
                <TableCell>{_lang('sales_amount')}</TableCell>
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
        </TableContainer>
      </div>
    </div>
  )
}
export default BoxSalesList
