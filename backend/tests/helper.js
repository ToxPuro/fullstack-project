const {LOGIN} = require("./queries")


// passwordHash is encrypted from 'salainen'
const passwordHash = '$2b$10$BWXtVXCXvNrRRNelbC8McurdUJdPBV2qrug6pISDZV5HPPA9V0Ok2'
const userObject =  {username: "TestiUsername", name: "TestName", events: [], passwordHash}
const groupObject = {name: "TestGroup"}

const login = async (setOptions, mutate) => {
  const token = await mutate(LOGIN)
  console.log(token.data.login.value)
  setOptions({
    request: {
      headers: {
        authorization: `bearer ${token.data.login.value}`,
      }
    }
  });
  return token
}





module.exports = {userObject, groupObject, login}