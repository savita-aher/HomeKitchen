import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

// GET all menu items
let getAll = async (req, res) => {
  let menu = await db.collection("menu");
  let result = await menu.find({}).limit().toArray();
  res.json(result);
};

export default{getAll};