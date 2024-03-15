import { Alert, CircularProgress, TableContainer, Table, TableCell, TableHead, TableBody, TableRow, Box, IconButton, Grid, Typography, Container, Select, MenuItem } from '@mui/material';
import TableHeaderCell from './TableHeaderCell';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { createColumnHelper, getCoreRowModel, useReactTable, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { useState } from 'react';
import { Search } from './Search';

import { GetExistingIssues } from './getExistingIssues';
import { Issue } from './IssueTypes';


const IssueTable = () => {
    const { status, data, error } = GetExistingIssues();

    const columnHelper = createColumnHelper<Issue>();

    const [searchText, setSearchText] = useState('');

    const columns = [
      columnHelper.accessor('id', {
        cell: info => info.getValue(),
        header: info => <TableHeaderCell  key={info.column.id} text='Issue Id' />
      }),
      columnHelper.accessor('title', {
        cell: info => info.getValue(),
        header: info => <TableHeaderCell key={info.column.id} text='Title' />
      }),
      columnHelper.accessor('description', {
        cell: info => info.getValue(),
        header: info => <TableHeaderCell  key={info.column.id} text='Description' />
      }),
    ];

    const table = useReactTable({
      data: data || [],
      columns,
      state: {
        globalFilter: searchText
      },
      initialState: { pagination: {pageSize: 15} },
      autoResetPageIndex: false,
      onGlobalFilterChange: setSearchText,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });

    const issueError = error as Error;

    if (status === 'loading') {
        return <CircularProgress size={100} color="primary" />
      }
    
    if (status === 'error') {
        return <Alert severity="error">Something went wrong: {issueError.message}</Alert>
    }

    return (
      <Grid sm={6} md={9} lg={12}>
        <Container sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Search value={searchText ?? ''} onChange={value => setSearchText(String(value))}/>

        </Container>
        <Box sx={{ border: 1, borderColor: "#8b499b", borderRadius: '5px' }}>
        <TableContainer>
        <Table sx={{ minWidth: 1024}} 
        aria-label="issue table">
          <TableHead sx={
            {
              backgroundColor: '#8b499b',
            }
          }>
            <TableRow>
                {
                  table.getHeaderGroups().map(headerGroup => (
                    headerGroup.headers.map(header => (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    ))
                  ))
                }
            </TableRow>
          </TableHead>
          <TableBody>
            {
                table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {row.getAllCells().map(cell => (
                      <TableCell align="right" sx={{borderWidth: '1px', borderColor: '#8b499b'}} key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                  ))}
                </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
      <Grid display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
      <Box display={'flex'} gap={1} paddingRight={'1rem'} paddingTop={'0.25rem'}>
      <Typography variant="subtitle1" paddingTop={'0.25rem'}>
          Show
      </Typography>
      <Select
        size='small'
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={table.getState().pagination.pageSize}
        label="PageSize"
        onChange={e => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[15, 20, 30].map(pageSize => (
          <MenuItem key={pageSize} value={pageSize}>
            {pageSize}
          </MenuItem>
        ))}
      </Select>
      </Box>
      <Typography variant="subtitle1">
          Page {data.length === 0 ? 0 : table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </Typography>
        <IconButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Grid>
      </Grid>
    );
};

export default IssueTable;