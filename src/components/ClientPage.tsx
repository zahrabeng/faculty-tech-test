export default function ClientPage(props: { clientId: string }): JSX.Element {
  return (
    <>
      <h1>Hello world</h1>
      {console.log(props.clientId)}
    </>
  );
}
