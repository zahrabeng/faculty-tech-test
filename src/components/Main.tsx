import { useState, useEffect } from "react";
import axios from "axios";

import { mergedData } from "./Interfaces";

export default function Main(): JSX.Element {

    const [allData, setAllData] = useState<mergedData>() 

    const baseURL = "https://consulting-projects.academy-faculty.repl.co/api/"

    useEffect(() => {
        async function getAllData() {
            const projects = await axios.get(baseURL + "projects")
            const clients = await axios.get(baseURL + "clients")
            const employees = await axios.get(baseURL + "employees")
            const mergedData = {projects: projects.data, clients: clients.data, employees: employees.data}
            setAllData(mergedData)
        }
        getAllData()
    }, []) 

    console.log(allData?.employees)

  return (<>
  
  </>);
}
