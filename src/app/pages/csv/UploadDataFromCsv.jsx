import { ErrorSharp } from "@mui/icons-material"
import { FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect } from "react"
import { useCallback } from "react"
import { memo, useMemo } from "react"
import LargeListViewer from "../../../component/common/LargeListViewer"
import SearchDropDown from "../../../component/common/SearchDropDown"
import { _lang } from "../../../config/helper"

const UploadDataFromCsv = ({ params, setParams, errors, ...props }) => {
    const indexKeys = useMemo(() => ["box_id", "mac_id"], [])
    const renderComponents = useCallback((Componentprops) => <Component
        {...Componentprops}
        key={Componentprops.item.box_id}
        refreshingParamters={(() => ["checked_by", "product_id"], [])}
        onChangeCheckedByInPreview={props.onChangeCheckedByInPreview}
        productManagers={props.productManagers}
        products={props.products}
        onRemove={props.removeProduct}
        onChangeProductInPreview={props.onChangeProductInPreview}
    />, [props.onChangeCheckedByInPreview, props.productManagers, props.products, props.onChangeProductInPreview])
    return (
        <>
            <div className="we-container-large  df flex-1 column radius-2 ">

                <div className="df row flex-1 column profile-edit-form p-relative" style={{ overflow: "hidden" }}>
                    {props.renderLoading && <div className=" p-absolute fit-content df  center" style={{ background: "rgba(0,0,0,.5)", zIndex: "1111", top: "0px", left: "0px" }}>
                        <h1 className="h4 text-light">Loading</h1>
                    </div>}
                    <div className="df row flex-1 " style={{ overflow: "hidden" }}>

                        <div className="row flex-1 df column" style={{ overflow: "hidden" }}>
                            <h4 className="h4 df row">{_lang('import')}</h4>

                            <div className="df row row-center mt-3">
                                <div className="flex-1 df mr-2">
                                    <input type="file" accept=".csv" onChange={(e) => { props.setFile(e.target.files[0]) }} />
                                </div>
                                <div className="flex-1 df form-filed">

                                    <FormControl fullWidth={true} >
                                        <SearchDropDown

                                            getOptionLabel={(option) => {
                                                return option['name'] ? option['name'] : ''
                                            }}
                                            renderOption={(defaultProps, option) => (

                                                <Box component="li" {...defaultProps}>
                                                    {option['name'] ? option['name'] : ''}
                                                </Box>
                                            )}
                                            list={props.products ? props.products : []}

                                            value={params.product_id}
                                            label={_lang('product')}

                                            onChange={(val) => { props.onChangeProduct(val) }}
                                        />
                                    </FormControl>
                                </div>
                                {<div className="flex-1 df ml-2 form-filed">

                                    <FormControl fullWidth={true} >
                                        <SearchDropDown

                                            getOptionLabel={(option) => {
                                                return option['name'] && option['usercode'] && option['name'] != "" && option['usercode'] != "" ?
                                                    option['name'] + " (" + option['usercode'] + ")" : ""

                                            }}
                                            renderOption={(defaultProps, option) => (

                                                <Box component="li" {...defaultProps}>
                                                    {option['name'] && option['usercode'] && option['name'] != "" && option['usercode'] != "" ?
                                                        option['name'] + " (" + option['usercode'] + ")" : ""
                                                    }
                                                </Box>
                                            )}
                                            list={props.productManagers ? props.productManagers : []}

                                            value={params.checked_by}
                                            label={_lang('checked_by')}

                                            onChange={(val) => { props.onChangeCheckedBy(val) }}
                                        />
                                    </FormControl>
                                </div>}

                            </div>


                            <div className="df flex-1 row  p-relative " style={{ overflow: "hidden" }}>

                                {params.step != 3 && <div className="df  column flex-1" style={{ overflowY: "scroll" }}>
                                    <LargeListViewer
                                        HeaderComponent={HeaderComponent}
                                        list={props.csvPreview}
                                        indexKey={indexKeys}
                                        Component={renderComponents}
                                    />
                                </div>}
                                {
                                    params.step ==3 && errors.length<=0 &&    <h1 className="df row center h4 text-success">{_lang('boxes_inserted_succesfully')}</h1>
                                }
                                {errors.length > 0 && <div className="df  flex-1 p-3 column" style={{ overflowY: "scroll" }}>
                                    <h1 className="h4">{_lang('errors')}</h1>

                                    {
                                        errors.map(error => {
                                            return <span className="df row h5 text-danger p-btn">{error}</span>
                                        })
                                    }
                                </div>
                                }
                            </div>
                            <div className=" center df ">
                                {params.step == 1 && <button disabled={props.loading || !props.file} className="auth-submit-btn df center text-light row pointer h3 btn-gradient" variant="contained" onClick={props.getFilesData} >
                                    {props.loading ? _lang('loading') : _lang('show_list')}
                                </button>}
                                {params.step == 2 && <button disabled={props.loading || props.csvPreview.length <= 0} className="auth-submit-btn df center text-light row pointer h3 btn-gradient" variant="contained" onClick={props.uploadBoxes} >
                                    {props.loading ? _lang('loading') : _lang('upload')}
                                </button>}

                                {params.step == 3 && <button disabled={props.loading || props.csvPreview.length <= 0} className="auth-submit-btn df center text-light row pointer h3 btn-gradient" variant="contained" onClick={props.onCloseBtnClick} >
                                    {_lang('close')}
                                </button>}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UploadDataFromCsv

const Component = memo((props) => {

    return <Row


        onChangeCheckedByInPreview={props.onChangeCheckedByInPreview}
        productManagers={props.productManagers}
        products={props.products}
        onChangeProductInPreview={props.onChangeProductInPreview}
        onRemove={props.onRemove}
        checked_by={props.item.checked_by}
        product_id={props.item.product_id}
        box_id={props.item.box_id}
        mac_id={props.item.mac_id}
        index={props.index}

    />
})
const HeaderComponent = memo((props) => <TableRow>
    <TableCell></TableCell>
    <TableCell>{_lang('box_qr_code')}</TableCell>
    <TableCell >{_lang('mac_id')}</TableCell>
    <TableCell >{_lang('product')}</TableCell>
    <TableCell >{_lang('checked_by')}</TableCell>
    <TableCell ></TableCell>

</TableRow>)

const Row = memo(({ item, box_id, product_id, checked_by, mac_id, index, ...props }) => {
    console.log('yes logged ' + index)
    if (!box_id) {
        return <></>
    }
    return (
        <TableRow >
            <TableCell>{index + 1}</TableCell>
            <TableCell>{box_id}</TableCell>
            <TableCell >{mac_id}</TableCell>
            <TableCell >
                <FormControl fullWidth={true} >
                    <SearchDropDown
                        getOptionLabel={(option) => {
                            return option['name'] ? option['name'] : ''
                        }}
                        renderOption={(defaultProps, option) => (

                            <Box component="li" {...defaultProps}>
                                {option['name'] ? option['name'] : ''}
                            </Box>
                        )}
                        list={props.products ? props.products : []}

                        value={product_id}
                        label={_lang('product')}

                        onChange={(val) => { props.onChangeProductInPreview(val, index) }}
                    />
                </FormControl>
            </TableCell>
            <TableCell >
                <div className="flex-1 df ml-2 form-filed">

                    <FormControl fullWidth={true} >
                        <SearchDropDown

                            getOptionLabel={(option) => {
                                return option['name'] && option['usercode'] && option['name'] != "" && option['usercode'] != "" ?
                                    option['name'] + " (" + option['usercode'] + ")" : ""

                            }}
                            renderOption={(defaultProps, option) => (

                                <Box component="li" {...defaultProps}>
                                    {option['name'] && option['usercode'] && option['name'] != "" && option['usercode'] != "" ?
                                        option['name'] + " (" + option['usercode'] + ")" : ""
                                    }
                                </Box>
                            )}
                            list={props.productManagers ? props.productManagers : []}

                            value={checked_by}
                            label={_lang('checked_by')}

                            onChange={(val) => { props.onChangeCheckedByInPreview(val, index) }}
                        />
                    </FormControl>

                </div></TableCell>
            <TableCell >

                <button className=" df center text-light row pointer h6 p-btn radius-1 btn-gradient" variant="contained" onClick={() => { props.onRemove(index) }} >
                    {_lang('remove')}
                </button>
            </TableCell>

        </TableRow>
    )
})