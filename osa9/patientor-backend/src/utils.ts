import { Patient, NewPatient, Gender, Entry } from "./types";

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
  occupation: unknown,
  entries: unknown
};

type NewPatientFields = Omit<PatientFields, 'id' | 'entries'>;

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: NewPatientFields): NewPatient => {
  const patient = {
    name: parseStringField('name', name),
    dateOfBirth: parseDate('dateOfBirth', dateOfBirth),
    ssn: parseStringField('ssn', ssn),
    gender: parseGender('gender', gender),
    occupation: parseStringField('occupation', occupation),
    entries: []
  };

  return patient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry: any): entry is Entry => {
  return typeof (entry) === 'object'
    && Object.keys(entry).includes('type')
    && ['Hospital', 'OccupationalHealthcare', 'HealthCheck'].includes(entry['type']);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntries = (param: any): param is Entry[] => {
  return Array.isArray(param)
    && param.every((entry) => isEntry(entry));
};

const parseEntries = (fieldName: string, fieldValue: unknown): Entry[] => {
  if (!fieldValue || !isEntries(fieldValue)) {
    throw new Error(`Incorrect or missing value for field ${fieldName}: ${fieldValue}`);
  }

  return fieldValue;
};

export const toPatient = ({ id, name, dateOfBirth, ssn, gender, occupation, entries }: PatientFields): Patient => {
  const patient = {
    id: parseStringField('id', id),
    name: parseStringField('name', name),
    dateOfBirth: parseDate('dateOfBirth', dateOfBirth),
    ssn: parseStringField('ssn', ssn),
    gender: parseGender('gender', gender),
    occupation: parseStringField('occupation', occupation),
    entries: parseEntries('entries', entries)
  };

  return patient;
};
