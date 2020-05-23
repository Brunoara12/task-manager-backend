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

const deleteTaskAndCountIncomplete = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const incompleteTasks = await Task.find({completed : false})

    return incompleteTasks
}

deleteTaskAndCountIncomplete("5ec74975364ad953107507a8").then((tasks) => {
    console.log(tasks, tasks.length)
}).catch((error) => {
    console.log(error)
})