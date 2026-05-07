import { useAuth } from "../contexts/AuthContext";

function TaskCard ({
  task,
  onDeleteRerender,
}) {
  

  const {role,userId,openProjectForm,openTaskForm}=useAuth();

  const onhandleDelete= () => {
    if(task.projectName){
      onDeleteRerender(task)
    }else{
      onDeleteRerender(task);
    }
  }

  const onUpdate=()=>{
    if (task.projectName) {
      openProjectForm(task);
    } else {
      openTaskForm(task);
    }

  }


  return (
    <>
    {userId && <div className="bg-white p-5 mx-4 my-2 rounded-xl shadow-md">
      <div className="h-1 bg-black"></div>

      <h1 className="text-3xl my-2 bg-gray-100 rounded">
        {task.projectName || task.taskName}
        <div className="flex justify-between">
        <p className="text-xs">{task._id}</p>
        {role === "admin" && <p className="text-xs">{`working people: ${task?.members?.length}`}</p>}
        </div>
      </h1>

      <p className="text-xl mb-7">{task.description}</p>

      <div className="flex justify-between items-center">
        <div className={task.status === "completed" ? "bg-green-200" : "bg-red-100"}>
          {role === "admin" ?<p>{`Tasks : ${task.tasks?.length}`}</p>
          :
          <p>{task.status === "completed" ? "Completed" : task.status === "pending"?"Pending":"InProgress"}</p>
          }
          </div>

        <div className="flex gap-5">
          <button
            className="bg-blue-500 p-2 text-white rounded-xl"
            onClick={onUpdate}
          >
            Update
          </button>

          { role === "admin" &&
          <button
            className="bg-red-500 text-white p-2 rounded-xl"
            onClick={onhandleDelete}
          >
            Delete
          </button>
          }
        </div>
      </div>
    </div>
    }
    </>
  )
}

export default TaskCard;