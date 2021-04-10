const apolloServer = require("../apolloServer")
const  {createTestClient} = require("apollo-server-integration-testing")
const User = require("../models/User")
const Event = require("../models/Event")
const Group = require("../models/Group")
const mongoDB=require("../mongoDB")
const {ADD_EVENT, LOGIN, ADD_GROUP } = require("./queries")
const helper = require("./helper")

const { query, mutate, setOptions } = createTestClient({apolloServer})


beforeAll( async () => {
  mongoDB.connect()
  await User.deleteMany({})
  await Event.deleteMany({})
  await Group.deleteMany({})
})


describe("adding group", () => {

  beforeAll( async () => {
    await User.deleteMany({})
    await Event.deleteMany({})
    await Group.deleteMany({})
    const user = new User(helper.userObject)
    await user.save()
  })
  test("can't add group if not logged in", async () => {
    const group = await mutate( ADD_GROUP)

    expect(group.errors[0].message).toEqual("user needs to be logged in")
  })

  test("logged in user is in the group if no users are passed in ", async() => {
    await helper.login(setOptions, mutate)

    const group = await mutate( ADD_GROUP)
    console.log(group)

    expect(group.data.createGroup.name).toBe(helper.groupObject.name)
    expect(group.data.createGroup.users[0].name).toBe(helper.userObject.name)
  })

})

describe("adding event", () => {
  beforeAll(async () => {
    await User.deleteMany({})
    await Event.deleteMany({})
    await Group.deleteMany({})
    const user = new User(helper.userObject)
    const group = new Group({name: helper.groupObject.name , users: [user]})
    await user.save()
    await group.save()
  })
  test("can't add event if not logged in", async () => {

    const events = await mutate( ADD_EVENT )

    expect(events.errors[0].message).toEqual("user needs to be logged in")
  })

  test("can add event if logged in", async () => {
    await helper.login(setOptions, mutate)
    const events = await mutate( ADD_EVENT)
    expect(events.data.addEvent.name).toBe("TestiName")
    expect(events.data.addEvent.dates).toContain("TestiDate")
    const user = await User.findOne({username: helper.userObject.username})
    const group = await Group.findOne({name: helper.groupObject.name})
    expect(user.events[0].toString()).toStrictEqual(events.data.addEvent.id)
    expect(events.data.addEvent.group).toStrictEqual(group._id.toString())

  })
})


afterAll(() => {
  mongoDB.close()
})