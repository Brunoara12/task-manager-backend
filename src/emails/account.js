const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)



const sendWelcomeEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'brunoara12@gmail.com',
        subject: 'Thanks for Signing up!',
        text: `Welcome to the app. ${name}. Let me know how you get along with the app`,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    sgMail.send(msg).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
    })
}

const sendCancellationEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'brunoara12@gmail.com',
        subject: 'Sad to see you go!',
        text: `Sorry for seeing you go ${name}. Let us know what we can do to make things better!`,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    sgMail.send(msg).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}