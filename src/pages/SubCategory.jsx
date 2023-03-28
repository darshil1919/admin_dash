import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
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
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';

import { useDispatch, useSelector } from 'react-redux';
import { getSubCategory } from '../store/action/subCategoryAction';
// import Loading from '../components/small/Loading';

const SubCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allSubCategory } = useSelector((state) => {
    return state.allSubCategory
  });

  useEffect(() => {
    dispatch(getSubCategory())
  }, [dispatch])

  let subCategoryData = allSubCategory;

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        {/* <Header category="Page" title="Orders" /> */}
        {/* <CategoryTable /> */}
        <div className="py-3 px-2 flex justify-between align-middle">
          <h3 className='font-bold'>Sub Category</h3>
          <Button variant="contained" onClick={() => navigate('/sub-category/add-subcategory')}>+ Add New</Button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">_id</TableCell>
                <TableCell align="center">sub category name</TableCell>
                <TableCell align="center">description</TableCell>
                <TableCell align="center">image</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subCategoryData?.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row?._id}</TableCell>
                  <TableCell align="center">{row?.subCategoryName}</TableCell>
                  <TableCell align="center">{row?.description}</TableCell>
                  <TableCell align="center">{row?.image}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => navigate(`/sub-category/edit-subcategory/${row?._id}`)}
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
      </div>
    </>
  )
}

export default SubCategory;