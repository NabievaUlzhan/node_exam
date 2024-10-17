const express = require('express')
const prisma = require('../prisma/client')
const router = express.Router()

router.get('', async (req, res) => {
    try {
        const members = await prisma.member.findMany({
            include:{
                Coach: true,
            }
        })
        res.json(members)
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try{
        const members = await prisma.member.findUnique({
            where: {
                id: +id
            },
            include:{
                Coach: true,
            }
        })    
        res.status(201).json(members)
    }catch (error) {
        res.status(400).json({error: error})
    }
})

router.post('', async (req, res) => {
    const {name, email, sport_type} = req.body
    try {
        const members = await prisma.member.create({data: {
            name: name,
            email: email,
            sport_type: sport_type,
        }})
        res.status(201).json(members)
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.put('/:id', async (req, res)=>{
    const {id} = req.params
    const {name, email, sport_type} = req.body
    try{
        const members = await prisma.member.update({
            where:{
                id: +id,
            },
            data:{
                name: name,  
                email: email,
                sport_type: sport_type,
            }
        })
        res.status(201).json(members)
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.delete('/:id', async (req, res)=>{
    const {id} = req.params
    try{
        await prisma.member.delete({
            where:{
                id: +id,
            },
        })    
        res.json(204).send()
    } catch (error) {
        res.status(400).json({error: error})
    }
})


module.exports = router

