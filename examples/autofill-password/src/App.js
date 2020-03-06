import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import classNames from 'classnames';
import "./App.css";

// Chrome autofill password example
// https://github.com/facebook/react/issues/1159#issuecomment-506584346

const LOGIN_INPUT_NAME = "login";
const PASSWORD_INPUT_NAME = "password";

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short password!")
    .max(50, "Too Long password!")
    .required("Required password"),
  login: Yup.string()
    .email("Invalid email")
    .required("email required"),
});

const App = () => (
  <div>
    <h1>Log in</h1>
    <Formik
      initialValues={{
        login: "",
        password: ""
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 5000);
      }}
      validationSchema={loginSchema}
    >
      {({
        errors: { login: loginError, password: passwordError },
        isSubmitting,
        values
      }) => (
        <Form>
          <fieldset>
            <div className={classNames("field", { 'isFilled': values[LOGIN_INPUT_NAME]} )}>
              <Field name={LOGIN_INPUT_NAME} placeholder=" " />
              <label htmlFor={LOGIN_INPUT_NAME}>Login</label>
            </div>
            {loginError
              && <p>{loginError}</p>
            }
            <div className={classNames("field", { 'isFilled': values[PASSWORD_INPUT_NAME]} )}>
              <Field name={PASSWORD_INPUT_NAME} placeholder=" " type="password" />
              <label htmlFor={PASSWORD_INPUT_NAME}>Password</label>
            </div>
            {passwordError
              && <p>{passwordError}</p>
            }
          </fieldset>
          <button
            type="submit"
            disabled={isSubmitting}
          >Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default App;
