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
    for(const project of clientProjects!){
      if(employeeLength(project.employeeIds)){
        for (const employeeId of project.employeeIds) {
          const employee = props.mergedData?.employees.find(
            (employee) => employeeId === employee.id
          );
          singleProject.push(employee?.name);
      }
    }

  }

  const removeDuplicates = singleProject.filter( function( item, index, inputArray ) {
    return inputArray.indexOf(item) == index;
});

console.log(removeDuplicates)

  return (
    <>
      <h1>Client: {clientData?.name}</h1>
      <div>
        <table>
          <tr>
            <th>Employees that have worked with {clientData?.name}</th>
          </tr>
          <tr>
         
          </tr>
        </table>
      </div>
    </>
  );
}
