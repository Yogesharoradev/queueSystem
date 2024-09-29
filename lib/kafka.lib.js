import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'backend-system',  
  brokers: ['localhost:9092'], 
});

const producer = kafka.producer(); 

const consumer = kafka.consumer({ groupId: 'request-group' }); 

export {producer , consumer}
