import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {  _lang } from "../../../config/helper"
import { closeModel } from '../../../store/actions/modalAction'
import AddUpdateProduct from "../../pages/product/AddUpdateProduct"
import { createProductApi, updateProductApi } from "../../apis/productApis"
const AddUpdateProductController = (props) => {
    const [inputs, setInputs] = useState({
        name: '',
        type: "",
        color: '',
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
        if (inputs.type == "") {
            handleValues('set', 'err', _lang('type_required'))
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


            const response = await createProductApi(temp)

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
            

            const response = await updateProductApi(temp)

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
                ['name', 'type', 'id', 'color'],
                [
                    data.name,
                    data.type,
                    data._id,
                    data.color,

                ]
            )
        }
    }, [])
    return (
        <>
            <AddUpdateProduct
                loading={loading}
                updateFun={updateFun}
                calledFromUpdate={calledFromUpdate}
                createFun={createFun}

                handleValues={handleValues}
            />
        </>
    )
}
export default AddUpdateProductController