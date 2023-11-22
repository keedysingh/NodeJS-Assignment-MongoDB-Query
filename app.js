const express=require("express");
const app=express();
var {MongoClient} = require('mongodb');
const objectId=require('mongodb').ObjectId

let coll;

const cl = new MongoClient("mongodb://localhost:27017");
    async function run() {
      try {
        await cl.connect();
        const dbs = cl.db("node-assigment");
         coll = dbs.collection("movies");
       
        
      } catch (ex) {
        console.log("Error: " + ex);
      } finally {
        app.listen(3500,()=>{
          console.log(`server listing on port 3500`);
        })
      }
    }
    run().catch(console.dir);
  
    async function getAlldata(){
      const cur = coll.find({}, {});

        let items = [];
        await cur.forEach(function(doc){
          items.push(doc);
        });
        return JSON.stringify(items);
    }
    app.get('/getData',async(req,res)=>{
      res.end(await getAlldata());
    })

    app.get('/getName',async(req,res)=>{
      const cur = await coll.findOne({name:"Tiger"});
          console.log(cur);
        // let items = [];
        // await cur.forEach(function(doc){
        //   items.push(doc);
        // });
        res.end(JSON.stringify(cur));
    })
    app.get('/getHighestRate',async(req,res)=>{
      const cur = await coll.find({},{}).sort({"rating":-1}).limit(3);
          // console.log(cur);
        let items = [];
        await cur.forEach(function(doc){
          items.push(doc);
        });
        res.end(JSON.stringify(items));
    })
    app.get('/updateAchievements',async(req,res)=>{
      const cur = await coll.updateOne({"rating":"4"},{$set:{"achievements":'Super Hit'}},{})
          console.log(cur);
        // let items = [];
        // await cur.forEach(function(doc){
        //   items.push(doc);
        // });
        res.end(`modified row:${cur.modifiedCount}`);
    })
    app.get('/updateAchievements',async(req,res)=>{
      const cur = await coll.updateOne({"rating":"4"},{$set:{"achievements":'Super Hit'}},{})
          console.log(cur);
        // let items = [];
        // await cur.forEach(function(doc){
        //   items.push(doc);
        // });
        res.end(`modified row:${cur.modifiedCount}`);
    })
    app.get('/getAchievements',async(req,res)=>{
      const cur = await coll.find({"achievements":{$exists:true}});
          // console.log(cur);
        let items = [];
        await cur.forEach(function(doc){
          items.push(doc);
        });
        res.end(JSON.stringify(items));
    })
  

