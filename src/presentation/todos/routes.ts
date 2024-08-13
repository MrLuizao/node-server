import { Router } from "express";
import { ToDoController } from "./controller";

export class ToDoRoutes {

    static get routes(): Router{
        const router = Router();

        const toDoController = new ToDoController();

        router.get('/', toDoController.getToDos);
        router.get('/:id', toDoController.getToDoById);
        
        router.post('/', toDoController.createToDo);
        router.put('/:id', toDoController.updateToDo);
        router.delete('/:id', toDoController.deleteToDo);


        return router;
    }
}