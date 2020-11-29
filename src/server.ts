import express, {Request, Response} from "express"
import {DELETE_TASK, DELETE_TASK2, HELP, HELP_CONTENT, NEW_TASK, SIGNIN, TASKS} from "./consts/commands";
import {INVALID_COMMAND} from "./consts/messages";

const app = express()
app.use(express.urlencoded({extended: false}));

const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.post('/receive-message', async (request: Request, response: Response) => {
    const twiml = new MessagingResponse();

    const message = twiml.message();

    const messageBody = request.body.Body
    const messageSender = request.body.From

    const phoneNumber = messageSender.substring(10)

    if (messageBody.startsWith(TASKS)) {
        message.body(`oi, ${messageSender}`);
    } else if (messageBody.startsWith(SIGNIN)) {
//
    } else if (messageBody.startsWith(NEW_TASK)) {
//
    } else if (messageBody.startsWith(DELETE_TASK) || messageBody.startsWith(DELETE_TASK2)) {
//
    } else if (messageBody.startsWith(HELP)) {
        message.body(`${HELP_CONTENT}`)
    } else {
        message.body(`${INVALID_COMMAND}`)
    }

    response.writeHead(200, {'Content-Type': 'text/xml'});
    response.end(twiml.toString());
})

app.listen(3333)

