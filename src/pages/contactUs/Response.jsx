import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import * as moment from "moment";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import Lodder from '../../components/Loader/Loader';
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { getCategory } from "../../store/action/categoryAction";
import {
  addContactUs,
  getSingleContactUs,
  responseContactUs,
  updateContactUs,
} from "../../store/action/contactUsAction";
import { useParams } from "react-router-dom";

// import Loading from '../components/small/Loading';

const Response = () => {

  const { id: responseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");

  const { contactUs, loading: contactUsLoading } = useSelector((state) => {
    return state.contactUsDetails;
  });

  useEffect(() => {
    if (responseId) {
      let payload = {
        id: responseId,
      };
      dispatch(getSingleContactUs(payload));
    }
    // dispatch(getCategory());
  }, [dispatch, responseId]);

  console.log("contactUs-------------->", contactUs);

  let initialValues = {
    title: "",
    response: "",
    read: "",
    status: "open",
  }

  const validationSchema = yup.object().shape({
    title: yup
      .string("Enter Email Title")
      .required("Email title is required"),
    response: yup
      .string("Enter email response")
      .required("email response is required"),
    read: yup.boolean().required("is verified is required"),
    status: yup
      .string("select your gender")
      .required("status is required"),
  });

  const handleSubmit = (data) => {
    console.log("in submit->", data);

    dispatch(responseContactUs(responseId, data));
    navigate(`/contactUs`);
  };

  let date = moment(contactUs?.createdAt).format("ddd DD MMM YY LT");

  return (
    <>
      {
        contactUsLoading ? (
          // <div>loading</div>
          <Lodder />
        ) :
          (<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className="py-3 px-2 flex justify-center align-middle">
              <h2 className="font-bold text-2xl">Email Response</h2>
            </div>

            <div className="pl-5">
              <div className="py-1"><span>Name:</span> {contactUs?.name}</div>
              <div className="py-1"><span>Email:</span>  {contactUs?.email}</div>
              <div className="py-1"><span>Message:</span>  {contactUs?.message}</div>
              <div className="py-1"><span>Date:</span>  {date}</div>
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
                    if (responseId) {
                      async function getDAta() {
                        formik.setValues({
                          // title: contactUs?.title,
                          // response: contactUs?.response,
                          read: contactUs?.read,
                          status: contactUs?.status,
                        });
                      }
                      getDAta();
                    }
                  }, [responseId]);
                  return (
                    <Form className="flex justify-center w-full px-8 py-5">
                      <div className="w-full  2xl:w-3/5">

                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
                          <div className="flex justify-center p-4">
                            <Field name="title">
                              {({ field, form: { touched, errors }, meta, form }) => (
                                <TextField
                                  fullWidth
                                  id="title"
                                  label="email title"
                                  type="text"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""}
                                />
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
                          <div className="flex justify-center p-4">
                            <Field name="response">
                              {({ field, form: { touched, errors }, meta, form }) => (
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={2}
                                  id="response"
                                  label="email response"
                                  type="text"
                                  {...field}
                                  error={meta.touched && meta.error ? true : false}
                                  helperText={meta.touched && meta.error ? meta.error : ""}
                                />
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                          <div className="flex p-4">
                            <div className="flex items-center">
                              <div className="font-bold mr-5">Read</div>
                              <div>
                                <RadioGroup
                                  name="read"
                                  value={formik.values.read}
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
                                {formik.touched.read && formik.errors.read && (
                                  <div className="text-red-600 text-xs">{formik.errors.read}</div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex p-4">
                            <div className="flex items-center">
                              <div className="font-bold mr-5">status</div>
                              <div>
                                <RadioGroup
                                  name="status"
                                  value={formik.values.status}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  row
                                >
                                  <FormControlLabel
                                    value="open"
                                    control={<Radio />}
                                    label="open"
                                    labelPlacement="end"
                                  />
                                  <FormControlLabel
                                    value="inProgress"
                                    control={<Radio />}
                                    label="inProgress"
                                    labelPlacement="end"
                                  />
                                  <FormControlLabel
                                    value="closed"
                                    control={<Radio />}
                                    label="closed"
                                    labelPlacement="end"
                                  />
                                </RadioGroup>
                                {formik.touched.status && formik.errors.status && (
                                  <div className="text-red-600 text-xs">{formik.errors.status}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <Button type="submit" variant="contained" color="primary">
                            send
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

export default Response;
