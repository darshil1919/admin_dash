import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import Lodder from '../components/Loader/Loader';
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { getCategory } from "../store/action/categoryAction";
import {
  addSubCategory,
  getSingleSubCategory,
  updateSubCategory,
} from "../store/action/subCategoryAction";
import { useParams } from "react-router-dom";

// import Loading from '../components/small/Loading';

const AddSubCategory = () => {

  const { id: editId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(!!editId);
  const [preview, setPreview] = useState("");

  const { allCategory, loading: allCategoryLoading } = useSelector((state) => {
    return state.allCategory;
  });

  const { subCategory, loading: subCategoryLoading } = useSelector((state) => {
    return state.subCategoryDetails;
  });

  console.log("allCategory---->", allCategory);
  useEffect(() => {
    if (isEdit) {
      let payload = {
        id: editId,
      };
      dispatch(getSingleSubCategory(payload));
    }
    dispatch(getCategory());
  }, [dispatch, editId]);

  let initialValues = {
    subCategoryName: "",
    categoryId: "",
    description: "",
    image: "",
    isActive: "",
  }

  const validationSchema = yup.object().shape({
    subCategoryName: yup
      .string("Enter your name")
      .required("subCategoryName is required")
      .matches(/^[a-zA-Z ]*$/, "Sub Category Name must Alphabet"),
    categoryId: yup
      .string("Enter your categoryId")
      .required("categoryId is required"),
    description: yup
      .string("Enter your description")
      .required("description is required"),
    image: yup.mixed().required("Image is required").test(
      "fileFormat",
      "only .jpeg .jpg and .png file supported.",
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

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
    }
    setFieldValue("image", file);
  };

  const handleSubmit = (data) => {
    console.log("in submit->", data);
    if (!isEdit) {
      const myForm = new FormData();
      myForm.append("subCategoryName", data.subCategoryName);
      myForm.append("categoryId", data.categoryId);
      myForm.append("description", data.description);
      myForm.append("image", data.image);
      myForm.append("isActive", data.isActive);
      console.log("myForm-->", myForm);
      dispatch(addSubCategory(myForm));
      console.log("subCategory==============->", subCategory);
      navigate(`/sub-category`);
    } else {
      const myForm = new FormData();
      myForm.append("subCategoryName", data.subCategoryName);
      myForm.append("categoryId", data.categoryId);
      myForm.append("description", data.description);
      myForm.append("isActive", data.isActive);
      if (preview) {
        myForm.append("image", data.image);
        console.log("in preview", preview);
      }
      dispatch(updateSubCategory(editId, myForm));
      navigate(`/sub-category`);
    }
  };

  return (
    <>
      {
        subCategoryLoading || allCategoryLoading ? (
          // <div>loading</div>
          <Lodder />
        ) :
          (<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className="py-3 px-2 flex justify-center align-middle">
              <h2 className="font-bold text-2xl">{isEdit ? "Edit Sub Category" : "Add Sub Category"}</h2>
            </div>

            <div className="flex flex-col justify-center items-center">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {(formik) => {
                  console.log("formik-->", formik);
                  console.log("formik.errors.isActive-->", formik.errors.isActive);
                  useEffect(() => {
                    if (isEdit) {
                      async function getDAta() {
                        console.log("in func");
                        // let payload = {
                        //   id: editId,
                        // };
                        // const config = { headers: { "Content-Type": "application/json" } };
                        // const { data } = await axios.post(`/api/v1/subcategory/getsubcategorywithid`, payload, config);
                        // // dispatch(getSingleSubCategory(payload));
                        // formik.setValues({
                        //   subCategoryName: data?.data?.subCategoryName,
                        //   categoryId: data?.data?.categoryId,
                        //   description: data?.data?.description,
                        //   image: data?.data?.image,
                        // });
                        formik.setValues({
                          subCategoryName: subCategory?.subCategoryName,
                          categoryId: subCategory?.categoryId,
                          description: subCategory?.description,
                          image: subCategory?.image,
                          isActive: subCategory?.isActive,
                        });
                      }
                      getDAta();
                    }
                  }, []);
                  return (
                    <Form className="flex justify-center w-full px-8 py-5">
                      <div className="w-2/3">
                        <div className="p-4">
                          <Field name="subCategoryName">
                            {({ field, form: { touched, errors }, meta, form }) => (
                              <TextField
                                fullWidth
                                id="subCategoryName"
                                label="subCategory Name"
                                name="subCategoryName"
                                type="text"
                                {...field}
                                // {...console.log("field--->", field)}
                                error={meta.touched && meta.error ? true : false}
                                helperText={meta.touched && meta.error ? meta.error : ""}
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
                                helperText={meta.touched && meta.error ? meta.error : ""}
                              >
                                {allCategory?.items?.map((option) => (
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
                                helperText={meta.touched && meta.error ? meta.error : ""} />
                            )}
                          </Field>
                        </div>

                        <div className="p-4">
                          {!isEdit &&
                            <>
                              {preview && (
                                <div className="">
                                  <div style={{ width: "75px", height: "75px" }}>
                                    <img
                                      className="h-16 w-24"
                                      src={preview}
                                      alt="Selected Image" />
                                  </div>
                                </div>
                              )}
                              <Field name="image">
                                {({ field, form: { setFieldValue }, meta, form }) => (
                                  <TextField
                                    fullWidth
                                    name="image"
                                    type="file"
                                    inputProps={{
                                      accept: "image/png, image/jpeg, image/jpg",
                                    }}
                                    onChange={(event) => handleFileChange(event, setFieldValue)}
                                    error={meta.touched && meta.error ? true : false}
                                    helperText={meta.touched && meta.error ? meta.error : ""} />
                                )}
                              </Field>
                            </>
                          }
                          {isEdit &&
                            <>
                              <div className="">
                                {/* {preview && ( */}
                                <div style={{ width: "75px", height: "75px" }}>
                                  <img
                                    className="h-16 w-24"
                                    src={preview ? preview : `http://localhost:4000/image/subCategoryImages/${subCategory?.image}`}
                                    alt="Sub Category Image" />
                                </div>
                                {/* )}
                                {!preview && (
                                  <div style={{ width: "75px", height: "75px" }}>
                                    <img
                                      className="h-16 w-24"
                                      src={`http://localhost:4000/image/subCategoryImages/${formik.values.image}`}
                                      alt="Selected Image" />
                                  </div>
                                )} */}
                              </div>
                              <Field name="image">
                                {({ field, form: { setFieldValue }, meta, form }) => (
                                  <TextField
                                    fullWidth
                                    name="image"
                                    type="file"
                                    inputProps={{
                                      accept: "image/png, image/jpeg, image/jpg",
                                    }}
                                    onChange={(event) => handleFileChange(event, setFieldValue)}
                                    error={meta.touched && meta.error ? true : false}
                                    helperText={meta.touched && meta.error ? meta.error : ""} />
                                )}
                              </Field>
                            </>
                          }
                        </div>

                        <div className="p-4">
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

                        <div className="text-center">
                          <Button type="submit" variant="contained" color="primary">
                            {isEdit ? "Edit SubCategory" : "Add SubCategory"}
                          </Button>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
          )
      }

    </>
  );
};

export default AddSubCategory;
