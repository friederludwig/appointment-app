import { DataSource } from 'typeorm';
import { AppointmentEntity } from '../../entities/appointment.entity';
import { UserEntity } from '../../entities/user.entity';
import { BranchEntity } from '../../entities/branch.entity';

export const DatabaseProvider = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [AppointmentEntity, UserEntity, BranchEntity],
      synchronize: true,
    });

    return dataSource.initialize();
  },
};
