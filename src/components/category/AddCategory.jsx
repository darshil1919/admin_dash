import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useDispatch } from 'react-redux';

// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
// import PersonIcon from '@mui/icons-material/Person';
// import AddIcon from '@mui/icons-material/Add';
// import Typography from '@mui/material/Typography';
// import { blue } from '@mui/material/colors';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { addCategory } from '../../store/action/categoryAction';

export function AddCategory(props) {
  const dispatch = useDispatch();

  const { onClose, selectedValue, open } = props;
  const [image, setImage] = React.useState({});


  const handleClose = () => {
    onClose(selectedValue);
  };
  // const handleListItemClick = (value) => {
  //   onClose(value);
  // };

  let validationschema = yup.object({
    categoryName: yup.string().required("Name is Required"),
    description: yup.string().required("Description is Required")
  });

  const formik = useFormik({
    initialValues: {
      categoryName: "",
      description: "",
    },
    validationSchema: validationschema,
    onSubmit: (e) => {
      onSubmitCategory(e);
    },
  })

  const categoryImgChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          // setImagesPreview((old) => [...old, reader.result]);
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(file);
  }

  const onSubmitCategory = (data) => {
    const myForm = new FormData();

    myForm.append("categoryName", data.categoryName);
    myForm.append("description", data.description);

    // images.forEach((image) => {
      myForm.append("image", image);
    // });
    // dispatch(addCategory(myForm));
  }


  return (
    <Dialog onClose={handleClose} open={open}>
      {/* <List sx={{ pt: 0 }}> */}
        {/* {emails.map((email) => (
          <ListItem disableGutters>
          <ListItemButton onClick={() => handleListItemClick(email)} key={email}>
              <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
              <PersonIcon />
              </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
            </ListItem>
        ))} */}

            <form style={{
              marginTop: "8px",
              padding: "32px"
            }} onSubmit={formik.handleSubmit} method="post" encType="multipart/form-data">
          {/* <Box component="form" noValidate sx={{ mt: 1, p: 4 }}> */}
            <DialogTitle sx={{p: 0}}>Add Category</DialogTitle>
            {/* onSubmit={handleSubmit} */}
            <TextField
              margin="normal"
              fullWidth
              id="categoryName"
              label="Category Name"
              name="categoryName"
              type="text"
              value={formik.values.categoryName}
              onChange={formik.handleChange}
              error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
              helperText={formik.touched.categoryName && formik.errors.categoryName}
              // autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="description"
              label="Description"
              type="text"
              id="descriptioin"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              // autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="image"
              // label="Password"
              type="file"
              id="image"
              // value={formik.values.image}
              onChange={categoryImgChange}
              // autoComplete="current-password"
            />
            <button type="submit" name='submit'>add</button>
          {/* </Box> */}
            </form>

        {/* <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem> */}
      {/* </List> */}
    </Dialog>
  );
}