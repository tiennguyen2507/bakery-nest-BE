import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => {
      return mongoose
        .connect(
          'mongodb+srv://tiennguyen2507:tien123@cluster0.7pasb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        )
        .then((value) => {
          console.log('connect sussess');
          return value;
        });
    },
  },
];
