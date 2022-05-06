import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useLayoutEffect } from "react"
import { useDispatch, useSelector, useStore } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import { getDateFiltersTime, _lang } from "../../../config/helper"
import { openModal } from "../../../store/actions/modalAction"
import { setuserAnalyticAction } from "../../../store/actions/userAnalyticaction"
import useBreadCrumb from "../../../store/hooks/useBreadCrumbs"
import getUseranalayticInfo from "../../apis/dashboardApi"
import { exportSalesApi, getSalesListApi } from "../../apis/SalesApi"
import BoxSalesList from "../../pages/dashboard/BoxSalesList"
import UserDashboard from "../../pages/dashboard/UserDashboard"
import MassTransferController from "../masstransfer/MassTransferController"
import TransferController from "./TransferController"

import ExportController from "./ExportController"

const UserDashboardController = (props) => {
    const bread_crumb = useBreadCrumb()
    const { user, userAnalytic } = useSelector(state => state)

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [allowedUser, setAllowedUser] = useState(true)
    const [data, setData] = useState({})

    const [analysticFilters, setAnalyticFilrter] = useState({ startDate: '', endDate: '', value: '' })
    const handleAnlyticFilter = (field, value) => {
        if (field == 'value') {
            const date = getDateFiltersTime(value);
            setAnalyticFilrter({ ...analysticFilters, startDate: date.startDate, endDate: date.endDate, value })
        }
    }
    const allowedDatesFilter = [
        {
            label: _lang('today'),
            value: 'today'
        },
        {
            label: _lang('yesterday'),
            value: 'yesterday'
        },
        {
            label: _lang('Year_the_date'),
            value: 'this_year'
        },
        {
            label: _lang('last_7_days'),
            value: '7'
        },
        {
            label: _lang('last_30_days'),
            value: '30'
        },
        {
            label: _lang('last_90_days'),
            value: '90'
        },
        {
            label: _lang('last_365_days'),
            value: '365'
        }

    ]

    useLayoutEffect(() => {
        handleAnlyticFilter('value', 'today')

    }, [])
    useEffect(() => {
        (async () => {

            if (analysticFilters.value != '') {
                const res = await getUseranalayticInfo({
                    user_code: params_user_code,
                    ...analysticFilters
                })

                dispatch(setuserAnalyticAction(params_user_code, res.data))
            }


        })()

    }, [analysticFilters])

    const params = useParams()
    const params_user_code = params.usercode

    const [salesFilters, setFilters] = useState({
        page_no: 1,
        page_size: 10,
        search: '',
        box_qr_code_id: '',
        // sale_by: '',
        is_b2c: 'false',
        user: params_user_code,
        current_location: !props.all ? 'sold' : '',//store //with_destributor //with_reteller //sold    //checked
        inventoryType: '',//product //marketing_material
    })


    const handleFilters = (field, value) => {
        const temp = { ...salesFilters }
        if (typeof (field) == 'object') {
            for (let i = 0; i < field.length; i++) {
                temp[field[i]] = value[i]
            }
        } else {

            temp[field] = value

        }
        setFilters(temp)
    }
    const location = useLocation()
    useEffect(() => {
        if (!user.data.verfied) {
            setAllowedUser(false)
        }
        if (params_user_code != user.data.usercode) {
            bread_crumb.set([
                {
                    isLink: true,
                    redirect: '/dashboard/' + params_user_code,
                    label: _lang(params_user_code)
                }
            ], true)
        } else {
            bread_crumb.set([
                {
                    isLink: true,
                    redirect: '/dashboard/' + user.data.usercode,
                    label: 'Dashboard'
                },
                {
                    isLink: false,
                    redirect: '/dashboard/' + user.data.usercode,
                    label: user.data.usercode
                }
            ])
        }
    }, [location])




    const onTransfer = (type, data) => {
        dispatch(openModal(
            "CUSTOM",
            async () => {
                setLoading(true)
                await Promise.all([

                    getUseranalayticInfo({
                        user_code: params_user_code,
                        ...analysticFilters
                    }),
                    getSalesList()

                ])
                setLoading(false)
            },
            <TransferController type={type} data={data} />
        ))
    }


    const onMassTransffer = () => {
        dispatch(openModal(
            "CUSTOM",
            async () => {
                setLoading(true)
                await Promise.all([

                    getUseranalayticInfo({
                        user_code: params_user_code,
                        ...analysticFilters
                    }),
                    getSalesList()

                ])
                setLoading(false)
            },
            <MassTransferController />
        ))
    }
    const getSalesList = async () => {
        return await getSalesListApi(salesFilters).then((res) => {
            setData(res.data)
        })
    }
    const exportCsv =async () => {
        // setLoading(true)
        // console.log(salesFilters)
        //  const res = await exportSalesApi(salesFilters)
        //  FileDownload(res,'data.csv')
        // setLoading(false)

        dispatch(openModal(
            "CUSTOM",
            async () => {
               
            },
            <ExportController salesFilters={salesFilters} />
        ))
    }
    useEffect(() => {
        (async () => {
            setLoading(true)
            await getSalesList()
            setLoading(false)
        })()
    }, [salesFilters])

    if (allowedUser) {


        return (<>
            {props.all ?

                <UserDashboard
                    onMassTransffer={onMassTransffer}
                    analysticFilters={analysticFilters}
                    handleAnlyticFilter={handleAnlyticFilter}
                    allowedDatesFilter={allowedDatesFilter}
                    loading={loading}
                    handleFilters={handleFilters}
                    filters={salesFilters}
                    onTransfer={onTransfer}
                    userInventoryData={userAnalytic.data[params_user_code] ? userAnalytic.data[params_user_code] : {}}
                    data={data}
                    exportCsv={exportCsv}
                />
                :
                <BoxSalesList

                    allowedDatesFilter={allowedDatesFilter}
                    analysticFilters={analysticFilters}
                    handleAnlyticFilter={handleAnlyticFilter}
                    loading={loading}
                    handleFilters={handleFilters}
                    filters={salesFilters}
                    onTransfer={onTransfer}
                    userInventoryData={userAnalytic.data[params_user_code] ? userAnalytic.data[params_user_code] : {}}
                    data={data}
                />
            }
        </>

        )
    } else {
        return <Typography variant="h3" align="center" >You are not allowed to access...
            <br />wait for verificaton</Typography>
    }
}
export default UserDashboardController