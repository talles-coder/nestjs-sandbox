import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExpensesController } from './expense.controller';
import { Expense } from './expense.model';
import { ExpenseService } from './expense.service';;

@Module({
  imports: [
  SequelizeModule.forFeature([Expense]),],
  controllers: [ExpensesController],
  providers: [ExpenseService],
  exports: [ExpenseService]
})
export class ExpenseModule {}
