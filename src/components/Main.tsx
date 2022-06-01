import { useState, useEffect } from "react";
import axios from "axios";

import { mergedData } from "../utils/Interfaces";
import Header from "./Header";

export default function Main(): JSX.Element {
  const [allData, setAllData] = useState<mergedData>();

  const baseURL = "https://consulting-projects.academy-faculty.repl.co/api/";

  useEffect(() => {
    async function getAllData() {
      const projects = await axios.get(baseURL + "projects");
      const clients = await axios.get(baseURL + "clients");
      const employees = await axios.get(baseURL + "employees");
      const mergedData = {
        projects: projects.data,
        clients: clients.data,
        employees: employees.data,
      };
      setAllData(mergedData);
    }
    getAllData();
  }, []);



  if (allData) {
    allData.projects.forEach((project) => {
      const client = allData.clients.find(
        (client) => client.id === project.clientId
      );
    console.log("This is a Client", client?.name);
      
        if (project.employeeIds) {
          for (const employeeId of project.employeeIds) {
            const employees = allData.employees.find((employee) => employeeId === employee.id);
            console.log("This is an Employee", employees?.name)

        }
    }
    
    });
  }



  return (
    <>
      <Header />
      <br />
      <div className="search-container">
        <input></input>
      </div>
    </>
  );
}
