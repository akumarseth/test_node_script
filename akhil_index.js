const { Client } = require("pg");

const user_db_connection =
  "postgres://postgres:ind123@localhost:5432/akhil_db";
const db_constructor = new Client({ connectionString: user_db_connection });

async function connectDatabase() {
  try {
    // 1. Can we use this line here? Doubt! 2. How to connect to Abhishek Database?
    // Here new Client is a constructor, Can we change Client to other preferred name? or it is mandatory? Why?
    await db_constructor.connect();
    console.log("Database Connection is Successful!");
    // await db_constructor.end();  This code says recommended. Is it is correct? or not required?
  } catch (error) {
    console.log("Failed to connect to the database:", error);
  }
}

// In the Create New Table Function - const create_newTable_query (Do we have to place this code above the try/await?)
async function create_newTable() {
  const create_newTableQuery = `CREATE TABLE if not exists react_schema.product (
        id SERIAL PRIMARY KEY,
        product_name VARCHAR(100) NOT NULL,
        description TEXT,
        exp_date DATE
    );`;

  try {
    await db_constructor.query(create_newTableQuery);
    console.log("Table Created!");
  } catch (error) {
    console.log("Failed to create New Table", error);
  }
}

async function insert_newProductData(productName, description, expDate) {
  const insert_newProductDataQuery = `INSERT INTO react_schema.product (product_name, description, exp_date)
  VALUES ($1, $2, $3);`;

  try {
    await db_constructor.query(insert_newProductDataQuery, [
      productName,
      description,
      expDate,
    ]);
    console.log("New Product Data Inserted!");
  } catch (error) {
    console.log("Failed to insert new product Data", error);
  }
}

async function read_existingProductData() {

  const read_existingProductDataQuery = `SELECT id, product_name, description, exp_date
  FROM react_schema.product;`;

  try {
    await db_constructor.connect();
    const result = await db_constructor.query(read_existingProductDataQuery);
    console.log("Red the existing Data!");
    console.log(result.rows);
  } catch (error) {
    console.log("Failed to read the existing Data", error);
  }
  finally{
    db_constructor.end()
  }
}

async function update_existingProductData(product_id, product_name, product_description) {
//   const update_existingProductDataQuery = `UPDATE react_schema.product SET product_name = '${product_name}'  WHERE id = ${product_id}`;
//   console.log(update_existingProductDataQuery)
  const update_existingProductDataQuery = `UPDATE react_schema.product 
  SET product_name = $1,   
  description = $2
  WHERE id = $3;`;

  try {
    const result = await db_constructor.query(update_existingProductDataQuery, [
        product_name,
        product_description,
        product_id
    ]);

    if (result.rowCount > 0) {
      console.log("Updated existing data successfully!");
    } else {
      console.log("No data updated. Check if the product ID exists.");
    }
  } catch (error) {
    console.log("Failed to update existing Data", error);
  }
}

async function delete_existingProductData(product_id) {
  const delete_existingProductDataQuery = `DELETE FROM react_schema.product WHERE id = $1;`;

  try {
    const result = await db_constructor.query(delete_existingProductDataQuery, [
        product_id,
    ]);
    if (result.rowCount > 0) {
      console.log("Deleted existing data successfully!");
    } else {
      console.log("No data deleted. Check if the product ID exists.");
    }
  } catch (error) {
    console.log("Failed to delete existing Data", error);
  }
  finally{

  }
}

async function main() {
  // Can we use async everywhere?
  console.log("Main Function is getting executed!");
//   await connectDatabase();
//   await create_newTable();
//   await insert_newProductData("Green Tea", "A soothing blend of organic green leaves.","2024-12-31");
  await read_existingProductData();
//   await update_existingProductData(3, "Green Tea updated 3", "description update");
//   await delete_existingProductData(3);
//   await read_existingProductData();

}

main();
