const express = require('express')
const prisma = require('../prisma/client')
const router = express.Router()

router.get('', async (req, res) => {
    try {
        const classes = await prisma.class.findMany({
            include:{
                Facility: true,
            }
        })
        res.json(classes)
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try{
        const classes = await prisma.class.findUnique({where: {
            id: +id
        },
        include:{
            Facility: true,
        }})
        res.status(201).json(classes)    
    }catch (error) {
        res.status(400).json({error: error})
    }
    
})

router.post('', async (req, res) => {
    const {date, description} = req.body
    try {
        const classes = await prisma.class.create({data: {
            date: date,
            description: description,
        }})
        res.status(201).json(classes)
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.put('/:id', async (req, res)=>{
    const {id} = req.params
    const {date, description} = req.body
    try{
        const classes = await prisma.class.update({
            where:{
                id: +id,
            },
            data:{
                date: date,
                description: description,
            }
        })
        res.status(201).json(classes)
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.delete('/:id', async (req, res)=>{
    const {id} = req.params
    try{
        await prisma.class.delete({
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