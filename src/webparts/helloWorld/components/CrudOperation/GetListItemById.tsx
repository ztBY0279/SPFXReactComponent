import * as React from "react";
import {SPHttpClient,ISPHttpClientOptions,SPHttpClientResponse} from "@microsoft/sp-http";
import 'bootstrap/dist/css/bootstrap.min.css';

// interface for the props of GetListItemById
interface GetListItemByIdProps{
    absoluteURL:string;
    spHttpClient:SPHttpClient;
}

interface List{
    Id:number;
    Title:number;
    Name:string;
    Surname:string;
    Email:string;
   MobileNo_x002e_:number;
}
let i = 1;
function GetListItemById(props:GetListItemByIdProps):React.ReactElement<HTMLDivElement>{
    const[id,setId] = React.useState<number | string>();
    const[fName,setfName] = React.useState("");
    const[lName,setlName] = React.useState("");
    const[Email,setEmail] = React.useState("");
    const[mobileNumber,setMobileNumber] = React.useState<number | string>();
    const listName:string = "UpdateList";
    const endURL:string = `${props.absoluteURL}/_api/web/lists/getbytitle('${listName}')/items(${id})`;
    console.log('before calling value of endulr is ',endURL);
    
    console.log("the inital value is :",i);
    i++;


    function handleChange(event:React.ChangeEvent<HTMLInputElement>):void{
        const {name,value} = event.target;
        console.log(value);
        
        if(name === "id"){
            setId(parseInt(value));
        }
        else if(name === "fName"){
            setfName(value);
        }
        else if(name === "lName"){
            setlName(value);
        }
        else if(name === "Email"){
            setEmail(value);
        }
        else if(name === "mobileNumber"){
            setMobileNumber(value);
        }
        
        console.log('the value of endurl is ',endURL);
    }

    function handleClickDisplay():void{
   console.log('the value of endurl is ',endURL);

   if(id === undefined || id === ""){
      alert("please enter id:");
      return ;
   }
   
    props.spHttpClient.get(endURL,SPHttpClient.configurations.v1)
    .then((Response)=>{
        if(Response.ok){
            alert("data is fetched")
        }
        else{
            alert("data is not availabe for that id. please give different id:");
        }
        return Response.json();
    })
    .then((data:List)=>{
        console.log('the data is ',data);
        console.log('the value of data.name is ',data.Name,data.Surname);

        if(data.Name === undefined){
            setId("");
            setfName("");
            setlName("");
            setEmail("");
            setMobileNumber("");
        }
        
        setfName(data.Name);
        setlName(data.Surname);
        setEmail(data.Email);
        setMobileNumber(data.MobileNo_x002e_);
        
    })
    .catch((error)=>{
        console.log('the error is ',error);
    })

    }


    // update the sharepoint list data;-

    function handleClickUpdate():void{
        console.log('hello in hanldeupdate method');
        if(id === undefined || id === ""){
          alert('please fetch the data first and then update');
          return;
        }
       // const updateURL:string = `${props.absoluteURL}/_api/web/lists/getbytitle('${listName}')`;

       const itemData = {
        'Title': `${id}`,
        'Name': fName,
        'Surname': lName,
        'Email': Email,
        'MobileNo_x002e_': mobileNumber
      };

        console.log('the value of itemdata is ',itemData);

        const header = {
            "X-HTTP-Method":"MERGE",
            "IF-MATCH": "*"
        }
        const config:ISPHttpClientOptions = {
            "body":JSON.stringify(itemData),
            "headers":header
        }

        props.spHttpClient.post(endURL,SPHttpClient.configurations.v1,config)
        .then((Response:SPHttpClientResponse)=>{
            console.log('the value of Response is',Response);
            //console.log('the value of response.json is ',Response.json());
            
            
            if(Response.ok){
                alert("data is submitted successfully:");
            }
            else{
                alert('data is not submitted');
            }
        })
        .catch((error)=>{
            console.log('the error is ',error);
            
        })  
        
    }


    // delete the sharpoint List data;

    function handleClickDelete():void{
       console.log('hello in handleClickDelete:');

       if(id === undefined || id ===""){
        alert("please enter id and then fetch data and then use delete opeartion");
        return ;
       }

       const header = {
        "X-HTTP-Method":"DELETE",
        "IF-MATCH":"*"
      }
    
      const config:ISPHttpClientOptions = {
        "headers":header
      }

      props.spHttpClient.post(endURL,SPHttpClient.configurations.v1,config)
      .then((Response)=>{
        if(Response.ok){
          alert(`list item with id ${id} is deleted`);
            setId("");
            setfName("");
            setlName("");
            setEmail("");
            setMobileNumber("");
        }
        else{
          alert("issue with api");
        }
      })
      .catch((error)=>{
        console.log('the error is ',error);
        
      })
       
    }
    

    return (
      <div>
        <h1  style={{
      backgroundColor: '#007BFF', // Background color
      color: '#FFFFFF', // Text color
      marginTop:"5px",
      padding: '10px', // Adjust padding for better spacing
    }} className="display-5 mb-4 pb-2 border-bottom border-primary">Fetch data using id to update or delete</h1>

        <div style={{ width: "80%" }} className="form-group mb-3 mx-2">
          <label style={{ marginRight: "650px" }} className="form-label" htmlFor="exampleInputEmail1">Id </label>

          <div className="d-flex">
            <input name="id" type="number" value={id} onChange={handleChange} className="form-control" id="exampleInputTitle1" aria-describedby="emailHelp"placeholder="Enter Id"style={{ flex: 1 }}/>
            <button onClick={handleClickDisplay}className="btn btn-primary ml-2 mx-2">
              Display Data
            </button>
          </div>
        </div>

        <div className="form-group mb-3 mx-2">
          <label
            style={{ marginRight: "650px" }}
            className="form-label"
            htmlFor="exampleInputEmail1"
          >
            Name
          </label>
          <input
          onChange={handleChange}
          name="fName"
            type="text"
            value={fName}
            className="form-control"
            id="exampleInputName1"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
          />
        </div>

        <div className="form-group mb-3 mx-2">
          <label style={{ marginRight: "650px" }} htmlFor="exampleInputEmail1">
            Surname
          </label>
          <input
            type="text"
            onChange={handleChange}
            name="lName"
            value={lName}
            className="form-control"
            id="exampleInputSurname1"
            aria-describedby="emailHelp"
            placeholder="Enter Surname"
          />
        </div>

        <div className="form-group mb-3 mx-2">
          <label style={{ marginRight: "650px" }} htmlFor="exampleInputEmail1">
            Email
          </label>
          <input
          onChange={handleChange}
          name="Email"
            type="email"
            value={Email}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group mb-3 mx-2">
          <label
            style={{ marginRight: "650px" }}
            htmlFor="exampleInputPassword1"
          >
            Mobile
          </label>
          <input
            type="number"
            onChange={handleChange}
            name="mobileNumber"
            value={mobileNumber}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Mobile Number"
          />
        </div>

      <div className="d-flex justify-content-between mx-2">
       <button onClick={handleClickUpdate} className="btn btn-primary">
        Update
        </button>
        <button onClick={handleClickDelete} type="button" className="btn btn-danger">
         Delete
         </button>
      </div>

       
      </div>
    );
}

export default GetListItemById;