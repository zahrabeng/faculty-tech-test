import { useState, useEffect } from "react";
import axios from "axios";

import { mergedData } from "../utils/Interfaces";
import { singleProject } from "../utils/Interfaces";
import { employeeLength } from "../utils/employeeLength";
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

  const reformattedData: singleProject[] = [];
  if (allData) {
    allData.projects.forEach((project) => {
      const client = allData.clients.find(
        (client) => client.id === project.clientId
      );
      const singleProject = [];
      for (const employeeId of project.employeeIds) {
        const employee = allData.employees.find(
          (employee) => employeeId === employee.id
        );
        singleProject.push(employee?.name);
      }
      reformattedData.push({
        projectId: project.id,
        client: client!.name,
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
      <div className="search-container">
        <input></input>
        </div>
        {reformattedData.map((project) => (
          <div key={project.projectId} className="data-table">
            <table>
              <tr>
                <th>Project ID</th>
                <th>Client</th>
                <th>Employees</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Size</th>
              </tr> 
              <tr>
                <td>{project.projectId}</td>
                <td>{project.client}</td>
                <td>
                  {employeeLength(project.employees) ? (
                    project.employees.map((employee, id) => (
                      <li key={id}>{employee}</li>
                    ))
                  ) : ( 
                   "None"
                  )}
                </td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>{project.size}</td>
              </tr>
            </table>
          </div>
        ))}
    </>
  );
}
