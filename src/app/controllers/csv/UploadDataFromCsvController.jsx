import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import constants from "../../../config/constants"
import { _lang } from "../../../config/helper"
import { getProductListApi } from "../../apis/productApis"
import { getUserListApi } from "../../apis/userApis"
import UploadDataFromCsv from "../../pages/csv/UploadDataFromCsv"

import Papa from "papaparse";
import { uploadCsvData } from "../../apis/SalesApi"
import { useContext } from "react"
import { closeModel } from "../../../store/actions/modalAction"
import { useDispatch } from "react-redux"

const allowedExtensions = ["csv"];

const UploadDataFromCsvController = (props) => {
    const { user, modal } = useSelector((state) => state)
    const dispatch = useDispatch()
    const [products, setProducts] = useState([])
    const [productManagers, setProductManagers] = useState([])
    const [renderLoading, setRenderLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [productsloading, setProductsLoading] = useState(false)
    const [productMagersLoading, setProductMagersLoading] = useState(false)

    const [params, setParams] = useState({
        checked_by: user.data.role == constants.user_role.PRODUCT_MANAGER ? user.data : null,
        product_id: null,
        step: 1,
    })

    const [errors, setErrors] = useState([])
    const [file, setFile] = useState(null)

    const [csvPreview, setCsvPreview] = useState([])
    const fetchProducts = async () => {
        setProductsLoading(true)
        const response = await getProductListApi()
        if (response.status == 1) {
            setProducts(response.data)
        }
        setProductsLoading(false)
    }

    const fetchProductManagers = async () => {
        setProductMagersLoading(true)
        const response = await getUserListApi({ all: true, usercode: user.data.usercode, role: constants.user_role.PRODUCT_MANAGER, verified: true })
        if (response.status == 1) {
            setProductManagers(response.data.result)
        }
        setProductMagersLoading(false)
    }

    const getFilesData = async () => {



        setLoading(true)
        const reader = new FileReader();


        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv?.data;

            const columns = Object.keys(parsedData[0]);
            if (!columns.includes('box_id')) {
                alert('There is no box_id field')
                setLoading(false)
                return
            }
            if (!columns.includes('mac_id')) {
                alert('There is no mac_id field')
                setLoading(false)
                return
            }

            if (parsedData && Array.isArray(parsedData)) {
                for (let i = 0; i < parsedData.length; i++) {
                    parsedData[i]['id'] = i
                    parsedData[i]['product_id'] = params.product_id ? params.product_id : null
                    parsedData[i]['checked_by'] = params.checked_by ? params.checked_by : null
                }
                setCsvPreview(parsedData)
                setParams({ ...params, step: 2 })
            } else {
                alert('cant read file.')
            }
            setLoading(false)
        };
        reader.readAsText(file);

    }


    const uploadBoxes = useCallback(async () => {
        setLoading(true)

        const csvData = [...csvPreview]
        const finaleArray = []
        const errorsInstance = []

        for (let i = 0; i < csvData.length; i++) {
            if (csvData[i] && csvData[i].box_id && csvData[i].box_id != '') {
                console.log(i + 1, csvData[i])
                let e = 0
                if (!csvData[i].box_id || csvData[i].box_id == '') {
                    errorsInstance.push(_lang('box_id_required') + _lang('at_row') + (i + 1))
                    e++
                }
                if (!csvData[i].mac_id || csvData[i].mac_id == '') {
                    errorsInstance.push(_lang('mac_id_required') + _lang('at_row') + (i + 1))
                    e++
                }
                if (!csvData[i].product_id || csvData[i].product_id === null) {
                    errorsInstance.push(_lang('select_product') + _lang('at_row') + (i + 1))
                    e++
                }
                if (!csvData[i].checked_by || csvData[i].checked_by === null) {
                    errorsInstance.push(_lang('select_product_manager') + _lang('at_row') + (i + 1))
                    e++
                }


                if (e === 0) {
                    finaleArray.push({
                        box_qr_code_id: csvData[i].box_id,
                        mac_id: csvData[i].mac_id,
                        product_id: csvData[i].product_id._id,
                        inventoryType: 'product',
                        checked_by: csvData[i].checked_by._id,
                        current_location: 'checked'
                    })
                }

            }
        }
        if (errorsInstance.length > 0)
            setErrors(errorsInstance)

        if (errorsInstance.length > 0) {
            setLoading(false)
            return
        }


        const response = await uploadCsvData({ box_data: finaleArray })

        if (response.status == 1) {
            await modal.onAction()
            setParams({ ...params, step: 3 })
            setErrors([])
        } else {
            if (response.code == 400) {

                const responseErrors = []
                if (Array.isArray(response.data)) {
                    
                    response.data.forEach((error) => {
                        
                        if (error.code === 11000) {
                            responseErrors.push(
                                error.op['box_qr_code_id'] + _lang('already_exist')
                            )
                        }
                    })
                }
                setParams({ ...params, step: 3 })
                setErrors(responseErrors)
                await modal.onAction()
            } else {
                setErrors([response.message])
            }

        }
        setLoading(false)




    }, [csvPreview])

    const onChangeProduct = (val) => {
        setRenderLoading(true)
        const csvPrviewInstance = [...csvPreview]
        for (let i = 0; i < csvPrviewInstance.length; i++) {
            if (Object.keys(csvPrviewInstance[i]).length > 0)
                (csvPrviewInstance[i]['product_id'] = val ? val : null)
        }
        setCsvPreview(csvPrviewInstance)
        setParams({ ...params, product_id: val })
    }
    const onChangeCheckedBy = (val) => {
        const csvPrviewInstance = [...csvPreview]
        for (let i = 0; i < csvPrviewInstance.length; i++) {
            if (Object.keys(csvPrviewInstance[i]).length > 0)
                (csvPrviewInstance[i]['checked_by'] = val ? val : null)

        }
        setCsvPreview(csvPrviewInstance)
        setParams({ ...params, checked_by: val })
    }
    const onCloseBtnClick = () => {
        dispatch(closeModel(
            "CUSTOM"
        ))
    }


    const onChangeProductInPreview = useCallback((val, index) => {

        setCsvPreview(csvPrviewInstance =>
            csvPrviewInstance.map((item, itemIndex) => item.id == index ? { ...item, product_id: val } : item)
        )

    }, [])


    const onChangeCheckedByInPreview = useCallback((val, index) => {
        setCsvPreview(csvPrviewInstance =>
            csvPrviewInstance.map((item, itemIndex) => item.id == index ? { ...item, checked_by: val } : item)
        )

    }, [])


    const removeProduct = (index) => {
        setCsvPreview(csvPrviewInstance =>
            csvPrviewInstance.map((item, itemIndex) => item.id == index ? {} : item)
        )

    }
    useEffect(() => {
        fetchProducts()
        if (user.data.role == constants.user_role.ADMIN || user.data.role == constants.user_role.SUPER_ADMIN)
            fetchProductManagers()
    }, [])

    return (
        <>
            <UploadDataFromCsv
                errors={errors}
                onChangeProductInPreview={onChangeProductInPreview}
                onChangeCheckedByInPreview={onChangeCheckedByInPreview}
                onChangeProduct={onChangeProduct}
                onChangeCheckedBy={onChangeCheckedBy}
                csvPreview={csvPreview}
                file={file}
                setFile={setFile}
                params={params}
                setParams={setParams}
                uploadBoxes={uploadBoxes}
                loading={loading}
                onCloseBtnClick={onCloseBtnClick}
                productsloading={productsloading}
                productMagersLoading={productMagersLoading}
                products={products}
                productManagers={productManagers}
                getFilesData={getFilesData}
                removeProduct={removeProduct}
            />
        </>
    )
}
export default UploadDataFromCsvController