import express from 'express';
import {PrismaClient} from '@prisma/client';
const app = express();

app.use(express.json());


const client = new PrismaClient();

//CREATE ITEMS
app.post("/items",async (req, res) =>{
const {itemnumber,
      title,
      quantity,
      unitprice,
} = req.body;

try{
const newItem = await client.item.create({
    data: {
        itemnumber: itemnumber,
        title: title,
        quantity : quantity, 
        unitprice: unitprice,
    }
})
console.log(newItem);
res.status(201).json ({message: "Item added succefully", data: newContat});
} catch (e){
    // res.status(500).json({message: "Server error"})
    res.status(500).json({error:e.message})
}
});

// GETING ALL ITEMS
app.get("/items", async (_req, res) =>{
    try{
        const allItems = await client.item.findMany();
        if (allItems.length <= 0) {
            res.status(200).json({message: " Their is no any item"})
        }else{
          res.status(200).json({data:allItems })  
        }
    } catch(e) {
    res.status(500).json ({ message: "getting all items"})
    }
    });

// GETTING SINGLE ITEM

app.get("/items/:itemnumber", async (req, res) =>{
    const itemnumber= req.params.itemnumber;
    try{
        const item = await client.item.findFirst({
            where: {itemnumber: itemnumber},   
        })
        if (!item) {
            res.status(404).json({message: `Item with that ${itemnumber} was not found.`})
        } else {
            res.status(200).json({data:item})
        }
    } catch (e) {
        res.status(500).json ({message: "Server error"})
    }
    })
    
   //UPDATE ITEM
   
   app.patch("/items/:itemnumber", async (req, res) =>{
    const {itemnumber,
        title,
        quantity,
        unitprice,
  } = req.body;
  try{
    if (itemnumber) {
        updatedItem = await client.item.update({
            where: {itemnumber: wantedItemItemnumber},
            data: {itemnumber: itemnumber}
        })
    }
    if (title) {
        updatedItem = await client.item.update({
            where: {itemnumber: wantedItemItemnumber},
            data: {title: title}
        })
    }
    if (quantity) {
        updatedItem = await client.item.update({
            where: {itemnumber: wantedItemItemnumber},
            data: {quantity: quantity}
        })

    } 
    if (unitprice) {
        updatedItem = await client.item.update({
            where: {itemnumber: wantedItemItemnumber},
            data: {unitprice: unitprice}
        })

    }
    res.status(200).json({message: "Item updated successfully", data: updateditem})
  } catch(e){
    res.status(500).json({message:"There was a server error"})
  }
    })
    
    // DELETE AN ITEM

    app.delete("/items/:itemnumber", async (req, res) =>{
        const itemnumber = req.params.itemnumber;
        try{
            await client.item.delete({
                where: {itemnumber: itemnumber}
            })
            res.status(200).json({ message: "contact deleted sucessfully"})
        } catch(e) {
            res.status(500).json({message: "server error"})
        }
        
        })
        


app.listen(4000,() => {
    console.log(`App is running on port 4000`)
})

