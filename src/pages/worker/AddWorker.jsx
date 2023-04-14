import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import Lodder from '../../components/Loader/Loader';
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { getCategory } from "../../store/action/categoryAction";
import {
  addWorker,
  getSingleWorker,
  updateWorker,
} from "../../store/action/workerAction";
import { useParams } from "react-router-dom";

// import Loading from '../components/small/Loading';

const AddWorker = () => {

  const { id: editId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(!!editId);
  const [preview, setPreview] = useState("");

  const { allCategory, loading: allCategoryLoading } = useSelector((state) => {
    return state.allCategory;
  });

  const { worker, loading: workerLoading } = useSelector((state) => {
    return state.workerDetails;
  });

  useEffect(() => {
    if (isEdit) {
      let payload = {
        id: editId,
      };
      dispatch(getSingleWorker(payload));
    }
    dispatch(getCategory());
  }, [dispatch, editId]);

  let initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    skills: "",
    location: "",
    address: {
      houseNo: "",
      streetName: "",
      landMark: "",
      city: "",
      state: "",
      pinCode: "",
    },
    password: "",
    isVerified: "",
    isActive: "",
  }

  const validationSchema = yup.object().shape({
    firstName: yup
      .string("Enter first name")
      .required("firstName is required"),
    lastName: yup
      .string("Enter last name")
      .required("lastName is required"),
    email: yup
      .string("Enter email")
      .email("Invalid email format")
      .required("email is required"),
    phone: yup.string()
      .required()
      .matches(/^[0-9]+$/, "enter valid phone number")
      .min(10, 'enter valid phone number')
      .max(10, 'enter valid phone number'),
    skills: yup
      .string("select skill")
      .required("skill is required"),
    location: yup
      .string("Enter location")
      .required("working location is required"),
    address: yup.object().shape({
      houseNo: yup.string().required("houseNo is required"),
      streetName: yup.string().required("streetName is required"),
      landMark: yup.string().required("landMark is Required"),
      city: yup.string().required("city is Required"),
      state: yup.string().required("state is Required"),
      pinCode: yup
        .string()
        .required("pincode is Required")
        .matches(/^[0-9]+$/, "enter valid pin code")
        .min(6, 'enter valid pin code')
        .max(6, 'enter valid pin code'),
    }),
    password: !isEdit && yup
      .string("Enter your password")
      .required("password is required"),
    gender: yup
      .string("select your gender")
      .required("gender is required"),
    isVerified: yup.boolean().required("is verified is required"),
    isActive: yup.boolean().required("is Active is required"),
  });

  const handleSubmit = (data) => {
    console.log("in submit->", data);
    if (!isEdit) {
      console.log("myForm-->", data);
      dispatch(addWorker(data));
      navigate(`/customer`);
    } else {
      delete data.addBy;
      delete data.password;
      console.log("data---0", data);
      dispatch(updateWorker(editId, data));
      navigate(`/worker`);
    }
  };

  return (
    <>
      {
        workerLoading ? (
          // <div>loading</div>
          <Lodder />
        ) :
          (<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className="py-3 px-2 flex justify-center align-middle">
              <h2 className="font-bold text-2xl">{isEdit ? "Edit Worker" : "Add Worker"}</h2>
            </div>

            <div className="flex flex-col justify-center items-center">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {(formik) => {
                  // console.log("formik-->", formik);
                  useEffect(() => {
                    if (isEdit) {
                      async function getDAta() {
                        formik.setValues({
                          firstName: worker?.firstName,
                          lastName: worker?.lastName,
                          email: worker?.email,
                          phone: worker?.phone,
                          address: worker?.address,
                          gender: worker?.gender,
                          skills: worker?.skills,
                          location: worker?.location,
                          // password: worker?.password,
                          isVerified: worker?.isVerified,
                          isActive: worker?.isActive,
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
                            <Field name="firstName">
                              {({ field, form: { touched, errors }, meta, form }) => (
                                <TextField
                                  fullWidth
                                  id="firstName"
                                  label="first Name"
                                  type="text"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""}
                                />
                              )}
                            </Field>
                          </div>

                          <div className="flex justify-center p-4">
                            <Field name="lastName">
                              {({ field, form: { touched, errors }, meta }) => (
                                <TextField
                                  fullWidth
                                  id="lastName"
                                  label="last Name"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""}
                                />
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                          <div className="flex justify-center p-4">
                            <Field name="email">
                              {({ field, form: { touched, errors }, meta, form }) => (
                                <TextField
                                  fullWidth
                                  id="email"
                                  label="email"
                                  type="text"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""}
                                />
                              )}
                            </Field>
                          </div>

                          <div className="flex justify-center p-4">
                            <Field name="phone">
                              {({ field, form: { touched, errors }, meta }) => (
                                <TextField
                                  fullWidth
                                  id="phone"
                                  label="phone"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""} />
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                          <div className="flex justify-center p-4">
                            <Field name="address.houseNo">
                              {({ field, form: { touched, errors }, meta }) => (
                                <TextField
                                  fullWidth
                                  id="address.houseNo"
                                  label="houseNo"
                                  type="text"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""} />
                              )}
                            </Field>
                          </div>

                          <div className="flex justify-center p-4">
                            <Field name="address.streetName">
                              {({ field, form: { touched, errors }, meta }) => (
                                <TextField
                                  fullWidth
                                  id="address.streetName"
                                  label="streetName"
                                  type="text"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""} />
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                          <div className="flex justify-center p-4">
                            <Field name="address.landMark">
                              {({ field, form: { touched, errors }, meta }) => (
                                <TextField
                                  fullWidth
                                  id="address.landMark"
                                  label="landMark"
                                  type="text"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""} />
                              )}
                            </Field>
                          </div>

                          <div className="flex justify-center p-4">
                            <Field name="address.city">
                              {({ field, form: { touched, errors }, meta }) => (
                                <TextField
                                  fullWidth
                                  id="address.city"
                                  label="city"
                                  type="text"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""} />
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                          <div className="flex justify-center p-4">
                            <Field name="address.state">
                              {({ field, form: { touched, errors }, meta }) => (
                                <TextField
                                  fullWidth
                                  id="address.state"
                                  label="state"
                                  type="text"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""} />
                              )}
                            </Field>
                          </div>

                          <div className="flex justify-center p-4">
                            <Field name="address.pinCode">
                              {({ field, form: { touched, errors }, meta }) => (
                                <TextField
                                  fullWidth
                                  id="address.pinCode"
                                  label="pinCode"
                                  type="text"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""} />
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                          <div className="flex justify-center p-4">
                            <Field name="skills">
                              {({ field, form: { touched, errors }, meta, form }) => (
                                <TextField
                                  fullWidth
                                  select
                                  id="skills"
                                  name="skills"
                                  label="skills"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""}
                                >
                                  {allCategory?.items ? (allCategory?.items?.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                      {option.categoryName}
                                    </MenuItem>
                                  ))) : <div>load Sub Category</div>}
                                </TextField>
                              )}
                            </Field>
                          </div>

                          <div className="flex justify-center p-4">
                            <Field name="location">
                              {({ field, form: { touched, errors }, meta }) => (
                                <TextField
                                  fullWidth
                                  select
                                  id="location"
                                  name="location"
                                  label="location"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""}
                                >
                                  {/* {allCategory?.items?.map((option) => ( */}
                                  <MenuItem key={395010} value={395010}>BOMBAY MARKET</MenuItem>
                                  <MenuItem key={395008} value={395008}>A K ROAD</MenuItem>
                                  <MenuItem key={395006} value={395006}>VARACHHA ROAD</MenuItem>
                                  <MenuItem key={395004} value={395004}>KATARGAM</MenuItem>
                                  <MenuItem key={394210} value={394210}>UDHNA</MenuItem>
                                  <MenuItem key={395009} value={395009}>RAMNAGAR SURAT</MenuItem>
                                  {/* ))} */}
                                </TextField>
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                          <div className="flex p-4">
                            <div className="flex items-center">
                              <div className="font-bold mr-5">isVerified</div>
                              <div>
                                <RadioGroup
                                  name="isVerified"
                                  value={formik.values.isVerified}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  row
                                >
                                  <FormControlLabel
                                    value="true"
                                    control={<Radio />}
                                    label="yes"
                                    labelPlacement="end"
                                  />
                                  <FormControlLabel
                                    value="false"
                                    control={<Radio />}
                                    label="no"
                                    labelPlacement="end"
                                  />
                                </RadioGroup>
                                {formik.touched.isVerified && formik.errors.isVerified && (
                                  <div className="text-red-600 text-xs">{formik.errors.isVerified}</div>
                                )}
                              </div>
                            </div>
                          </div>

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


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                          <div className="flex p-4">
                            <div className="flex items-center">
                              <div className="font-bold mr-5">Gender</div>
                              <div>
                                <RadioGroup
                                  name="gender"
                                  value={formik.values.gender}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  row
                                >
                                  <FormControlLabel
                                    value="male"
                                    control={<Radio />}
                                    label="Male"
                                    labelPlacement="end"
                                  />
                                  <FormControlLabel
                                    value="female"
                                    control={<Radio />}
                                    label="Female"
                                    labelPlacement="end"
                                  />
                                  <FormControlLabel
                                    value="other"
                                    control={<Radio />}
                                    label="Other"
                                    labelPlacement="end"
                                  />
                                </RadioGroup>
                                {formik.touched.gender && formik.errors.gender && (
                                  <div className="text-red-600 text-xs">{formik.errors.gender}</div>
                                )}
                              </div>
                            </div>
                          </div>
                          {
                            !isEdit &&
                            <div className="flex justify-center p-4">
                              <Field name="password">
                                {({ field, form: { touched, errors }, meta }) => (
                                  <TextField
                                    fullWidth
                                    id="password"
                                    label="password"
                                    type="text"
                                    {...field}
                                    error={meta.touched && meta.error ? true : false}
                                    helperText={meta.touched && meta.error ? meta.error : ""} />
                                )}
                              </Field>
                            </div>
                          }
                        </div>



                        <div className="text-center">
                          <Button type="submit" variant="contained" color="primary">
                            {isEdit ? "Edit Worker" : "Add Worker"}
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

export default AddWorker;
