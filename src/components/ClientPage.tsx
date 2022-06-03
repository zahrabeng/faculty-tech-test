import { mergedData } from "../utils/Interfaces";
import { employeeLength } from "../utils/employeeLength";

interface iProps {
  clientId: string;
  mergedData: mergedData | undefined;
}

export default function ClientPage(props: iProps): JSX.Element {
  const clientData = props.mergedData?.clients.find(
    (client) => client.id === props.clientId
  );

  const clientProjects = props.mergedData?.projects.filter(
    (project) => project.clientId === props.clientId
  );
  console.log(clientProjects);

  const singleProject = [];
  for (const project of clientProjects!) {
    if (employeeLength(project.employeeIds)) {
      for (const employeeId of project.employeeIds) {
        const employee = props.mergedData?.employees.find(
          (employee) => employeeId === employee.id
        );
        singleProject.push(employee?.name);
      }
    }
  }

  const noDuplicatesEmployees = singleProject.filter(function (
    item,
    index,
    inputArray
  ) {
    return inputArray.indexOf(item) == index;
  });

  return (
    <>
      <h1>Client: {clientData?.name}</h1>
      <div>
        <table>
          <tr>
            <th>Employees that have worked with {clientData?.name}</th>
          </tr>
          <tr>
            {employeeLength(noDuplicatesEmployees) ? (
              <td>
                {noDuplicatesEmployees.map((employee, id) => (
                  <li key={id}>{employee}</li>
                ))}
              </td>
            ) : (
              <td>None</td>
            )}
          </tr>
        </table>
      </div>
      <div>
        <table>
          <tr>
            <th>Projects for {clientData?.name}</th>
          </tr>
          <tr>
            <td>{clientProjects?.map((project, id) => <li key={id}>{project.id}</li>)}</td>
          </tr>
        </table>
      </div>
    </>
  );
}
