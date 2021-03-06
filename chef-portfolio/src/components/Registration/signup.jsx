import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './registration.scss';
import { withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignUp = ({ values, errors, touched, status }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);

    

    return (
        <div className='registration'>
            <Form className='signup'>
                <h2>Sign Up</h2>
                <Field 
                name='first_name'
                type='text'
                placeholder='First Name'
                />{touched.first_name && errors.first_name && (<p className='error'>{errors.first_name}</p>)}
                <Field 
                name='last_name'
                type='text'
                placeholder='Last Name'
                />{touched.last_name && errors.last_name && (<p className='error'>{errors.last_name}</p>)}
                <Field 
                name='username'
                type='text'
                placeholder='Username'
                />{touched.username && errors.username && (<p className='error'>{errors.username}</p>)}
                <Field 
                name='email'
                type='email'
                placeholder='Email'
                />{touched.email && errors.email && (<p className='error'>{errors.email}</p>)}
                <Field 
                name='password'
                type='password'
                placeholder='Password'
                />{touched.password && errors.password && (<p className='error'>{errors.password}</p>)}
                <Field 
                name='location'
                id='location'
                type='text'
                placeholder='Location'
                />{touched.location && errors.location && (<p className='error'>{errors.location}</p>)}
                <button type='submit'>Sign Up</button>
                <Link style={{color:'white', textDecoration:'none'}} to='/login'>Already have an account? Log in here</Link>
            </Form>
        </div>
    )
}

const FormikSignUp = withFormik({
    mapPropsToValues({first_name, last_name, username, email, password, location}) {
        return {
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
            location: ""
        }
    },
    validationSchema: Yup.object().shape({
        first_name: Yup.string().required("*Please enter your first name"),
        last_name: Yup.string().required("*Please enter your last name"),
        username: Yup.string().required("*Please enter your username"),
        email: Yup.string().email("*Please provide a valid email address").required("*Please enter your email address"),
        password: Yup.string().min(6, "*Password must be at least 6 characters").required("*Please enter your password"),
        location: Yup.string().required("*Please enter your location")
    }),

    handleSubmit(values, {props, setStatus}) {
        axios
        .post("https://chef-portfolio-backend.herokuapp.com/auth/register", values)
        .then(res=> {
            console.log(res)
            setStatus(res.data);
            console.log(res.status);
            localStorage.setItem("id", res.data.id);
            props.history.push('/auth/login')
        })
        .catch(err => console.log(err.res))
        
    }

})(SignUp)

export default FormikSignUp;