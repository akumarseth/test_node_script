const { Client } = require("pg");

const user_db_connection =
    "postgres://postgres:ind123@localhost:5432/akhil_db";
const db_constructor = new Client({ connectionString: user_db_connection });


async function connectDatabase() {
    try {
        await db_constructor.connect();
        console.log("Database Connection is Successful!");
    } catch (error) {
        console.log("Failed to connect to the database:", error);
    }
}

async function saveProducts(body) {
    // try {
        const insert_newProductDataQuery = `INSERT INTO react_schema.product (product_name, description, exp_date)
     VALUES ($1, $2, $3);`;
        const result = await db_constructor.query(insert_newProductDataQuery, [
            body.name,
            body.description,
            body.date,
        ]);
        console.log(result)
        return result
    // } catch (error) {
    //     console.log("Failed to insert new product Data", error);
    //     return error
    // }
}


async function readProductById(productId) {
    try {
        const read_existingProductDataQuery = `SELECT * FROM react_schema.product where id= ${productId};`;
        const result = await db_constructor.query(read_existingProductDataQuery);
        return result.rows
    } catch (error) {
        console.log("Failed to read the existing Data", error);
    }
}


async function readProducts() {
    const read_ProductDataQuery = `SELECT id, product_name, description, exp_date
    FROM react_schema.product;`;

    try {
        const result = await db_constructor.query(read_ProductDataQuery);
        return result.rows
    } catch (error) {
        console.log("Failed to read the existing Data", error);
    }
}

module.exports = {
    connectDatabase,
    readProducts,
    readProductById,
    saveProducts
}