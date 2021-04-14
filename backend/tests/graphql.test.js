const apolloServer = require("../apolloServer")
const  { createTestClient } = require("apollo-server-integration-testing")
const User = require("../models/User")
const Event = require("../models/Event")
const Group = require("../models/Group")
const mongoDB=require("../mongoDB")
const { ADD_EVENT, ADD_GROUP, ME, USER_GROUPS, USER_EVENTS, GET_EVENT, VOTE_EVENT, JOIN_GROUP, GROUPS_THAT_USER_IS_NOT_IN } = require("./queries")
const helper = require("./helper")
const { query, mutate, setOptions } = createTestClient({ apolloServer })


beforeAll( async () => {
  mongoDB.connect()
  await helper.erase()
})

describe("login", () => {
  beforeAll( async () => {
    await helper.erase()
    await helper.createUser()
  })
  test("can login and query me works", async () => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    const user = await query(ME)
    expect(user.data.me.username).toBe(helper.userObject.username)

  })

})

describe("adding group", () => {

  beforeAll( async () => {
    await helper.erase()
    await helper.createUser()
  })
  test("can't add group if not logged in", async () => {
    const group = await mutate( ADD_GROUP)

    expect(group.errors[0].message).toEqual("user needs to be logged in")
  })

  test("logged in user is in the group if no users are passed in ", async() => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")

    const result = await mutate( ADD_GROUP)
    const groupInDB = await helper.groupInDB()

    expect(result.data.createGroup.name).toBe(groupInDB.name)
    expect(result.data.createGroup.name).toBe(helper.groupObject.name)
    expect(result.data.createGroup.users[0].name).toBe(helper.userObject.name)
  })
})

describe("joining group", () => {
  beforeAll(async () => {
    await helper.erase()
    const user = await helper.createUser()
    await helper.createSecondUser()
    const group = await helper.createGroup([user])
    await helper.createEvent(group)
    await group.save()
  })
  test("can join group", async () => {
    await helper.login(setOptions, mutate, helper.secondUserObject.username, "salainen")
    const group = await helper.groupInDB()
    console.log("group events", group.events)
    await mutate(JOIN_GROUP, { variables: { id: group._id.toString() } })
    const secondUserInDB = await helper.secondUserInDB()
    const event = await helper.eventInDB()
    expect(secondUserInDB.groups).toContainEqual(group._id)
    expect(secondUserInDB.events).toContainEqual(event._id)

  })
})

describe("adding event", () => {
  beforeAll(async () => {
    await helper.erase()
    const user = await helper.createUser()
    await helper.createGroup([user])
  })
  test("can't add event if not logged in", async () => {

    const events = await mutate( ADD_EVENT )

    expect(events.errors[0].message).toEqual("user needs to be logged in")
  })

  test("can add event if logged in", async () => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    const events = await mutate( ADD_EVENT)
    expect(events.data.addEvent.name).toBe(helper.eventObject.name)
    expect(events.data.addEvent.dates[0].date).toEqual(helper.eventObject.dates[0].date)
    const user = await helper.userInDB()
    const group = await helper.groupInDB()
    expect(user.events[0].toString()).toStrictEqual(events.data.addEvent.id)
    expect(events.data.addEvent.group).toStrictEqual(group._id.toString())

  })
})

describe("when there is event", () => {
  beforeAll(async () => {
    await helper.erase()
    const user = await helper.createUser()
    const group = await helper.createGroup([user])
    await helper.createEvent(group)
  })
  test("can get users events", async () => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    const events = await query(USER_EVENTS)
    console.log(events)
    expect(events.data.me.events[0].name).toBe(helper.eventObject.name)
  })

  test("can get event with id", async() => {
    const eventInDB = await helper.eventInDB()
    const event = await query(GET_EVENT, { variables: { id: eventInDB._id.toString() } })
    expect(event.data.event.name).toBe(helper.eventObject.name)
  })
  test("can vote event", async() => {
    const eventInDB = await helper.eventInDB()
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    const result = await mutate(VOTE_EVENT, { variables: { id: eventInDB._id.toString(), votes: [{ date: "TestiDate", vote: "red" }] } })
    console.log(result.data.voteEvent.dates[0].votes)
    const eventInDBBack = await helper.eventInDB()
    expect(eventInDBBack.dates[0].votes[0].voter).toStrictEqual(helper.userObject.username)
    expect(eventInDBBack.dates[0].votes[0].vote).toStrictEqual("red")
    expect(eventInDBBack.status).toBe("done")
    expect(result.data.voteEvent.dates[0].votes).toStrictEqual([{ voter: helper.userObject.username, vote: "red" }])
  })
})

describe("when event has already been voted on", () => {
  beforeAll(async () => {
    await helper.erase()
    const user = await helper.createUser()
    const group = await helper.createGroup([user])
    const event = new Event({ name: helper.eventObject.name, group: group, dates: [{ date: "TestiDate", votes: [{ voter: helper.userObject.username, vote: "red" }] }], status: "picking" })
    await event.save()
  })
  test("can change vote", async () => {
    const eventInDB = await helper.eventInDB()
    console.log(eventInDB)
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    const result = await mutate(VOTE_EVENT, { variables: { id: eventInDB._id.toString(), votes: [{ date: "TestiDate", vote: "blue" }] } })
    console.log(result.data.voteEvent.dates[0].votes)
    const eventInDBBack = await helper.eventInDB()
    expect(eventInDBBack.dates[0].votes[0].voter).toStrictEqual(helper.userObject.username)
    expect(eventInDBBack.dates[0].votes[0].vote).toStrictEqual("blue")
    expect(result.data.voteEvent.dates[0].votes).toStrictEqual([{ voter: "TestiUsername", vote: "blue" }])
  })

})

describe("when user is part of groups", () => {
  beforeEach(async () => {
    await helper.erase()
    const user = await helper.createUser()
    await helper.createGroup([user])
    await helper.createSecondGroup()
  })

  test("can get users groups", async () => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")

    const groups = await query(USER_GROUPS)

    expect(groups.data.me.groups[0].name).toBe(helper.groupObject.name)
  })

  test("can get groups that user is not part of", async () => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    await query(GROUPS_THAT_USER_IS_NOT_IN)

  })
})

describe("multiple voters", () => {
  beforeEach(async () => {
    await helper.erase()
    const user = await helper.createUser()
    const secondUser = await helper.createSecondUser()
    const group = await helper.createGroup([user, secondUser])
    const event = Event({ name: helper.eventObject.name, group: group, dates: [{ date: "TestiDate", votes: [{ voter: helper.userObject.username, vote: "red" }] }, { date: "SecondTestiDate", votes: [{ voter: helper.userObject.username, vote: "red" }] }], status: "picking" })
    await event.save()
  })

  test("algorithm picks correct finalDate", async () => {
    const eventInDB = await helper.eventInDB()
    console.log(eventInDB)
    await helper.login(setOptions, mutate, helper.secondUserObject.username, "salainen")
    const result = await mutate(VOTE_EVENT, { variables: { id: eventInDB._id.toString(), votes: [{ date: "TestiDate", vote: "green" }, { date: "SecondTestiDate", vote: "red" }] } })
    expect(result.data.voteEvent.status).toBe("done")
    const eventInDBBack = await helper.eventInDB()
    expect(eventInDBBack.status).toBe("done")
  })
})








afterAll(() => {
  mongoDB.close()
})