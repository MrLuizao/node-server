import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDTO } from "../../domain/DTO/todos/create-todo.dto";
import { UpdateTodoDTO } from "../../domain/DTO/todos/update-todo.dto";

export class ToDoController {

    constructor(){}

    getToDos = async (request: Request, response: Response)=>{
        const todos = await prisma.todo.findMany();
        return response.json(todos);
    }

    getToDoById = async (request: Request, response: Response)=>{
        const id = +request.params.id;
        if( isNaN(id) ) return response.status(400).json({error: 'ID is not a number'});

        const todo = await prisma.todo.findFirst({where: {id}});

        (todo)
        ? response.json(todo)
        : response.status(404).json({error: 'ID not exist'});
    }

    createToDo = async (request: Request, response: Response)=>{

        const [error, createTodoDTO] = CreateTodoDTO.create(request.body);
        if( error ) return response.status(400).json({ error });

        const todo = await prisma.todo.create({ 
            data: createTodoDTO!
        });

        response.json(todo);
    }

    updateToDo = async (request: Request, response: Response)=>{

        const id = +request.params.id;
        const [error, updateTodoDTO] = UpdateTodoDTO.create({...request.body, id});

        if( error ) return response.status(400).json({error});

        const todo = await prisma.todo.findFirst({ where: {id} });

        if( !todo ) return response.status(400).json({error: 'ID not found'});
        

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: updateTodoDTO!.values
        });

        response.json(updatedTodo);
    }

    deleteToDo = async (request: Request, response: Response)=>{

        const id = +request.params.id;
        if( isNaN(id) ) return response.status(400).json({error: 'ID is not a number'});

        const todo = await prisma.todo.findFirst({ where: {id} });

        if( !todo ) return response.status(400).json({error: 'ID not exist'});

        const deleted = await prisma.todo.delete({ 
            where: { id } 
        });

        ( deleted ) 
        ? response.json(deleted)
        : response.status(400).json({error: 'ID not exist'});

    }

}