import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from '../../components';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import Loader from '../../components/Loader/Loader';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getWorker, deleteWorker } from '../../store/action/workerAction';

import {
  DELETE_WORKER_RESET,
} from '../../store/slice/workerSlice/workerSlice';
import Loading from '../../components/small/Loading';

const DEFAULT_ROWS_PER_PAGE = 10;
const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = '_id';

const Worker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchField = useRef("");

  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [searchText, setSearchText] = useState("");
  const [selectText, setSelectText] = useState("");
  const [selectData, setSelectData] = useState("");

  const { allWorker, loading: allWorkerLoader } = useSelector((state) => {
    return state.allWorker;
  });

  const { worker, loading: workerLoading } = useSelector((state) => {
    return state.workerDetails;
  });
  // const { allCategory, loading: allCategoryLoading } = useSelector((state) => {
  //   return state.allCategory;
  // });

  const { isDeleted } = useSelector((state) => {
    return state.worker;
  });

  useEffect(() => {
    if (isDeleted) {
      dispatch(DELETE_WORKER_RESET());
    };
    let payload = {
      page: page + 1,
      limit: rowsPerPage,
      sortBy: orderBy,
      sortMode: order === 'asc' ? 1 : -1,
    };
    if (searchText !== "") {
      payload = {
        ...payload,
        ...{
          searchText: searchText
        }
      }
    }
    if (!_.isEmpty(selectText)) {
      payload = {
        ...payload,
        ...{
          selectText: selectText
        }
      }
    }
    console.log("payload--->", payload);
    dispatch(getWorker(payload));

  }, [dispatch, page, rowsPerPage, isDeleted, selectText, orderBy, order, searchText])

  const deleteData = (id) => {
    let payload = {
      id: id,
    }
    dispatch(deleteWorker(payload));
  };

  const headCells = [
    {
      id: 'firstName',
      numeric: false,
      label: 'first Name',
    },
    {
      id: 'lastName',
      numeric: true,
      label: 'last Name',
    },
    {
      id: 'email',
      numeric: true,
      label: 'email',
    },
  ];

  const createSortHandler = (newOrderBy) => (event) => {
    handleRequestSort(event, newOrderBy);
  };

  const handleRequestSort = useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

    },
    [order, orderBy, page, rowsPerPage],
  );

  const searchWorker = (event) => {
    setSearchText(searchField.current?.value);
  };

  // useEffect(() => {
  //   dispatch(getCustomer());

  // }, [])

  let treeSettings = { autoCheck: true };

  const dropDownChange = (event) => {
    console.log("event------->", event.value);
    setSelectText(event.value);
  }

  return (
    <>
      {workerLoading ?
        (
          <Loader />

        ) : (
          <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Workers" />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
              <div className='flex justify-center py-2 sm:justify-start'>
                <TextField
                  placeholder="Search"
                  label="Search field"
                  type="search"
                  inputRef={searchField}
                  variant="standard"
                  onChange={searchWorker}
                />
              </div>
              <div className='flex justify-center items-center py-2 sm:justify-center'>
              </div>
              <div className="flex items-center justify-center py-2 sm:justify-end">
                <Button variant="contained" onClick={() => navigate('/worker/add-worker')}>+ Add New</Button>
              </div>
            </div>

            <Paper>
              <TableContainer component={Paper}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">No.</TableCell>
                      {headCells?.map((headCell) => (
                        <TableCell
                          key={headCell.id}
                          align={'center'}
                          sortDirection={orderBy === headCell.id ? order : false}
                        >
                          <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                          >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                              <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                              </Box>
                            ) : null}
                          </TableSortLabel>
                        </TableCell>
                      ))}
                      <TableCell align="center">phone</TableCell>
                      <TableCell align="center">Is Active</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allWorker?.items?.map((row, index) => (
                      <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{++index}</TableCell>
                        <TableCell align="center">{row?.firstName}</TableCell>
                        <TableCell align="center">{row?.lastName}</TableCell>
                        <TableCell align="center">{row?.email}</TableCell>
                        <TableCell align="center">{row?.phone}</TableCell>
                        <TableCell align="center">{row?.isActive ?
                          <Chip label="Yes" style={{ backgroundColor: '#4BB543', color: '#ffffff' }} /> :
                          <Chip label="No" style={{ backgroundColor: '#F44336', color: '#ffffff' }} />
                        }</TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => navigate(`/worker/edit-worker/${row?._id}`)}
                          >
                            <EditIcon color="primary" />
                          </IconButton>
                          {/* <IconButton
                            onClick={() => deleteData(row?._id)}
                          >
                            <DeleteRoundedIcon sx={{ color: red[500] }} />
                          </IconButton> */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[2, 5, 10, 25]}
                component="div"
                count={parseInt(allWorker?.count) || 0}
                rowsPerPage={rowsPerPage}
                page={!parseInt(allWorker?.count) || parseInt(allWorker?.count) <= 0 ? 0 : page}
                onPageChange={(event, newPage) => { setPage(newPage); }}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value));
                  setPage(0);
                }}
              />
            </Paper>
          </div >
        )
      }
    </>
  )
}

export default Worker;