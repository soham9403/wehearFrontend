


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
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { useState } from 'react'
import { useSelector } from 'react-redux'
import constants from '../../../config/constants'
import SmallLoader from '../../../component/common/SmallLoader'
import { _lang } from '../../../config/helper'
import { useEffect } from 'react'


function Row(props) {
    const { row } = props
    const [open, setOpen] = useState(false)

    const [status, setStatus] = useState(row.status)
    const user = useSelector(state => state.user).data

    // useEffect(()=>{
    //     props.onStatusChange = ()
    // })
    const onStatusChange = (val) => {
        setStatus(val)
        props.onStatusChange(val, row._id)
    }
    const onForward = ()=>{props.onForward(row._id)}
    return (
        <>
            <TableRow sx={{ borderBottom: "unset", '& > *': { borderBottom: 'none', borderTop: "none" } }}>
                <TableCell sx={{ borderBottom: "none" }} component='th' scope='row'>
                    {row.lead_id}
                </TableCell>
                <TableCell>{row.person_name}</TableCell>
                <TableCell>{row.company_name}</TableCell>
                <TableCell>{row.contact_no}</TableCell>


                <TableCell>
                    <div className=' radius-3  border-primary' style={{padding:"0px",overflow:"hidden"}}>{
                        Object.values(constants.leadStatus).map((val) => <button className={status == val ? 'custom-toggle-button  h7 p-3  bg-primary text-light ' : 'custom-toggle-button h7 border-secondary p-3  pointer text-secondary'}
                            onClick={e => {
                                onStatusChange(val)
                            }}>{_lang('lead_status_' + val)}</button>)
                    }
                    </div></TableCell>

                <TableCell> <IconButton
                    aria-label='expand row'
                    size='small'
                    onClick={onForward}
                >
                    <ShortcutIcon />
                </IconButton></TableCell>

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
                            <Table >
                                <TableHead sx={{ background: "gray" }} >
                                    <TableRow>
                                        <TableCell>From</TableCell>
                                        <TableCell>To</TableCell>
                                        <TableCell width={"50%"}>Message</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {Array.isArray(row.thread) && row.thread.map((row, key) => {
                                        return < TableRow key={row._id}>
                                            <TableCell>{row.from && row.from._id == user._id ? "You" : [constants.user_role.SUPER_ADMIN, constants.user_role.ADMIN, constants.user_role.PRODUCT_MANAGER].includes(parseInt(row.from.role)) ? "COMPANY" : row.from.name}</TableCell>
                                            <TableCell>{row.to ? row.to._id == user._id ? "You" : [constants.user_role.SUPER_ADMIN, constants.user_role.ADMIN, constants.user_role.PRODUCT_MANAGER].includes(parseInt(row.to.role)) ? "COMPANY" : row.to.name : "COMPANY"}</TableCell>
                                            <TableCell width={"50%"}>{row.mesage}</TableCell>
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

const LeadList = props => {
    const user = useSelector(state => state.user).data
    const categories = useSelector(state => state.category).data

    return (
        <>
            <div className='we_container df column'>


                <div className='row'>
                    <div className="filter-area df row">

                        <div className='df column flex-1' style={{ alignItems: "flex-end" }}>
                            <div>
                                <button onClick={props.onAddButtonClick} className=' h5 df center letter-space-2 extraa-btns radius-3 pointer df  bg-secondary text-light'>
                                    {_lang('create')}
                                </button>
                            </div>
                            <div className='df row flex-end'>


                                <div className='custom-toggle-button-container radius-3 custom-toggle-button-container-mt '>
                                    <button className={props.filters.from ? 'custom-toggle-button h6 bg-secondary text-light ' : 'custom-toggle-button h6 pointer text-secondary'}



                                        onClick={e => {
                                            props.handleFilters('from', true)
                                        }}>From</button>
                                    <button className={!props.filters.from ? 'custom-toggle-button h6 bg-secondary text-light ' : 'custom-toggle-button h6 pointer text-secondary'}



                                        onClick={e => {
                                            props.handleFilters('from', false)
                                        }}>To</button>


                                </div>
                            </div>
                        </div>
                    </div>



                    <div className='row table-card radius-1'>
                        <div className='df row space-between'>
                            <h3 className='h3 mb-3'>
                                {_lang('lead')}
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
                                        <TableCell>Title</TableCell>
                                        <TableCell>Person name</TableCell>
                                        <TableCell>Company name</TableCell>
                                        <TableCell>Contact</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Forward</TableCell>


                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {!props.loading &&
                                        props.data &&
                                        props.data.result &&
                                        props.data.result.map((row, index) => (
                                            <Row
                                                onStatusChange={props.onStatusChange}
                                                onForward={props.onForward}
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
export default LeadList
