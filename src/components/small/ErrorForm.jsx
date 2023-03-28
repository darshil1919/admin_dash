import { ErrorMessage } from 'formik';
import React from 'react'

const ErrorForm = (props) => {
  return (
    <>
      <div style={{color: 'red', fontSize: "11px"}}>
        <ErrorMessage name={props.name} />
      </div>
    </>
  )
}

export default ErrorForm;