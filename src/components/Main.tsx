import { useState, useEffect, useReducer } from "react";
import axios from "axios";

import { project } from "../utils/Interfaces";
import { client } from "../utils/Interfaces";
import { employees } from "../utils/Interfaces";
import { singleProject } from "../utils/Interfaces";
import { employeeLength } from "../utils/employeeLength";
import Header from "./Header";

const reducer = (state: singleProject[], action: any) => {
  switch (action.type) {
    case "initial_data":
      return action.payload;
    
  case "Client":
      return state.filter((project) => project.client.includes(action.payload.search));
      
        
  case "Employee":{
        const employees = state.filter((project) => project.employees.length > 0)
        return employees.filter((project) => project.employees[0].includes(action.payload.search));
}
 
  case "Start Date":
    return state.filter((project) => project.startDate.includes(action.payload.search));

    case "End Date":
    return state.filter((project) => project.endDate.includes(action.payload.search));

    case "Size":
      return state.filter((project) => project.size.includes(action.payload.search));
  

    default:
      case "initial_data":
      return action.payload;
  }
};

export default function Main(): JSX.Element {
  const [filteredData, dispatch] = useReducer(reducer, []);
  const [searchText, setSearchText] = useState("")
  const [selector, setSelector] = useState("Search By All")
  const baseURL = "https://consulting-projects.academy-faculty.repl.co/api/";


console.log(filteredData.filter((project:singleProject) => project.employees.length > 0))
 

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
          (client: client) => client.id === project.clientId
        );
        const singleProject = [];
        for (const employeeId of project.employeeIds) {
          const employee = mergedData.employees.find(
            (employee: employees) => employeeId === employee.id
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
      dispatch({
        type: "initial_data",
        payload: reformattedData,
      });
    }

    getAllData();
  }, [searchText]);

  console.log(selector)
 console.log(filteredData, "this is filtered data");


  return (
    <>
      <Header />
      <div className="search-container">
        <input onChange={(e) => setSearchText(e.target.value)}></input>
        <select onChange={(e) => setSelector(e.target.value)}>
          <option>Search By...</option>
          <option>Client</option>
          <option>Employee</option>
          <option>Start Date</option>
          <option>End Date</option>
          <option>Size</option>
        </select>
        <button onClick={()=> dispatch({type: selector, payload:{search:searchText}})}>Search</button>
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
                {employeeLength(project.employees)
                  ? project.employees.map((employee, id) => (
                      <li key={id}>{employee}</li>
                    ))
                  : "None"}
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
