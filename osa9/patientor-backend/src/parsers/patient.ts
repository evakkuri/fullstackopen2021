import { parseStringField, parseDate } from "./common";
import { parseEntries } from "./patientEntry";
import { Patient, NewPatient, Gender } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
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
