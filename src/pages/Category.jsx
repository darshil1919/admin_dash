import React, { useEffect, useState, useCallback, useRef } from 'react';
import Loader from '../components/Loader/Loader';
import { Header } from '../components';
import TextField from '@mui/material/TextField';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';

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
import Chip from '@mui/material/Chip';

import { useDispatch, useSelector } from 'react-redux';
import { getCategory, deleteCategory } from '../store/action/categoryAction';
import { UPDATE_CATEGORY_RESET, DELETE_CATEGORY_RESET } from '../store/slice/categorySlice/categorySlice';
import SimpleBackdrop from '../components/small/Loading';
// import Loading from '../components/small/Loading';

const DEFAULT_ROWS_PER_PAGE = 5;
const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = '_id';

const Category = () => {
  const searchField = useRef("");
  const dispatch = useDispatch();

  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // const [selectedValue, setSelectedValue] = React.useState("");
  const { allCategory, loading: allCategoryLoader } = useSelector((state) => {
    return state.allCategory;
  });
  const { isUpdated, isDeleted, loading: categoryLoader } = useSelector((state) => {
    return state.category;
  });
  const { loading: newCategoryLoader } = useSelector((state) => {
    return state.newCategory;
  });

  useEffect(() => {
    if (isUpdated) {
      console.log("in isUpadated if");
      dispatch(UPDATE_CATEGORY_RESET());
    }
    if (isDeleted) {
      console.log("in isDeleted if");
      dispatch(DELETE_CATEGORY_RESET());
    }
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
    console.log("payload--->", payload);
    dispatch(getCategory(payload));
  }, [dispatch, isDeleted, isUpdated, newCategoryLoader, page, rowsPerPage, orderBy, order, searchText]);

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
    setOpen(true)
  }

  const deleteCategoryData = (id) => {
    let payload = {
      id: id,
    }
    console.log("payload->", payload);
    dispatch(deleteCategory(payload));
    // dispatch(getSubCategory());
  };

  const headCells = [
    {
      id: 'categoryName',
      numeric: false,
      label: 'Category Name',
    },
    {
      id: 'description',
      numeric: true,
      label: 'description',
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

  const searchService = (event) => {
    setSearchText(searchField.current?.value);
  };

  return (
    <>
      {categoryLoader || newCategoryLoader ? (
        <Loader />
        // <SimpleBackdrop />
      ) : (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Header category="Page" title="Category" />

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
            <div className='flex justify-center py-2 sm:justify-start'>
              <TextField
                placeholder="Search"
                label="Search field"
                type="search"
                inputRef={searchField}
                variant="standard"
                onChange={searchService}
              />
            </div>
            <div className='flex justify-center items-center py-2 sm:justify-center'>
              
            </div>
            <div className="flex justify-center items-center py-2 sm:justify-end">
              <Button variant="contained" onClick={handleClickOpen}>+ Add New</Button>
            </div>
          </div>

          <Paper>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                    <TableCell align="center">image</TableCell>
                    <TableCell align="center">status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allCategory?.items?.map((row, index) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{++index}</TableCell>
                      <TableCell align="center">{row?.categoryName}</TableCell>
                      <TableCell align="center">{row?.description}</TableCell>
                      <TableCell align="center">
                        <div style={{ width: "75px", height: "75px" }}>
                          <img className="h-16 w-24" src={`http://localhost:4000/image/categoryImages/${row?.image}`} alt="category Image" />
                        </div>
                      </TableCell>
                      <TableCell align="center" >{row?.isActive ?
                        <Chip label="Active" style={{ backgroundColor: '#4BB543', color: '#ffffff' }} /> :
                        <Chip label="Inactive" style={{ backgroundColor: '#F44336', color: '#ffffff' }} />
                      }</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => { openInPopup(row) }}
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteCategoryData(row?._id)}
                        >
                          <DeleteRoundedIcon sx={{ color: red[500] }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[2, 5, 10, 25]}
              component="div"
              count={parseInt(allCategory?.count) || 0}
              rowsPerPage={rowsPerPage}
              page={!parseInt(allCategory?.count) || parseInt(allCategory?.count) <= 0 ? 0 : page}
              onPageChange={(event, newPage) => { setPage(newPage); }}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value));
                setPage(0);
              }}
            />
          </Paper>

          <AddCategory
            // selectedValue={selectedValue}
            recordForEdit={recordForEdit}
            isEdit={isEdit}
            open={open}
            setOpen={setOpen}
            onClose={handleClose}
          />
        </div>
      )}

    </>
  )
}

export default Category;