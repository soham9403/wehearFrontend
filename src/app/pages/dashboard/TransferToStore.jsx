import { Button, Typography } from "@mui/material"
import CustomInput from "../../../component/common/CustomInput"
import SmallLoader from "../../../component/common/SmallLoader"
import { _lang } from "../../../config/helper"

const TransferToStore = (props) => {
    return (
        // <>
        //     <div className={'column  row m-v-primary'} style={{ maxWidth: "500px", width: '90%' }}>
        //     <Typography variant="h3">{_lang('tranfer_to_store')}</Typography>
        //     <form className="df row column profile-edit-form" onSubmit={async (e) => { e.preventDefault(); e.changeParentValue() }}>
        <div className="we-container-small  df column radius-2">
            <h3 className="h3">{_lang('tranfer_to_store')}</h3>
            <form className="df row column profile-edit-form" onSubmit={async (e) => { e.preventDefault(); props.onSubmitBtnClick() }}>

                <span className="h6  pt-3 pb-3 text-danger">{props.handleValues('get', 'err')}&nbsp;</span>
                <div className="row form-filed" >
                    <CustomInput
                       disabled={props.loading}
                       value={props.handleValues('get', 'current_location')}
                       onChange={(e) => { props.handleValues('set', 'current_location', e.target.value) }}
                       type="location"
                       label={_lang("location")}
                    />
                </div>
                <button type="submit" className="auth-submit-btn df center text-light row pointer h3 btn-gradient"> {props.loading ? <SmallLoader /> : 'Transfer'}</button>
            </form>

            {/* <div className="df column p-primary radius-primary  row" style={{ overflowY: "scroll", maxHeight: "100%", background: "white" }}>
                    <Typography variant="h3">{_lang('transfer_to_store')}</Typography>
                    <form className="row df column m-v-primary" style={{ marginTop: "0px" }}>
                        <div className="row center df" style={{ height: "25px" }}>
                            <Typography variant="h4" align="center" color={"red"}>{props.handleValues('get', 'err')}</Typography>
                        </div>
                        <div className="row">
                            <CustomInput
                                disabled={props.loading}
                                value={props.handleValues('get', 'current_location')}
                                onChange={(e) => { props.handleValues('set', 'current_location', e.target.value) }}
                                type="location"
                                label={_lang("location")}
    />
                    <CustomInput
                        disabled={props.loading}
                        value={props.val}

                        // value={value}
                        onChange={(e) => { props.setVal(e.target.value) }}
                        type="text"
                        label={_lang('location')}
    />
                        </div>
                        <div className="row df center" style={{ height: 'px' }}>{props.loading && <SmallLoader />}</div>
                        <div className="row m-v-primary" style={{marginBottom:"0px"}}>
                            <Button
                                variant="contained"
                                fullWidth={true}
                                onClick={props.onSubmitBtnClick}
                                
                            >{_lang('update')}</Button>
    </div>
    </form>
    </div>*/}
        </div>

    )
}
export default TransferToStore