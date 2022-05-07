import ForgetPasswordCreateNewPassword from "./ForgetPasswordCreateNewPassword"
import ForgetPasswordEmail from "./ForgetPasswordEmail"
import ForgetPasswordVerifyOtp from "./ForgetPasswordVerifyOtp"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Logo from "../../../component/common/Logo"
import { _lang } from "../../../config/helper";
import { Typography } from "@mui/material";
import logo from '../../../assets/images/common/logo_full.png';
import gradLeft from '../../../assets/images/common/auth-left.png';
import gradRight from '../../../assets/images/common/auth-right.png';

const ForgetPasswordMain = (props) => {
    const steps = [
        _lang('send_otp'),
        _lang('verify_otp'),
        _lang('create_new_pass'),
    ];
    return (
        <>
            {/* <div className="row p-primary">
                <div className="we_container_small  p-primary radius-primary row border-primary ">
                    <Logo />
                    <div className="m-v-primary">
                        <Stepper activeStep={props.step - 1} alternativeLabel>
                            {steps.map((label, index) => (
                                <Step key={index}>
                                    <StepLabel><span className="subtitle2">{label}</span></StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </div>

                    {props.step == 1 && <ForgetPasswordEmail {...props} />}
                    {props.step == 2 && <ForgetPasswordVerifyOtp {...props} />}
                    {props.step == 3 && <ForgetPasswordCreateNewPassword {...props} />}
                    {props.step == 4 && <div className="row center"><Typography color={"#000"} align="center" >{_lang('password_update')}</Typography></div>}


                </div>
            </div> */}

            <div className="full-page auth-container p-relative">
                <div className="auth-gradient-left">
                    <img src={gradLeft} className="fit-content" alt="" />
                </div>
                <div className="auth-gradient-right">
                    <img src={gradRight} className="fit-content" alt="" />
                </div>
                <h1 className="center company-title display-1 df row text-gradient-primary" >WEHEAR CRM</h1>

                <div className="we_container df ">
                    <div className="df flex-1 container-left">
                        <div className="fit-content df center">
                            <img className="img" src={logo} alt="" />
                        </div>
                    </div>
                    <div className="df flex-1">
                        <div className="fit-content df column">
                            <div className="container-right df column">


                                <h1 className="df center row">
                                    <Stepper activeStep={props.step - 1} alternativeLabel>
                                        {steps.map((label, index) => (
                                            <Step key={index} className={"df center"}>
                                                <StepLabel><p className="subtitle2">{label}</p></StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </h1>
                                {props.step == 1 && <ForgetPasswordEmail {...props} />}
                                {props.step == 2 && <ForgetPasswordVerifyOtp {...props} />}
                                {props.step == 3 && <ForgetPasswordCreateNewPassword {...props} />}
                                {props.step == 4 && <div className="row center"><Typography color={"#000"} align="center" >{_lang('password_update')}</Typography></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default ForgetPasswordMain