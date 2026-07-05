const express=require('express')
const router= express.Router();
const db=require('../db');
const verifyToken=require('../middleware/verifyToken')

//Get All Products
router.get('/',verifyToken,(req,res)=>{
    // Standardized USERID to user_id to resolve schema mismatch
    const query='SELECT * FROM PRODUCTS WHERE user_id= ?'
    db.query(query,[req.userId],(err,result)=>{
        if(err){
            return res.status(500).json({message: 'Server error'})
        }
        res.json(result)
    })
})

//AddProduct
// Added verifyToken middleware to authenticate users and obtain req.userId
router.post('/',verifyToken,(req,res)=>{
    const {name,category,quantity,price}=req.body;
    const query='INSERT INTO PRODUCTS (name,category,quantity,price,user_id) values (?,?,?,?,?)'
    db.query(query,[name,category,quantity,price,req.userId],(err,result)=>{
        if(err){
            return res.status(500).json({message: "Server Error"})
        }
        return res.status(201).json({message:'Product added Successfully'})
    })
}) 

//Update Product
// Added verifyToken middleware and replaced hardcoded userId 1 with req.userId
router.put('/:id',verifyToken, (req, res) => {
  const { name, category, quantity, price } = req.body
  const query = 'UPDATE products SET name=?, category=?, quantity=?, price=? WHERE id=? AND user_id=?'
  db.query(query, [name, category, quantity, price, req.params.id, req.userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error' })
    res.json({ message: 'Product updated successfully' })
  })
})

//Delete product
// Added verifyToken middleware and replaced hardcoded userId 1 with req.userId
router.delete('/:id',verifyToken, (req, res) => {
  const query = 'DELETE FROM products WHERE id=? AND user_id=?'
  db.query(query, [req.params.id, req.userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error' })
    res.json({ message: 'Product deleted successfully' })
  })
})
module.exports = router;