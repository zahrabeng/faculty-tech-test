import { useState, useEffect, useReducer } from "react";
import axios from "axios";

import { project } from "../utils/Interfaces";
import { client } from "../utils/Interfaces";
import { employees } from "../utils/Interfaces";
import { singleProject } from "../utils/Interfaces";
import { mergedData } from "../utils/Interfaces";

import Header from "./Header";
import Table from "./Table";

// eslint-disable-next-line
const reducer = (state: singleProject[], action: any) => {
  switch (action.type) {
    case "initial_data":
      return action.payload;

    case "Client":
      return state.filter((project) =>
        project.client.includes(action.payload.search)
      );

    case "Employee": {
      const employees = state.filter((project) => project.employees.length > 0);
      return employees.filter((project) =>
        project.employees[0].name.includes(action.payload.search)
      );
    }

    case "Start Date":
      return state.filter((project) =>
        project.startDate.includes(action.payload.search)
      );

    case "End Date":
      return state.filter((project) =>
        project.endDate.includes(action.payload.search)
      );

    case "Size":
      return state.filter((project) =>
        project.size.includes(action.payload.search)
      );

    default:
      return action.payload;
  }
};

interface iProps {
  setClientId: React.Dispatch<React.SetStateAction<string>>;
  setMergedData: React.Dispatch<React.SetStateAction<mergedData | undefined>>;
  setEmployeeId: React.Dispatch<React.SetStateAction<string>>;
}

export default function Main(props: iProps): JSX.Element {
  const [filteredData, dispatch] = useReducer(reducer, []);
  const [searchText, setSearchText] = useState("");
  const [selector, setSelector] = useState("Search By...");
  const baseURL = "https://consulting-projects.academy-faculty.repl.co/api/";

  useEffect(() => {
    async function getAllData() {
      const projects = await axios.get(baseURL + "projects");
      const clients = await axios.get(baseURL + "clients");
      const employees = await axios.get(baseURL + "employees");
      const mergedData: mergedData = {
        projects: projects.data,
        clients: clients.data,
        employees: employees.data,
      };
      props.setMergedData(mergedData);

      const reformattedData: singleProject[] = [];
      mergedData.projects.forEach((project: project) => {
        const client = mergedData.clients.find(
          (client: client) => client.id === project.clientId
        );
        const singleProject = [];
        for (const employeeId of project.employeeIds) {
          const employee = mergedData.employees.find(
            (employee: employees) => employeeId === employee.id
          );
          // eslint-disable-next-line
          singleProject.push({ id: employeeId, name: employee!.name });
        }
        reformattedData.push({
          projectId: project.id,
          // eslint-disable-next-line
          client: client!.name,
          clientId: project.clientId,
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
    // eslint-disable-next-line
  }, [searchText]);

  console.log(selector);
  console.log(filteredData, "this is filtered data");

  return (
    <>
      <Header />
      <div className="search-container">
        <input
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
        ></input>
        <select onChange={(e) => setSelector(e.target.value)} value={selector}>
          <option>Search By...</option>
          <option>Client</option>
          <option>Employee</option>
          <option>Start Date</option>
          <option>End Date</option>
          <option>Size</option>
        </select>
        {selector !== "Search By..." && (
          <button
            onClick={() =>
              dispatch({ type: selector, payload: { search: searchText } })
            }
          >
            Search
          </button>
        )}
      </div>
      <Table
        data={filteredData}
        setClientId={props.setClientId}
        setEmployeeId={props.setEmployeeId}
      />
    </>
  );
}
