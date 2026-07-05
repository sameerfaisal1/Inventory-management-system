const mysql = require('mysql2');

const db= mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((err)=>{
    if(err){
        console.log("Database connection failed: ", err)
        return;
    }
    console.log('Mysql Connected')

    // Automatically initialize database schema if missing
    const usersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const productsTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        quantity INT NOT NULL DEFAULT 0,
        price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `;

    db.query(usersTableQuery, (err) => {
        if (err) {
            console.error("Error creating users table: ", err.message);
        } else {
            // Create products table after users table to respect foreign key constraint
            db.query(productsTableQuery, (err) => {
                if (err) {
                    console.error("Error creating products table: ", err.message);
                } else {
                    console.log("Database tables verified/initialized successfully.");
                }
            });
        }
    });
})

module.exports=db