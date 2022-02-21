import { AutoIncrement, BeforeCreate, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { hashSync } from 'bcrypt'
import { ApiProperty } from "@nestjs/swagger";

@Table
export class Users extends Model<Users>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    @ApiProperty({
        description: 'id for this user, need be passed manualy',
        example: "4566501",
    })
    id : Number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    @ApiProperty({
        description: 'First name of the user',
        example: 'João or Paula',
    })
    firstName : string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    @ApiProperty({
        description: 'Last name of the user',
        example: 'Silva',
    })
    lastName : string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    @ApiProperty({
        description: 'Email of the user',
        example: 'paulasilva@gmail.com',
    })
    email : string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    @ApiProperty({
        description: 'Password for login, need have capital character, lowercase character, at least one number and one special character',
        example: 'Paula@2022',
    })
    password : string;
    
    @CreatedAt
    @ApiProperty({
        description: 'Database timestamp of creation date',
        example: '30122022T23:59:59',
    })
    createdAt : string;
    
    @UpdatedAt
    @ApiProperty({
        description: 'Database timestamp of update date',
        example: '30122022T23:59:59',
    })
    updatedAt : string;
}