const apolloServer = require("../apolloServer")
const  {createTestClient} = require("apollo-server-integration-testing")
const User = require("../models/User")
const Event = require("../models/Event")
const Group = require("../models/Group")
const mongoose=require("mongoose")
const jwt = require("jsonwebtoken")

const {ADD_EVENT, LOGIN } = require("./queries")
const helper = require("./helper")

const { query, mutate, setOptions } = createTestClient({apolloServer})


beforeAll( async () => {
  const MONGODB_URI = process.env.MONGODB_URI

  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
      console.log("connected to MongoDB")
    })
    .catch((error) => {
      console.log("error connection to MongoDB:", error.message)
    })
    await User.deleteMany({})
    await Event.deleteMany({})
    await Group.deleteMany({})
})


describe("adding event", () => {
  beforeAll(async () => {
    const user = new User(helper.userObject)
    const group = new Group({name: helper.groupObject.name, users: [user]})
    await user.save()
    await group.save()
  })
  test("can't add event if not logged in", async () => {

    const events = await mutate( ADD_EVENT )

    expect(events.errors[0].message).toEqual("user needs to be logged in")
  })

  test("can add event if logged in", async () => {




    const token = await mutate(LOGIN)
    console.log(token.data.login.value)


    setOptions({
      request: {
        headers: {
          authorization: `bearer ${token.data.login.value}`,
        }
      }
    });
    const events = await mutate( ADD_EVENT)

    expect(events.data.addEvent.name).toBe("TestiName")
    expect(events.data.addEvent.dates).toContain("TestiDate")
    const user = await User.findOne({username: "TestiUsername"})
    const group = await Group.findOne({name: "TestGroup"})
    expect(user.events[0].toString()).toStrictEqual(events.data.addEvent.id)
    expect(events.data.addEvent.group).toStrictEqual(group._id.toString())

  })
})


afterAll(() => {
  mongoose.connection.close()
})