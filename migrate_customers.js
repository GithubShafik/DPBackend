import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
    host: process.env.PG_DB_HOST || "localhost",
    user: process.env.PG_DB_USER_NAME || "root",
    password: process.env.PG_DB_PASSWORD || "",
    database: process.env.PG_DB_NAME || "eforum",
};

async function migrate() {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log("Connected to database.");

        const tablesToAlter = [
            { table: "Customers", column: "CID", type: "CHAR(36)" }
        ];

        for (const item of tablesToAlter) {
            console.log(`Altering ${item.table}.${item.column} to ${item.type}...`);
            await connection.execute(`ALTER TABLE ${item.table} MODIFY COLUMN ${item.column} ${item.type}`);
            console.log(`✅ Success: ${item.table}.${item.column} updated.`);
        }

    } catch (error) {
        console.error("❌ Migration failed:", error.message);
    } finally {
        if (connection) await connection.end();
    }
}

migrate();
