const express = require(`express`);
const kafka = require(`kafka-node`);

const app = express();

const Producer = kafka.Producer;
const client = new kafka.KafkaClient({kafkaHost: `localhost:9092`});
const producer = new Producer(client);

producer.on(`ready`, () => {
    console.log(`Producer is ready to produce message`);
});

app.get(`/sendmessage`, (req,res) => {

    const producermessages = [
        {
            topic: 'orders',
            message: 'This is test message, from producer',
        },
    ];

    producer.send(producermessages, (err,data) => {
        if(err){
            res.sendStatus(500).send(`Internal server error`);
            return;
        }
        else{
            res.json({message: `Successfully message sent`});
        }
    });

});

const port = 3000;

app.listen(port, () => {
    console.log(`Server started with port ${port}`);
});