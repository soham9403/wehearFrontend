import { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../../../../store/actions/modalAction"
import UploadDataFromCsvController from "../../csv/UploadDataFromCsvController"
import MassTransferController from "../../masstransfer/MassTransferController"
import { AnalysticContext } from "../AnalyticCountController"
import ExportController from "../ExportController"
import TransferController from "../TransferController"
import ChannelStockController from "./ChannelStockController"
import SoldController from "./SoldController"
import StockController from "./StockController"

const SaleBoardMain = ({ type, ...props }) => {
    const { refreshAnalyticCount } = useContext(AnalysticContext)
    const dispatch = useDispatch()
    const onTransfer = (type, data, callBack = async () => { }) => {
        dispatch(openModal(
            type == 'sold' ? "CUSTOM" : "CUSTOM",
            async () => { await Promise.all([refreshAnalyticCount(), callBack()]) },
            <TransferController type={type} data={data} />
        ))
    }
    const onMassTransffer = (callBack = async () => { }) => {
        dispatch(openModal(
            "CUSTOM",
            async () => { await Promise.all([refreshAnalyticCount(), callBack()]) },
            <MassTransferController />
        ))
    }
    const onImportBtnClick = async (callBack = async () => { }) => {
        dispatch(openModal(
            "CUSTOM",
            async () => { await Promise.all([refreshAnalyticCount(), callBack()]) },
            <UploadDataFromCsvController />
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
            {type == 'stock' && <StockController onImportBtnClick={onImportBtnClick} onTransfer={onTransfer} onMassTransffer={onMassTransffer} exportCsv={exportCsv} />}
            {type == 'channel' && <ChannelStockController onTransfer={onTransfer} onMassTransffer={onMassTransffer} exportCsv={exportCsv} />}
        </>
    )
}
export default SaleBoardMain