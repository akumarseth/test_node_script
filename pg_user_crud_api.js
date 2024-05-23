

// User Table

app.get('/users', async(req, res) => {
    get_users()
})

  function get_users(){
    const read_dataQuery = `SELECT id, username, email
    FROM react_schema.user;`;
  
    try {
      const result = await db_constructor.query(read_dataQuery);
      console.log("Read the existing Data!");
      console.log(result.rows);
      res.status(200).send(result.rows)
  
    } catch (error) {
      console.log("Failed to read the existing Data", error);
    }
  }