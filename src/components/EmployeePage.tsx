import { mergedData } from "../utils/Interfaces";

interface iProps {
  employeeId: string;
  mergedData: mergedData | undefined;
}

export default function EmployeePage(props: iProps): JSX.Element {
  console.log(props.employeeId, "employee id");

  const employeeData = props.mergedData?.employees.find(
    (employee) => employee.id === props.employeeId
  );
  console.log(employeeData);
  const projects = props.mergedData?.projects.filter((project) =>
    project.employeeIds.includes(props.employeeId)
  );
  console.log(projects);

  return (
    <>
      <h1>Employee: {employeeData?.name}</h1>
      <h3>Role: {employeeData?.role}</h3>
      <img src={employeeData?.avatar} alt="employee avatar"></img>

      <div>
        <table>
          <tr>
            <th>Projects that {employeeData?.name} has worked on</th>
          </tr>
          <tr>
            <td>
              {projects?.map((project) => (
                <li key={project.id}>{project.id}</li>
              ))}
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}
