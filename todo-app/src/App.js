
import React,{ useEffect, useState } from 'react';
import './App.css';
import { MdDelete } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { MdMovieEdit } from "react-icons/md";

function App() {
  const [isCompleteScreen,setIsCompleteScreen]=useState(false);
  const [allTodos,settodos]=useState([]);
  const [newTitle,setNewTitle]=useState("");
  const [newDescription,setNewDescription]=useState("");
  const [completedTodos,setCompleteTodos]=useState([]);
  const [currentEdit,setCurrentEdit]=useState("");
  const [currentEditedItem,setCurrentEditItems]=useState("");

  const HandleAddTodo=()=>{
    let newTodoItem={
      title:newTitle,
      descrption:newDescription
    }

    let updatedTodoArr=[...allTodos];
    updatedTodoArr.push(newTodoItem);
    settodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  };

  const handleDeleteTodo=(index)=>{
    let reduceTodo=[...allTodos];
    reduceTodo.splice(index);

    localStorage.setItem('todolist',JSON.stringify(reduceTodo));
    settodos(reduceTodo);
  }

  const handleCompleteTodo=(index)=>{
    let now= new Date();
    let dd= now.getDate();
    let mm= now.getMonth();
    let yyyy= now.getFullYear();
    let h= now.getHours();
    let m = now.getMinutes();
    let s=now.getSeconds();
    let completeOn= dd+'-'+mm+'-'+yyyy+' at'+h+':'+m+':'+s;

    let filterItem={
      ...allTodos[index],
      completeOn:completeOn
    }

    let updatedCompleteArr=[...completedTodos];
    updatedCompleteArr.push(filterItem);
    setCompleteTodos(updatedCompleteArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompleteArr));
  }

  const handleDeleteCompletedTodo=(index)=>{
    let reduceTodo=[...completedTodos];
    reduceTodo.splice(index);

    localStorage.setItem('completedTodos',JSON.stringify(reduceTodo));
    setCompleteTodos(reduceTodo);
  }

  useEffect(()=>{
    let savedTodo=JSON.parse(localStorage.getItem('todolist'));
    let savedComTodo=JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo){
      settodos(savedTodo);
    }
    if(savedComTodo){
      setCompleteTodos(savedComTodo);
    }
  },[]);

  const handleEdit=(ind,item)=>{
    console.log(ind);
    setCurrentEdit(ind);
    setCurrentEditItems(item);
  }

  const handleUpdateTittle=(value)=>{
    setCurrentEditItems((prev)=>{
      return{...prev,title:value}
    })
  }

  const handleUpdateDescription=(value)=>{
    setCurrentEditItems((prev)=>{
      return {...prev,descrption:value}
    })
  }

  const handleUpdateTodo=()=>{
    let newTodo=[...allTodos]
      newTodo[currentEdit]=currentEditedItem;
      settodos(newTodo);
      setCurrentEdit("");
    
  }

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className='Todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title? " />
          </div>

          <div className='todo-input-item'>
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What's the task description? " />
          </div>

          <div className='todo-input-item'>
            <button type='button' onClick={HandleAddTodo} className='primaryBtn' >Add</button>
          </div>
        </div>

        <div className='btn-area'>
          <button className={`SecBtn ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)} >Todo</button>
          <button className={`SecBtn ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)} >Completed</button>
        </div>

        <div className='todo-list'>

          {isCompleteScreen=== false && allTodos.map((item,index)=>{
            if(currentEdit===index){
              return(
                <div className='edit_wrapper' key={index}>
                  <input placeholder='Updated Title' onChange={(e)=>handleUpdateTittle(e.target.value)} value={currentEditedItem.title} />
                  < textarea placeholder='Updated Title' rows={4} onChange={(e)=>handleUpdateDescription(e.target.value)} value={currentEditedItem.descrption} />
                  <button type='button' onClick={handleUpdateTodo} className='primaryBtn'>Update</button>
                </div>
              )
            }
            else{
              return(
              <div className='todo-list-item' key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.descrption}</p>
            </div>

            <div>
            <MdDelete className='d-icon' onClick={()=>handleDeleteTodo(index)} title='delete'/>
            <FaCheckDouble className='c-icon' onClick={()=>handleCompleteTodo(index)} title='complete' />
            <MdMovieEdit className='c-icon' onClick={()=> handleEdit (index,item)} title="Edit?" />
           </div>
            
          </div>
            );
            }
            
          })}


          {isCompleteScreen=== true && completedTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.descrption}</p>
              <p><small>CompletedOnn: {item.completeOn}</small></p>
            </div>

            <div>
            <MdDelete className='d-icon' onClick={()=>handleDeleteCompletedTodo(index)} title='delete'/>
            
           </div>
            
          </div>
            )
          })}
       


        </div>

      </div>
    </div>
  );
}

export default App;
