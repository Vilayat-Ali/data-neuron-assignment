import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false, default: false })
  isCompleted: boolean;

  @Prop({
    required: false,
    default: Date.now().toString(),
  })
  createdAt: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
