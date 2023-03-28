import * as React from 'react';
import { useFormik } from 'formik';
import { Formik, Form, Field } from 'formik';
import * as yup from "yup";
import { useDispatch } from 'react-redux';

// import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
// import PersonIcon from '@mui/icons-material/Person';
// import AddIcon from '@mui/icons-material/Add';
// import Typography from '@mui/material/Typography';
// import { blue } from '@mui/material/colors';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { addCategory, editCategory } from '../../store/action/categoryAction';


// const useStyles = makeStyles(theme => ({
//   dialogWrapper: {
//       padding: theme.spacing(2),
//       position: 'absolute',
//       top: theme.spacing(5)
//   },
//   dialogTitle: {
//       paddingRight: '0px'
//   }
// }))

export function AddCategory(props) {
  const dispatch = useDispatch();

  const { onClose, selectedValue, open, setOpen, recordForEdit, isEdit } = props;

  let initialValues = {
    categoryName: '',
    description: '',
    image: '',
  };
  if (isEdit) {
    console.log("recordForEdit->", recordForEdit);
    initialValues = {
      categoryName: recordForEdit?.categoryName,
      description: recordForEdit?.description,
      image: recordForEdit?.image,
    };
  }

  // const handleClose = () => {
  //   onClose(selectedValue);
  // };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const validationSchema = yup.object().shape({
    categoryName: yup.string().required('categoryName is required'),
    description: yup.string().required('description is required'),
    image: yup.mixed()
      .required('Image is required')
      .test('fileFormat', 'only .jpeg .jpg and .png file supported.', (value) => {
        if (value) {
          return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
        }
        return true;
      }),
  });

// const initialValues = {
  //   categoryName: '',
  //   description: '',
  //   image: '',
  // };

  const handleSubmit = (data) => {
    console.log("in submit->", data);
    if (!isEdit) {
      console.log("submit data->", data);
      const myForm = new FormData();
      myForm.append("categoryName", data.categoryName);
      myForm.append("description", data.description);
      myForm.append("image", data.image);

      dispatch(addCategory(myForm));
    } else {
      console.log("edit data->", data);
      const myForm = new FormData();
      myForm.append("categoryName", data.categoryName);
      myForm.append("description", data.description);
      myForm.append("image", data.image);
      console.log("edit myForm->", myForm);
      let editId = recordForEdit?._id;
      editCategory(editId, myForm);
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">

      {/* <DialogTitle textAlign="center" variant="h5" className='font-bold'>Add Category</DialogTitle> */}
      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            {isEdit ? "Edit Category" : "Add Category"}
          </div>
          <IconButton
            onClick={() => { onClose(false) }}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {(formik) => (
            <Form className="pb-5 px-10">
              <div>
                <Field name="categoryName">
                  {({ field, form: { touched, errors }, meta }) => (
                    <TextField
                      margin="normal"
                      fullWidth
                      id="categoryName"
                      label="Category Name"
                      name="categoryName"
                      type="text"
                      {...field}
                      error={meta.touched && meta.error ? true : false}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </div>

              <div>
                <Field name="description">
                  {({ field, form: { touched, errors }, meta }) => (
                    <TextField
                      margin="normal"
                      fullWidth
                      name="description"
                      label="Description"
                      type="text"
                      id="description"
                      {...field}
                      error={meta.touched && meta.error ? true : false}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </div>

              <div>
                <Field name="image">
                  {({ field, form: { setFieldValue }, meta }) => (
                    <div className="flex">
                      <div className="w-9/12">
                        <TextField
                          margin="normal"
                          fullWidth
                          name="image"
                          type="file"
                          // {...console.log("field->", field)}
                          // {...console.log("isEdit->", isEdit)}
                          {...console.log("formik->", formik)}

                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            setFieldValue('image', file);
                          }}
                          error={meta.touched && meta.error ? true : false}
                          helperText={meta.touched && meta.error ? meta.error : ''}
                        />
                      </div>
                      <div className="p-3 w-3/12">
                        {field.value && (
                          <div style={{ width: "75px", height: "75px" }}>
                            <img className="h-16 w-24" src={isEdit ? `http://localhost:4000/image/categoryImages/${field.value}` : `${URL.createObjectURL(field.value)}`} alt="Selected Image" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Field>
              </div>

              {/* <button type="submit">Submit</button> */}
              <Button color="primary" variant="contained" fullWidth type="submit">
                {isEdit ? "Edit" : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}