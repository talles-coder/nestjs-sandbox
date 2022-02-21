import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/updated-user.dto';
import { Users } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('api/v1/users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get()
    @ApiOperation({ summary : "Get all users from database" })
    @ApiResponse({ status : 200, description : "All users found successfully!"})
    async getAllUsersRegistered() {
        return this.userService.findAll()
    }

    @Post()
    @ApiOperation({ summary : "Register user in database" })
    @ApiResponse({ status : 201, description : "user registered successfully!"})
    async registerNewUser(@Body() body: Users ) {
        return this.userService.create(body)
    }

    @Get(':email')
    @ApiOperation({ summary : "Search user by email" })
    @ApiResponse({ status : 200, description : "Username deleted successfully"})
    async getOneUser(@Param('email') email: string) {
        return this.userService.findOneOrFail(email)
    }

    @Put(':email')
    @ApiOperation({ summary : "Update name and last name by email" })
    @ApiResponse({ status : 200, description : "Username update successfully"})
    async updateUserName(
        @Param('email') email: string, 
        @Body() body : UpdateUserDto
    ){
        return this.userService.update(email, body);
    }

    @Delete(':email')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary : "Delete user by email" })
    @ApiResponse({ status : 204, description : "Username deleted successfully"})
    async deleteUser(@Param('email') email: string) {
        return this.userService.destroy(email)
    }
}
