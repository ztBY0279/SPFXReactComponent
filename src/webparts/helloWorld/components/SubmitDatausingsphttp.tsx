import * as React from 'react';
import { SPHttpClient, SPHttpClientResponse,ISPHttpClientOptions } from '@microsoft/sp-http';

interface ISubmitDataProps {
  absoluteUrl: string;
  spHttpClient: SPHttpClient; // Pass SPHttpClient as a prop
}

const SubmitDatawithsphttp: React.FC<ISubmitDataProps> = ({ absoluteUrl, spHttpClient }) => {
  const [fName, setFName] = React.useState("");
  const [lName, setLName] = React.useState("");
  const defaultName = "hello";

  const spListUrl = `${absoluteUrl}/_api/web/lists/getbytitle('SubmitData')/Items`;

  const handleChangeFname = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFName(event.target.value);
  };

  const handleChangeLname = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLName(event.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const itemData = {
        Title: defaultName,
        Name: fName,
        surName: lName
      };

    

      const spHttpClientOptions: ISPHttpClientOptions = {
        "body": JSON.stringify(itemData)
       
      };

      const response: SPHttpClientResponse = await spHttpClient.post(spListUrl, SPHttpClient.configurations.v1, spHttpClientOptions);

      if (response.ok || response.status === 400) {
        const responseData = await response.json();
        alert("The request is successful");
        console.log("Data successfully uploaded:", responseData);
      } else {
        alert("Request is not successful");
        console.error("Response content:", await response.text());
      }
    } catch (error) {
      alert(`Error: ${error}`);
      console.error("Error uploading data:", error);
    }
  };

  return (
    <div>
      <h1>Hello {fName} {lName}</h1>
      <input type="text" value={fName} onChange={handleChangeFname} placeholder="First Name" />
      <input type="text" value={lName} onChange={handleChangeLname} placeholder="Last Name" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SubmitDatawithsphttp;
