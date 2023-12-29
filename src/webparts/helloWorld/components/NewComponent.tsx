import * as React from "react";

class NewComponent extends React.Component{

     public render():React.ReactElement<HTMLDivElement> {
        return (
            <div>
                <h1>hello world from my new component:</h1>
                <h2>hello in my own custom class based compnet</h2>
            </div>
        )
    }
}
export default NewComponent