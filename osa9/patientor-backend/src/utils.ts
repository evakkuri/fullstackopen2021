import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseStringField = (stringFieldName: string, stringFieldValue: unknown): string => {
  if (!stringFieldValue || !isString(stringFieldValue)) {
    throw new Error(`Incorrect of missing value for field ${stringFieldName}`);
  }

  return stringFieldValue;
};

const parseDate = (dateFieldName: string, dateFieldValue: unknown): string => {
  if (!dateFieldValue || !isString(dateFieldValue) || !isDate(dateFieldValue)) {
    throw new Error(`Incorrect or missing value for field ${dateFieldName}: ${dateFieldValue}`);
  }

  return dateFieldValue;
};

const parseGender = (fieldName: string, fieldValue: unknown): Gender => {
  if (!fieldValue || !isGender(fieldValue)) {
    throw new Error(`Incorrect or missing value for field ${fieldName}: ${fieldValue}`);
  }

  return fieldValue;
};

type PatientFields = {
  id: unknown,
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown
};

type NewPatientFields = Omit<PatientFields, 'id'>;

export const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}: NewPatientFields): NewPatient => {
  const patient = {
    name: parseStringField('name', name),
    dateOfBirth: parseDate('dateOfBirth', dateOfBirth),
    ssn: parseStringField('ssn', ssn),
    gender: parseGender('gender', gender),
    occupation: parseStringField('occupation', occupation)
  };

  return patient;
};
