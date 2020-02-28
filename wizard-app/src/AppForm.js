import React, {useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function AppForm({values, errors, touched, status}) {
    const [data, setData] = useState([]);
    useEffect(() => {
        console.log(
            'yaaaay',
            status
        );
        status && setData(data => 
            [...data, status])
    }, [status])
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
                    {touched.name && errors.name &&(
                        <p>
                            {errors.name}
                        </p>)}
                </label>
                <label>
                    Email:
                    <Field
                    id='email'
                    type='text'
                    name='email'
                    placeholder='enter your email'
                    />
                    {touched.email && errors.email &&(
                        <p>
                            {errors.email}
                        </p>)}
                </label>
                <label>
                    Password:
                    <Field
                    id='password'
                    type='password'
                    name='password'
                    placeholder='enter your password'
                    />
                    {touched.password && errors.password &&(
                        <p>
                            {errors.password}
                        </p>)}
                </label>
                <label>
                    Terms of Service:
                    <Field
                    id='name'
                    type='checkbox'
                    name='terms'
                    check={values.terms}
                    />
                </label>
                <button type='submit'>
                    Submit
                </button>
            </Form>
            {data.map(item => (
                <ul key={item.id}>
                    <li>Name: {item.name}</li>
                    <li>Email: {item.email}</li>
                    <li>Password: {item.password}</li>
                </ul>
            ))}
        </div>
    )
}

const FormikForm = withFormik({
    mapPropsToValues({ name, email, password, terms }){
        return {
            name: name || '', 
            email: email || '',
            password: password || '',
            terms: terms || false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required('ya dun fucked up aye-aye-ron!')
    }),
    handleSubmit(values, { setStatus }) {
        console.log('submitting', values);
        axios.post('https://reqres.in/api/users/', values)
        .then(res => {
            console.log('yay!', res)
            setStatus(res.data)
        })
        .catch(err => {
            console.log('u cannot post...', err.response)
        })
    }
})(AppForm)
export default FormikForm; 