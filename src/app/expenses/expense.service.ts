import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Expense } from "../../app/expenses/expense.model";

@Injectable()
export class ExpenseService {
    constructor(
        @InjectModel(Expense)
        private expenseModel: typeof Expense
    ) {}

    async getAll(): Promise<Expense[]> {
        return this.expenseModel.findAll();
    }

    async getOne(id: number): Promise<Expense> {
        return this.expenseModel.findOne({where: {id: id}});
    }
    
    async create(expense: Expense) {
        this.expenseModel.create(expense);
    }

    async replace(expense: Expense): Promise<[number, Expense[]]>{
        return this.expenseModel.update(expense, {
            where: {
                id : expense.id,
            }
        });
    }

    async update(expense: Expense): Promise<[number, Expense[]]>{
        return this.expenseModel.update(expense, {
            where: {
            id : expense.id,
            }
        });
    }

    async delete(id: number): Promise<void>{
        const expense: Expense = await this.getOne(id);
        expense.destroy();
    }

    async getAllFixedRevenues(expense: Expense): Promise<Expense[]>{
      
        try {
            const stateQuery = await this.expenseModel.findAll({raw: true,where: { user : expense.user}});
            return stateQuery
        } catch (e) {
            throw new NotFoundException(e.message);
        }
      }
      //TODO - fill dashboard functions;
    
    // export async function getDashboardData(req,res) {
    //   const { user } = req.body
      
    //   try {
    //     // Relação de contas no total por contas em aberto
    
    //     const userExpenses = await getUserExpenses(user)
    //     const userRevenue = await getUserRevenue(user)
        
    //     const dashboard = {}
        
    //     const totalBills = Object.values(userExpenses).length
    //     const closedBills = Object.values(userExpenses).filter((expense)=>{ return expense.status == true }).length
        
    //     dashboard["ratio"] = { closedBills, totalBills }
        
    //     // Contas que vencem esta semana
        
    //     // Contas que já venceram
    
    //     // Total da renda deste mês
    
    //     // Gasto deste mês
    
    //     // Guardado este Mês
    
    
    //     console.log(dashboard)
    //     res.send("Valores encontrados com sucesso para o usuário : " + user)
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //     res.send("Erro getAllFixedRevenues()")
    //   }
}