require('../src/db/mongoose')
const Task = require('../src/models/task')


Task.findByIdAndDelete('5ec7497f364ad953107507a9').then((task) => {
    console.log(task)
    return Task.find({completed: false})
}).then((result) => {
    console.log(result.length, result)
}).catch((error) => {
    console.log(error)
})