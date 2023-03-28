import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';

import { useDispatch, useSelector } from 'react-redux';


// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function CategoryTable() {
  const { status, error, category } = useSelector((state) => {
    return state.allCategory
  })
  const dispatch = useDispatch();
  console.log("data", category);
  let data = category;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">_id</TableCell>
            <TableCell align="center">category name</TableCell>
            <TableCell align="center">description</TableCell>
            <TableCell align="center">image</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row?._id}</TableCell>
              <TableCell align="center">{row?.categoryName}</TableCell>
              <TableCell align="center">{row?.description}</TableCell>
              <TableCell align="center">{row?.image}</TableCell>
              <TableCell align="center">
                <IconButton>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton>
                  <DeleteRoundedIcon sx={{ color: red[500] }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}