import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from '../components';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';

import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import Loader from '../components/Loader/Loader';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getSubCategory, deleteSubCategory } from '../store/action/subCategoryAction';
import { getCategory } from "../store/action/categoryAction";

import {
  DELETE_SUBCATEGORY_RESET,
} from '../store/slice/subCategorySlice/subCategorySlice';
import Loading from '../components/small/Loading';

const DEFAULT_ROWS_PER_PAGE = 10;
const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = '_id';

const SubCategory = () => {
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


  console.log("selectData---->", selectData);

  const { allSubCategory, loading: allSubCategoryLoader } = useSelector((state) => {
    return state.allSubCategory;
  });

  const { allCategory, loading: allCategoryLoading } = useSelector((state) => {
    return state.allCategory;
  });

  const { isDeleted } = useSelector((state) => {
    return state.subCategory;
  });

  useEffect(() => {
    if (isDeleted) {
      dispatch(DELETE_SUBCATEGORY_RESET());
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
    dispatch(getSubCategory(payload));
    dispatch(getCategory());

  }, [dispatch, page, rowsPerPage, isDeleted, selectText, orderBy, order, searchText])

  const deleteData = (id) => {
    let payload = {
      id: id,
    }
    dispatch(deleteSubCategory(payload));
  };

  const headCells = [
    {
      id: 'subCategoryName',
      numeric: false,
      label: 'sub category name',
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

  const searchCategory = (event) => {
    setSearchText(searchField.current?.value);
  };

  useEffect(() => {
    if (!_.isEmpty(allCategory.items)) {
      let abc = allCategory.items;

      setSelectData(abc);
    }
  }, [allSubCategory, allCategory])

  let treeSettings = { autoCheck: true };

  const dropDownChange = (event) => {
    console.log("event------->", event.value);
    setSelectText(event.value);
  }

  return (
    <>
      {allSubCategoryLoader && false ?
        (
          <Loader />

        ) : (
          <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Sub Category" />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
              <div className='flex justify-center py-2 sm:justify-start'>
                <TextField
                  placeholder="Search"
                  label="Search field"
                  type="search"
                  inputRef={searchField}
                  variant="standard"
                  onChange={searchCategory}
                />
              </div>
              <div className='flex justify-center items-center py-2 sm:justify-center'>
                <DropDownTreeComponent
                  id="dropdowntree"
                  fields={{ dataSource: selectData, value: '_id', text: 'categoryName' }}
                  showCheckBox={true}
                  treeSettings={treeSettings}
                  mode="Delimiter"
                  placeholder="select Category"
                  popupHeight="250px"
                  change={dropDownChange}
                  value={selectText}
                  floatLabelType="Auto"
                  cssClass="customClass"
                />
              </div>
              <div className="flex items-center justify-center py-2 sm:justify-end">
                <Button variant="contained" onClick={() => navigate('/sub-category/add-subcategory')}>+ Add New</Button>
              </div>
            </div>

            <Paper>
              <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
                <Table sx={{ minWidth: 650 }} stickyHeader>
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
                    {allSubCategory?.items?.map((row, index) => (
                      <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{++index}</TableCell>
                        <TableCell align="center">{row?.subCategoryName}</TableCell>
                        <TableCell align="center">{row?.description}</TableCell>
                        <TableCell align="center">{row?.image}</TableCell>
                        <TableCell align="center">{row?.isActive ?
                          <Chip label="Active" style={{ backgroundColor: '#4BB543', color: '#ffffff' }} /> :
                          <Chip label="Inactive" style={{ backgroundColor: '#F44336', color: '#ffffff' }} />
                        }</TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => navigate(`/sub-category/edit-subcategory/${row?._id}`)}
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
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={parseInt(allSubCategory?.count) || 0}
                rowsPerPage={rowsPerPage}
                page={!parseInt(allSubCategory?.count) || parseInt(allSubCategory?.count) <= 0 ? 0 : page}
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

export default SubCategory;