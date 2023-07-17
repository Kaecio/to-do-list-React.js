import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaWindowClose } from 'react-icons/fa'
import './Main.css';


const Main = () => {
  const [ newToDo, setNewTodDo ] = useState('');
  const [ listToDo, setListTodDo ] = useState([]);
  const [ toDoExist, setToDoExist ] = useState(false);

// useEffect(() => {
//   const taskLocalStorage = JSON.parse(localStorage.getItem('tarefas'));
//   if(!taskLocalStorage) return;
//   taskLocalStorage
// },[]);

// useEffect((prevProps, prevState ) => {
//   if(listToDo === prevState) return;
//   localStorage.setItem('tarefas', JSON.stringify(listToDo));
// },[listToDo])

useEffect(() => {
  const taskLocalStorage = JSON.parse(localStorage.getItem('tarefas'));
  if (taskLocalStorage && taskLocalStorage.length > 0) {
    setListTodDo(taskLocalStorage);
  }
}, []);


useEffect(() => {
  localStorage.setItem('tarefas', JSON.stringify(listToDo));
}, [listToDo]);

const handleOnChange = (event) => {
 console.log(event.target.value)
 setNewTodDo(event.target.value)
}

const handleSubmit = (e) =>{
  e.preventDefault();

  if(listToDo.indexOf(newToDo) !== -1){
    setToDoExist(true);
    return
  }
    setToDoExist(false);
    const novaTarefas =  [...listToDo, newToDo]
    setListTodDo(novaTarefas)
    setNewTodDo('')
}

const handleDelete = (e, index) => {
  let novaTarefas = [...listToDo];
  novaTarefas.splice(index, 1);
  setListTodDo(novaTarefas);
}

const handleEdit = (e, index) => {

  console.log('Edit', index)

}


console.log('lista: ',listToDo)

  return (
    <div className='main'>
    <h1>
    <div>
    {toDoExist ? <div className='alert'>A tarefa ja existe</div> : null}
    </div>
      Lista de tarefas
      <form action='#' className='form' onSubmit={handleSubmit}>
        <input onChange={handleOnChange} value={newToDo} type='text'/>
        <button type='submit'>
        <FaPlus />
        </button>
      </form>
      <ul className='tasks'>
        {listToDo.map((task, index) => (
          <li key={index}>
            {task}
            <span>
              <FaEdit onClick={(e) => handleEdit(e, index)} className='edit' />
              <FaWindowClose onClick={(e) => handleDelete(e, index)} className='close' />
            </span>
          </li>
        ))}
      </ul>
    </h1>
    </div>
  )
}

export default Main
