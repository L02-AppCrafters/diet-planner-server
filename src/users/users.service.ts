import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(email: string, hashedPassword: string): Promise<User> {
    const user = this.userRepository.create({ email, password: hashedPassword });
    return this.userRepository.save(user);
  }

  async updateRefreshToken(userId: string, hashedRefreshToken: string | null): Promise<void> {
    await this.userRepository.update(userId, { refreshToken: hashedRefreshToken });
  }

  async updateProfile(userId: string, dto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(userId, dto);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
