require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('5ec5f5ece5766d4b7c11e52c', { age: 1}).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1})
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})