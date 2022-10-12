import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {  _lang } from "../../../config/helper"

import { closeModel } from '../../../store/actions/modalAction'
import AddUpdateCategory from "../../pages/category/AddUpdateCategory"
import { createCategoryApi, updateCategoryApi } from "../../apis/categoryApis"
const AddUpdateCategoryController = (props) => {
    const [inputs, setInputs] = useState({
        name: '',
     
        id: '',
        err: ''
    })
    const [loading, setLoading] = useState(false)
    const [calledFromUpdate, setCalledFromUpdate] = useState(false)
    const { modal } = useSelector((state) => { return { modal: state.modal } })
    const dispatch = useDispatch()



    const handleValues = (method, field, value) => {
        const temp = { ...inputs }

        if (method == 'get') {
            return inputs[field]
        }
        if (typeof (field) == 'object') {
            for (let i = 0; i < field.length; i++) {
                temp[field[i]] = value[i]
            }
        } else {
            temp[field] = value
        }
        if (field != 'err') {
            temp['err'] = ''
        }
        setInputs(temp)
    }
    const validate = () => {
        if (inputs.name == "") {
            handleValues('set', 'err', _lang('name_required'))
            return 0
        }
        
        return 1
    }
    const createFun = async () => {
        if (validate()) {
            setLoading(true)
            const temp = { ...inputs }
            delete temp['err']
            delete temp['id']


            const response = await createCategoryApi(temp)

            if (response.status === 1) {
                await modal.onAction()
                dispatch(closeModel())

            } else {
                handleValues('set', 'err', _lang(response.data[0].msg))
            }
            setLoading(false)
        }


    }

    const updateFun = async () => {
        if (validate()) {
            setLoading(true)
            const temp = { ...inputs }
            delete temp['err']
            

            const response = await updateCategoryApi(temp)

            if (response.status === 1) {
                await modal.onAction()
                dispatch(closeModel())

            } else {
                handleValues('set', 'err', _lang(response.data[0].msg))
            }
            setLoading(false)
        }


    }

    useEffect(() => {
        if (modal.defaultData && Object.keys(modal.defaultData).length > 0) {
            setCalledFromUpdate(true)

            const data = modal.defaultData

            handleValues('set',
                ['name' ,'id'],
                [
                    data.name,
                   
                    data._id,
                   

                ]
            )
        }
    }, [])
    return (
        <>
            <AddUpdateCategory
                loading={loading}
                updateFun={updateFun}
                calledFromUpdate={calledFromUpdate}
                createFun={createFun}

                handleValues={handleValues}
            />
        </>
    )
}
export default AddUpdateCategoryController