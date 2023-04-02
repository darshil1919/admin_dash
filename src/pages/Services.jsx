import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from '../components';
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
import Loader from '../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getService, deleteService } from '../store/action/serviceAction';
import {
  DELETE_SERVICE_RESET,
} from '../store/slice/serviceSlice/serviceSlice';

const Service = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allService, loading: allServiceLoader } = useSelector((state) => {
    return state.allService;
  });

  const { isDeleted } = useSelector((state) => {
    return state.service;
  });
  console.log("allService-->", allService);
  useEffect(() => {
    if (isDeleted) {
      dispatch(DELETE_SERVICE_RESET());
    }
    dispatch(getService());
  }, [dispatch, isDeleted]);

  const deleteData = (id) => {
    let payload = {
      id: id,
    }
    console.log("payload->", payload);
    dispatch(deleteService(payload));
    // dispatch(getSubCategory());
  };

  return (
    <>
      {allServiceLoader ? (
        <Loader />
      ) : (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          {/* <Header category="Page" title="Orders" /> */}
          {/* <CategoryTable /> */}
          <div className="py-3 px-2 flex justify-between items-center">
            {/* <h3 className='font-bold'>Services</h3> */}
            <Header category="Page" title="Services" />
            <Button variant="contained" onClick={() => navigate('/service/add-service')}>+ Add New</Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">No.</TableCell>
                  <TableCell align="center">Service Name</TableCell>
                  <TableCell align="center">description</TableCell>
                  <TableCell align="center">image</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allService?.map((row, index) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{++index}</TableCell>
                    <TableCell align="center">{row?.serviceName}</TableCell>
                    <TableCell align="center">{row?.description}</TableCell>
                    <TableCell align="center">{row?.image}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => navigate(`/service/edit-service/${row?._id}`)}
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteData(row?._id)}
                      >
                        <DeleteRoundedIcon sx={{ color: red[500] }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};
export default Service;
