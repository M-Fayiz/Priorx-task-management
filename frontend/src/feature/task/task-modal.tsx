import { useEffect, useState } from "react";
import { TaskService } from "@/service/task.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Task, TaskStatus } from "@/types/task.types";
import { useAuthStore } from "@/store/auth.store";


interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  task?:Task
}

export const TaskModal = ({ open, onClose,task }: TaskModalProps) => {
   
    const {user}=useAuthStore()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<TaskStatus>("pending");
  const [loading, setLoading] = useState(false);

    const toDateTimeLocal = (date?: string) => {
    if (!date) return "";
    return new Date(date).toISOString().slice(0, 16);
    };

   const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("pending");
  };

useEffect(() => {
  if (task) {
    setTitle(task.title);
    setDescription(task.description || "");
    setDueDate(task.dueDate ? toDateTimeLocal(task.dueDate) : "");
    setStatus(task.status);
  } else {
    resetForm();
  }
}, [task, open]);


  const submit = async () => {
    if (!title.trim()) return;

    setLoading(true);

    const payload= { title, description,userId:user!._id, dueDate, status };

    if (task?._id) {
      await TaskService.update(task._id, user!._id, payload);
    } else {
      await TaskService.create(payload, user!._id);
    }

    setLoading(false);
    onClose();
    resetForm();
  };



  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>   {task ? "Edit Task" : "Create Task"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          
          <Textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

        {task&&(

          <Select value={status} onValueChange={(v) => setStatus(v as TaskStatus)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        )}

         
          <Input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={loading}>
            {loading ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
