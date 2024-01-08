import * as React from "react";
import submitdataStyle from "./styles/submitdata.module.scss";
import { submitProps } from "./SubmitProps";
//import { sp } from "@pnp/sp";
function SubmitData(props:submitProps): React.ReactElement<HTMLDivElement> {
console.log('the value of props is: ',props.absoluteUrl);
  const [fName, setFName] = React.useState("");
  const [lName, setLName] = React.useState("");
 const defaultName = "hello";
 const spListUrl = props.absoluteUrl + "/_api/web/lists/getbytitle('Temp2')/Items";
  function handleChangeFname(event: React.ChangeEvent<HTMLInputElement>): void {
    setFName(event.target.value);
  }

  function handleChangeLname(event: React.ChangeEvent<HTMLInputElement>): void {
    setLName(event.target.value);
  }

  function getFormDigestValue(): Promise<string> {
    const contextInfoUrl = props.absoluteUrl + "/_api/contextinfo";

    return fetch(contextInfoUrl, {
        method: "POST",
        headers: {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
        },
    })
    .then(response => response.json())
    .then(data => data.d.GetContextWebInformation.FormDigestValue);
}

async function handleSubmit(): Promise<void> {
    try {
        const requestDigest = await getFormDigestValue();
        console.log("the requestdiget value is :",requestDigest);

        // Use the retrieved Request Digest value in your POST request
        const itemData = {
            Title:defaultName,
            Name:fName,
            Surname:lName
        };
                console.log("the value of itemdat is ",itemData);
                console.log("the value of splisturl is :",spListUrl);
        fetch(spListUrl, {
            method: "POST",
            // headers: {
                
            //     "Content-Type": "application/json;odata=verbose",
            //     "X-RequestDigest": requestDigest,
               
            // },
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            "body": JSON.stringify(itemData),
        })
        .then(response => {
            if (response.ok || (response.status >= 200 && response.status < 300)) {
                alert("the request is successful:");
                return response.json();
            } else {
                alert("request is not successful:");
                throw new Error(`Request failed with status ${response.status}`);
            }
        })
        .then(data => {
            alert("data is uploaded:");
            console.log("Data successfully uploaded:", data);
        })
        .catch(error => {
            alert(`the error is ${error}`);
            console.error("Error uploading data:", error);
        });
    } catch (error) {
        console.error("Error retrieving Request Digest:", error);
    }
}

//   function handleSubmit(): void {
    
//     const itemData = {
//         Title:defaultName,
//         Name:fName,
//         surName:lName
//     };

//     console.log("the value of itemdata is ",itemData);

//     fetch(spListUrl, {
//         method: "POST",
//         headers:{
//             "Accept": "application/json;odata=verbose"
//         },
       
//         body: JSON.stringify(itemData)
   
//     })
//       .then((response) =>{
//         console.log("the value of response is :",response.status);
//         if(response.ok){
//             alert("the request is successfull:");
//         }
//         else{
//             alert("request is not successfull:");
//         }
//         return response.json()
//       })
//       .then((data) => {
//         alert("data is uploaded:");
//         console.log("Data successfully uploaded:", data);
//         // Optionally, you can perform actions after a successful upload
//       })
//       .catch((error) => {
//         alert(`the errror is ${error}`);
//         console.error("Error uploading data:", error);
//       });
//   }

  return (
    <div className={submitdataStyle.box1}>
      <div className={submitdataStyle.container}>
        <h1>
          Hello {fName} {lName}
        </h1>
        <div>
          <input
            className={submitdataStyle.inputSubmit}
            onChange={handleChangeFname}
            value={fName}
            name="fName"
            placeholder="First Name"
          />
          <input
            className={submitdataStyle.inputSubmit}
            onChange={handleChangeLname}
            value={lName}
            name="lName"
            placeholder="Last Name"
          />
          <button onClick={handleSubmit}  className={submitdataStyle.buttonSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitData;


// import * as React from "react";
// import submitdataStyel from "./styles/submitdata.module.scss"
// import { submitProps } from "./SubmitProps";
// function SubmitData(props:submitProps):React.ReactElement<HTMLDivElement>{
    
//     const fName = "Bharat";
//     const lName = "yadav";

//     function handleChangeFname():void{
//         console.log("fchange is called:");
//     }

//     function handleChangeLname():void{
//         console.log("fchange is called:");
//     }

    

//     return (
//         <div className={submitdataStyel.box1}>
//       <div className={submitdataStyel.container}>
//         <h1>
//           Hello {fName} {lName}
//         </h1>
//         <form>
//           <input
//           className={submitdataStyel.inputSubmit}
//             onChange={handleChangeFname}
//             name="fName"
//             placeholder="First Name"
//           />
//           <input
//             className={submitdataStyel.inputSubmit}
//             onChange={handleChangeLname}
//             name="lName"
//             placeholder="Last Name"
//           />
//           <button  className={submitdataStyel.buttonSubmit}>Submit</button>
//         </form>
//       </div>

//       </div>
//     );
// }

// export default SubmitData;

//const [count,setCount] = React.useState(0);
    // const [data,setData] = React.useState({});

    // fetch("https://jsonplaceholder.typicode.com/todos/1")
    // .then((response)=>{
    //     console.log("response of submitData.jsx is ",response);
    //     return  response.json();
    // })
    // .then((data)=>{
    //     console.log("data is empty or not if returned by first .then ",data);
    //     setData(data);
    // })
    // .catch((error)=>{
    //     console.log("error is ",error);
    // })
