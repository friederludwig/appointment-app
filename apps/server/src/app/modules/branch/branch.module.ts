import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../db/database.module';
import { BranchController } from './branch.controller';
import { branchProvider } from './branch.provider';
import { BranchService } from './branch.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [BranchController],
  providers: [BranchService, ...branchProvider],
  exports: [BranchService, ...branchProvider],
})
export class BranchModule {}
