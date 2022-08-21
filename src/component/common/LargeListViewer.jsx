import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import React, { useEffect } from "react"
import { memo } from "react"
import { useState } from "react"

const LargeListViewer = memo(({ list, Component, indexKey = "id", refreshingParamters = "id", HeaderComponent }) => {
    const [states, setStates] = useState({ page_no: 1, page_size: 30 })

    // useEffect(() => {
    //     console.log('states got changed', states, states.page_size * (states.page_no - 1), states.page_size, list.splice(30, 30))
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
                    rowsPerPage={states.page_size}
                    page={states.page_no - 1}
                    onPageChange={(e, page) => {
                        setStates({ ...states, page_no: page + 1 })
                    }}
                    onRowsPerPageChange={e => {
                        setStates({ ...states, page_size: e.target.value })
                    }}
                />

                <Table aria-label="collapsible table">
                    {HeaderComponent && <TableHead className="p-sticky">

                        <HeaderComponent />

                    </TableHead>}

                    <TableBody>
                        {
                            list.slice(states.page_size * (states.page_no - 1), (states.page_size * (states.page_no - 1)) + states.page_size).map((item, index) => {
                                return <React.Fragment key={Array.isArray(indexKey) ? indexKey.reduce((pre, cur) => pre + item[cur], '') : item[indexKey]}>


                                    <Component
                                    
                                        index={states.page_size * (states.page_no - 1) + index}
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