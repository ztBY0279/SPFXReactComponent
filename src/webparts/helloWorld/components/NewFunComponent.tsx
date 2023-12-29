import * as React from "react";

function NewFunComponent():React.ReactElement<HTMLDivElement>{

    return (
        <div>
            <h1 style={{color:"blue"}}>this is functional component</h1>
            <h2 contentEditable="true" style={{backgroundColor:"red"}}>this is functional component example:</h2>
        </div>
    )
}

export default NewFunComponent;