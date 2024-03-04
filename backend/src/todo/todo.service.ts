import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './models/todo.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  create(createTodoDto: CreateTodoDto) {
    return this.todoModel.create(createTodoDto);
  }

  findAll(page: number, limit: number) {
    return this.todoModel.aggregate([
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ]);
  }

  findOne(id: string) {
    return this.todoModel.findById(id);
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todoModel.findByIdAndUpdate(id, updateTodoDto);
  }

  remove(id: string) {
    return this.todoModel.findByIdAndDelete(id);
  }
}
