import mongoose from "mongoose"

const {Schema, model} = mongoose
const types = Schema.Types

const dailyReportsSchema = new Schema({
    reporter_id: {
      type: types.ObjectId,
      ref: 'User',
      required: true
    },
    weatherStatus: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    }
});
  
const DailyReports = model('DailyReports', dailyReportsSchema);
  
export default DailyReports;