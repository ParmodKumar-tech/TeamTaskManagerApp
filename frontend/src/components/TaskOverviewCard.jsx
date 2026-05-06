import { useAuth } from "../contexts/AuthContext";

function TaskOverviewCard(){
    
    
const {taskCount}=useAuth();
    

const cards = [
    {
        title: "Total tasks",
        value: taskCount.totalTask,
        bg: "bg-blue-100",
    },
    {
        title: "Pending tasks",
        value: taskCount.pendingTask,
        bg: "bg-green-100",
    },
    {
        title: "Completed tasks",
        value: taskCount.completedTask,
        bg: "bg-red-100",
    },
    {
        title: "Overdue tasks",
        value: taskCount.overdueTask,
        bg: "bg-blue-200",
    },
]
    
    
    return(
        <>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pb-5">
            {cards.map(({ title, value, bg }) => (
                <div key={title} className={`${bg} p-5 rounded-xl shadow-md flex items-center gap-4`}>
                    <div className="space-y-1">
                        <h2 className="font-bold">{title}</h2>
                        <h1 className="text-2xl font-bold">{value}</h1>
                    </div>
                </div>
            ))}
        </div>
        
        </>        
    )
}

export default TaskOverviewCard;