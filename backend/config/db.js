import mongoose from "mongoose";

const ConnectedDB = async (req, res) => {
    try {
        mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log("DB connected sucessfully");
        }).catch((err) => {
            console.log("Error while connecting to db", err.message);
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Cant connect to db",
            sucess: false
        })
    }
}

export default ConnectedDB