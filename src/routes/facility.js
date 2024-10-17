const express = require('express')
const prisma = require('../prisma/client')
const router = express.Router()

router.get('', async (req, res) => {
    try {
        const facilities = await prisma.facility.findMany({
            include:{
                Schedule: true,
            }
        })
        res.json(facilities)
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try{
        const facilities = await prisma.facility.findUnique({where: {
            id: +id
        },
        include:{
            Schedule: true,
        }})
        res.status(201).json(facilities)    
    }catch (error) {
        res.status(400).json({error: error})
    }
    
})

router.post('', async (req, res) => {
    const {title, address, description, classId} = req.body
    try {
        const facilities = await prisma.facility.create({data: {
            title: title,
            address: address,
            description: description,
            classId: classId
        }})
        res.status(201).json(facilities)
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.put('/:id', async (req, res)=>{
    const {id} = req.params
    const {title, address, description, classId} = req.body
    try{
        const facilities = await prisma.facility.update({
            where:{
                id: +id,
            },
            data:{
                title: title,  
                address: address,
                description: description,
                classId: classId
            }
        })
        res.status(201).json(facilities)
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.delete('/:id', async (req, res)=>{
    const {id} = req.params
    try{
        await prisma.facility.delete({
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