const express = require('express')
const multer = require('multer')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        const token = await user.generateAuthToken()
        //await user.save()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }

})

router.post('/users/login', async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(error) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async(req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async(req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()

        res.send(req.user)
    } catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.delete('/users/me', auth, async (req, res) => {

    try{
        await req.user.remove()

        res.send(req.user)
    } catch(error) {
        res.status(500).send()
    }
})

const avatarUpload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.endsWith('.jpg')) {
            return cb(new Error('Please upload an image'))

        }

        cb(undefined, true)
    }
})

router.post('/users/me/avatar', avatarUpload.single('avatar'), async (req, res) => {
    
    res.send()

})

module.exports = router