import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('api/auth/')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiOperation({ summary : "Request login on api" })
    @ApiResponse({ status : 200, description : "login successfully"})
    @ApiResponse({ status : 401, description : "Incorrect password or email"})
    async login(@Req() req: any) {
        return await this.authService.login(req.user);
    }
}
