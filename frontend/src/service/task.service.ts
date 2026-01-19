
import { axiosInstance } from "@/axios/axiosInstance";
import ConstAPI from "@/constant/api.const";
import type { DashboardAnalyticsDto, Task } from "@/types/task.types"; 
import { throwAxiosError } from "@/utils/axiosError.util";

export const TaskService = {
  getAll:async (userId:string):Promise<Task[]> =>{
    try {
        const response= await axiosInstance.get(ConstAPI.TASK.FETCH(userId))
        console.log(response.data)
        return response.data.tasks
    } catch (error) {
        throwAxiosError(error)
    }
  },
  create:async(data:Partial<Task>,userId:string)=>{
    try {
        const response =await axiosInstance.post(ConstAPI.TASK.CREATE,{taskData:data,userId})

        return response.data
    } catch (error) {
        throwAxiosError(error)
    }
  },
  update:async(taskId:string,userId:string,taskData:Partial<Task>)=>{
    try {
        const response= await axiosInstance.put(ConstAPI.TASK.UPDATE_TASK(taskId),{taskData,userId})
        return response.data
    } catch (error) {
        throwAxiosError(error)
    }
  },
  deleteTask:async(taskId:string,userId:string)=>{
    try {
        await axiosInstance.delete(ConstAPI.TASK.DELETE(taskId,userId))
    } catch (error) {
        throwAxiosError(error)
    }
  },
  getDashData:async(userId:string):Promise<DashboardAnalyticsDto>=>{
    try {
        const response = await axiosInstance.get(ConstAPI.TASK.DASH_DATA(userId))
        console.log(response.data)
        return response.data.dashData
    } catch (error) {
        throwAxiosError(error)
    }
  }
  
};
