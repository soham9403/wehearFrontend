import {  useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { _lang } from "../../../config/helper"
import { openModal } from "../../../store/actions/modalAction"

import { deleteCategoryAPi, getcategoryListApi } from "../../apis/categoryApis"

import CategoryPage from "../../pages/category/CategoryPage"
import AddUpdateCategoryController from "./AddUpdateCategoryController"


const CategoryController = () => {
    const [data, setdata] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
   
    useEffect(()=>{
        getProductList()
    },[])

    const getProductList = async () => {
        setLoading(true)
        const response = await getcategoryListApi()
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
            <AddUpdateCategoryController />
        ))
    }
    const onUpdateBtnClick = (row) => {
        dispatch(openModal(
            "CUSTOM",
            async () => {
                await getProductList()
            },
            <AddUpdateCategoryController />,
            row
        ))
    }
    const onDeleteBtnClick = (row) => {
        dispatch(openModal(
            "DELETE",
            async () => {
                await deleteCategoryAPi(row._id)
                await getProductList()
            }
        ))
    }
    return (
        <>
            <CategoryPage
                onCreateBtnClick={onCreateBtnClick}
                onUpdateBtnClick={onUpdateBtnClick}
                onDeleteBtnClick={onDeleteBtnClick}
                loading={loading}
                data={data}
            />
        </>
    )
}
export default CategoryController