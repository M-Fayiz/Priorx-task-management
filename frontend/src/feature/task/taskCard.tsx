import type { Task } from "@/types/task.types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CalendarClock, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { formatDueDate } from "@/utils/timeFormat.util";

const statusColor: Record<Task["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

export const TaskCard = ({ task ,deleteSelectedTask,updatedSelectTask}: { task: Task ,deleteSelectedTask:(taskId:string)=>void,updatedSelectTask:(task:Task)=>void}) => {
  const dueDate = formatDueDate(task.dueDate);

  return (
    <Card className="border border-kosma-lgray bg-kosma-white">
      <CardHeader className="pb-2 space-y-2">
       
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold text-kosma-black">
            {task.title}
          </CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={()=>updatedSelectTask(task)}>
                <Pencil size={14} className="mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem  onClick={()=>deleteSelectedTask(task._id)} className="text-red-600">
                <Trash2 size={14} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Status + Due date */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Badge className={`${statusColor[task.status]} capitalize`}>
            {task.status.replace("-", " ")}
          </Badge>

          {dueDate && (
            <div className="flex items-center gap-1 text-kosma-gray">
              <CalendarClock size={14} />
              <span>{dueDate}</span>
            </div>
          )}
        </div>
      </CardHeader>

      {/* Description */}
      {task.description && (
        <CardContent className="text-sm text-kosma-gray">
          {task.description}
        </CardContent>
      )}
    </Card>
  );
};
