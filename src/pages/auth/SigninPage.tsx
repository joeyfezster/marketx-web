import React from 'react';
import { withFormik, FormikProps, Form } from 'formik';

import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { authStyles } from './styles'

type SigninPageProps = {
}

type FormValues = {
    email: string
    password: string
}

const SigninPage = (props: SigninPageProps & FormikProps<FormValues>) => {
    const {
        setFieldValue
    } = props;
    const classes = authStyles()
    return (
        <div className={classes.root}>
            <Form className={classes.form}>
                <div className={classes.formHeader}>
                    <Typography variant="h5">Sign in</Typography>
                </div>
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
                <Button 
                    className={classes.formItem}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    SIGN IN
                </Button>
                <Link
                    className={classes.formItem}
                    to="/signup"
                >
                    Don't have an account? Sign up
                </Link>
            </Form>
        </div>
    );
}

export default withFormik<SigninPageProps, FormValues>({
    mapPropsToValues: () => ({
        email: '',
        password: '',
    }),
    validate: values => {
        const errors: Record<string, string> = {};

        if (!values.email) {
            errors.email = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
    },

    displayName: 'SigninForm',
})(SigninPage);
