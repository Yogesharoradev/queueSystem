import {producer} from "../lib/kafka.lib.js"
import RequestLog from "../model/request.model.js"

const addRequestToQueue = async (req, res) => {
  try {
   
    const { message } = req.body;
    const userId = req.cookies.userId; 

    const log = new RequestLog({ userId, message, status: 'pending' });
    await log.save();

    await producer.send({
      topic: "test_topic",
      messages: [{ value: JSON.stringify({ message, logId: log._id }) }],
    });

    res.status(200).json({ message: 'Request queued successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to add request to queue' });
  }
};

export default addRequestToQueue