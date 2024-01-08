import * as React from "react";
import  todolist from "./styles/todolist.module.scss"
//import "./styles/TodoListstyle.css"
const arr:string[] = [];

// react functional component example:-
// const myComponent:React.FC = ():React.ReactElement<HTMLDivElement>=>{
//     console.log("this is component");

//     return (
//         <div>
//             <p>this is paragraph</p>
//         </div>
//     )
// }
//export {myComponent}


function TodoList():React.ReactElement<HTMLDivElement>{
   
    const [items,setItems] = React.useState<string[]>([]);
    const [name,setName] = React.useState("");

    function handleChange(event:React.ChangeEvent<HTMLInputElement>):void{
        console.log("hanlde change is clicked:");
          setName(event.target.value);
    }

    function handleClick():void{
       console.log("handleClick is caled:");
        if(name === ""){
            alert("please give a valid name");
            return ;
        }
        arr.push(name);
        setName("");
        setItems(arr);
       
       
    }

    return (
        <section className={todolist.section}>
        <div className={todolist.container}>
             <div className={todolist.heading}>
        <h1>To-Do List</h1>
      </div>

      <div className={todolist.form}>
        <input onChange={handleChange} type="text" value={name} />
        <button className={todolist.button} onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((item,idx) => (
            <li className={todolist.li} key={idx}>{item}</li>
          ))}
        </ul>
      </div>
           
        </div>
        </section>
    )
}

export default TodoList;