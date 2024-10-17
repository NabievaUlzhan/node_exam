const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const memberRouter = require('./routes/member')
const coachRouter = require('./routes/coach')
const classRouter = require('./routes/class')
const scheduleRouter = require('./routes/schedule')
const facilityRouter = require('./routes/facility')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/members', memberRouter)
app.use('/coaches', coachRouter)
app.use('/classes', classRouter)
app.use('/schedules', scheduleRouter)
app.use('/facilities', facilityRouter)
 

const PORT = 7777
app.listen(PORT, ()=>{
    console.log(`Сервер запущен на ip - http://localhost:${PORT}`)
})