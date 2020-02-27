import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function AppForm({values, handleChange}) {
    return(
        <div>
            <p>from the form component</p>

            <Form>
                <label>
                    Name:
                    <Field
                    id='name'
                    type='text'
                    name='name'
                    placeholder='enter your name'
                    />
                </label>
                <label>
                    Email:
                    <Field
                    id='email'
                    type='text'
                    name='email'
                    placeholder='enter your email'
                    />
                </label>
                <label>
                    Password:
                    <Field
                    id='password'
                    type='password'
                    name='password'
                    placeholder='enter your password'
                    />
                </label>
                <label>
                    Terms of Service:
                    <Field
                    id='name'
                    type='checkbox'
                    name='terms'
                    />
                </label>
                <button>Submit</button>
            </Form>
        </div>
    )
}

const FormikForm = withFormik({
    mapPropsToValues({ name, email, password }){
        return {
            name: name || '', 
            email: email || '',
            password: password || ''
        }
    }
})(AppForm)
export default FormikForm; 