const scheduledJob = require("./scheduled-job")
const mongoDB = require("./mongoDB")

const run = async () => {
  await mongoDB.connect()
  await scheduledJob()
  await mongoDB.close()
}

run()