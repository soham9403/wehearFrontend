import { createTheme } from "@mui/material";
import breakPoint from "./breakpoint";
import colorTheme from "./colorTheme";
import typography from "./typography";

const theme = createTheme({    
    ...breakPoint,
    ...colorTheme,
    ...typography,
    

});
export default theme  