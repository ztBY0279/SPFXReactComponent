import * as React from "react";
import { NewFunComponentProps } from "./INewFunComponentProps";

export interface List {
  Title: string;
  Name: string;
  Surname: string;
  Image: string;
  Id: string;
}

export interface Lists {
  value: List[];
}

type MyObjectType = {
  id: string;
  name: string;
  surname: string;
  image: string;
};

const arr: MyObjectType[] = [];

function NewFunComponent(props: NewFunComponentProps): React.ReactElement<HTMLDivElement> {
  const [dataFetched, setDataFetched] = React.useState(false);
  const [count,setCount] = React.useState(0);

  const endURL: string = props.abosoluteUrl + "/_api/web/lists/getbytitle('Temp1')/Items";

  async function getListData(endURL: string):Promise<void> {
    try {
      const listUrl = endURL;
      const response = await fetch(listUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json;odata=nometadata',
        },
      });

      if (response.ok) {

        const result: Lists = await response.json();
        result.value.forEach((item: List) => {
          const imageData = JSON.parse(item.Image);
          const obj: MyObjectType = {
            id: item.Id,
            name: item.Name,
            surname: item.Surname,
            image: imageData.serverUrl + imageData.serverRelativeUrl,
          };
          arr.push(obj);

        });

        setDataFetched(true);
      } else {
        console.error('Error loading data from SharePoint list:', response.statusText);
      }
    } catch (error) {
      console.error('Error loading data from SharePoint list:', error);
    }
  }

  React.useEffect(() => {
    getListData(endURL)
    .catch((error)=>{
        console.log("this is error:",error);
    })
  }, []); // Empty dependency array means this effect runs once when the component mounts
    
  function handleClick():void{
    console.log("the count value is ",count);
    if(arr.length-1 === count){
        setCount(0);
    }
    else{
        setCount(count+1);
    }
    

  }
  return (
    <div>
      {dataFetched && (
        <>
          <h1 style={{ color: "blue" }}>this is functional component</h1>
          <h2 contentEditable={true} style={{ backgroundColor: "red" }}>
            this is functional component example:
          </h2>
         
          <img src={arr[count].image} alt="temp-image" width={400} height={400} />
          <button onClick={handleClick}>next</button>
         
        </>
      )}
    </div>
  );
}

export { arr };
export default NewFunComponent;









// import * as React from "react";
// import { NewFunComponentProps } from "./INewFunComponentProps";
// //import {SPHttpClient,SPHttpClientResponse} from "@microsoft/sp-http";
// // now importing css file in our custom component:-
// //import './NewFunstyle.css';
// //import { WebPartContext } from "@microsoft/sp-webpart-base";
// // import {IHelloWorldProps} from './IHelloWorldProps';
// //import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
// //import { List } from "@fluentui/react";

// export interface List {
//   Title: string;
//   Name: string;
//   Surname: string;
//   Image: string;
//   Id:string;
// }

// export interface Lists {
//   value: List[];
// }

// type MyObjectType = {
//     id: string;
//     name: string;
//     surname:string;
//     image:string;
// };

// const arr:MyObjectType[] = [];

    


// function NewFunComponent(props: NewFunComponentProps): React.ReactElement<HTMLDivElement> {
 
//   const endURL: string = props.abosoluteUrl + "/_api/web/lists/getbytitle('Temp1')/Items";
//   console.log("now we are calling the getListData fucntion:");
//   async function getListData(endURL:string) {
    
    

//     try {
//         const listUrl = endURL;
//         const response = await fetch(listUrl, {
//           method: 'GET',
//           headers: {
//             'Accept': 'application/json;odata=nometadata',
//           },
//         });
    
//         if (response.ok) {

//         console.log("data is fetched successfully :");
//         alert("congratulation data is fetched successfully:");
//         console.log("only response value is :",response);
//         const result:Lists = await response.json();
//         console.log("response.json value is ",result);
//         result.value.forEach((item:List)=>{
//             const imageData = JSON.parse(item.Image);
//             console.log("value of imageDAta:",imageData);
//             const obj:MyObjectType = {
//                 id:item.Id,
//                 name:item.Name,
//                 surname:item.Surname,
//                 image:imageData.serverUrl+imageData.serverRelativeUrl
//             };
//             arr.push(obj);
        

//         })
     
//          console.log("the complete array value is :",arr);
//         } else {
//           console.error('Error loading data from SharePoint list:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error loading data from SharePoint list:', error);
//       }

//      // console.log(arr[0].Image);

//     }
//  getListData(endURL)
//  .catch((error)=>{
//     console.log("error while calling:");
//  })

 
   
//   return (
   
//     <div>
//         {console.log("now the return statement is exceuting:",)}
//         {alert("now the render return staement is executing:")}

//       <h1 style={{ color: "blue" }}>this is functional component</h1>
//       <h2 contentEditable="true" style={{ backgroundColor: "red" }}>
//         this is functional component example:
//       </h2>
      
//     </div>
//   );
// }

// export {arr};
// export default NewFunComponent;
