import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Main from "./components/Main";
import ClientPage from "./components/ClientPage";

function App(): JSX.Element {
  const [clientId, setClientId] = useState<string>("")
  {console.log(clientId)}
  return (
   
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main setClientId={setClientId}/>}></Route>
          <Route path={`/clients/${clientId}`} element={<ClientPage clientId = {clientId}/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
