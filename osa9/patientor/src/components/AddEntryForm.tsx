import React from 'react';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { HealthCheckEntry, HealthCheckRating } from '../types';
import { TextField, NumberField } from "../AddPatientModal/FormField";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id" | "type">;

interface Props {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
}

export const AddHealthCheckEntryForm = ({ onSubmit }: Props) => {
  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        healthCheckRating: HealthCheckRating.Healthy
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.name = requiredError;
        }
        if (!values.date) {
          errors.ssn = requiredError;
        }
        if (!values.specialist) {
          errors.dateOfBirth = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD'"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Health check rating"
              placeholder="Specialist"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <Button
              type="submit"
              color="green"
              disabled={!dirty || !isValid}
            >
              Add
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};