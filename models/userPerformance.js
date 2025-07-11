const mongoose = require('mongoose');

const  performanceSchema  = new mongoose.Schema({
    performance:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    review:{
        type:String,
    },
    rate:{
        type: String,
        enum: ['normal', 'average', 'good'],
        required:true
    },
    date:{
        type:Date,
    }
},
  {
    timestamps:true
  }
);

module.exports = mongoose.model('Performance', performanceSchema);