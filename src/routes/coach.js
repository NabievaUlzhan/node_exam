const express = require('express')
const prisma = require('../prisma/client')
const router = express.Router()

router.get('', async (req, res) => {
    try {
        const coaches = await prisma.coach.findMany({
            include:{
                Schedule: true,
            }
        })
        res.json(coaches)
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try{
        const coaches = await prisma.coach.findUnique({where: {
            id: +id
        },
        include:{
            Schedule: true,
        }})
        res.status(201).json(coaches)    
    }catch (error) {
        res.status(400).json({error: error})
    }
    
})

router.post('', async (req, res) => {
    const {name, email, sport_type, memberId} = req.body
    try {
        const coaches = await prisma.coach.create({data: {
            name: name,
            email: email,
            sport_type: sport_type,
            memberId: memberId
        }})
        res.status(201).json(coaches)
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.put('/:id', async (req, res)=>{
    const {id} = req.params
    const {name, email, sport_type, memberId} = req.body
    try{
        const coaches = await prisma.coach.update({
            where:{
                id: +id,
            },
            data:{
                name: name,  
                email: email,
                sport_type: sport_type,
                memberId: memberId
            }
        })
        res.status(201).json(coaches)
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.delete('/:id', async (req, res)=>{
    const {id} = req.params
    try{
        await prisma.coach.delete({
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