import diagnosisData from '../../data/diagnoses.json';
import { isDate, isString, parseDate, parseStringField } from './common';
import { Entry, EntryWithoutId, DischargeNote, HealthCheckRating, Diagnosis, SickLeave } from '../types';

const diagnosisCodes: Diagnosis['code'][] = diagnosisData.map((d) => d.code);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischargeNote = (dischargeNote: any): dischargeNote is DischargeNote => {
  console.log("Checking discharge note...");
  return (typeof (dischargeNote) === 'object' || dischargeNote instanceof Object)
    && Object.keys(dischargeNote).includes('date')
    && Object.keys(dischargeNote).includes('criteria')
    && isDate(dischargeNote.date)
    && isString(dischargeNote.criteria);
};

const parseDischargeNote = (fieldName: string, fieldValue: unknown): DischargeNote => {
  if (!fieldValue || !isDischargeNote(fieldValue)) {
    throw new Error(
      `Incorrect or missing value for field ${fieldName}: ${JSON.stringify(fieldValue)}`);
  }
  return fieldValue;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  console.log(`Checking if ${param} is in ${Object.values(HealthCheckRating)}...`);
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (fieldName: string,
  fieldValue: unknown): HealthCheckRating => {
  console.log(`Parsing ${fieldName}: ${fieldValue} to health check rating...`);

  if(fieldValue === undefined) {
    throw new Error(`Missing value for field ${fieldName}: ${fieldValue}`);
  }

  if (!isHealthCheckRating(fieldValue)) {
    throw new Error(`Incorrect or missing value for field ${fieldName}: ${fieldValue}`);
  }
  
  return fieldValue;
};

const parseEntryType = (fieldName: string, fieldValue: unknown): string => {
  if (!fieldValue || !isString(fieldValue)) {
    throw new Error(`Incorrect or missing value for field ${fieldName}: ${fieldValue}`);
  }

  if (!['Hospital', 'OccupationalHealthcare', 'HealthCheck'].includes(fieldValue))
    throw new Error(`Incorrect value for type: ${fieldValue}`);

  return fieldValue;
};

const isDiagnosisCode = (diag: unknown): diag is Diagnosis['code'] => {
  return isString(diag) && diagnosisCodes.includes(diag);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDiagnosisCodeArray = (obj: any): obj is Diagnosis['code'][] => {
  return Array.isArray(obj)
    && obj.every((d) => isDiagnosisCode(d));
};

const parseDiagnosisCodes = (fieldName: string, fieldValue: unknown): Array<Diagnosis['code']> => {
  if (!fieldValue) {
    return [];
  }

  if (!isDiagnosisCodeArray(fieldValue)) {
    throw new Error(`Incorrect value for field ${fieldName}: ${fieldValue}`);
  }

  if (fieldValue.length === 0) return [];

  return fieldValue;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (entry: any): entry is SickLeave => {
  return typeof (entry) === 'object'
    && Object.keys(entry).includes('startDate')
    && isDate(entry.startDate)
    && Object.keys(entry).includes('endDate')
    && isDate(entry.endDate);
};

const parseSickLeave = (fieldName: string, fieldValue: unknown): SickLeave | undefined => {
  if (!fieldValue) {
    return undefined;
  }

  if (!isSickLeave(fieldValue)) {
    throw new Error(`Incorrect value for field ${fieldName}: ${JSON.stringify(fieldValue)}`);
  }
  return fieldValue;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (entry: any): EntryWithoutId => {
  console.log("Parsing new entry...");

  const type = parseEntryType('type', entry.type);

  const baseEntry = {
    description: parseStringField('description', entry.description),
    date: parseDate('date', entry.date),
    specialist: parseStringField('specialist', entry.specialist),
    diagnosisCodes: parseDiagnosisCodes('diagnosisCodes', entry.diagnosisCodes)
  };

  switch (type) {
    case 'Hospital':
      return {
        ...baseEntry,
        type: "Hospital",
        discharge: parseDischargeNote('discharge', entry.discharge)
      };
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(
          'healthCheckRating',
          entry.healthCheckRating
        )
      };
    case 'OccupationalHealthcare':
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseStringField('employerName', entry.employerName),
        sickLeave: parseSickLeave('sickLeave', entry.sickLeave)
      };
    default:
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(entry)}`
      );
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEntry = (entry: any): entry is Entry => {

  //console.log("Checking basic entry information...");
  if (!(typeof (entry) === 'object'
    && Object.keys(entry).includes('type')
    && Object.keys(entry).includes('description')
    && Object.keys(entry).includes('date')
    && Object.keys(entry).includes('specialist')
    && ['Hospital', 'OccupationalHealthcare', 'HealthCheck']
      .includes(entry['type']))) return false;

  //console.log("Checking type-specific entry information...");
  switch (entry.type) {
    case 'Hospital':
      return Object.keys(entry).includes('discharge')
        && isDischargeNote(entry['discharge']);
    case 'HealthCheck':
      return Object.keys(entry).includes('healthCheckRating')
        && isHealthCheckRating(entry.healthCheckRating);
    case 'OccupationalHealthcare':
      return Object.keys(entry).includes('employerName')
        && isString(entry.employerName);
    default:
      return false;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntries = (param: any): param is Entry[] => {
  return Array.isArray(param)
    && param.every((entry) => isEntry(entry));
};

export const parseEntries = (fieldName: string, fieldValue: unknown): Entry[] => {
  if (!fieldValue || !isEntries(fieldValue)) {
    throw new Error(`Incorrect or missing value for field ${fieldName}: ${JSON.stringify(fieldValue)}`);
  }

  return fieldValue;
};
