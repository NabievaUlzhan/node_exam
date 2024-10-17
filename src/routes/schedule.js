const express = require('express')
const prisma = require('../prisma/client')
const router = express.Router()

router.get('', async (req, res) => {
    try {
        const schedules = await prisma.schedule.findMany({
            
        })
        res.json(schedules)
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try{
        const schedules = await prisma.schedule.findUnique({where: {
            id: +id
        }})
        res.status(201).json(schedules)    
    } catch (error) {
        res.status(400).json({error: error})
    }
    
})

router.post('', async (req, res) => {
    const {description, coachId, facilityId} = req.body
    try {
        const schedules = await prisma.schedule.create({data: {
            description: description,
            coachId: coachId,
            facilityId: facilityId,
            // Member:{
            //     connect:{
            //         id: memberId
            //     }
            // },
            // Coach:{
            //     connect:{
            //         id: coachId
            //     }
            // },
            // Class:{
            //     connect:{
            //         id: classId
            //     }
            // },
            // Facility:{
            //     connect:{
            //         id: facilityId
            //     }
            // },
        }})
        res.status(201).json(schedules)
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.put('/:id', async (req, res)=>{
    const {id} = req.params
    const {description, coachId, facilityId} = req.body
    try{
        const schedules = await prisma.schedule.update({
            where:{
                id: +id,
            },
            data:{
                description: description,
                coachId: coachId,
                facilityId: facilityId
                // Member:{
                //     connect:{
                //         id: memberId
                //     }
                // },
                // Coach:{
                //     connect:{
                //         id: coachId
                //     }
                // },
                // // Class:{
                // //     connect:{
                // //         id: classId
                // //     }
                // // },
                // Facility:{
                //     connect:{
                //         id: facilityId
                //     }
                // },
            }
        })
        res.status(201).json(schedules)
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.delete('/:id', async (req, res)=>{
    const {id} = req.params
    try{
        await prisma.schedule.delete({
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