const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name has to be at least 3 characters long."],
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{7,8}/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
})

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Contact", contactSchema)
