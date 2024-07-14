const{ ServerConfig, Logger } = require('./config');
const amqplib = require('amqplib');
const{EmailService} = require('./services')
const express = require('express');

async function connectQueue(){
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();
        await channel.assertQueue("noti-queue");
        channel.consume("noti-queue", async(data) => {
            const object = JSON.parse(`${Buffer.from(data.content)}`);
            await EmailService.sendEmail("airlinenoti023@gmail.com", object.recepientEmail, object.subject, object.text)
        })

    } catch (error) {
       // console.log(error);
    }
}
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.group(`Succesfully started the server on PORT : ${ServerConfig.PORT}`);
    //Logger.info("succesfully started the server", {});
    await connectQueue();
    console.log("queue is up")
});
