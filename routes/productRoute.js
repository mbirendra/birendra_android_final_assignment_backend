const express= require("express");
const { models } = require("mongoose");
const Product = require('../models/productModel');
const router= express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {getProductCode} = require('../utils/utils');

router.post('/product/insert', upload.single('pimage'),auth.verifyUser,auth.verifyAdmin, function(req,res){
    
    if(req.file == undefined){
        return res.status(400).json({message : "Invalid File Format"});
    }
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const pprice = req.body.pprice;
   const pimage = req.file.path;

    const discount = parseInt(req.body.discount);
    const availableStock = parseInt(req.body.availableStock);
    const pBrand=req.body.brand;
    const category = req.body.category;



   
    if(availableStock<0)
    {
        return res.status(202).json({"status":false,"message":"Available stock should be greater than 0"});
    }
    else if(pprice < 0)
    {
        return res.status(202).json({"status":false,"message":"Price should be greater than 0"});
    }
    else
    {
        let newPrice = 0;
        let discountedPrice = 0;
        if(discount > 0)
        {
            discountedPrice =  parseInt((discount/100)*pprice);
            newPrice = pprice - discountedPrice;
        }
        Product.find({}).then((data)=>
        {
            let productCode = getProductCode(data);
            const pdata = new Product({pname : pname, pdesc : pdesc, pprice : pprice,availableStock:availableStock,sold:0,productCode:productCode,pBrand:pBrand,discount:discount,newPrice:newPrice,discountedAmount:discountedPrice,onSale:false,category:category,pimage:pimage})
            pdata.save()
            .then(function(result){
            res.status(200).json({success:true,message : "inserted!!"}) 
            })
            .catch (function(e){
                console.log(e)
            res.status(500).json({ error : e, message: "naro"})
        })
        })
        

        }
    
    
})



//update 

router.post('/product/update',upload.single("pimage"),auth.verifyUser,auth.verifyAdmin,function(req,res){
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const pprice = req.body.pprice;
    const pimage = req.file.path;
    const id = req.body.id;
    const availableStock = parseInt(req.body.availableStock);
    const discount = parseInt(req.body.discount);
    
    const pBrand = req.body.brand;
    const onSale = req.body.onSale;
    if(req.file == undefined)
    {
        return res.status(202).json({"success":false,"message":"Inappropriate file format!!"})
    }
    Product.findOne({"_id":id}).then((data)=>{
        if(data!=null)
        {
            let previousDiscount = data.discount;
            let discountedPrice = data.discountedAmount;
            let newPrice = data.newPrice;
            let originalPrice = data.pprice;
            
            if((previousDiscount != discount && discount >= 0) || (pprice!=originalPrice))
            {
                if(pprice!=originalPrice)
                {
                    discountedPrice =  parseInt((discount/100)*pprice);
                    newPrice = pprice - discountedPrice;
                }
                else
                {
                    discountedPrice =  parseInt((discount/100)*originalPrice);
                    newPrice = pprice - discountedPrice;
                }
            }
            Product.updateOne({_id : id},{
                pname : pname,
                pdesc : pdesc,
                pprice : pprice,
                availableStock:availableStock,
                newPrice:newPrice,
                discount:discount,
                discountedAmount:discountedPrice,
                pBrand:pBrand,
                onSale:onSale,
                pimage:pimage
            })
            .then(function(result){
                res.status(200).json({success:true,message : "updated!!" })
            }).catch((err)=>{
                res.status(404).json({"success":false,"message":err});
            })
        
            .catch(function(e){
                res.status(500).json({ error : e })
            })
        }
    })
    
})

//delete
router.delete('/product/delete/:id',auth.verifyUser,auth.verifyAdmin, function(req,res){
    const id = req.params.id;
    Product.deleteOne({_id : id})
    .then(function(result){
       return res.status(200).json({message : "id deleted!!" ,"success":true})
    })
    .catch(function(e){
       return  res.status(500).json({ error : e })
    })           
})

router.post('/product/showall',function(req,res){
    console.log("Done")
    var category = req.body.category;

    Product.find({"availableStock":{$gt:0},"category":category})
    .then(function(data){
        if(data.length>0)
        {
            res.status(200).json({"success":true,"data":data,"message":"Found"});
        }
        else
        {
            res.status(202).json({"success":false,"data":data,"message":"No Data found"});
        }
    })
    .catch(function(e){
        res.status(500).json({success:false,message : e})
    })
})

router.get('/product/showallProduct',function(req,res){
    
    
    Product.find({})
    .then(function(data){
        if(data.length>0)
        {
            res.status(200).json({"success":true,"data":data,"message":"Found"});
        }
        else
        {
            res.status(202).json({"success":false,"data":data,"message":"No Data2 found"});
        }
    })
    .catch(function(e){
        res.status(500).json({success:false,message : e})
    })
})

router.get('/product/single/:id',function(req,res){
    const id = req.params.id;
    Product.findOne({_id : id})
    .then(function(data){
        res.status(200).json({success:true,data:data,message:"Found"});
    })
    .catch(function(e){
        res.status(500).json({error : e,success:false})
    })
})














module.exports = router;