const apolloServer = require("../apolloServer")
const  { createTestClient } = require("apollo-server-integration-testing")
const Event = require("../models/Event")
const mongoDB=require("../mongoDB")
const dateFns = require("date-fns")
const { ADD_EVENT, ADD_GROUP, ME, USER_GROUPS, USER_EVENTS, GET_EVENT, VOTE_EVENT, JOIN_GROUP, GROUPS_THAT_USER_CAN_JOIN, LEAVE_GROUP, DELETE_EVENT, USER_MESSAGES, ADD_TO_ADMINS, REMOVE_FROM_GROUP, JOIN_REQUEST, GET_MESSAGE, READ_MESSAGE, UNREAD_MESSAGES, SEND_USER_MESSAGE, DELETE_MESSAGE, SEND_GROUP_MESSAGE } = require("./queries")
const helper = require("./helper")
const { query, mutate, setOptions } = createTestClient({ apolloServer })
const scheduledJob = require("../scheduled-job")


beforeAll( async () => {
  await mongoDB.connect()
  await helper.erase()
})



describe("login", () => {
  beforeEach( async () => {
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
    const user = await helper.createUser()
    const secondUser = await helper.createSecondUser()
    await helper.createMessage(user, secondUser)
    await helper.createSecondMessage(user)
  })
  test("can get users messages", async () => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    const user = await query(USER_MESSAGES)
    expect(user.data.me.messages.length).toBe(2)
    expect(user.data.me.messages[0].content).toBe("TestContent")
  })

  test("can get message with id", async () => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    const messageInDB = await helper.messageInDB()
    const message = await query(GET_MESSAGE, { variables: { id: messageInDB._id.toString() } })
    expect(message.data.message.title).toBe(helper.messageObject.title)
  })

  test("can mark message as read", async () => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    const messageInDB = await helper.messageInDB()
    console.log(messageInDB)
    const result = await mutate(READ_MESSAGE, { variables: { id: messageInDB._id.toString() } })
    expect(result.data.readMessage.read).toBe(true)
    const messageInDBBack = await helper.messageInDB()
    expect(messageInDBBack.read).toBe(true)
  })

  test("can get number of unread messages", async () => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    const result = await query(UNREAD_MESSAGES)
    expect(result.data.me.unReadMessagesCount).toBe(1)
  })

  test("can send user messages", async () => {
    await helper.login(setOptions, mutate, helper.secondUserObject.username, "salainen")
    const result = await mutate(SEND_USER_MESSAGE, { variables: { receivers: [helper.userObject.username], message: "TestMessage", title: "UserMessageTestTitle" } })
    expect(result.data.sendUserMessage.title).toBe("UserMessageTestTitle")
    const userInDB  = await helper.userInDB()
    expect(userInDB.messages.length).toBe(3)
    await userInDB.populate("messages").execPopulate()
    expect(userInDB.messages[userInDB.messages.length-1].type).toBe("User message")
  })

  test("can delete messages", async () => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    const messageInDB = await helper.messageInDB()
    await mutate(DELETE_MESSAGE, { variables: { id: messageInDB._id.toString() } })
    const userInDB = await helper.userInDB()
    expect(userInDB.messages.length).toBe(1)
  })
})

