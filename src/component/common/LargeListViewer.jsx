import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import React, { useEffect } from "react"
import { memo } from "react"
import { useState } from "react"

const LargeListViewer = memo(({ list, Component, indexKey = "id", refreshingParamters = "id", HeaderComponent }) => {
    const [states, setStates] = useState({ pageNo: 1, pageSize: 30 })

    // useEffect(() => {
    //     console.log('states got changed', states, states.pageSize * (states.pageNo - 1), states.pageSize, list.splice(30, 30))
    // }, [states])
    // useEffect(() => {
    //     console.log('list changerd')
    // }, [list])
    // useEffect(() => {
    //     console.log('Component changerd')
    // }, [Component])
    // useEffect(() => {
    //     console.log('HeaderComponent changerd')
    // }, [HeaderComponent])
    // useEffect(() => {
    //     console.log('refreshingParamters changerd')
    // }, [refreshingParamters])
    // useEffect(() => {
    //     console.log('indexKey changerd')
    // }, [indexKey])

    return (

        <>


            <TableContainer component={Paper}>
                <TablePagination
                    rowsPerPageOptions={[50]}
                    component='div'
                    count={list.length}
                    rowsPerPage={states.pageSize}
                    page={states.pageNo - 1}
                    onPageChange={(e, page) => {
                        setStates({ ...states, pageNo: page + 1 })
                    }}
                    onRowsPerPageChange={e => {
                        setStates({ ...states, pageSize: e.target.value })
                    }}
                />

                <Table aria-label="collapsible table">
                    {HeaderComponent && <TableHead className="p-sticky">

                        <HeaderComponent />

                    </TableHead>}

                    <TableBody>
                        {
                            list.slice(states.pageSize * (states.pageNo - 1), (states.pageSize * (states.pageNo - 1)) + states.pageSize).map((item, index) => {
                                return <React.Fragment key={Array.isArray(indexKey) ? indexKey.reduce((pre, cur) => pre + item[cur], '') : item[indexKey]}>


                                    <Component
                                    
                                        index={states.pageSize * (states.pageNo - 1) + index}
                                        item={item}

                                    />

                                </React.Fragment>
                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>



        </>
    )

})
export default memo(LargeListViewer)