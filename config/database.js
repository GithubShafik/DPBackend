import sequelize from "./MySqldbconfig.js";
import { models } from "../DatabaseSchema/models/models.js";
import { DestroyFromDataBase, SaveToDataBase, UpsertInDataBase } from "../DatabaseSchema/repository/generic.js";

import { DataTypes } from "sequelize";




const db = {
    sequelize,
    models: models(sequelize,DataTypes),
    DestroyFromDataBase, SaveToDataBase, UpsertInDataBase
}

export default db