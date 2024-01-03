import * as React from "react";

import { arr } from "./NewFunComponent";

function GetData():React.ReactElement<HTMLDivElement>{
      const[count,setCount] = React.useState(0);
     // const length:number = arr.length;
       console.log("the value of arr is ",arr);
       console.log("the value of arr[0] is ",arr[0]);
       function handleClick(event:React.MouseEvent<HTMLButtonElement, MouseEvent>):void{
          console.log(event);
          setCount(count+1);
       }
    return (
        <div>
            <p>this is where data is come</p>
            <button onClick={handleClick} name="previous">Previous</button>
            {/* <img src={arr[0].Image} alt="" /> */}
            <button onClick={handleClick} name="next">Next</button>
        </div>
    )
}

export default GetData;