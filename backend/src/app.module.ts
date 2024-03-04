import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CountModule } from './count/count.module';
import { CountService } from './count/count.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    TodoModule,
    CountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly countService: CountService) {}

  async onApplicationBootstrap() {
    await this.countService.seedCollection();
  }
}
