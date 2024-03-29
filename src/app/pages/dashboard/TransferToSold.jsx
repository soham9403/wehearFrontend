
import CustomInput from "../../../component/common/CustomInput"
import SmallLoader from "../../../component/common/SmallLoader"
import { _lang } from "../../../config/helper"


const TransferToSold = (props) => {
    return (
        <>

            <div className="we-container-small  df column radius-2" style={{ margin: "auto" }}>
                <h3 className="h3">{_lang('Sell')}</h3>
                <form className="df row column profile-edit-form" onSubmit={async (e) => { e.preventDefault(); props.onSubmitBtnClick() }}>
                    
                    <span className="h6 text-danger pt-3 pb-3">{props.handleValues('get', 'err')}&nbsp;</span>
                    <div className="row form-filed" >
                        <CustomInput
                            disabled={props.loading}
                            value={props.handleValues('get', 'invoice_number')}
                            onChange={(e) => { props.handleValues('set', 'invoice_number', e.target.value) }}
                            type="text"
                            label={_lang("invoice_number")}
                        />
                    </div>



                    <div className="row form-filed" >
                        <CustomInput
                            disabled={props.loading}
                            value={props.handleValues('get', 'invoice_value')}
                            onChange={(e) => { props.handleValues('set', 'invoice_value', e.target.value) }}
                            type="text"
                            label={_lang("invoice_value")}
                        />
                    </div>


                    <div className="row form-filed" >
                        <CustomInput
                            disabled={props.loading}
                            value={props.handleValues('get', 'customer_name')}
                            onChange={(e) => { props.handleValues('set', 'customer_name', e.target.value) }}
                            type="text"
                            label={_lang("customer_name")}
                        />
                    </div>
                    <div className="row form-filed" >
                        <CustomInput
                            disabled={props.loading}
                            value={props.handleValues('get', 'customer_email')}
                            onChange={(e) => { props.handleValues('set', 'customer_email', e.target.value) }}
                            type="text"
                            label={_lang("customer_email")}
                        />
                    </div>
                    <div className="row form-filed" >
                        <CustomInput
                            disabled={props.loading}
                            value={props.handleValues('get', 'customer_phone_no')}
                            onChange={(e) => { props.handleValues('set', 'customer_phone_no', e.target.value) }}
                            type="text"
                            label={_lang("customer_phone_no")}
                        />
                    </div>
                    <div className="row form-filed" >
                        <CustomInput
                            disabled={props.loading}
                            value={props.handleValues('get', 'customer_address')}
                            onChange={(e) => { props.handleValues('set', 'customer_address', e.target.value) }}
                            type="textarea"
                            label={_lang("customer_address")}
                        />
                    </div>

                    <div className="row df center" style={{ height: '25px' }}>{props.loading && <SmallLoader />}</div>
                    <div className="row form-filed" >
                    </div>
                    <button className="auth-submit-btn df center text-light row pointer h3 btn-gradient"> {props.loading ? <SmallLoader /> : 'Register Sell'}</button>
                </form>
            </div>

            {/*<div className="df column p-primary radius-primary  row" style={{ overflowY: "scroll", maxHeight: "100%", background: "white" }}>
                    <Typography variant="h3">{_lang('sell')}</Typography>
                    <form className="row df column form-filed" style={{ marginTop: "0px" }}>
                        <div className="row center df" style={{ height: "25px" }}>
                            <Typography variant="h4" align="center" color={"red"}>{props.handleValues('get', 'err')}</Typography>
                        </div>
                        <div className="row m-v-primary" style={{ marginBottom: "0px" }}>
                            <CustomInput
                                disabled={props.loading}
                                value={props.handleValues('get', 'invoice_number')}
                                onChange={(e) => { props.handleValues('set', 'invoice_number', e.target.value) }}
                                type="number"
                                label={_lang("invoice_number")}
                            />
                        </div>



                        <div className="row m-v-primary" style={{ marginBottom: "0px" }}>
                            <CustomInput
                                disabled={props.loading}
                                value={props.handleValues('get', 'invoice_value')}
                                onChange={(e) => { props.handleValues('set', 'invoice_value', e.target.value) }}
                                type="number"
                                label={_lang("invoice_value")}
                            />
                        </div>


                        <div className="row m-v-primary" style={{ marginBottom: "0px" }}>
                            <CustomInput
                                disabled={props.loading}
                                value={props.handleValues('get', 'customer_name')}
                                onChange={(e) => { props.handleValues('set', 'customer_name', e.target.value) }}
                                type="text"
                                label={_lang("customer_name")}
                            />
                        </div>
                        <div className="row m-v-primary" style={{ marginBottom: "0px" }}>
                            <CustomInput
                                disabled={props.loading}
                                value={props.handleValues('get', 'customer_email')}
                                onChange={(e) => { props.handleValues('set', 'customer_email', e.target.value) }}
                                type="text"
                                label={_lang("customer_email")}
                            />
                        </div>
                        <div className="row m-v-primary" style={{ marginBottom: "0px" }}>
                            <CustomInput
                                disabled={props.loading}
                                value={props.handleValues('get', 'customer_phone_no')}
                                onChange={(e) => { props.handleValues('set', 'customer_phone_no', e.target.value) }}
                                type="text"
                                label={_lang("customer_phone_no")}
                            />
                        </div>
                        <div className="row m-v-primary" style={{ marginBottom: "0px" }}>
                            <CustomInput
                                disabled={props.loading}
                                value={props.handleValues('get', 'customer_address')}
                                onChange={(e) => { props.handleValues('set', 'customer_address', e.target.value) }}
                                type="textarea"
                                label={_lang("customer_address")}
                            />
                        </div>

                        <div className="row df center" style={{ height: '25px' }}>{props.loading && <SmallLoader />}</div>
                        <div className="row m-v-primary" style={{ marginBottom: "0px" }}>
                            <Button
                                variant="contained"
                                fullWidth={true}
                                onClick={props.onSubmitBtnClick}

                            >{_lang('update')}</Button>
    </div>
                    </form>
    </div>*/}
        </>
    )
}
export default TransferToSold