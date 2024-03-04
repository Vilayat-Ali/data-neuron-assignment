import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './models/todo.model';
import { Count, CountSchema } from '../count/models/count.model';
import { CountService } from 'src/count/count.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Todo.name,
        schema: TodoSchema,
      },
      {
        name: Count.name,
        schema: CountSchema,
      },
    ]),
  ],
  controllers: [TodoController],
  providers: [TodoService, CountService],
})
export class TodoModule {}
