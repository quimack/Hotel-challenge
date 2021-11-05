import { Paper } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#31605a',
      main: '#013631',
      dark: '#001208',
      contrastText: '#fff'
    },
    secondary: {
      light: '#fbbf54',
      main: '#821310',
      dark: '#8f6200',
      contrastText: '#000',
    },
    background:{
        paper: '#F6FFE1',
        default: '#fbbf54',
     },
  },
});

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Table customization 
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light  ,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
