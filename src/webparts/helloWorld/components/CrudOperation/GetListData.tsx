import * as React from "react";
//import styles1 from "../styles/Bootstrap.module.scss";
//import design from "../styles/Bootstrap.module.scss";
import {SPHttpClient,SPHttpClientResponse} from "@microsoft/sp-http"

interface GetListDataProps{
    absoluteURL:string;
    spHttpClient:SPHttpClient
}

interface List{
    Title:string;
    Name:string;
    Surname:string;
    Image:string;
}
interface Lists{
    value:List[];
}

//const imgURL:string[] = [];

function GetListData(props:GetListDataProps):React.ReactElement<HTMLDivElement>{
    const [dataFetched, setDataFetched] = React.useState(false);
    const [count,setCount] = React.useState(0);
    const [imageURLs, setImageURLs] = React.useState<string[]>([]);

    
    

    function getData():void{
        const listName:string = "Temp1"
    const endURL:string = `${props.absoluteURL}/_api/web/lists/getbytitle('${listName}')/items`
    props.spHttpClient.get(endURL,SPHttpClient.configurations.v1)
    .then((Response:SPHttpClientResponse)=>{

        if(Response.ok){
            console.log("the data is fetched succesfully:");
        }
        else{
            console.log("the data is not fetched");
        }

        return Response.json();
    })
    .then((data:Lists)=>{
         console.log("the data is fetched:",data);

         data.value.forEach((item:List)=>{

            const temp = JSON.parse(item.Image)
            const URL:string = temp.serverUrl + temp.serverRelativeUrl;
            //imgURL.push(URL);
            setImageURLs(prevURLs => [...prevURLs, URL]);

         })

         setDataFetched(true);
    })
    .catch((error)=>{
        alert("there is an error in this code:");
        console.log(`the error is ${error}`);
        
    })
    }

    React.useEffect(()=>{
        getData();
          console.log("now the value of imgurl variable is ",imageURLs);
          
    },[]);

    function handleClickPrevious():void{
        console.log("the count value is ",count);
        if(count === 0){
            setCount(imageURLs.length-1);
        }
        else{
            setCount(count-1);
        }
       
    }

    function handleClickNext():void{
        console.log("the count value is ",count);
        if(imageURLs.length-1 === count){
            setCount(0);
        }
        else{
            setCount(count+1);
        }
    }

    return (
        <div>
            {dataFetched && (
                <div>
                {/* <h1 style={{color:"blue"}}>hello world in new compoent</h1>
                <h1>here is  bootstrape component is used</h1>
                <p>there is some button given below</p>
                <button className={design.btn}>submit</button>
                <button className="btn btn-primary">add to card</button>
                <button className="btn btn-secondary">update</button> */}
    
                <div id="carouselExample" className="carousel slide">
    
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img src={imageURLs[count]} className="d-block w-100" alt="..." width={"100%"} height={"450px"}/>
                      </div>
                      
                      
                    </div>
    
                    <button onClick={handleClickPrevious} className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"/>
                      <span className="visually-hidden">Previous</span>
                    </button>
    
                    <button onClick={handleClickNext} className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"/>
                      <span className="visually-hidden">Next</span>
                    </button>
    
                  </div>

                  </div>
            )}
            
        </div>
    )
}

export default GetListData;