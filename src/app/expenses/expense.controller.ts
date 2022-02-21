import { Body, Controller, Delete, Get, HttpCode, Injectable, NotFoundException, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Expense } from './expense.model';
import { ExpenseService } from "./expense.service";

@ApiTags('Expenses')
@Controller("/api/v1/expenses")
@UseGuards(AuthGuard('jwt'))
export class ExpensesController {

    constructor(private expensesService: ExpenseService){}

    @Get()
    @ApiOperation({ summary : "Returns an array of all user expenses" })
    @ApiResponse({ status : 200, description : "all expenses returned successfully"})
    async getAllExpenses(@Body() expense: Expense): Promise<Expense[]> {
        try {
            return this.expensesService.getAllFixedRevenues(expense);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Get(":id")
    @ApiOperation({ summary : "Returns one user expense" })
    @ApiResponse({ status : 200, description : "The expense returned successfully"})
    async findOneOrFail(@Param('id') id: number): Promise<Expense> {
        try {
            return this.expensesService.getOne(id);
        } catch (error) {
            throw new NotFoundException(error.message);''
        }
    }
    
    @Post()
    @ApiOperation({ summary : "Creates a new expense to the user" })
    @ApiResponse({ status : 200, description : "Expense successfully registered"})
    async create(@Body() expense: Expense) {
        return this.expensesService.create(expense);
    }

    @Put()
    @ApiOperation({ summary : "re-registers a user expense" })
    @ApiResponse({ status : 200, description : "Expense successfully registered"})
    async replace(@Body() expense: Expense): Promise<[number, Expense[]]> {
        return this.expensesService.update(expense);
    }

    @Patch()
    @ApiOperation({ summary : "Update a user expense" })
    @ApiResponse({ status : 200, description : "Expense successfully updated"})
    async update(@Body() expense: Expense): Promise<[number, Expense[]]> {
        return this.expensesService.update(expense);
    }

    @Delete(":id")
    @ApiOperation({ summary : "Delete a user expense" })
    @ApiResponse({ status : 200, description : "Expense successfully deleted"})
    async delete(@Param('id') id : number): Promise<void> {
        this.expensesService.delete(id);
    }
}