describe("adding group", () => {

  beforeEach( async () => {
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
  beforeEach(async () => {
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
  beforeEach(async () => {
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
  beforeEach(async () => {
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
  beforeEach(async () => {
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
    expect(eventInDBBack.status).toStrictEqual("done")
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
    await helper.createThirdGroup()
    await helper.createFourthGroup()
  })

  test("can get users groups", async () => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")

    const groups = await query(USER_GROUPS)

    expect(groups.data.me.groups[0].name).toBe(helper.groupObject.name)
  })

  test("can get groups that user can join", async () => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    const result = await query(GROUPS_THAT_USER_CAN_JOIN)
    console.log(result)
    expect(result.data.me.groupsUserCanJoin.length).toBe(2)

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
    const result = await mutate(ADD_TO_ADMINS, { variables: { group: helper.groupObject.name, user: helper.secondUserObject.username } })
    expect(result.errors[0].message).toBe("logged in user needs to be group admin")
    const groupInDB = await helper.groupInDB()
    expect(groupInDB.admins.length).toBe(1)
  })

  test("user can send joining request to admins", async() => {
    await helper.login(setOptions, mutate, helper.secondUserObject.username, "salainen")
    await mutate(JOIN_REQUEST, { variables: { group: helper.groupObject.name } })
    const userInDB = await helper.userInDB()
    await userInDB.populate("messages").execPopulate()
    expect(userInDB.messages.length).toBe(1)
    expect(userInDB.messages[0].content).toBe(`User ${helper.secondUserObject.username} wants to join group ${helper.groupObject.name}`)
    expect(userInDB.messages[0].title).toBe(`User ${helper.secondUserObject.username} wants to join group ${helper.groupObject.name}`)
    expect(userInDB.messages[0].read).toBe(false)
    expect(userInDB.messages[0].type).toBe("Joining request")
    expect(userInDB.messages[0].sender).toBe(helper.secondUserObject.username)
    expect(userInDB.messages[0].receivers[0]).toBe(helper.userObject.username)
    expect(userInDB.messages[0].group).toBe(helper.groupObject.name)
  })

  test("user can add group messages", async() => {
    await helper.login(setOptions, mutate, helper.userObject.username, "salainen")
    await mutate(SEND_GROUP_MESSAGE, { variables: { group: helper.groupObject.name, message: "TestGroupMessage" } } )
    const groupInDB = await helper.groupInDB()
    expect(groupInDB.messages.length).toBe(1)
  })
})

describe("multiple voters", () => {
  beforeEach(async () => {
    await helper.erase()
    const user = await helper.createUser()
    const secondUser = await helper.createSecondUser()
    const group = await helper.createGroup([user, secondUser])
    const event = Event({ name: helper.eventObject.name, group: group, dates: [{ date: helper.currentDate, votes: [{ voter: helper.userObject.username, vote: "red" }, { voter: helper.secondUserObject.username, vote: "red" }] },
      { date: helper.nextDate, votes: [{ voter: helper.userObject.username, vote: "red" }, { voter: helper.secondUserObject.username, vote: "red" } ] },
      { date: helper.dayAfter, votes: [{ voter: helper.userObject.username, vote: "red" }, { voter: helper.secondUserObject.username, vote: "red" } ] }], status: "picking" })
    await event.save()
  })

  test("algorithm picks correct finalDate", async () => {
    const eventInDB = await helper.eventInDB()
    console.log(eventInDB)
    await helper.login(setOptions, mutate, helper.secondUserObject.username, "salainen")
    const result = await mutate(VOTE_EVENT, { variables: { id: eventInDB._id.toString(), votes: [{ date: helper.currentDate.toISOString(), vote: "green" }, { date: helper.nextDate.toISOString(), vote: "red" }, { date: helper.dayAfter.toISOString(), vote: "red" }] } })
    expect(result.data.voteEvent.status).toBe("done")
    const eventInDBBack = await helper.eventInDB()
    expect(eventInDBBack.status).toBe("done")
  })

  test("event goes correctly to voting status", async () => {
    const eventInDB = await helper.eventInDB()
    console.log(eventInDB)
    await helper.login(setOptions, mutate, helper.secondUserObject.username, "salainen")
    const result = await mutate(VOTE_EVENT, { variables: { id: eventInDB._id.toString(), votes: [{ date: helper.currentDate.toISOString(), vote: "blue" }, { date: helper.nextDate.toISOString(), vote: "blue" }, { date: helper.dayAfter.toISOString(), vote: "red" }] } })
    expect(result.data.voteEvent.status).toBe("voting")
    const eventInDBBack = await helper.eventInDB()
    expect(eventInDBBack.status).toBe("voting")
    const bestDates = eventInDBBack.bestDates.map(date => date.date)
    expect(bestDates.length).toBe(2)
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