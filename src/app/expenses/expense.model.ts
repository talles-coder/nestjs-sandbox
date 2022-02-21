import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Expense extends Model<Expense> {

    // TODO = Add column : expenseID

    @Column({
        type: DataType.STRING(60),
        allowNull: false
    })
    @ApiProperty({
        description: 'username responsible for this expense',
        example: "joaopaulo@outlook.com",
    })
    @IsNotEmpty()
    user : string;   
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    @ApiProperty({
        description: 'Reference for this expense',
        example: "Credit Card bill"
    })
    @IsNotEmpty()
    title : string;
    
    @Column({
        type: DataType.DECIMAL(65, 2),
        allowNull: false,
        
    })
    @ApiProperty({
        description: 'Monthly amount of expense',
        example: "90099 (for represent R$ 900.99)"
    })
    @IsNotEmpty()
    installmentValue : number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    @ApiProperty({
        description: 'Current month installment index',
        example: "15"
    })
    @IsNotEmpty()
    installmentNumber : number;
    
    
    @Column({
       type: DataType.DATE,
       allowNull: false 
    })
    @ApiProperty({
        description: 'First installment date',
        example: "1995-12-17T03:24:00"
    })
    @IsNotEmpty()
    installmentStartDate : Date;

}