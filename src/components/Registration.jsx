// @ts-check

import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import avatarImages from '../assets/avatar_1.jpg';

const Registration = () => {
  const { t } = useTranslation();
  const [registrationSuccesful, setRegistrationSuccesful] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    // TODO: rewrite to setLocale
    email: yup
      .string()
      .trim()
      .required('signup.required')
      .email('signup.incorrectEmail'),
    password: yup
      .string()
      .matches(/^[a-zA-Z0-9]+$/, 'signup.incorrectPassword')
      .required('signup.required')
      .min(6, 'signup.passMin'),
    confirmPassword: yup
      .string()
      .test('confirmPassword', 'signup.mustMatch', (value, context) => value === context.parent.password),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async () => {
      setRegistrationSuccesful(true);
    },
  });

  const cancel = () => {
    formik.handleReset();
    setRegistrationSuccesful(false);
  };

  if (registrationSuccesful) {
    return (
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body align-items-center p-5">
                <div>
                  {t('signup.successful')}
                </div>
                <div className="mt-5">
                  <Button type="submit" variant="outline-primary" onClick={() => cancel()}>{t('signup.back')}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={avatarImages}
                  className="rounded-circle"
                  alt={t('signup.header')}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signup.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    isInvalid={
                      formik.errors.email && formik.touched.email
                    }
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="email">{t('signup.email')}</Form.Label>
                  <Form.Control.Feedback type="invalid" placement="right">
                    {t(formik.errors.email)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    name="password"
                    id="password"
                    aria-describedby="passwordHelpBlock"
                    required
                    isInvalid={
                      formik.errors.password && formik.touched.password
                    }
                    autoComplete="new-password"
                  />
                  <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {t(formik.errors.password)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    isInvalid={
                      formik.errors.confirmPassword && formik.touched.confirmPassword
                    }
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {t(formik.errors.confirmPassword)}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="confirmPassword">{t('signup.confirm')}</Form.Label>
                </Form.Group>
                <Button disabled={formik.isSubmitted} type="submit" variant="outline-primary" className="w-100">{t('signup.submit')}</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
