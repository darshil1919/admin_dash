import React, { useEffect } from 'react';
import CategoryTable from '../components/category/CategoryTable';
import SpeedDial from '@mui/material/SpeedDial';
import AddIcon from '@mui/icons-material/Add';
import { AddCategory } from '../components/category/AddCategory';

import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../store/action/categoryAction';
import statuses from '../store/statuses';
// import Loading from '../components/small/Loading';

const Category = () => {
  const [open, setOpen] = React.useState(false);
  // const [selectedValue, setSelectedValue] = React.useState("");
  const {status, error} = useSelector((state) => {
    return state.allCategory
  })
  const dispatch = useDispatch();
  

  useEffect(() => {
    if(status === statuses.ERROR){
      console.log(error)
    }
    dispatch(getCategory())
  }, [dispatch, error])

  // add button
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
    // setSelectedValue(value);
  };

  // if(status === statuses.LOADING){
  //   return <Loading />
  // }



  return (
    <>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* <Header category="Page" title="Orders" /> */}
      <CategoryTable />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 30, right: 30 }}
        icon={<AddIcon />}
        onClick={handleClickOpen}
      ></SpeedDial>
      <AddCategory
        // selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
    </>
  )
}

export default Category;