import { Injectable } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./models/todo.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CountService } from "src/count/count.service";

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<Todo>,
    private readonly countService: CountService
  ) {}

  create(createTodoDto: CreateTodoDto) {
    return Promise.all([
      this.todoModel.create(createTodoDto),
      this.countService.updateCount("ADD"),
    ]);
  }

  findAll(page: number, limit: number) {
    return this.todoModel.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $facet: {
          totalCount: [
            {
              $group: {
                _id: null,
                totalCount: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                totalCount: 1,
              },
            },
          ],
          paginatedData: [
            {
              $skip: (page - 1) * limit,
            },
            {
              $limit: limit,
            },
            {
              $addFields: {
                id: { $toString: "$_id" },
              },
            },
          ],
        },
      },
      {
        $unwind: "$totalCount",
      },
      {
        $project: {
          totalCount: "$totalCount.totalCount",
          todos: "$paginatedData",
        },
      },
    ]);
  }

  findOne(id: string) {
    return this.todoModel.findById(id);
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return Promise.all([
      this.todoModel.findByIdAndUpdate(id, updateTodoDto),
      this.countService.updateCount("UPDATE"),
    ]);
  }

  remove(id: string) {
    return Promise.all([
      this.todoModel.findByIdAndDelete(id),
      this.countService.updateCount("DELETE"),
    ]);
  }
}
