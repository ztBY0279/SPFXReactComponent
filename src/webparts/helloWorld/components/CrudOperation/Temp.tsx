import * as React from "react";

//import welcomeLightImage from './welcome-light.png';
import 'bootstrap/dist/css/bootstrap.min.css';
function Temp(): React.ReactElement<HTMLDivElement> {
  return (
    <div>
        {/* <style>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"/>
        </style> */}
      <h1>here is non bootstrape component is used</h1>
      <p>there is some button given below</p>
      <button className="btn btn-secondary">submit</button>
      <button className="btn btn-primary">add to card</button>
       {/* <img src={import "./welcome-light.png"} alt="" /> */}
      <div className="card" style={{ width: "18rem" }}>
        <img src= {require('./welcome-light.png')} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the Card content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
          <p>the changes are made completely</p>
        </div>
      </div>
    </div>
  );
}

export default Temp;
