import Top from "./Top.js"
import Watched from "./Watched.js"
import Watchlist from "./Watchlist.js"
import { Model, Table, Column, DataType, CreatedAt, UpdatedAt,
ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
'use strict';

@Table({
    tableName: "humans",
  })
export default class Human extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    })
    id!: number;

    @Column({
        type: DataType.STRING,
    })
    username!: string;

    @Column({
        type: DataType.STRING,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
    })
    password!: string;

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

    @HasMany(() => Watched)
    watched!: Watched[]

    @HasMany(() => Top)
    top!: Top[]

    @HasMany(() => Watchlist)
    watchlist!: Watchlist[]
}
  
