var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Model, Table, Column, DataType, CreatedAt, UpdatedAt, BelongsTo, ForeignKey } from 'sequelize-typescript';
import Human from "./Human.js";
'use strict';
let Watched = class Watched extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Watched.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.STRING,
    })
], Watched.prototype, "title", void 0);
__decorate([
    Column({
        type: DataType.STRING,
    })
], Watched.prototype, "year", void 0);
__decorate([
    Column({
        type: DataType.STRING,
    })
], Watched.prototype, "runtime", void 0);
__decorate([
    Column({
        type: DataType.STRING,
    })
], Watched.prototype, "type", void 0);
__decorate([
    Column({
        type: DataType.STRING,
    })
], Watched.prototype, "poster", void 0);
__decorate([
    CreatedAt,
    Column({
        type: DataType.DATE,
    })
], Watched.prototype, "creationDate", void 0);
__decorate([
    UpdatedAt,
    Column({
        type: DataType.DATE,
    })
], Watched.prototype, "updateOn", void 0);
__decorate([
    ForeignKey(() => Human),
    Column({
        type: DataType.INTEGER,
    })
], Watched.prototype, "humanId", void 0);
__decorate([
    BelongsTo(() => Human)
], Watched.prototype, "human", void 0);
Watched = __decorate([
    Table({
        tableName: "watched",
    })
], Watched);
export default Watched;
//# sourceMappingURL=Watched.js.map