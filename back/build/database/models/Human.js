var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Top from "./Top.js";
import Watched from "./Watched.js";
import Watchlist from "./Watchlist.js";
import { Model, Table, Column, DataType, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
'use strict';
let Human = class Human extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    })
], Human.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.STRING,
    })
], Human.prototype, "username", void 0);
__decorate([
    Column({
        type: DataType.STRING,
    })
], Human.prototype, "email", void 0);
__decorate([
    Column({
        type: DataType.STRING,
    })
], Human.prototype, "password", void 0);
__decorate([
    CreatedAt,
    Column({
        type: DataType.DATE,
    })
], Human.prototype, "creationDate", void 0);
__decorate([
    UpdatedAt,
    Column({
        type: DataType.DATE,
    })
], Human.prototype, "updateOn", void 0);
__decorate([
    HasMany(() => Watched)
], Human.prototype, "watched", void 0);
__decorate([
    HasMany(() => Top)
], Human.prototype, "top", void 0);
__decorate([
    HasMany(() => Watchlist)
], Human.prototype, "watchlist", void 0);
Human = __decorate([
    Table({
        tableName: "humans",
    })
], Human);
export default Human;
//# sourceMappingURL=Human.js.map