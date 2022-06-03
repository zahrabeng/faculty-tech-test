import { mergedData } from "../utils/Interfaces";

interface iProps{
  clientId: string,
  mergedData: mergedData| undefined;
}

export default function ClientPage(props: iProps): JSX.Element {
  return (
    <>
      <h1>Hello world</h1>
      {console.log(props.clientId)}
      {console.log(props.mergedData)}
    </>
  );
}
