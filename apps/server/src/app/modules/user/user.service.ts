import { User } from '@appointment-app-hdm/api-interfaces';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    const candidate = await this.userRepository.findOne({ where: { email } });

    if (!candidate) {
      throw new NotFoundException(`User with EMAIL ${email} not found`);
    }
    return candidate;
  }
}
