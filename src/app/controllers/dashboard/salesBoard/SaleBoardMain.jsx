import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../../../../store/actions/modalAction"
import MassTransferController from "../../masstransfer/MassTransferController"
import ExportController from "../ExportController"
import TransferController from "../TransferController"
import ChannelStockController from "./ChannelStockController"
import SoldController from "./SoldController"
import StockController from "./StockController"

const SaleBoardMain = ({ type, ...props }) => {
    const { user } = useSelector(state => state)
    const dispatch = useDispatch()
    const onTransfer = (type, data, callBack = async () => { }) => {
        dispatch(openModal(
            type == 'sold' ? "CUSTOM_FULL_HEIGHT" : "CUSTOM",
            callBack,
            <TransferController type={type} data={data} />
        ))
    }
    const onMassTransffer = (callBack = async () => { }) => {
        dispatch(openModal(
            "CUSTOM",
            callBack,
            <MassTransferController />
        ))
    }
    const exportCsv = async (filters) => {


        dispatch(openModal(
            "CUSTOM",
            async () => {

            },
            <ExportController salesFilters={filters} />
        ))
    }
    return (
        <>
            {type == 'sold' && <SoldController onTransfer={onTransfer} onMassTransffer={onMassTransffer} exportCsv={exportCsv} />}
            {type == 'stock' && <StockController onTransfer={onTransfer} onMassTransffer={onMassTransffer} exportCsv={exportCsv} />}
            {type == 'channel' && <ChannelStockController onTransfer={onTransfer} onMassTransffer={onMassTransffer} exportCsv={exportCsv} />}
        </>
    )
}
export default SaleBoardMain