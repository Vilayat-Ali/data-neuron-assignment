import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
