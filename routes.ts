import express, {Router, Request, Response} from "express";
import { Item } from "./item";

//hard code some data

let itemArray: Item [] = [
    {id:1, quantity:20, price:15, product: "Eggs"},
    {id:2, quantity:40, price:20, product: "Game"},
    {id:3, quantity:60, price:13, product: "subway"},
    {id:4, quantity:80, price:12, product: "sandwich"},
    {id:5, quantity:100, price:5, product: "milk"}
];

export const itemRouter = Router();

itemRouter.get("/", async (req: Request, res: Response) : Promise<Response> => {
    return res.status(200).json(itemArray);

});