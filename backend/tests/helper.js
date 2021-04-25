const { LOGIN } = require("./queries")
const User = require("../models/User")
const Event = require("../models/Event")
const Group = require("../models/Group")
const dateFns = require("date-fns")
const Message = require("../models/Message")
// passwordHash is encrypted from 'salainen'
const passwordHash = "$2b$10$BWXtVXCXvNrRRNelbC8McurdUJdPBV2qrug6pISDZV5HPPA9V0Ok2"
const userObject =  { username: "TestiUsername", name: "TestName", events: [], passwordHash, groups: [], messages: [] }
const secondUserObject = { username: "SecondTestiUsername", name: "SecondTestName", events: [], passwordHash }
const groupObject = { name: "TestGroup" }
const secondGroupObject = { name: "SecondTestGroup" }
const messageObject = { title: "TestTitle", content: "TestContent", read: false, type: "User message", sender: secondUserObject.username }
const secondMessageObject = { title: "SecondTestTitle", content: "SecondTestContent", read: true, type: "User message", sender: secondUserObject.username }
const currentDate = new Date()
const nextDate = dateFns.addDays(currentDate, 1)
const dayAfter = dateFns.addDays(currentDate, 2)
const eventObject = { name: "TestiName", group: "TestGroup", dates: [ { date: currentDate, votes: [] } ], finalDate: currentDate }
const secondEventObject = { name: "SecondTestiName", group: "TestGroup", dates: [ { date: nextDate, votes: [] } ], finalDate: nextDate }

const login = async (setOptions, mutate, username, password) => {
  const token = await mutate(LOGIN, { variables: { username, password } })
  setOptions({
    request: {
      headers: {
        authorization: `bearer ${token.data.login.value}`,
      }
    }
  })
  return token
}

const erase = async() => {
  await User.deleteMany({})
  await Event.deleteMany({})
  await Group.deleteMany({})
}

const createUser = async() => {
  const user = new User(userObject)
  await user.save()
  return user
}

const createSecondUser = async() => {
  const secondUser = new User(secondUserObject)
  await secondUser.save()
  return secondUser
}

const createGroup = async (users) => {
  const group = new Group({ name: groupObject.name, users: users, events: [], admins: [users[0]] })
  for(const i in users){
    await users[i].updateOne({ $addToSet: { groups: group } })
  }
  await group.save()
  return group
}

const createSecondGroup = async (users) => {
  let admins = []
  if(users){
    admins = [users[0]]
  }
  const group = new Group({ name: secondGroupObject.name, users: users, events: [], admins: admins })
  for(const i in users){
    await users[i].updateOne({ $addToSet: { groups: group } })
  }
  await group.save()
  return group
}
const createEvent = async (group) => {
  const event = new Event({ name: eventObject.name, group: group, dates: eventObject.dates, finalDate: eventObject.finalDate })
  await event.save()
  await group.updateOne({ $addToSet: { events: event } })
  for(const user in group.users){
    await group.users[user].updateOne({ $addToSet: { events: event } })
  }
  return event
}

const createMessage = async(user) => {
  const message =  new Message(messageObject)
  await message.save()
  await user.updateOne({ $addToSet: { messages: message } } )
}

const createSecondMessage = async(user) => {
  const message =  new Message(secondMessageObject)
  await message.save()
  await user.updateOne({ $addToSet: { messages: message } } )
}


const createSecondEvent = async (group) => {
  const event = new Event({ name: secondEventObject.name, group: group, dates: secondEventObject.dates, finalDate: secondEventObject.finalDate })
  await event.save()
  await group.updateOne({ $addToSet: { events: event } })
  for(const user in group.users){
    await group.users[user].updateOne({ $addToSet: { events: event } })
  }
  return event
}

const eventInDB = async () => {
  return await Event.findOne({ name: eventObject.name })
}

const messageInDB = async () => {
  return await Message.findOne({ title: messageObject.title})
}

const secondEventInDB = async () => {
  return await Event.findOne({ name: secondEventObject.name })
}

const userInDB = async () => {
  return await User.findOne({ username: userObject.username } )
}

const groupInDB = async () => {
  return await Group.findOne({ name: groupObject.name })
}

const secondUserInDB = async () => {
  return await User.findOne({ username: secondUserObject.username })
}


module.exports = { userObject, groupObject, login, erase, eventObject, secondUserObject, createUser, createSecondUser, createGroup, createEvent, eventInDB, userInDB, groupInDB, secondUserInDB, createSecondGroup, secondGroupObject, currentDate, nextDate, secondEventObject, createSecondEvent, secondEventInDB, dayAfter, createMessage, messageInDB, messageObject }