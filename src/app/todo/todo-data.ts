import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo.model';

export class InMemoryTodoDbService implements InMemoryDbService{
    createDb(){
        let todos: Todo[] = [
            {id: 'f823b191-7b88-403d-a20c-3fb02f4ae4e2', desc: 'Get groceries', completed: false},
            {id: '0f3f9a9d-1c7c-4f9d-9b8f-1b7a4d4b8e3d', desc: 'Call plumber', completed: false},
            {id: 'b8a808c0-3e7d-4b1f-8b7a-2b6f5b0f9b6b', desc: 'Buy a new phone', completed: false},
            {id: '9e8e6b0a-9b7b-4b1f-8b7a-2b6f5b0f9b6b', desc: 'Call mom', completed: false}
        ];
        return {todos};
    }
}