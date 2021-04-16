const scheduledJob = require("./scheduled-job")
const mongoDB = require("./mongoDB")

mongoDB.connect()
scheduledJob()
mongoDB.close()