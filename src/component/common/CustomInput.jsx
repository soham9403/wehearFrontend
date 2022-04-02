import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from "react"

const CustomInput = (props) => {

    const [type, setType] = useState(props.type ? props.type : "text")
    if (props.type === "password") {

        return (
            <FormControl className="row" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">{props.label ? props.label : "password"}</InputLabel>
                <OutlinedInput

                    id="outlined-adornment-password"
                    className="row"
                    label="password"
                    {...props}
                    type={type}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => { setType(type === "password" ? "text" : "password") }}

                                edge="end"
                            >
                                {type === "password" ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        )

    }

    return (
        <TextField
            className="row"

            {...props}
        />
    )

}
export default CustomInput