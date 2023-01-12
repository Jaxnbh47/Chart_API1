import express, { Router, Request, Response } from "express";
import { request } from "http";
import { Item } from "./item";

//hard code some data

let itemArray: Item[] = [
  { id: 1, quantity: 20, price: 15, product: "Eggs" },
  { id: 2, quantity: 40, price: 20, product: "Game" },
  { id: 3, quantity: 60, price: 13, product: "Subway" },
  { id: 4, quantity: 80, price: 4, product: "Sandwich" },
  { id: 5, quantity: 100, price: 3, product: "milk" },
];

export const itemRouter = Router();

//CRUD Functions *Create or post *Read or getting everything or just by ID *Update *Delete

itemRouter.get("/", async (req: Request, res: Response): Promise<Response> => {
  if (req.query.maxPrice !== undefined) {
    let underArray = itemArray.filter(
      (x) => x.price <= Number(req.query.maxPrice)
    );
    return res.status(200).json(underArray);
  } else if (req.query.prefix !== undefined) {
    let startsWithArray = itemArray.filter((x) =>
      x.product.startsWith(String(req.query.prefix))
    );
    return res.status(200).json(startsWithArray);
  } else if (req.query.pageSize !== undefined) {
    let itemsByPageSizeLimit = itemArray.slice(0, Number(req.query.pageSize));
    return res.status(200).json(itemsByPageSizeLimit);
  } else {
    return res.status(200).json(itemArray);
  }
});

itemRouter.get(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let itemIWantToFind = itemArray.find((x) => x.id === Number(req.params.id));

    if (itemIWantToFind === undefined) {
      return res.status(404).send("ID not found");
    } else {
      return res.status(200).json(itemIWantToFind);
    }
  }
);

itemRouter.post("/", async (req: Request, res: Response): Promise<Response> => {
  let newItem: Item = {
    id: GetNextId(),
    product: req.body.product,
    price: req.body.price,
    quantity: req.body.quantity,
  };

  itemArray.push(newItem);
  return res.status(201).json(newItem);
});

function GetNextId() {
  //... are the spread opperator math.max doesnt use a array so this fixes that
  return Math.max(...itemArray.map((x) => x.id)) + 1;
}

itemRouter.put("/:id", async (req: Request, res: Response): Promise<Response> => {
    let itemFound= itemArray.find((x) => x.id === Number(req.params.id));

    if (itemFound !== undefined) {
        itemFound.price = req.body.price,
        itemFound.product = req.body.product,
        itemFound.quantity = req.body.quantity

        return res.status(200).json(itemFound)
    } else {
        return res.status(404).send("Item not found")
    }
    
  });