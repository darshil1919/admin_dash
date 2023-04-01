import React, { useEffect, useState } from 'react';
import CategoryTable from '../components/category/CategoryTable';
import Loader from '../components/Loader/Loader';
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
import { getCategory, deleteCategory } from '../store/action/categoryAction';
import { UPDATE_CATEGORY_RESET, DELETE_CATEGORY_RESET } from '../store/slice/categorySlice/categorySlice';
// import Loading from '../components/small/Loading';

const Category = () => {
  const [open, setOpen] = React.useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

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
    dispatch(getCategory());
  }, [dispatch, isDeleted, isUpdated, newCategoryLoader]);

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

  // if(status === statuses.LOADING){
  //   return <Loading />
  // }

  return (
    <>
      {allCategoryLoader || categoryLoader || newCategoryLoader ? (
        <Loader />
      ) : (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          {/* <Header category="Page" title="Orders" /> */}
          {/* <CategoryTable /> */}

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">No.</TableCell>
                  <TableCell align="center">category name</TableCell>
                  <TableCell align="center">description</TableCell>
                  <TableCell align="center">image</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCategory?.map((row, index) => (
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
      )}

    </>
  )
}

export default Category;