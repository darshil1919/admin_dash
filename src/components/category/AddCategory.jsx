import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { Formik, Form, Field } from 'formik';
import * as yup from "yup";
import { useDispatch } from 'react-redux';

// import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
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
  const [preview, setPreview] = useState("");

  let initialValues = {
    categoryName: '',
    description: '',
    image: '',
    isActive: '',
  };

  if (isEdit) {
    console.log("recordForEdit->", recordForEdit);
    initialValues = {
      categoryName: recordForEdit?.categoryName,
      description: recordForEdit?.description,
      image: recordForEdit?.image,
      isActive: recordForEdit?.isActive,
    };
  }

  const handleClose = (value) => {
    onClose(value);
  };

  // const handleListItemClick = (value) => {
  //   onClose(value);
  // };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
    }
    setFieldValue("image", file);
  };

  const validationSchema = yup.object().shape({
    categoryName: yup.string().required('categoryName is required'),
    description: yup.string().required('description is required'),
    image: yup.mixed()
      .required('Image is required')
      .test('fileFormat', 'only .jpeg .jpg and .png file supported.',
        (value) => {
          if (isEdit) {
            return true;
          } else {
            if (value) {
              return ["image/jpeg", "image/jpg", "image/png"].includes(
                value.type
              );
            }
            return true;
          }
        }
      ),
    isActive: yup.boolean().required("is Active is required"),
  });

  const handleSubmit = (data) => {
    console.log("in submit->", data);
    console.log("isEdit->", isEdit);
    if (!isEdit) {
      console.log("submit data->", data);
      const myForm = new FormData();
      myForm.append("categoryName", data.categoryName);
      myForm.append("description", data.description);
      myForm.append("image", data.image);
      myForm.append("isActive", data.isActive);

      dispatch(addCategory(myForm));
      handleClose(false);

    } else {
      console.log("edit data->", data);
      const myForm = new FormData();
      myForm.append("categoryName", data.categoryName);
      myForm.append("description", data.description);
      myForm.append("isActive", data.isActive);
      if (preview) {
        myForm.append("image", data.image);
        console.log("in preview", preview);
      }
      console.log("edit myForm->", myForm);
      let editId = recordForEdit?._id;
      dispatch(editCategory(editId, myForm));
      handleClose(false);
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
            onClick={() => { handleClose(false) }}>
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
                          // onChange={(event) => {
                          //   const file = event.currentTarget.files[0];
                          //   setFieldValue('image', file);
                          // }}
                          onChange={(event) => handleFileChange(event, setFieldValue)}
                          error={meta.touched && meta.error ? true : false}
                          helperText={meta.touched && meta.error ? meta.error : ''}
                        />
                      </div>
                      <div className="p-3 w-3/12">
                        {!isEdit && (
                          <div style={{ width: "75px", height: "75px" }}>
                            <img className="h-16 w-24" src={!preview ? '' : preview} alt="category Image" />
                          </div>
                        )}
                        {isEdit && (
                          <div style={{ width: "75px", height: "75px" }}>
                            <img className="h-16 w-24" src={preview ? preview : `http://localhost:4000/image/categoryImages/${recordForEdit?.image}`} alt="category Image" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Field>
              </div>

              <div className="pb-4">
                <div className="flex items-center">
                  <div className="font-bold mr-5">Is Active</div>
                  <div>
                    <RadioGroup
                      name="isActive"
                      value={formik.values.isActive}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      row
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Yes"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="No"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                    {formik.touched.isActive && formik.errors.isActive && (
                      <div className="text-red-600 text-xs">{formik.errors.isActive}</div>
                    )}
                  </div>
                </div>
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