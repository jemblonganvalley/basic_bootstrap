const express = require("express")
const path = require("path")
const fs  = require("fs")
const upload_middeware = require("../libs/upload_service")
const conn = require("../prisma/conn")
require("dotenv").config()
const moment = require("moment")

const post_route = express.Router()

//create post
post_route.post("/post_create", upload_middeware.single("photo") ,async(req,res)=>{
    try {
        const file  = await req.file
        const {title, author, content} = await req.body
        const createPost = await conn.post.create({
            data : {
                title : title,
                author : author,
                content : content,
                filelocation : `/upload/${file.filename}`
            }
        })

        res.redirect("/?success=true")

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
})

post_route.get("/post_read", async(req,res)=>{
    try {
        const result = await conn.post.findMany({
            orderBy : {
                createdAt : "desc"
            }
        })
        res.status(200).json({
            success : true,
            query : result
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
})

module.exports = post_route