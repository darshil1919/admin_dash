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
import {
  addCustomer,
  getSingleCustomer,
  updateCustomer,
} from "../../store/action/customerAction";
import { useParams } from "react-router-dom";

// import Loading from '../components/small/Loading';

const AddCustomer = () => {

  const { id: editId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(!!editId);
  const [preview, setPreview] = useState("");

  const { customer, loading: customerLoading } = useSelector((state) => {
    return state.customerDetails;
  });

  useEffect(() => {
    if (isEdit) {
      let payload = {
        id: editId,
      };
      dispatch(getSingleCustomer(payload));
    }
  }, [dispatch, editId]);

  let initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
      houseNo: "",
      streetName: "",
      landMark: "",
      city: "",
      state: "",
      pinCode: "",
    },
    password: "",
    role: "",
    isEnabled: "",
    addBy: "admin",
  }

  const validationSchema = yup.object().shape({
    firstName: yup
      .string("Enter first name")
      .required("firstName is required")
      .matches(/^[a-zA-Z ]*$/, "First Name must Alphabet"),
    lastName: yup
      .string("Enter last name")
      .required("lastName is required")
      .matches(/^[a-zA-Z ]*$/, "Last Name must Alphabet"),
    email: yup
      .string("Enter email")
      .email("Invalid email format")
      .required("email is required"),
    phone: yup.string()
      .required()
      .matches(/^[0-9]+$/, "enter valid phone number")
      .min(10, 'enter valid phone number')
      .max(10, 'enter valid phone number'),
    address: yup.object().shape({
      houseNo: yup.string().required("houseNo is required"),
      streetName: yup.string().required("streetName is required"),
      landMark: yup.string().required("landMark is Required").matches(/^[a-zA-Z ]*$/, "landmark Name must Alphabet"),
      city: yup.string().required("city is Required").matches(/^[a-zA-Z ]*$/, "City Name must Alphabet"),
      state: yup.string().required("state is Required").matches(/^[a-zA-Z ]*$/, "State Name must Alphabet"),
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
    role: yup
      .string("Enter your role")
      .required("role is required"),
    isEnabled: yup.boolean().required("is Enabled is required"),
  });

  const handleSubmit = (data) => {
    console.log("in submit->", data);
    if (!isEdit) {
      console.log("myForm-->", data);
      dispatch(addCustomer(data));
      // navigate(`/customer`);
    } else {
      delete data.addBy;
      delete data.password;
      console.log("data---0", data);
      dispatch(updateCustomer(editId, data));
      navigate(`/customer`);
    }
  };

  return (
    <>
      {
        customerLoading ? (
          // <div>loading</div>
          <Lodder />
        ) :
          (<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className="py-3 px-2 flex justify-center align-middle">
              <h2 className="font-bold text-2xl">{isEdit ? "Edit Customer" : "Add Customer"}</h2>
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
                          firstName: customer?.firstName,
                          lastName: customer?.lastName,
                          email: customer?.email,
                          phone: customer?.phone,
                          address: customer?.address,
                          // password: customer?.password,
                          role: customer?.role,
                          isEnabled: customer?.isEnabled,
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
                          <div className="flex p-4">
                            <div className="flex items-center">
                              <div className="font-bold mr-5">role</div>
                              <div>
                                <RadioGroup
                                  name="role"
                                  value={formik.values.role}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  row
                                >
                                  <FormControlLabel
                                    value="user"
                                    control={<Radio />}
                                    label="user"
                                    labelPlacement="end"
                                  />
                                  <FormControlLabel
                                    value="admin"
                                    control={<Radio />}
                                    label="admin"
                                    labelPlacement="end"
                                  />
                                </RadioGroup>
                                {formik.touched.role && formik.errors.role && (
                                  <div className="text-red-600 text-xs">{formik.errors.role}</div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex p-4">
                            <div className="flex items-center">
                              <div className="font-bold mr-5">Is Enabled</div>
                              <div>
                                <RadioGroup
                                  name="isEnabled"
                                  value={formik.values.isEnabled}
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
                                {formik.touched.isEnabled && formik.errors.isEnabled && (
                                  <div className="text-red-600 text-xs">{formik.errors.isEnabled}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {
                          !isEdit &&
                          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
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
                          </div>
                        }


                        <div className="text-center">
                          <Button type="submit" variant="contained" color="primary">
                            {isEdit ? "Edit Customer" : "Add Customer"}
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

export default AddCustomer;
