import {consumer} from "../lib/kafka.lib.js"
import processRequest from "./worker.service.js"

const consumeRequests = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test_topic', fromBeginning: true });

  console.log('Consumer is listening...');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {

      try{
        const request = JSON.parse(message.value);
        await processRequest(request);  
        
      console.log({
        topic,
        partition,
        value: message.value.toString(),
      },": my console message");
      }catch(err){
        console.error('Error in consumer:', err);
      } 
   },
  });
};

export default consumeRequests
