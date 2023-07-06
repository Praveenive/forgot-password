import mongoose from 'mongoose'


export function dbConnection(){
    const params={
        useNewUrlParser:true,
        useUnifiedTopology: true
}
try {
    mongoose.connect('mongodb://127.0.0.1:27017',params)
    console.log("database connected succesfully")
} catch (error) {
    console.log("database error",error)
}
}