import * as React from "react";

function PostData(): React.ReactElement<HTMLDivElement> {
  const [data, setData] = React.useState<object | null>(null);
  const [fetchedData, setFetchedData] = React.useState(false);

  React.useEffect(() => {
    console.log("Effect is starting...");

    fetch("https://jsonplaceholder.typicode.com/todos/2")
      .then((response) => {
        console.log("The first .then is executing:");
        return response.json();
      })
      .then((responseData) => {
        console.log("The second .then is executing:");
        console.log("The data is ", responseData);
        console.log("now setData state is called:");
        setData(responseData);
        console.log("now the setFetched data state is called:");
        setFetchedData(true);
        console.log("end of state call is here: ");
      })
      .catch((error) => {
        console.log("Error is ", error);
      });
  }, []); // Empty dependency array means this effect runs once after the initial render

  console.log("End of the fetch call:");

  return (
    <div>
      {console.log("Return statement is executing now")}
      <p>This is a div element.</p>
      {fetchedData && data && <p>The data value is {JSON.stringify(data)}</p>}
    </div>
  );
}

console.log("The export statement is now executing:");
export default PostData;



// import * as React from "react";

// function PostData():React.ReactElement<HTMLDivElement>{
//     let Data:object;
//     const [fetchedData,setFetchedData] = React.useState(false);
//  console.log("function is start here:");

//       fetch("https://jsonplaceholder.typicode.com/todos/1")
//      .then((response)=>{
//         console.log("the first .then is exceuting:");
//        return response.json();

//      })
//      .then((data)=>{
//         console.log("the second .then is exceuting:");
//         console.log("the data is ",data);
//         Data = data;
//         setFetchedData(true);
//      })
//      .catch((error)=>{
//         console.log("error is ",error);
//      })

//     console.log("end of the fetch call:");
//     return (
       
//         <div>
//             {console.log('return statemtn is exceute now')}
//             <p>this is div element:</p>
//             <p> the data value is {Data}</p>
//         </div>
//     )
 

// }
// console.log("the export statemnt is now executing:");
// export default PostData

// answer for this code:-
//the export statemnt is now executing:
// function is start here:
// PostData.tsx:20 end of the fetch call:
// PostData.tsx:24 return statemtn is exceute now
// PostData.tsx:8 the first .then is exceuting:
// PostData.tsx:13 the second .then is exceuting:
// PostData.tsx:14 the data is  {userId: 1, id: 1, title: 'delectus aut autem', completed: false}