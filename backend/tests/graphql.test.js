const apolloServer = require("../apolloServer")
const  { createTestClient } = require("apollo-server-integration-testing")
const Event = require("../models/Event")
const mongoDB=require("../mongoDB")
const dateFns = require("date-fns")
const { ADD_EVENT, ADD_GROUP, ME, USER_GROUPS, USER_EVENTS, GET_EVENT, VOTE_EVENT, JOIN_GROUP, GROUPS_THAT_USER_IS_NOT_IN, LEAVE_GROUP, DELETE_EVENT, USER_MESSAGES, ADD_TO_ADMINS, REMOVE_FROM_GROUP } = require("./queries")
const helper = require("./helper")
const { query, mutate, setOptions } = createTestClient({ apolloServer })
const scheduledJob = require("../scheduled-job")


beforeAll( async () => {
  await mongoDB.connect()
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

describe("messages", () => {
  beforeEach(async () => {
    await helper.erase()
    await helper.createUser()
  })
  test("can get users messages", async () => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    const user = await query(USER_MESSAGES)
    expect(user.data.me.messages.length).toBe(1)
    expect(user.data.me.messages[0].content).toBe(helper.userObject.messages[0].content)
  })
})

describe("adding group", () => {

  beforeAll( async () => {
    await helper.erase()
    await helper.createUser()
    await helper.createSecondUser()
  })
  test("can't add group if not logged in", async () => {
    const group = await mutate( ADD_GROUP, { variables: { users: [helper.secondUserObject.username ] } })

    expect(group.errors[0].message).toEqual("user needs to be logged in")
  })

  test("logged in user is admin", async() => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")

    const result = await mutate( ADD_GROUP, { variables: { users: [helper.secondUserObject.username ] } })
    const groupInDB = await helper.groupInDB()
    await groupInDB.populate("users").execPopulate()
    await groupInDB.populate("admins").execPopulate()

    expect(groupInDB.name).toBe(helper.groupObject.name)
    expect(result.data.createGroup.name).toBe(helper.groupObject.name)
    expect(groupInDB.users.length).toBe(2)
    expect(groupInDB.admins.length).toBe(1)
  })
})

describe("joining group", () => {
  beforeAll(async () => {
    await helper.erase()
    const user = await helper.createUser()
    await helper.createSecondUser()
    const group = await helper.createGroup([user])
    await helper.createEvent(group)
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
    expect(dateFns.format( new Date (events.data.addEvent.dates[0].date), "DDD")).toEqual(dateFns.format(helper.eventObject.dates[0].date, "DDD"))
    const user = await helper.userInDB()
    const group = await helper.groupInDB()
    const eventInDB = await helper.eventInDB()
    expect(dateFns.format( new Date ( eventInDB.finalDate) ,"DDD")).toBe(dateFns.format( new Date( helper.eventObject.dates[0].date) ,"DDD"))
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
    const result = await mutate(VOTE_EVENT, { variables: { id: eventInDB._id.toString(), votes: [{ date: helper.eventObject.dates[0].date.toISOString(), vote: "red" }] } })
    console.log(result)
    const eventInDBBack = await helper.eventInDB()
    expect(eventInDBBack.dates[0].votes[0].voter).toStrictEqual(helper.userObject.username)
    expect(eventInDBBack.dates[0].votes[0].vote).toStrictEqual("red")
    expect(eventInDBBack.status).toBe("done")
    expect(result.data.voteEvent.dates[0].votes).toStrictEqual([{ voter: helper.userObject.username, vote: "red" }])
  })
  test("can delete event", async() => {
    const eventInDB = await helper.eventInDB()
    await mutate(DELETE_EVENT, { variables: { id: eventInDB._id.toString() } })
    const userInDB = await helper.userInDB()
    const eventInDBBack = await helper.eventInDB()
    const groupInDB = await helper.groupInDB()
    expect(eventInDBBack).toBe(null)
    expect(userInDB.events.length).toBe(0)
    expect(groupInDB.events.length).toBe(0)

  })
})


