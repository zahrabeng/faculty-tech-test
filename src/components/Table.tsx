import { singleProject } from "../utils/Interfaces";
import { employeeLength } from "../utils/employeeLength";

interface iProps{
  data: singleProject[]
}

export default function Table(props:iProps): JSX.Element {
  return (
    <>
    {console.log(props.data)}
      {props.data.map((project: singleProject) => (
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
