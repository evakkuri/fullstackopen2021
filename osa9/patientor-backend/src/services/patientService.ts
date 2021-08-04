import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patientsTyped';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const makeNonSensitive = (patient: Patient): NonSensitivePatient => {
  const { id, name, dateOfBirth, gender, occupation } = patient;
  return {
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  };
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients
    .map((patient) => makeNonSensitive(patient));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);

  if (!patient) return undefined;

  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  findById,
  addPatient
};
