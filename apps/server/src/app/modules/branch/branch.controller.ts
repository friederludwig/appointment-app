import { Branch } from '@appointment-app-hdm/api-interfaces';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BranchService } from './branch.service';

@Controller('branches')
export class BranchController {
  constructor(
    private readonly branchService: BranchService,
    private readonly authService: AuthService
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  GetAll() {
    return this.branchService.getAll();
  }

  @Get(':id')
  GetById(@Param('id', ParseIntPipe) id: number) {
    return this.branchService.getById(id);
  }

  @Post()
  async createBranch(
    @Req() req,
    @Body() body: { branch: Partial<Branch> }
  ): Promise<Branch> {
    const branchData = body.branch;
    const token = this.authService.getRequestToken(req.headers.authorization);
    await this.authService.validateOwnership(token, branchData.id, 'branch');
    return this.branchService.create(branchData);
  }

  @Patch(':id')
  async PatchById(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBranch: Partial<Branch>
  ) {
    const token = this.authService.getRequestToken(req.headers.authorization);
    await this.authService.validateOwnership(token, id, 'branch');
    return this.branchService.updateById(id, updateBranch);
  }

  @Delete(':id')
  DeleteById(@Param('id', ParseIntPipe) id: number) {
    return this.branchService.delete(id);
  }
}
