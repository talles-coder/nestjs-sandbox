import { Module } from '@nestjs/common';
import 'dotenv/config'
import { AuthModule } from './auth/auth.module';

console.log(Number(process.env.DB_PORT))
@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
