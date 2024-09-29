import RequestLog from "../model/request.model.js"

const processRequest = async (request) => {
  try {
    console.log('Processing request:', request);
    
    await new Promise((resolve) => setTimeout(resolve, 2000));  

   
    await RequestLog.findByIdAndUpdate(request.logId, { status: 'completed' });
    console.log('Request completed:', request);

  } catch (error) {

    await RequestLog.findByIdAndUpdate(request.logId, { status: 'failed' });
    
    console.error('Failed to process request:', error);
  }
};


export default processRequest