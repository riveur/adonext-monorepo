import useTodoModalStore from "@/app/dashboard/(todo)/todos/hooks/use-todo-modal-store";
import { TodoForm } from "@/components/forms/todo-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContentWithoutOverlay, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

const TodoModal = () => {
  const isModalOpen = useTodoModalStore().isModalOpen;
  const setIsModalOpen = useTodoModalStore().setIsModalOpen;
  const todo = useTodoModalStore().todo;
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="h-8">
          <PlusCircle className="h-4 w-4 mr-2" />
          <span>Add new todo</span>
        </Button>
      </DialogTrigger>
      <DialogContentWithoutOverlay
        animation="right-to-left"
        className="flex flex-col gap-2 translate-x-0 translate-y-0 left-auto right-0 lg:top-[60px] top-14 bottom-0 border-y-0"
      >
        <h2 className="py-2 font-medium text-lg">{todo ? `Edit todo #${todo.id}` : 'Add new todo'}</h2>
        <TodoForm />
      </DialogContentWithoutOverlay>
    </Dialog>
  );
}

export default TodoModal;