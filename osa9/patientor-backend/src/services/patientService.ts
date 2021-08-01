import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient } from '../types';

const patients: Patient[] = patientData
  .map((patient) => ({
    ...patient,
    dateOfBirth: new Date(patient.dateOfBirth)
  })) as Array<Patient>;

console.log(patients);

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients
    .map((patient) => ({
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation
    }));
};

export default {
  getPatients,
  getNonSensitivePatients
};
