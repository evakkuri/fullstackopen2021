import axios from "axios";
import React from "react";
import { useParams } from "react-router";
import { Icon, Card } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";
import { addPatient } from "../state/reducer";
import { Entry, HealthCheckEntry } from "../types";
import { assertNever } from "../utils";
import { AddHealthCheckEntryForm, HealthCheckEntryFormValues } from "./AddEntryForm";

const genderToIcon: { [id: string]: SemanticICONS | undefined } = {
  male: "mars",
  female: "venus",
  other: "neuter"
};

const entryTypeToIcon: { [id: string]: SemanticICONS | undefined } = {
  Hospital: "hospital",
  HealthCheck: "doctor",
  OccupationalHealthcare: "stethoscope"
};

const EntryList = (props: { entryList: Entry[] }) => {
  if (props.entryList.length == 0) {
    return (
      <i>No entries found.</i>
    );
  }

  const [{ diagnoses },] = useStateValue();

  const getDiagnosisDesc = (code: string) => {
    return `${code} ${(diagnoses[code]?.name || 'Unknown diagnosis code')}`;
  };

  const renderEntry = (entry: Entry) => {
    switch (entry.type) {
      case 'HealthCheck':
        return (
          <div>
            <p>Health check rating: {entry.healthCheckRating}</p>
          </div>
        );
      case 'Hospital':
        return (
          <div>
            <ul>
              {entry.diagnosisCodes?.map((code) =>
                <li key={`${entry.id}-${code}`}>{getDiagnosisDesc(code)}</li>)}
            </ul>
          </div>
        );
      case 'OccupationalHealthcare':
        return (
          <div>
            <ul>
              {entry.diagnosisCodes?.map((code) =>
                <li key={`${entry.id}-${code}`}>{getDiagnosisDesc(code)}</li>)}
            </ul>
            <p>Employer: {entry.employerName}</p>
          </div>
        );
      default:
        return assertNever(entry);
    }
  };

  return (
    <Card.Group>
      {props.entryList
        .sort((entry_a, entry_b) =>
          new Date(entry_a.date).valueOf() - new Date(entry_b.date).valueOf())
        .map((entry) => {
          return (
            <Card key={entry.id} fluid>
              <Card.Content>
                <Card.Header>
                  {entry.date} <Icon name={entryTypeToIcon[entry.type]} />
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <i>{entry.description}</i>
                {renderEntry(entry)}
              </Card.Content>
            </Card>
          );
        })}
    </Card.Group>
  );
};

const PatientPage = () => {
  const [state, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const getPatient = async (id: string) => {
      try {
        const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(addPatient(patient));
      } catch (e) {
        console.log(e);
      }
    };

    if (!state.patients[id]) {
      void getPatient(id);
    }
  }, [dispatch]);

  const patientToShow = state.patients[id];

  if (!patientToShow) {
    return null;
  }

  const healthCheckEntryFormSubmit = async (values: HealthCheckEntryFormValues) => {
    try {
      type HealthCheckEntryRequest = Omit<HealthCheckEntry, "id">;

      const requestValues: HealthCheckEntryRequest = {
        ...values,
        type: "HealthCheck"
      };

      const {data: updatedPatient} = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        requestValues
      );

      //console.log(response.data);
      dispatch({ type: "ADD_PATIENT", payload: updatedPatient });
      //closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      //setError(e.response?.data?.error || 'Unknown error');
    }
  };

  return (
    <div>
      <h1>{patientToShow.name} <Icon name={genderToIcon[patientToShow.gender]} /></h1>
      <p>
        <span>SSN: {patientToShow.ssn}</span><br />
        <span>Occupation: {patientToShow.occupation}</span>
      </p>
      <h2>Entries:</h2>
      <EntryList entryList={patientToShow.entries} />
      <h3>Add healthcheck entry:</h3>
      <AddHealthCheckEntryForm onSubmit={healthCheckEntryFormSubmit} />
    </div>
  );
};

export default PatientPage;
