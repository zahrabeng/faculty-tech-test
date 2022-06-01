import { useState, useEffect } from "react";
import axios from "axios";

export default function Main(): JSX.Element {

    const baseURL = "https://consulting-projects.academy-faculty.repl.co/api/"

    useEffect(() => {
        async function getAllData() {
            const projects = await axios.get(baseURL + "projects")
            console.log(projects.data)
            const clients = await axios.get(baseURL + "clients")
            console.log(clients.data)
            const employees = await axios.get(baseURL + "employees")
            console.log(employees.data)
        }
        getAllData()
    }, []) 

  return (<>
  
  </>);
}
