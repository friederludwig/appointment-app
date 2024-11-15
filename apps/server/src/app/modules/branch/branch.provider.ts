import { DataSource } from 'typeorm';
import { BranchEntity } from '../../entities/branch.entity';

export const branchProvider = [
  {
    provide: 'BRANCH_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(BranchEntity),
    inject: ['DATA_SOURCE'],
  },
];
