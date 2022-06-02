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

  const reformattedData: any = [];
  if (allData) {
    allData.projects.forEach((project) => {
      const client = allData.clients.find(
        (client) => client.id === project.clientId
      );
      //console.log("This is a Client", client?.name);
      const singleProject = [];
      for (const employeeId of project.employeeIds) {
        const employee = allData.employees.find(
          (employee) => employeeId === employee.id
        );
        singleProject.push(employee?.name);
      }
      //   console.log(singleProject);
      reformattedData.push({
        client: client?.name,
        employees: singleProject,
        startDate: project.contract.startDate,
        endDate: project.contract.endDate,
        size: project.contract.size,
      });
    });
  }

  console.log(reformattedData);

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
