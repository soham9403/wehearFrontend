import { tableCellClasses } from '@mui/material'
import { createTheme } from '@mui/material'
import breakPoint from './breakpoint'
import colorTheme from './colorTheme'
import typography from './typography'

const theme = createTheme({
  ...breakPoint,
  ...colorTheme,
  ...typography,
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#C64095'
        },
        tableCell:{
            backgroundColor: '#000'
        }
      }
      
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding:'1.250vw',
          borderBottom:"none",
          MuiTableCell:{
            color:'white',
           
        },
        [`&.${tableCellClasses.head}`]: {
            
            color: 'white',
            
          }
        }
      }
    }
  }
})
export default theme
