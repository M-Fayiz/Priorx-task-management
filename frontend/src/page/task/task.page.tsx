

import { MainLayout } from "@/components/layout/miniLayout";
import { useTaskStore } from "@/store/task.store";
import { useEffect, useState } from "react";
import { TaskService } from "@/service/task.service";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { TaskModal } from "@/feature/task/task-modal";


import { socket } from "@/service/socket.service";

import { TaskCard } from "@/feature/task/taskCard";

import type { Task } from "@/types/task.types";

export const TaskPage = () => {
      const [open, setOpen] = useState(false);
      const {setTasks} = useTaskStore();
      const [loading,setLoading]=useState<string|null>(null)
        const { tasks, addTask, updateTask, deleteTask } = useTaskStore();
      const {user}=useAuthStore()
      const [selectedTask,setSelectedTask]=useState<Task|null>(null)
      useEffect(()=>{
        (async()=>{
            const data= await TaskService.getAll(user!._id)
            if(data){
                setTasks(data)
            }
        })()
      },[user!._id])

    

  useEffect(() => {
    socket.on("task:created", addTask);
  socket.on("task:updated", (task) => {
  updateTask(task);
});

    socket.on("task:deleted", deleteTask);

    return () => {
      socket.off("task:created", addTask);
      socket.off("task:updated", updateTask);
      socket.off("task:deleted", deleteTask);
    };
  }, [addTask, updateTask, deleteTask]);

  const deleteSelectedTask=async(taskId:string)=>{
    setLoading(taskId)
    await TaskService.deleteTask(taskId,user!._id)
     
  }

  const updatedSelectTask=(task:Task)=>{
    
    setSelectedTask(task)
    setOpen(true)
  }
  const reset=()=>{
    setSelectedTask(null)
  }
   
  return (
    <MainLayout>
     <div className="flex justify-end mb-6">
        <Button
            onClick={() => {
                setOpen(true)
                reset()
            }}
            className="bg-kosma-black text-kosma-white hover:bg-kosma-dgray"
            >
            + New Task
            </Button>

      </div>
       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.length&&tasks.map((task) => (
            <TaskCard key={task._id} task={task} loadingTask={loading} deleteSelectedTask={deleteSelectedTask} updatedSelectTask={updatedSelectTask}/>
        ))}
        {!tasks.length&&(<p className="text-sm text-kosma-gray text-center mt-10">
        No tasks yet. Create your first task 🚀
      </p>)}
    </div>
      <TaskModal open={open} onClose={() => setOpen(false)} task={selectedTask as Task} />
    </MainLayout>
  );
};
