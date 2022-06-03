import { mergedData } from "../utils/Interfaces";

interface iProps {
  employeeId: string;
  mergedData: mergedData | undefined;
}

export default function EmployeePage(props: iProps): JSX.Element {
  console.log(props.employeeId, "employee id");
  return <></>;
}
