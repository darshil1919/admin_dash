import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { getCategory } from "../store/action/categoryAction";
import {
  getSubCategory,
  getSingleSubCategory,
} from "../store/action/subCategoryAction";
import { useParams } from "react-router-dom";

// import Loading from '../components/small/Loading';

const AddSubCategory = () => {
  const { id: editId } = useParams();
  const dispatch = useDispatch();
  // const [isEdit, setIsEdit] = useState(!!editId);
  // const [isEdit, setIsEdit] = useState(false);

  const { allCategory } = useSelector((state) => {
    return state.allCategory;
  });

  const { subCategory } = useSelector((state) => {
    // console.log(state)
    return state.subCategoryDetails;
  });

  let [initialValues, setInitialValues] = useState({
    subCategoryName: "",
    categoryId: "",
    description: "",
    image: "",
  });

  const validationSchema = yup.object({
    subCategoryName: yup
      .string("Enter your name")
      .required("subCategoryName is required"),
    categoryId: yup
      .string("Enter your categoryId")
      .required("categoryId is required"),
    description: yup
      .string("Enter your description")
      .required("description is required"),
    image: yup
      .mixed()
      .required("Image is required")
      .test(
        "fileFormat",
        "only .jpeg .jpg and .png file supported.",
        (value) => {
          if (value) {
            return ["image/jpeg", "image/jpg", "image/png"].includes(
              value.type
            );
          }
          return true;
        }
      ),
  });

  useEffect(() => {
    // dispatch(getCategory());
    if (editId) {
      if(Object.keys(subCategory).length == 0){
      console.log("editId->", editId);
      let payload = {
        id: editId,
      };
      dispatch(getSingleSubCategory(payload));
    } 
    if(Object.keys(subCategory).length > 0) {
      console.log(subCategory);
      setInitialValues({
        subCategoryName: subCategory.subCategoryName,
        categoryId: subCategory.categoryId,
        description: subCategory.description,
        image: subCategory.image,
      });
    }
  }
  }, [dispatch, editId]);

  // useEffect(() => {
  //   if (isEdit) {
  //     console.log("in ifffffff->", subCategory);
  //     setInitialValues({
  //       subCategoryName: subCategory?.subCategoryName,
  //       categoryId: subCategory?.categoryId,
  //       description: subCategory?.description,
  //       image: subCategory?.image,
  //     });
  //     console.log("in if initialValues->", initialValues);
  //   }
  // }, [isEdit, subCategory]);

  const handleSubmit = (data) => {
    console.log("in submit->", data);
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        {/* <Header category="Page" title="Orders" /> */}
        {/* <CategoryTable /> */}
        <div className="py-3 px-2 flex justify-center align-middle">
          <h2 className="font-bold text-2xl">Add Sub Category</h2>
        </div>

        <div className="flex flex-col justify-center items-center">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form className="flex justify-center w-full px-8 py-5">
                <div className="w-2/3">
                  <div className="p-4">
                    <Field name="subCategoryName">
                      {({ field, form: { touched, errors }, meta }) => (
                        <TextField
                          fullWidth
                          id="subCategoryName"
                          label="subCategory Name"
                          name="subCategoryName"
                          type="text"
                          value={subCategory.categoryName}
                          {...field}
                          error={meta.touched && meta.error ? true : false}
                          helperText={
                            meta.touched && meta.error ? meta.error : ""
                          }
                        />
                      )}
                    </Field>
                  </div>

                  <div className="p-4">
                    <Field name="categoryId">
                      {({ field, form: { touched, errors }, meta }) => (
                        <TextField
                          fullWidth
                          select
                          id="categoryId"
                          name="categoryId"
                          label="category Name"
                          {...field}
                          error={meta.touched && meta.error ? true : false}
                          helperText={
                            meta.touched && meta.error ? meta.error : ""
                          }
                        >
                          {allCategory.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                              {option.categoryName}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    </Field>
                  </div>

                  <div className="p-4">
                    <Field name="description">
                      {({ field, form: { touched, errors }, meta }) => (
                        <TextField
                          fullWidth
                          id="description"
                          label="Description"
                          name="description"
                          type="text"
                          {...field}
                          error={meta.touched && meta.error ? true : false}
                          helperText={
                            meta.touched && meta.error ? meta.error : ""
                          }
                        />
                      )}
                    </Field>
                  </div>

                  <div className="p-4">
                    <Field name="image">
                      {({ field, form: { setFieldValue }, meta }) => (
                        <div className="flex">
                          <div className="w-9/12">
                            <TextField
                              fullWidth
                              name="image"
                              type="file"
                              inputProps={{
                                accept: "image/png, image/jpeg, image/jpg",
                              }}
                              onChange={(event) => {
                                const file = event.currentTarget.files[0];
                                setFieldValue("image", file);
                              }}
                              error={meta.touched && meta.error ? true : false}
                              helperText={
                                meta.touched && meta.error ? meta.error : ""
                              }
                            />
                          </div>
                          <div className="p-3 w-3/12">
                            {field.value && (
                              <div style={{ width: "75px", height: "75px" }}>
                                <img
                                  className="h-16 w-24"
                                  // src={`${URL.createObjectURL(field.value)}`}
                                  alt="Selected Image"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </Field>
                  </div>

                  {/* <button type="submit">Submit</button> */}
                  <div className="text-center">
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddSubCategory;
