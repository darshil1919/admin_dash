import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Lodder from '../components/Loader/Loader';
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import { Formik, Form, Field, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { getSubCategory } from "../store/action/subCategoryAction";
import {
  addService,
  getSingleService,
  updateService,
} from "../store/action/serviceAction";
import { useParams } from "react-router-dom";

// import Loading from '../components/small/Loading';

const AddService = () => {

  const { id: editId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(!!editId);
  const [preview, setPreview] = useState("");

  const { allSubCategory, loading: allSubCategoryLoading } = useSelector((state) => {
    return state.allSubCategory;
  });
  console.log("allSubCategory-->", allSubCategory);
  const { service, loading: serviceLoading } = useSelector((state) => {
    return state.serviceDetails;
  });

  useEffect(() => {
    if (isEdit) {
      let payload = {
        id: editId,
      };
      dispatch(getSingleService(payload));
    }
    dispatch(getSubCategory());
  }, [dispatch, editId]);

  let initialValues = {
    serviceName: "",
    subCategoryId: "",
    duration: "",
    price: "",
    description: "",
    image: "",
    included: [''],
    excluded: [''],
    FAQs: [
      {
        question: "",
        answer: "",
      },
    ],
    isActive: "",
  }

  const validationSchema = yup.object().shape({
    serviceName: yup
      .string("Enter your name")
      .required("serviceName is required"),
    subCategoryId: yup
      .string("select sub Category name")
      .required("sub Category name is required"),
    duration: yup
      .string("enter duration")
      .required("duration is required"),
    price: yup
      .string("enter price")
      .required("price is required"),
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
    included: yup.array().of(yup.string().required("enter included in service")),
    excluded: yup.array().of(yup.string().required("enter excluded in service")),
    FAQs: yup.array().of(
      yup.object().shape({
        question: yup.string().required("Question is required"),
        answer: yup.string().required("Answer is required"),
      })
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
      console.log("isEdit in if->", isEdit);
      const myForm = new FormData();
      myForm.append("serviceName", data.serviceName);
      myForm.append("subCategoryId", data.subCategoryId);
      myForm.append("duration", data.duration);
      myForm.append("price", data.price);
      myForm.append("description", data.description);
      myForm.append("image", data.image);
      myForm.append("included", data.included);
      myForm.append("excluded", data.excluded);
      myForm.append("FAQs", JSON.stringify(data.FAQs));
      myForm.append("isActive", data.isActive);
      console.log("myForm-->", myForm);
      dispatch(addService(myForm));
      // console.log("subCategory==============->", subCategory);
      navigate(`/service`);
    } else {
      console.log("isEdit in else->", isEdit);
      const myForm = new FormData();
      myForm.append("serviceName", data.serviceName);
      myForm.append("subCategoryId", data.subCategoryId);
      myForm.append("duration", data.duration);
      myForm.append("price", data.price);
      myForm.append("description", data.description);
      myForm.append("included", data.included);
      myForm.append("excluded", data.excluded);
      myForm.append("FAQs", JSON.stringify(data.FAQs));
      myForm.append("isActive", data.isActive);
      console.log("myForm-->", myForm);
      if (preview) {
        myForm.append("image", data.image);
        console.log("in preview", preview);
      }
      dispatch(updateService(editId, myForm));
      navigate(`/service`);
    }
  };

  return (
    <>
      {
        allSubCategoryLoading ? (
          // <div>loading</div>
          <Lodder />
        ) :
          (<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className="py-3 px-2 flex justify-center align-middle">
              <h2 className="font-bold text-2xl">{isEdit ? "Edit Service" : "Add Service"}</h2>
            </div>

            <div className="flex flex-col justify-center items-center">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {(formik) => {
                  // console.log("formik)--->", formik);
                  useEffect(() => {
                    if (isEdit) {
                      async function getDAta() {
                        console.log("in func");
                        formik.setValues({
                          serviceName: service?.serviceName,
                          subCategoryId: service?.subCategoryId,
                          duration: service?.duration,
                          price: service?.price,
                          description: service?.description,
                          image: service?.image,
                          included: service?.included,
                          excluded: service?.excluded,
                          FAQs: service?.FAQs,
                          isActive: service?.isActive,
                        });
                      }
                      getDAta();
                    }
                  }, []);
                  return (
                    <Form className="flex justify-center w-full px-8 py-5">
                      <div className="w-full  2xl:w-3/5">

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                          <div className="flex justify-center p-4">
                            <Field name="serviceName">
                              {({ field, form: { touched, errors }, meta, form }) => (
                                <TextField
                                  fullWidth
                                  id="serviceName"
                                  label="Service Name"
                                  type="text"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""}
                                />
                              )}
                            </Field>
                          </div>

                          <div className="flex justify-center p-4">
                            <Field name="subCategoryId">
                              {({ field, form: { touched, errors }, meta }) => (
                                <TextField
                                  fullWidth
                                  select
                                  id="subCategoryId"
                                  label="Sub Category Name"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""}
                                >
                                  {allSubCategory?.items ? (allSubCategory?.items?.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                      {option.subCategoryName}
                                    </MenuItem>
                                  ))) : <div>load Sub Category</div>}
                                </TextField>
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                          <div className="flex justify-center p-4">
                            <Field name="duration">
                              {({ field, form: { touched, errors }, meta, form }) => (
                                <TextField
                                  fullWidth
                                  id="duration"
                                  label="Service Duration"
                                  type="text"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""}
                                />
                              )}
                            </Field>
                          </div>

                          <div className="flex justify-center p-4">
                            <Field name="price">
                              {({ field, form: { touched, errors }, meta }) => (
                                <TextField
                                  fullWidth
                                  id="price"
                                  label="Service Price"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""} />
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                          <div className="flex justify-center p-4">
                            <Field name="description">
                              {({ field, form: { touched, errors }, meta }) => (
                                <TextField
                                  fullWidth
                                  id="description"
                                  label="Description"
                                  type="text"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""} />
                              )}
                            </Field>
                          </div>

                          <div className="flex justify-center p-4">
                            {!isEdit &&
                              <>
                                <Field name="image">
                                  {({ field, form: { setFieldValue }, meta, form }) => (
                                    <TextField
                                      fullWidth
                                      type="file"
                                      inputProps={{
                                        accept: "image/png, image/jpeg, image/jpg",
                                      }}
                                      onChange={(event) => handleFileChange(event, setFieldValue)}
                                      error={meta.touched && meta.error ? true : false}
                                      helperText={meta.touched && meta.error ? meta.error : ""} />
                                  )}
                                </Field>
                                {preview && (
                                  <div className="pl-2">
                                    <div style={{ width: "75px", height: "75px" }}>
                                      <img
                                        className="h-16 w-24"
                                        src={preview}
                                        alt="Selected Image" />
                                    </div>
                                  </div>
                                )}
                              </>
                            }
                            {isEdit &&
                              <>
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
                                <div className="pl-2">
                                  <div style={{ width: "75px", height: "75px" }}>
                                    <img
                                      className="h-16 w-24"
                                      src={preview ? preview : `http://localhost:4000/image/serviceImages/${service?.image}`}
                                      alt="Sub Category Image" />
                                  </div>
                                </div>
                              </>
                            }
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                          <div className="flex justify-center p-4">
                            <FieldArray name="included">
                              {fieldArrayProps => {
                                // console.log("fieldArrayProps-->", fieldArrayProps);
                                const { push, remove, insert, form } = fieldArrayProps;
                                const { values } = form;
                                const { included } = values;
                                return (
                                  <div className="w-full max-h-72	overflow-y-auto pt-1.5">
                                    {
                                      included?.map((include, index) => (
                                        <div key={index} className="flex pb-3 items-start">
                                          <div className="w-4/5">
                                            <Field name={`included[${index}]`}>
                                              {({ field, form: { touched, errors }, meta }) => (
                                                <TextField
                                                  fullWidth
                                                  id="included"
                                                  label="Service included"
                                                  type="text"
                                                  {...field}
                                                  error={meta.touched && meta.error ? true : false}
                                                  helperText={meta.touched && meta.error ? meta.error : ""} />
                                              )}
                                            </Field>
                                          </div>
                                          <IconButton
                                            onClick={() => insert(++index, '')}
                                          >
                                            <EditIcon color="primary" />
                                          </IconButton>
                                          {
                                            index > 0 &&
                                            <IconButton
                                              onClick={() => remove(index)}
                                            >
                                              <DeleteRoundedIcon sx={{ color: red[500] }} />
                                            </IconButton>
                                          }
                                        </div>
                                      ))
                                    }
                                  </div>
                                )
                              }
                              }
                            </FieldArray>
                          </div>

                          <div className="flex justify-center p-4">
                            <FieldArray name="excluded">
                              {fieldArrayProps => {
                                const { push, remove, insert, form } = fieldArrayProps;
                                const { values } = form;
                                const { excluded } = values;
                                return (
                                  <div className="w-full max-h-72	overflow-y-auto pt-1.5">
                                    {
                                      excluded?.map((include, index) => (
                                        <div key={index} className="flex pb-3 items-start">
                                          <div className="w-4/5">
                                            <Field name={`excluded[${index}]`}>
                                              {({ field, form: { touched, errors }, meta }) => (
                                                <TextField
                                                  fullWidth
                                                  id="excluded"
                                                  label="Service excluded"
                                                  type="text"
                                                  {...field}
                                                  error={meta.touched && meta.error ? true : false}
                                                  helperText={meta.touched && meta.error ? meta.error : ""} />
                                              )}
                                            </Field>
                                          </div>
                                          <IconButton
                                            onClick={() => insert(++index, '')}
                                          >
                                            <EditIcon color="primary" />
                                          </IconButton>
                                          {
                                            index > 0 &&
                                            <IconButton
                                              onClick={() => remove(index)}
                                            >
                                              <DeleteRoundedIcon sx={{ color: red[500] }} />
                                            </IconButton>
                                          }
                                        </div>
                                      ))
                                    }
                                  </div>
                                )
                              }
                              }
                            </FieldArray>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
                          <div className="p-4">
                            <FieldArray name="FAQs">
                              {fieldArrayProps => {
                                const { push, remove, form } = fieldArrayProps;
                                const { values } = form;
                                const { FAQs } = values;
                                return (
                                  <>
                                    <div className="flex justify-between ">
                                      <h2 className="font-bold">FAQs</h2>
                                      <Button variant="contained" color="primary" onClick={() => push({
                                        question: "",
                                        answer: ""
                                      })}>+ Add new</Button>
                                    </div>
                                    <div className="w-full max-h-72	overflow-y-auto mt-4">
                                      {
                                        FAQs?.map((FAQs, index) => (
                                          <div key={index} className="flex pb-3 items-start py-4">
                                            <div className="w-full flex flex-col">
                                              <div className="w-full py-2">
                                                <Field name={`FAQs.${index}.question`}>
                                                  {({ field, form: { touched, errors }, meta }) => (
                                                    <TextField
                                                      fullWidth
                                                      id="question"
                                                      label="question"
                                                      type="text"
                                                      {...field}
                                                      error={meta.touched && meta.error ? true : false}
                                                      helperText={meta.touched && meta.error ? meta.error : ""} />
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="w-full py-2">
                                                <Field name={`FAQs.${index}.answer`}>
                                                  {({ field, form: { touched, errors }, meta }) => (
                                                    <TextField
                                                      fullWidth
                                                      multiline
                                                      rows={2}
                                                      id="answer"
                                                      label="answer"
                                                      type="text"
                                                      {...field}
                                                      error={meta.touched && meta.error ? true : false}
                                                      helperText={meta.touched && meta.error ? meta.error : ""} />
                                                  )}
                                                </Field>
                                              </div>
                                            </div>
                                            <IconButton
                                              onClick={() => remove(index)}
                                            >
                                              <DeleteRoundedIcon sx={{ color: red[500] }} />
                                            </IconButton>
                                          </div>
                                        ))
                                      }
                                    </div>
                                  </>
                                )
                              }
                              }
                            </FieldArray>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                          <div className="flex p-4">
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
                        </div>

                        <div className="text-center">
                          <Button type="submit" variant="contained" color="primary">
                            {isEdit ? "Edit Service" : "Add Service"}
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

export default AddService;
