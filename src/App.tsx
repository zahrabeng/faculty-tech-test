import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { mergedData } from "./utils/Interfaces";

import Main from "./components/Main";
import ClientPage from "./components/ClientPage";
import EmployeePage from "./components/EmployeePage";

function App(): JSX.Element {
  const [clientId, setClientId] = useState<string>("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [mergedData, setMergedData] = useState<mergedData | undefined>();

  console.log("This is merged", mergedData);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Main setClientId={setClientId} setMergedData={setMergedData} />
            }
          ></Route>
          <Route
            path={`/clients/${clientId}`}
            element={<ClientPage clientId={clientId} mergedData={mergedData} />}
          ></Route>
          <Route
          path="/employees/"
          element={<EmployeePage/>}
          >
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
