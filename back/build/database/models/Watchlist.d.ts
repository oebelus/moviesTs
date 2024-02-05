import { Model } from 'sequelize-typescript';
import Human from "./Human.js";
export default class Watchlist extends Model {
    id: number;
    title: string;
    year: string;
    runtime: string;
    type: string;
    poster: string;
    creationDate: Date;
    updateOn: Date;
    humanId: number;
    human: Human;
}
