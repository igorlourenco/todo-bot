import express from "express"

const app = express()

const client = require("twilio")("TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN")

const phoneNumber = `556391047668`

const todos = [
    {
        id: 1,
        title: 'ler',
        job: 'ler harry potter'
    },
    {
        id: 2,
        title: 'estudar',
        job: 'estudar node js'
    },
    {
        id: 3,
        title: 'assistir',
        job: 'assistir enrolados'
    },
    {
        id: 4,
        title: 'assistir',
        job: 'assistir valente'
    }
]

let convertedTodo: string = ''

todos.map(todo => {
    convertedTodo += `${todo.id}. *${todo.title}*\n${todo.job}\n\n`
})

console.log(convertedTodo)

app.get('/', () => {
    client.messages.create({
        from: 'whatsapp:+14155238886',
        body: '*_tarefas:_*\n' + convertedTodo,
        to: `whatsapp:+${phoneNumber}`
    }).then((message: any) => console.log(message)).catch((error: any) => console.log(error))
})

app.listen(3333)

