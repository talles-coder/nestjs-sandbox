import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/app/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { jwtStrategy } from './strategies/jwt.strategy';
import { ExpenseModule } from 'src/app/expenses/expense.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ExpenseModule,
        UsersModule,
        PassportModule,
        JwtModule.register({
            privateKey: process.env.JWT_PRIVATE_KEY,
            publicKey: process.env.JWT_PUBLIC_KEY,
            signOptions: {expiresIn: '300s'}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, jwtStrategy]
})
export class AuthModule {}