describe("when event has already been voted on", () => {
  beforeAll(async () => {
    await helper.erase()
    const user = await helper.createUser()
    const group = await helper.createGroup([user])
    const event = new Event({ name: helper.eventObject.name, group: group, dates: [{ date: helper.eventObject.dates[0].date, votes: [{ voter: helper.userObject.username, vote: "red" }] }], status: "picking" })
    await event.save()
  })
  test("can change vote", async () => {
    const eventInDB = await helper.eventInDB()
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    const result = await mutate(VOTE_EVENT, { variables: { id: eventInDB._id.toString(), votes: [{ date: helper.eventObject.dates[0].date.toISOString(), vote: "blue" }] } })
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
    const secondUser = await helper.createSecondUser()
    const group = await helper.createGroup([user, secondUser])
    await helper.createEvent(group)
    await helper.createSecondGroup()
  })

  test("can get users groups", async () => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")

    const groups = await query(USER_GROUPS)

    expect(groups.data.me.groups[0].name).toBe(helper.groupObject.name)
  })

  test("can get groups that user is not part of", async () => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    const result = await query(GROUPS_THAT_USER_IS_NOT_IN)
    expect(result.data.me.groupsUserNotIn[0].name).toBe(helper.secondGroupObject.name)

  })

  test("user can leave groups", async() => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    const groupInDB = await helper.groupInDB()
    console.log(groupInDB)
    const result = await mutate(LEAVE_GROUP, { variables: { id: groupInDB.id } })
    console.log(result)
    expect(result.data.leaveGroup.users.length).toBe(1)
    const userInDB = await helper.userInDB()
    expect(userInDB.groups.length).toBe(0)
    expect(userInDB.events.length).toBe(0)
    const groupInDBBack = await helper.groupInDB()
    expect(groupInDBBack.users.length).toBe(1)
    expect(groupInDBBack.admins.length).toBe(0)
  })

  test("admin can add other users to admins", async() => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    await mutate(ADD_TO_ADMINS, { variables: { group: helper.groupObject.name, user: helper.secondUserObject.username } })
    const groupInDB = await helper.groupInDB()
    expect(groupInDB.admins.length).toBe(2)
  })

  test("admin can remove other users", async() => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    await mutate(REMOVE_FROM_GROUP, { variables: { group : helper.groupObject.name, user: helper.secondUserObject.username } })
    const groupInDB = await helper.groupInDB()
    expect(groupInDB.users.length).toBe(1)
    const secondUserInDB = await helper.secondUserInDB()
    expect(secondUserInDB.groups.length).toBe(0)
    expect(secondUserInDB.events.length).toBe(0)

  })

  test("normal user can't add other users to admins", async() => {
    await helper.login(setOptions, mutate, helper.secondUserObject.username, "salainen")
    await mutate(ADD_TO_ADMINS, { variables: { group: helper.groupObject.name, user: helper.secondUserObject.username } })
    const groupInDB = await helper.groupInDB()
    expect(groupInDB.admins.length).toBe(1)
  })
})

describe("multiple voters", () => {
  beforeEach(async () => {
    await helper.erase()
    const user = await helper.createUser()
    const secondUser = await helper.createSecondUser()
    const group = await helper.createGroup([user, secondUser])
    const event = Event({ name: helper.eventObject.name, group: group, dates: [{ date: helper.currentDate, votes: [{ voter: helper.userObject.username, vote: "red" }] }, { date: helper.nextDate, votes: [{ voter: helper.userObject.username, vote: "red" }] }], status: "picking" })
    await event.save()
  })

  test("algorithm picks correct finalDate", async () => {
    const eventInDB = await helper.eventInDB()
    console.log(eventInDB)
    await helper.login(setOptions, mutate, helper.secondUserObject.username, "salainen")
    const result = await mutate(VOTE_EVENT, { variables: { id: eventInDB._id.toString(), votes: [{ date: helper.currentDate.toISOString(), vote: "green" }, { date: helper.nextDate.toISOString(), vote: "red" }] } })
    expect(result.data.voteEvent.status).toBe("done")
    const eventInDBBack = await helper.eventInDB()
    expect(eventInDBBack.status).toBe("done")
  })
})

describe("tests for scheduled-job", () => {
  beforeEach( async () => {
    await helper.erase()
    const user = await helper.createUser()
    const group = await helper.createGroup([user])
    await helper.createEvent(group)
    await helper.createSecondEvent(group)
  } )

  test("scheduled-job removes events which finalDates are less than new Date", async() => {
    await scheduledJob()
    const eventInDB = await helper.eventInDB()
    expect(eventInDB).toBe(null)
    const secondEventInDB = await helper.secondEventInDB()
    expect(secondEventInDB.name).toBe(helper.secondEventObject.name)
    const userInDB = await helper.userInDB()
    const groupInDB = await helper.groupInDB()
    expect(userInDB.events.length).toBe(1)
    expect(groupInDB.events.length).toBe(1)

  })
})







afterAll(() => {
  mongoDB.close()
})