import React from 'react';
import { withFormik, FormikProps, Form } from 'formik';

import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { authStyles } from './styles'

type SignupPageProps = {
}

type FormValues = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

const SignupPage = (props: SignupPageProps & FormikProps<FormValues>) => {
    const {
        setFieldValue
    } = props;
    const classes = authStyles()
    return (
        <div className={classes.root}>
            <Form className={classes.form}>
                <div className={classes.formHeader}>
                    <Typography variant="h5">Register</Typography>
                </div>
                <TextField
                    className={classes.formItem}
                    required
                    name="name"
                    label="Name"
                    defaultValue=""
                    variant="outlined"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('name', event.target.value, false)
                    }}
                />
                <TextField
                    className={classes.formItem}
                    required
                    name="email"
                    label="Email Address"
                    defaultValue=""
                    variant="outlined"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('email', event.target.value, false)
                    }}
                />
                <TextField
                    type="password"
                    className={classes.formItem}
                    required
                    name="password"
                    label="Password"
                    defaultValue=""
                    variant="outlined"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('password', event.target.value, false)
                    }}
                />
                <TextField
                    type="password"
                    className={classes.formItem}
                    required
                    name="confirmPassword"
                    label="Confirm Password"
                    defaultValue=""
                    variant="outlined"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('confirmPassword', event.target.value, false)
                    }}
                />
                <Button 
                    className={classes.formItem}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    SIGN UP
                </Button>
                <Link
                    className={classes.formItem}
                    to="/signin"
                >
                    Already have an account? Sign in
                </Link>
            </Form>
        </div>
    );
}

export default withFormik<SignupPageProps, FormValues>({
    mapPropsToValues: () => ({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }),
    validate: values => {
        const errors: Record<string, string> = {};

        if (!values.name) {
            errors.name = 'Required';
        }
        if (!values.email) {
            errors.email = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
        }

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
    },

    displayName: 'SignupForm',
})(SignupPage);
