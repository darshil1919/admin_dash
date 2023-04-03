import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import ErrorForm from '../components/small/ErrorForm';
import { clearErrors, login } from '../store/action/adminAction';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const {error, loading, isAuthenticated} = useSelector((state) => state.admin);
    const navigate = useNavigate();

    useEffect(() => {
        if(error){
            console.log(error)
            dispatch(clearErrors())
        }
        if (isAuthenticated) {
            navigate("/")
        }
    }, [dispatch, error, isAuthenticated, navigate])

    const initialvalue = {
        email: "",
        password: ""
    }
    
    let validationschema = yup.object({
        email: yup
            .string()
            .email("Enter Valid Email")
            .required("Email is Required"),
        password: yup.string().required("Password is Required"),

        // .min(8, "8 Character is Required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "at least one letter, one number and one special character"),
      })

    const handleSubmit = (e) => {
        dispatch(login(e))
    }

    return (
        // <div className="flex justify-center items-center h-screen">
        //     <p>Centered content goes here</p>
        // </div>
        <figure className="h-screen flex bg-gray-100">
            <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder py-8 px-10">

                <div className="flex items-center justify-center">
                    <h1 className="text-xl font-bold tracking-tight md:text-2xl">
                        Sign in to your account
                    </h1>
                </div>
                <Formik validationSchema={validationschema} initialValues={initialvalue} onSubmit={handleSubmit}>
                <Form className="py-5 px-2">
                    <div className="py-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <Field
                            name="email"
                            type="text"
                            placeholder="Email"
                            className={
                                "bg-gray-50 border border-gray-300 outline-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            }
                        />
                        <ErrorForm name="email" />
                    </div>
                    <div className="py-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <Field
                            name="password"
                            type="password"
                            placeholder="Password"
                            className={
                                "bg-gray-50 border border-gray-300 outline-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            }
                        />
                        <ErrorForm name="password" />
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
                        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">Forgot password?</a>
                    </div>

                    <div className="flex items-center mt-3 justify-center">
                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                    </div>

                </Form>
                </Formik>
            </div>

        </figure>
    );
};
export default Login;
