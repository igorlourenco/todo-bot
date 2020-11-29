import express, {Request, Response} from "express"
import {
    FINISH_TASK,
    FINISH_TASK2,
    FINISHED_TASKS,
    FINISHED_TASKS2,
    HELP,
    HELP_CONTENT,
    NEW_TASK,
    SIGNIN,
    TASKS
} from "./consts/commands";
import {INVALID_COMMAND} from "./consts/messages";
import {Db, MongoClient, ObjectID} from "mongodb"

const uri = ""

interface Task {
    _id: string
    task: string
    createdAt: Date,
    finishedAt?: Date
}

let db: Db | null = null

const dateOptions = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
};


const app = express()
app.use(express.urlencoded({extended: false}));

const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.post('/receive-message', async (request: Request, response: Response) => {
    const twiml = new MessagingResponse();

    const message = twiml.message();

    const messageBody = request.body.Body
    const messageSender = request.body.From

    const phoneNumber = messageSender.substring(10)

    if (messageBody.substr(0, FINISHED_TASKS.length) === FINISHED_TASKS || messageBody.substr(0, FINISHED_TASKS2.length) === FINISHED_TASKS2) {
        const tasks = await db?.collection("tasks").find({active: false}).toArray()
        let list = ''

        tasks?.map((task: Task, index) => {
            list += (`*${index + 1}*. ${task.task}\n_Criada em ${new Intl.DateTimeFormat('default', dateOptions).format(task.createdAt)}_\n_Finalizada em ${new Intl.DateTimeFormat('default', dateOptions).format(task.finishedAt)}_\n\n`)
        })

        message.body(`Oi, Igor, aqui estão suas tarefas concluídas:\n\n${list}`);
    } else if (messageBody.substr(0, NEW_TASK.length) === NEW_TASK) {
        const task = messageBody.toString().substring(12)
        await db?.collection("tasks").insertOne({
            task,
            active: true,
            createdAt: new Date(),
            finishedAt: null
        })

        message.body(`A tarefa *_${task}_* foi cadastrada.`)
    } else if (messageBody.substr(0, FINISH_TASK.length) === FINISH_TASK || messageBody.substr(0, FINISH_TASK2.length) === FINISH_TASK2) {
        const taskIndex = messageBody.toString().substring(10)
        const tasks: Task[] | undefined = await db?.collection("tasks").find({active: true}).toArray()

        await db?.collection("tasks").updateOne({_id: new ObjectID(tasks[taskIndex - 1]._id)}, {$set: {active: false}})
        await db?.collection("tasks").updateOne({_id: new ObjectID(tasks[taskIndex - 1]._id)}, {$set: {finishedAt: new Date()}})

        message.body(`Tarefa *_${tasks[taskIndex - 1].task}_* marcada como concluída.`)

    } else if (messageBody.substr(0, TASKS.length) === TASKS) {
        const tasks = await db?.collection("tasks").find({active: true}).toArray()
        let list = ''

        tasks?.map((task: Task, index) => {
            list += (`*${index + 1}*. ${task.task}\n_Criada em ${new Intl.DateTimeFormat('default', dateOptions).format(task.createdAt)}_\n\n`)
        })

        message.body(`Olá, Igor, estas são suas tarefas pendentes:\n\n${list}`);
    } else if (messageBody.startsWith(HELP)) {
        message.body(`${HELP_CONTENT}`)
    } else {
        message.body(`${INVALID_COMMAND}`)
    }

    response.writeHead(200, {'Content-Type': 'text/xml'});
    response.end(twiml.toString());
})

MongoClient.connect(uri, {useUnifiedTopology: true}, (err, client) => {
    if (err) console.log(err)
    db = client.db('todo-bot')

    app.listen(3333)
},)


