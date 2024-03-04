import { Module } from '@nestjs/common';
import { CountService } from './count.service';
import { CountController } from './count.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Count, CountSchema } from './models/count.model';

@Module({
  exports: [CountModule, CountService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Count.name,
        schema: CountSchema,
      },
    ]),
  ],
  controllers: [CountController],
  providers: [CountService],
})
export class CountModule {}
