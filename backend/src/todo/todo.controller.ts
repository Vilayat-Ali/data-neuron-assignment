import {
  Controller,
  Req,
  Res,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Controller("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Res() res, @Body() createTodoDto: CreateTodoDto) {
    try {
      const resp = await this.todoService.create(createTodoDto);
      return res
        .status(200)
        .json({ message: "Added a new todo successfully!", todo: resp[0] });
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: err?.message || "Server error occurred" });
    }
  }

  @Get()
  async findAll(@Req() req, @Res() res) {
    try {
      const { page, limit } = req.query;
      const todos = await this.todoService.findAll(
        Number(page || 1),
        Number(limit || 10)
      );
      return res
        .status(200)
        .json({ message: "Todos fetched successfully!", todos });
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: err?.message || "Server error occurred" });
    }
  }

  @Get(":id")
  async findOne(@Res() res, @Param("id") id: string) {
    try {
      const todo = await this.todoService.findOne(id);
      return res
        .status(200)
        .json({ message: "Todo fetched successfully!", todo });
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: err?.message || "Server error occurred" });
    }
  }

  @Patch(":id")
  async update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateTodoDto: UpdateTodoDto
  ) {
    try {
      await this.todoService.update(id, updateTodoDto);
      return res.status(200).json({ message: "Todo updated successfully!" });
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: err?.message || "Server error occurred" });
    }
  }

  @Delete(":id")
  async remove(@Res() res, @Param("id") id: string) {
    try {
      await this.todoService.remove(id);
      return res.status(200).json({ message: "Todo deleted successfully!" });
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: err?.message || "Server error occurred" });
    }
  }
}
