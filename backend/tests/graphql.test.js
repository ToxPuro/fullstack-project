const apolloServer = require("../apolloServer")
const  {createTestClient} = require("apollo-server-integration-testing")
const User = require("../models/User")
const Event = require("../models/Event")
const Group = require("../models/Group")
const mongoDB=require("../mongoDB")
const {ADD_EVENT, ADD_GROUP, ME, USER_GROUPS, USER_EVENTS, GET_EVENT } = require("./queries")
const helper = require("./helper")

const { query, mutate, setOptions } = createTestClient({apolloServer})


beforeAll( async () => {
  mongoDB.connect()
  await helper.erase()
})

describe("login", () => {
  beforeAll( async () => {
    await helper.erase()
    const user = new User(helper.userObject)
    await user.save()
  })
  test("can login and query me works", async () => {
    const token = await helper.login(setOptions, mutate)
    const user = await query(ME)
    expect(user.data.me.username).toBe(helper.userObject.username)

  })

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

    const result = await mutate( ADD_GROUP)
    const group = await Group.findOne({name: helper.groupObject.name})
    
    expect(result.data.createGroup.name).toBe(group.name)
    expect(result.data.createGroup.name).toBe(helper.groupObject.name)
    expect(result.data.createGroup.users[0].name).toBe(helper.userObject.name)
  })

  test("can get users groups", async () => {
    await helper.login(setOptions, mutate)

    const groups = await query(USER_GROUPS)

    expect(groups.data.userGroups[0].name).toBe(helper.groupObject.name)
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
    expect(events.data.addEvent.name).toBe(helper.eventObject.name)
    console.log(events.data.addEvent.dates)
    expect(events.data.addEvent.dates).toEqual(helper.eventObject.dates)
    const user = await User.findOne({username: helper.userObject.username})
    const group = await Group.findOne({name: helper.groupObject.name})
    expect(user.events[0].toString()).toStrictEqual(events.data.addEvent.id)
    expect(events.data.addEvent.group).toStrictEqual(group._id.toString())

  })

  test("can get users events", async () => {
    await helper.login(setOptions, mutate)
    const events = await query(USER_EVENTS)
    expect(events.data.userEvents).toBeDefined()
  })

  test("can get event with id", async() => {
    const eventInDB = await Event.findOne({name: helper.eventObject.name})
    const event = await query(GET_EVENT, {variables: {id: eventInDB._id.toString()}})
    expect(event.data.event).toBeDefined()
  })
})


afterAll(() => {
  mongoDB.close()
})