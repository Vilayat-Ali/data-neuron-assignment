import { IsOptional } from 'class-validator';

export class CreateTodoDto {
  title: string;

  @IsOptional()
  description: string;
}
