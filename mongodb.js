// CRUD - Create Read Update Delete

const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true }
    , (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Bruno',
    //     age: 27
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     },{
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert users')
    //     }

    //     console.log(result.ops)
    // })

    db.collection('tasks').insertMany([
        {
            description: 'MongoDB Git',
            completed: true
        }, {
            description: 'Challenge',
            completed: false
        }, {
            description: 'Sleep',
            completed: true
        }
    ], (error, result) => {
        if(error){
            return console.log('Unable to insert tasks')
        }

        console.log(result.ops)
    })
})