import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import CustomInput from "../../../component/common/CustomInput"
import { _lang } from "../../../config/helper"

const ProfileEditPopUp = ({ error, initialValue, filedName, title, onSave, loading, value, ...props }) => {
    const { modal } = useSelector(state => state)
    const [val, setVal] = useState(value)
    const changeParentValue = async() => {

        if (initialValue != val) {            
            await onSave(filedName, val);
            await modal.onAction()
        }

    }
    useEffect(() => {


    }, [value])
    return (
        <div className="we-container-small  df column radius-2">
            <form className="df row column profile-edit-form" onSubmit={async (e) => { e.preventDefault(); changeParentValue() }}>
                <h3 className="h3 text-secondary">{title}</h3>
                <span className="h6 text-danger">{error}&nbsp;</span>

                <div className="form-field">
                    <CustomInput
                        disabled={loading}
                        value={val}

                        // value={value}
                        onChange={(e) => { setVal(e.target.value) }}
                        type="text"
                        label={''}
                    />
                </div>
                <button className="auth-submit-btn df center text-light row pointer h3 btn-gradient">Save Changes</button>
            </form>
        </div>
    )
}
export default ProfileEditPopUp