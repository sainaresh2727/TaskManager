import React, { useContext } from 'react'
import { My_Context } from '../ContextFile/Context'

function Task() {
  let {Tasks,SendingTasks,TaskName,setTaskName,TaskDetails,setTaskDetails,TaskDate,setTaskDate,TaskPriority,setTaskPriority,DeleteTask}=useContext(My_Context)
  return (
<>
<section className='container-fluid mt-4'>
<div className="container" id='TaskContainer'>

<form id='TaskForm' onSubmit={(e)=>SendingTasks(e)}>


<div>
<input type="text" className='form-control' placeholder='Enter The Task Name' onChange={(e)=>setTaskName(e.target.value)} value={TaskName} />
</div>


<div>
<textarea placeholder='Enter The Task' className='form-control' cols={30} rows={3} onChange={(e)=>setTaskDetails(e.target.value)} value={TaskDetails}></textarea>
</div>

<div>
<select className='form-control' onChange={(e)=>setTaskPriority(e.target.value)} value={TaskPriority}>
<option hidden>Priority</option>
<option value="TOP-LEVEL">TOP-LEVEL</option>
<option value="MID-LEVEL">MID-LEVEL</option>
<option value="LOW-LEVEL">LOW-LEVEL</option>
</select>
</div>

<div>
<input type="date" className='form-control'  onChange={(e)=>setTaskDate(e.target.value)} value={TaskDate} />
</div>

<div>
<input type="submit" className='form-control btn btn-primary' value={"Add Task"} />
</div>

</form>

</div>
</section>

<section className='container-fluid mt-5'>
<div className="container">
<div className='table-responsive'>
<table className='table table-primary align-middle text-center'>

<thead>
<tr>
<th>TASK-NAME</th>
<th>TASK-DETAILS</th>
<th>PRIORITY</th>
<th>DATE</th>
<th>DELETE</th>
</tr>
</thead>

<tbody>
{
Tasks.map((x,y)=>{
  return(
    <>
    <tr key={y}>
    <td>{x.TaskName}</td>
    <td style={{textAlign:"justify"}}>{x.TaskDetails}</td>
    <td>{x.TaskPriority}</td>
    <td>{x.TaskDate}</td>
    <td><button className='btn btn-danger' onClick={()=>DeleteTask(x._id)}>DELETE</button></td>
    </tr>
    </>
  )
})
}
</tbody>

</table>
</div>
</div>
</section>
    </>
  )
}

export default Task