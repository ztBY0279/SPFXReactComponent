import * as React from "react";
import {SPHttpClient,SPHttpClientResponse,ISPHttpClientOptions} from "@microsoft/sp-http";
import  submitdataStyle from "../styles/submitdata.module.scss";


interface SubmitDataToListProps{
    absoluteUrl:string;
    spHttpClient:SPHttpClient
}

function SubmitDataToList(props:SubmitDataToListProps):React.ReactElement<HTMLDivElement>{
    const [fName,setFName] = React.useState("");
    const [lName,setLName] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    function handleChangeFname(event:React.ChangeEvent<HTMLInputElement>):void{
        console.log("helo in hanleChange method:");
        setFName(event.target.value);
    }

    function handleChangeLname(event:React.ChangeEvent<HTMLInputElement>):void{
        console.log("hello in this lname change method:");
        setLName(event.target.value);
    }

    const endURL = props.absoluteUrl +"/_api/web/lists/getbytitle('SubmitData')/Items";
    console.log("the complete url is :",endURL);

    const listData = {
        Name:fName,
        surName:lName
    }

    const config:ISPHttpClientOptions = {
          
        "body":JSON.stringify(listData)
    }
    console.log('the value of config is ',config);
  
    function handleSubmit():void{
        if(fName === ""){
            alert("Please enter fName value");
            return ;
        }
        else if(lName === ""){
            alert("Please enter lName value");
            return ;
        }
        setIsLoading(true);
        props.spHttpClient.post(endURL,SPHttpClient.configurations.v1,config)
        .then((Response:SPHttpClientResponse)=>{
            setIsLoading(false);
            if(Response.ok){
                alert("data is successfully Submitted:");
            }
            else{
                alert("data is not submitted:");
            }
            return Response.json();
        })
        .then((data)=>{
            console.log("the value of data is ",data);
            setFName("");
            setLName("");
        })
        .catch((error)=>{
            setIsLoading(false);
            alert("there is something error");
            console.log("error is ",error);
            
        })
        
        
    }


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
            <button onClick={handleSubmit}  className={submitdataStyle.buttonSubmit} disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    )
}

export default SubmitDataToList