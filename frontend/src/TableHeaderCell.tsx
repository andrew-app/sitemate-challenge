import { TableCell, Typography } from "@mui/material";

interface IssueTableHeaderCellProps {
    text: string;
}

const TableHeaderCell = ({text}: IssueTableHeaderCellProps) => {
    return(
    <TableCell align="right">
        <Typography variant="subtitle1" sx={{
            fontFamily: 'Quicksand',
            fontWeight: 'bold'
        }}>
            {text}
        </Typography>
    </TableCell>
    );
};

export default TableHeaderCell;