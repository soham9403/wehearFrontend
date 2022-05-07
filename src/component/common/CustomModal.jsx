import styled from "@emotion/styled";
import { ModalUnstyled } from "@mui/base";
import { Box, Button, CircularProgress, Fade, Grow, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _lang } from "../../config/helper";
import { closeModel } from "../../store/actions/modalAction";
const StyledModal = styled(ModalUnstyled)`
position: fixed;
z-index: 1300;
right: 0;
bottom: 0;
top: 0;
left: 0;
display: flex;
align-items: 'flex-start';
justify-content: center;
`;

const Backdrop = styled('div')`
z-index: -1;
position: fixed;
right: 0;
bottom: 0;
top: 0;
left: 0;
background-color: rgba(0, 0, 0, 0.5);
-webkit-tap-highlight-color: transparent;
`;

const style = {
    width: 400,
    // bgcolor: 'background.paper',

    // p: 2,
    // px: 4,
    // pb: 3,
};
const CustomModal = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const handleCLose = () => {
        if (!loading) {
            dispatch(closeModel())
        }

    }
    const onAction = async () => {
        setLoading(true)
        await modal.onAction()
        setLoading(false)
        dispatch(closeModel())
    }
    const modal = useSelector(state => state.modal)
    return (
        <>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={modal.show}
                // closeAfterTransition

                onClose={handleCLose}

                BackdropComponent={Backdrop}
            >
                <Grow in={modal.show}>
                <div className={modal.type=="CUSTOM_FULL_HEIGHT"? "we_container df column p-relative pop-up-content" :"we_container df column p-relative pop-up-content-centered" }>
                    {modal.type == "DELETE" &&
                        <div className={'column  row p-primary radius-primary m-v-primary'} style={{ backgroundColor: "white", height: 'max-content', flex: 'none' }}>
                            <div className="m-v-primary">
                                <Typography variant="h4" align="center" >{_lang('delete_warning')}</Typography>
                            </div>
                            <div className="m-v-primary p-primary">

                            </div>

                            <div className="row space-between df ">
                                <Button disabled={loading} sx={{ mr: 1 }} variant="contained" className="flex-1" onClick={handleCLose} >{_lang('cancle')}</Button>
                                <Button disabled={loading} variant="contained" className="flex-1" color="error" onClick={onAction} >{!loading ? _lang('delete') : <CircularProgress size={15} color="secondary" />}</Button>
                            </div>
                        </div>
                    }


                    {modal.type == "VERIFY" &&
                        <div className={'column  row p-primary radius-primary m-v-primary'} style={{ backgroundColor: "white", height: 'max-content', maxWidth: "500px", flex: 'none' }}>
                            <div className="m-v-primary">
                                <Typography variant="h4" align="center" >{_lang('verify_warning')}</Typography>
                            </div>
                            <div className="m-v-primary p-primary">

                            </div>

                            <div className="row space-between df ">
                                <Button disabled={loading} sx={{ mr: 1 }} variant="contained" className="flex-1" onClick={handleCLose} >{_lang('cancle')}</Button>
                                <Button disabled={loading} variant="contained" className="flex-1" color="success" onClick={onAction} >{!loading ? _lang('verify') : <CircularProgress size={15} color="secondary" />}</Button>
                            </div>
                        </div>}
                    {(modal.type == 'CUSTOM' || modal.type == 'CUSTOM_FULL_HEIGHT') && modal.component}
                </div>
                </Grow>
            </StyledModal>
        </>
    )
}
export default CustomModal