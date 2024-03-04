import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CountDocument = HydratedDocument<Count>;

@Schema()
export class Count {
  @Prop({
    required: false,
    default: 0,
  })
  ADD: number;

  @Prop({
    required: false,
    default: 0,
  })
  UPDATE: number;

  @Prop({
    required: false,
    default: 0,
  })
  DELETE: number;
}

export const CountSchema = SchemaFactory.createForClass(Count);
