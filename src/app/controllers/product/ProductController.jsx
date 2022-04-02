import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { _lang } from "../../../config/helper"
import { openModal } from "../../../store/actions/modalAction"
import useBreadCrumb from "../../../store/hooks/useBreadCrumbs"
import { deleteProductAPi, getProductListApi } from "../../apis/productApis"
import { deleteUserAPi } from "../../apis/userApis"
import ProductPage from "../../pages/product/ProductPage"
import AddUpdateProductController from "./AddUpdateProductController"

const ProductController = () => {
    const [data, setdata] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const bread_crumb = useBreadCrumb()
    useEffect(() => {

        (async () => {
            bread_crumb.set([
                {
                    isLink: false,
                    redirect: '/product',
                    label: _lang('product')
                }
            ], true)
            await getProductList()
        })()
    }, [])

    const getProductList = async () => {
        setLoading(true)
        const response = await getProductListApi()
        if (response.status == 1) {
            setdata(response.data)
        }
        setLoading(false)
    }
    const onCreateBtnClick = () => {
        dispatch(openModal(
            "CUSTOM",
            async () => {

                await getProductList()
            },
            <AddUpdateProductController />
        ))
    }
    const onUpdateBtnClick = (row) => {
        dispatch(openModal(
            "CUSTOM",
            async () => {
                await getProductList()
            },
            <AddUpdateProductController />,
            row
        ))
    }
    const onDeleteBtnClick = (row) => {
        dispatch(openModal(
            "DELETE",
            async () => {
                await deleteProductAPi(row._id)
                await getProductList()
            }
        ))
    }
    return (
        <>
            <ProductPage
                onCreateBtnClick={onCreateBtnClick}
                onUpdateBtnClick={onUpdateBtnClick}
                onDeleteBtnClick={onDeleteBtnClick}
                loading={loading}
                data={data}
            />
        </>
    )
}
export default ProductController