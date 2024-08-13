import { Request, Response } from "express";
import { todo } from "node:test";

const ToDos = [
    {id:1, text: 'Buy milk', completedAt: new Date()},
    {id:2, text: 'Buy BEER', completedAt: null},
    {id:3, text: 'Buy wine', completedAt: new Date()}
];

export class ToDoController {

    constructor(){}

    getToDos = (request: Request, response: Response)=>{
        return response.json(ToDos)
    }

    getToDoById = (request: Request, response: Response)=>{

        const id = +request.params.id;
        if( isNaN(id) ) return response.status(400).json({error: 'ID is not a number'});

        const todo = ToDos.find( (item) => item.id === id);
        (todo)
        ? response.json(todo)
        : response.status(404).json({error: 'ID not exist'});
        
    }

    createToDo = (request: Request, response: Response)=>{
        const {text} = request.body;
        if( !text ) return response.status(400).json({error: 'text is required'});

        const newTodo = {
            id: ToDos.length + 1,
            text : text,
            completedAt: null
        };

        ToDos.push(newTodo)

        response.json(newTodo);
    }

    updateToDo = (request: Request, response: Response)=>{

        const id = +request.params.id;
        if( isNaN(id) ) return response.status(400).json({error: 'ID is not a number'});

        const todo = ToDos.find( (item) => item.id === id);
        if( !todo ) return response.status(400).json({error: 'ID not found'});

        const { text, completedAt } = request.body;

        todo.text = text || todo.text;

        (completedAt === null)
        ? todo.completedAt = null
        : todo.completedAt = new Date( completedAt || todo.completedAt);

        response.json(todo);

    }

    
    deleteToDo = (request: Request, response: Response)=>{

        const id = +request.params.id;
        if( isNaN(id) ) return response.status(400).json({error: 'ID is not a number'});

        const todo = ToDos.find( (item) => item.id === id);        
        if( !todo ) return response.status(400).json({error: 'ID not exist'});
        
        ToDos.splice( ToDos.indexOf(todo), 1);
        response.json({success: 'item deleted'})

    }

}