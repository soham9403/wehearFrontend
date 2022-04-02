import ForgetPasswordCreateNewPassword from "./ForgetPasswordCreateNewPassword"
import ForgetPasswordEmail from "./ForgetPasswordEmail"
import ForgetPasswordVerifyOtp from "./ForgetPasswordVerifyOtp"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Logo from "../../../component/common/Logo"
import { _lang } from "../../../config/helper";
import { Typography } from "@mui/material";
const ForgetPasswordMain = (props) => {
    const steps = [
        _lang('send_otp'),
        _lang('verify_otp'),
        _lang('create_new_pass'),
      ];
    return (
        <>
            <div className="row p-primary">
                <div className="we_container_small  p-primary radius-primary row border-primary ">
                    <Logo />
                    <div className="m-v-primary">
                    <Stepper  activeStep={props.step-1} alternativeLabel>
                        {steps.map((label,index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    </div>
                   
                    {props.step == 1 && <ForgetPasswordEmail {...props} />}
                    {props.step == 2 && <ForgetPasswordVerifyOtp {...props} />}
                    {props.step == 3 && <ForgetPasswordCreateNewPassword {...props} />}
                    {props.step==4 && <div className="row center"><Typography color={"#000"} align="center" >{_lang('password_update')}</Typography></div> }

                            
                </div>
            </div>

        </>
    )
}
export default ForgetPasswordMain