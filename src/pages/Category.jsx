import React, { useEffect, useState } from 'react';
import CategoryTable from '../components/category/CategoryTable';
import SpeedDial from '@mui/material/SpeedDial';
import AddIcon from '@mui/icons-material/Add';
import { AddCategory } from '../components/category/AddCategory';
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
import { getCategory } from '../store/action/categoryAction';
// import Loading from '../components/small/Loading';

const Category = () => {
  const [open, setOpen] = React.useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // const [selectedValue, setSelectedValue] = React.useState("");
  const { allCategory } = useSelector((state) => {
    return state.allCategory
  })
  const dispatch = useDispatch();

  let data = allCategory;

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch]);

  // add button
  const handleClickOpen = () => {
    setIsEdit(false);
    setOpen(true);
  };
  const handleClose = (value) => {
    console.log("value->", value);
    setRecordForEdit(null);
    // setIsEdit(false);
    setOpen(false);
    console.log("isEdit->", isEdit);
    // setSelectedValue(value);
  };

  const openInPopup = (item) => {
    console.log("item->", item);
    setRecordForEdit(item);
    setIsEdit(true);
    console.log("recordForEdit->", recordForEdit);
    console.log("recordForEdit->", recordForEdit);
    setOpen(true)
  }

  // if(status === statuses.LOADING){
  //   return <Loading />
  // }

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        {/* <Header category="Page" title="Orders" /> */}
        {/* <CategoryTable /> */}

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
                    <IconButton
                      onClick={() => { openInPopup(row) }}
                    >
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

        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 30, right: 30 }}
          icon={<AddIcon />}
          onClick={handleClickOpen}
        ></SpeedDial>
        <AddCategory
          // selectedValue={selectedValue}
          recordForEdit={recordForEdit}
          isEdit={isEdit}
          open={open}
          setOpen={setOpen}
          onClose={handleClose}
        />
      </div>
    </>
  )
}

export default Category;