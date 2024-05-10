const {Client} = require('pg')

const pg_conn_str = "postgres://postgres:ind123@localhost:5432/akhil_db"

console.log('welcome to the node script')

const con = new Client({connectionString:pg_conn_str})

async function connectdb(){
    try {
        await con.connect()
        console.log('db connection is successful')
    } 
    catch (error) {
        console.log(error)
    }    
}

async function create_table(){
    const create_table = `CREATE TABLE react_schema.product (
        id SERIAL PRIMARY KEY,
        product_name VARCHAR(100) NOT NULL,
        description TEXT,
        exp_date DATE
    );`

    try {
        await con.query(create_table)
        console.log('table has been created')
    } catch (error) {
        console.log(error)
    }
    
}

function main(){
    console.log("in main function")
    connectdb()
    create_table()
    // insert_data()
    // read_data()
    // update_data()
    // delete_data()
}

main()