import { Model, Table, Column, DataType, CreatedAt, UpdatedAt,
BelongsTo, ForeignKey } from 'sequelize-typescript';
import Human from "./Human.js"
'use strict';

@Table({
    tableName: "watchlist",
    })
    export default class Watchlist extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;
    
    @Column({
        type: DataType.STRING,
    })
    title!: string;
    
    @Column({
        type: DataType.STRING,
    })
    year!: string;
    
    @Column({
        type: DataType.STRING,
    })
    runtime!: string;

    @Column({
        type: DataType.STRING,
        })
    type!: string;

    @Column({
        type: DataType.STRING,
        })
    poster!: string;

    @CreatedAt
    @Column({
        type: DataType.DATE,
    })
    creationDate!: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
    })
    updateOn!: Date;

    @ForeignKey(() => Human)
    @Column({
        type: DataType.INTEGER,
    })
    humanId!: number;

    @BelongsTo(() => Human)
    human!: Human;
}
          
        