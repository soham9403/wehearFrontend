import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { dateToDDMMYYYY, _lang } from "../../../config/helper"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Loader from "../../../component/common/Loader";
import GoogleMapReact from 'google-map-react';
import React from "react";

const AnyReactComponent = ({ text, color = "white" }) => <div style={{ background: color }} className="marker">
    <div className="marker-hover">
        {text}
    </div>
</div>;

const EmployeeCoordinatesPage = ({ userLoading,
    loading,
    users,
    data,
    params,
    checkDataList,
    breakDataList,
    setParams
}) => {
    return (
        <div className="df flex-1 p-v-primary" style={{ overflowY: "scroll" }}>
            <div className="we_container mt-2">
                <div className="row space-between row-center  mb-3 df" >
                    <div className=" df flex-1">
                        <Typography variant="h3">{_lang('users')}</Typography>
                    </div>
                    <div className="flex-end flex-1 df">
                        {!userLoading && Array.isArray(users) && users.length > 0 &&
                            <>
                                <div className="df flex-1 mr-1">

                                    <TextField
                                        fullWidth
                                        labelId="demo-simple-date-label"
                                        id="demo-simple-date"
                                        type="date"
                                        InputLabelProps={{ shrink: true, required: true }}
                                        value={params.date}
                                        onChange={(e) => { setParams({ ...params, date: e.target.value }) }}

                                    />

                                </div>
                                <div className="df flex-1">
                                    <FormControl variant="standard" fullWidth  >
                                        <InputLabel id="demo-simple-select-label">select user</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="select user"
                                            value={params.selectedUser}
                                            color={"primary"}
                                            onChange={(e) => { setParams({ ...params, selectedUser: e.target.value }) }}

                                        >
                                            {
                                                users.map((user, index) => {
                                                    return (<MenuItem key={user.Email} value={user.Email}>{user.Name}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>


                            </>}
                    </div>
                </div>
                <div className="df row fit-content pb-1">

                    {!loading && Array.isArray(data) && data.length <= 0 && <div className="df row center"><Typography varient="h4" >No data found</Typography></div>}
                    {loading && <Loader />}
                    {!loading && Array.isArray(data) && data.length > 0 &&
                        <div className="df  flex-1">

                            <GoogleMapReact

                                bootstrapURLKeys={{ key: "AIzaSyBDmLBN-EA6HGUZZrpPwFbYgXQHGvhy7II" }}
                                defaultCenter={{
                                    lat: parseFloat(data[0].lat),
                                    lng: parseFloat(data[0].long)
                                }}
                                defaultZoom={11}
                            >
                                {data.map((coordinates, index) => {

                                    return <AnyReactComponent
                                        key={index}
                                        lat={parseFloat(coordinates.lat)}
                                        lng={parseFloat(coordinates.long)}
                                        text={dateToDDMMYYYY(parseInt(coordinates.time), true)}
                                    />
                                })}

                                {checkDataList.map((checkData, index) => {


                                    return Object.keys(checkData).map((key) =>
                                        <AnyReactComponent
                                            key={key}
                                            color="blue"
                                            lat={parseFloat(checkData[key].lat)}
                                            lng={parseFloat(checkData[key].long)}
                                            text={dateToDDMMYYYY(parseInt(checkData[key].time), true) + " -check-" + key + '-' + (index + 1)}
                                        />
                                    )
                                })}

                                {breakDataList.map((breakData, index) => {
                                    return Object.keys(breakData).map((key) =>
                                        <AnyReactComponent
                                            key={key}
                                            color="red"
                                            lat={parseFloat(breakData[key].lat)}
                                            lng={parseFloat(breakData[key].long)}
                                            text={dateToDDMMYYYY(parseInt(breakData[key].time), true) + " -break-" + key + '-' + (index + 1)}
                                        />
                                    )
                                })}
                            </GoogleMapReact>

                        </div>}
                    <div className="df row flex-1 p-3" >
                        <div className="df flex-1 column">
                            <h1 className="h4 df row mb-2">Check In/out</h1>
                            {checkDataList.map((checkData, index) => {


                                return <div className="df row mb-3" key={index}>
                                    <h3 className="h6">{dateToDDMMYYYY(parseInt(checkData['in'].time), true, false, true)}</h3>
                                    <h3 className="h6">  &nbsp;&nbsp;-&nbsp;&nbsp;</h3>
                                    <h3 className="h6">{dateToDDMMYYYY(parseInt(checkData['out'].time), true, false, true)}</h3>
                                </div>
                            })}
                        </div>
                        <div className="df flex-1 column">

                            <h1 className="h4 df row mb-2">Break </h1>
                            {breakDataList.map((breakData, index) => {


                                return <div className="df row mb-3" key={index}>
                                    <h3 className="h6">{dateToDDMMYYYY(parseInt(breakData['in'].time), true, false, true)}</h3>
                                    <h3 className="h6">  &nbsp;&nbsp;-&nbsp;&nbsp;</h3>
                                    <h3 className="h6">{dateToDDMMYYYY(parseInt(breakData['out'].time), true, false, true)}</h3>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default EmployeeCoordinatesPage