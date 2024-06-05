export class Todo {
  id!: string;
  desc!: string;
  completed!: boolean;
  userId!: number;
}

export class User {
  id!: number;
  username!: string;
  password!: string;
}
