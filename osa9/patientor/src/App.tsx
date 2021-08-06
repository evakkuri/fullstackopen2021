import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Diagnosis, Patient } from "./types";
import { setDiagnosisList, setPatientList } from "./state/reducer";

import PatientListPage from "./PatientListPage";
import PatientPage from "./components/PatientPage";

const App = () => {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    const testBackendConnection = async () => {
      try {
        await axios.get<void>(`${apiBaseUrl}/ping`);
      } catch (e) {
        console.error(e);
      }
    };
    void testBackendConnection();

    const fetchState = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));

        const {data: diagnosisListFromApi} = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchState();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id">
              <PatientPage />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
