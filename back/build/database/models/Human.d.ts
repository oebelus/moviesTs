import Top from "./Top.js";
import Watched from "./Watched.js";
import Watchlist from "./Watchlist.js";
import { Model } from 'sequelize-typescript';
export default class Human extends Model {
    id: number;
    username: string;
    email: string;
    password: string;
    creationDate: Date;
    updateOn: Date;
    watched: Watched[];
    top: Top[];
    watchlist: Watchlist[];
}
