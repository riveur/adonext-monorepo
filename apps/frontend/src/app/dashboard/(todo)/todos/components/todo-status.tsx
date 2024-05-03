import { Badge } from "@/components/ui/badge";
import { Todo } from "@/lib/validation";
import { CheckCircle2Icon, CircleDotDashedIcon } from "lucide-react";

export default function TodoStatus({ todo }: { todo: Todo }) {
  return todo.completed ? <CompletedBadge /> : <PendingBadge />;
}

function CompletedBadge() {
  return (
    <Badge variant="outline">
      <CheckCircle2Icon className="mr-2 h-4 w-4" />
      Completed
    </Badge>
  );
}

function PendingBadge() {
  return (
    <Badge variant="outline" className="border-warning/50">
      <CircleDotDashedIcon className="mr-2 h-4 w-4" />
      Pending
    </Badge>
  );
}