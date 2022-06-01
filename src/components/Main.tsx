import { useState, useEffect } from "react";
import axios from "axios";

export default function Main(): JSX.Element {

    const [allData, setAllData] = useState<any[]>() 

    const baseURL = "https://consulting-projects.academy-faculty.repl.co/api/"

    useEffect(() => {
        async function getAllData() {
            const projects = await axios.get(baseURL + "projects")
            const clients = await axios.get(baseURL + "clients")
            const employees = await axios.get(baseURL + "employees")
            const mergedData = [projects.data, clients.data, employees.data]
            setAllData(mergedData)
        }
        getAllData()
    }, []) 


  return (<>
  
  </>);
}
