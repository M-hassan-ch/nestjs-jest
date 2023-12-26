import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: { id: id }
        });
    }

    async create(user: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    async update(id: number, user: Partial<User>): Promise<User | undefined> {
        await this.userRepository.update(id, user);
        return this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async remove(id: number): Promise<User | undefined> {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException("User not found");
        }
        else {
            await this.userRepository.delete(id);
        }

        return user
    }
}
