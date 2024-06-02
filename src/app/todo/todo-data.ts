import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo.model';

export class InMemoryTodoDbService implements InMemoryDbService{
    createDb(){
        let todos: Todo[] = [
            {id: 'f823b191-7b88-403d-a20c-3fb02f4ae4e2', desc: 'Test Data in MemoryDB No.1', completed: false},
            {id: '0f3f9a9d-1c7c-4f9d-9b8f-1b7a4d4b8e3d', desc: 'Now you can see me^_^', completed: false},
        ];
        return {todos};
    }
}