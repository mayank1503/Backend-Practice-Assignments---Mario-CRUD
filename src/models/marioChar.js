const {Schema} = mongoose
//  Your code goes here
const marioSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    weight:{
        type: Number,
        required: true,
    },
    
})
const marioModel = mongoose.model('marioChar',marioSchema)

module.exports = marioModel