import { singleProject } from "../utils/Interfaces";
import { useNavigate } from "react-router-dom";

interface iProps {
  data: singleProject[];
  setClientId: React.Dispatch<React.SetStateAction<string>>;
  setEmployeeId: React.Dispatch<React.SetStateAction<string>>;
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
                className="click-table"
              >
                {project.client}
              </td>
              <td>
                {project.employees[0] !== undefined
                  ? project.employees.map((employee, id) => (
                      <li
                        key={id}
                        onClick={() => {
                          props.setEmployeeId(employee.id);
                          navigate(`/employees/${employee.id}`);
                        }}
                        className="click-table"
                      >
                        {employee.name}
                      </li>
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
