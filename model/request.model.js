import mongoose from "mongoose"

const requestLogSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  requestType: String,
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed']
  },
 
} , {timestamps : true});

const RequestLog = mongoose.model('RequestLog', requestLogSchema);


export default RequestLog