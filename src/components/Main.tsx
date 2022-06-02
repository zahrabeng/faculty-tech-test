import { useState, useEffect, useReducer } from "react";
import axios from "axios";

import { mergedData } from "../utils/Interfaces";
import { project } from "../utils/Interfaces";
import { client } from "../utils/Interfaces";
import { employees } from "../utils/Interfaces";
import { singleProject } from "../utils/Interfaces";
import { employeeLength } from "../utils/employeeLength";
import Header from "./Header";



const reducer = (state:singleProject[], action:any) => {
  switch (action.type) {
    case "initial_data":
     return action.payload

    default:
      case "initial_data":
        return action.payload
  }
 
};

export default function Main(): JSX.Element {

  const [filteredData, dispatch] = useReducer(reducer, []);

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
      const reformattedData: singleProject[] = [];
      mergedData.projects.map((project: project) => {
        const client = mergedData.clients.find(
          (client:client) => client.id === project.clientId
        );
        const singleProject = [];
        for (const employeeId of project.employeeIds) {
          const employee = mergedData.employees.find(
            (employee:employees) => employeeId === employee.id
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
  
      })
      dispatch({
        type: "initial_data",
        payload: reformattedData,
      });
    }

    getAllData();
  }, []);

console.log(filteredData, "this is filtered data")
  
  // if (allData) {
    // allData.projects.map((project) => {
    //   const client = allData.clients.find(
    //     (client) => client.id === project.clientId
    //   );
    //   const singleProject = [];
    //   for (const employeeId of project.employeeIds) {
    //     const employee = allData.employees.find(
    //       (employee) => employeeId === employee.id
    //     );
    //     singleProject.push(employee?.name);
    //   }
    //   reformattedData.push({
    //     projectId: project.id,
    //     client: client!.name,
    //     employees: singleProject,
    //     startDate: project.contract.startDate,
    //     endDate: project.contract.endDate,
    //     size: project.contract.size,
    //   });

    // });
  // }


  return (
    <>
      <Header />
      <div className="search-container">
        <input></input>

        <select onChange={(e) => dispatch({type:e.target.value})}> 
        <option>Search By All</option>
        <option>Client</option>
        <option>Employee</option>
        <option>Start Date</option>
        <option>End Date</option>
        <option>Size</option>
        </select>
        </div>
      {/* add below into component later */}
        {filteredData.map((project: singleProject) => ( 
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
