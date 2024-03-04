import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Count } from './models/count.model';
import { Model } from 'mongoose';

@Injectable()
export class CountService {
  constructor(
    @InjectModel(Count.name) private readonly countModel: Model<Count>,
  ) {}

  public async seedCollection() {
    try {
      const existingDoc = await this.countModel.find();

      if (existingDoc.length !== 0) {
        console.log('Collection already exists: Omitting seeding process');
        return;
      }

      await this.countModel.create({
        ADD: 0,
        UPDATE: 0,
        DELETE: 0,
      });

      console.log('Database seeding completed!');
    } catch (err: any) {
      console.error(err);
      process.exit(1);
    }
  }

  public updateCount(field: string): Promise<any> {
    return this.countModel.findOneAndUpdate({
      $inc: {
        [field]: 1,
      },
    });
  }

  public fetchOperationCount() {
    return this.countModel.findOne({}, { _id: 0 });
  }
}
