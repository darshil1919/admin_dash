import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import ErrorForm from '../components/small/ErrorForm';
import { resetPassword } from '../store/action/adminAction';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import Forgotpassword from "../components/Forgotpassword";

const Resetpassword = () => {
    const {token} = useParams();
	const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.forgotPassword)

	let onPasswordUpdate = (e) => {
		e.preventDefault()
		if(passwordData.newPassword == ""){
			return toast.error("New password required");
		}
		if(passwordData.confirmPassword == ""){
			return toast.error("Confirm password required");
		}
		if(passwordData.newPassword != passwordData.confirmPassword){
			return toast.error("New password and Confirm password not match");
		}
		dispatch(resetPassword({
			resetPasswordToken: token,
			password: passwordData.newPassword,
			confirmPassword: passwordData.confirmPassword
		}))
	}
    const navigate = useNavigate();

    const initialvalue = {
        newPassword: "",
		confirmPassword: ""
    }

    let validationschema = yup.object({
        newPassword: yup.string().required("Password is Required"),
        confirmPassword: yup.string().required("Confirm password is required")
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
        // .min(8, "8 Character is Required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "at least one letter, one number and one special character"),
    })

    const handleSubmit = (e) => {
        dispatch(resetPassword({
			resetPasswordToken: token,
			password: e.newPassword,
			confirmPassword: e.confirmPassword
		}))
    }

    return (
        // <div className="flex justify-center items-center h-screen">
        //     <p>Centered content goes here</p>
        // </div>
        <>
        <figure className="h-screen flex bg-gray-100">
            <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder py-8 px-10">

                <div className="flex items-center justify-center">
                    <h1 className="text-xl font-bold tracking-tight md:text-2xl">
                        Reset your Password
                    </h1>
                </div>
                <Formik validationSchema={validationschema} initialValues={initialvalue} onSubmit={handleSubmit}>
                    <Form className="py-5 px-2">
                        <div className="py-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                            <Field
                                name="newPassword"
                                type="text"
                                placeholder="New Password"
                                className={
                                    "bg-gray-50 border border-gray-300 outline-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                }
                            />
                            <ErrorForm name="newPassword" />
                        </div>
                        <div className="py-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                            <Field
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                className={
                                    "bg-gray-50 border border-gray-300 outline-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                }
                            />
                            <ErrorForm name="confirmPassword" />
                        </div>
                        <div className="py-3 flex items-center justify-between">
                            {/* <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <Field id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div> */}
                            <a className="text-sm font-medium text-blue-600 hover:underline" />
                        </div>

                        <div className="flex items-center mt-3 justify-center">
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset Password</button>
                        </div>

                    </Form>
                </Formik>
            </div>
        </figure>
        {(loading) ? <Loader /> : null}
        </>
    );
};
export default Resetpassword;
