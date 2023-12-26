import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import User from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User | undefined> {
        return this.userService.findOne(parseInt(id, 10));
    }

    @Post()
    async create(@Body() user: Partial<User>): Promise<User> {
        return this.userService.create(user);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() user: Partial<User>): Promise<User | undefined> {
        return this.userService.update(parseInt(id, 10), user);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<User> {
        return this.userService.remove(parseInt(id, 10));
    }

}
