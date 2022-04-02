import { Autocomplete, Box, TextField } from "@mui/material";
import { useState } from "react";

const SearchDropDown = (props) => {
    const [search, setSearch] = useState('')
    return (
        <Autocomplete
            value={props.value}
            onChange={(event, newValue) => {
                props.onChange(newValue);
            }}
            getOptionLabel={props.getOptionLabel}
            renderOption={props.renderOption}
            // getOptionLabel={props.getOptionLabel}
            inputValue={search}
            onInputChange={(event, newInputValue) => {

                setSearch(newInputValue);
            }}
            // id="controllable-states-demo"
            options={props.list}
            fullWidth={true}
            renderInput={(params) => <TextField {...params} label={props.label} />}
        />

    )
}
export default SearchDropDown