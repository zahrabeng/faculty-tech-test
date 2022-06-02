import { singleProject } from "../utils/Interfaces";
import { employeeLength } from "../utils/employeeLength";
import { useNavigate } from "react-router-dom";

interface iProps {
  data: singleProject[];
  setClientId: React.Dispatch<React.SetStateAction<string>>;
}

export default function Table(props: iProps): JSX.Element {
  const navigate = useNavigate();

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
              <td
                onClick={() => {
                  props.setClientId(project.clientId);
                  navigate(`/clients/${project.clientId}`);
                }}
              >
                {project.client}
              </td>
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
