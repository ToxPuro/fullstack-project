const createApolloServer = require("./createApolloServer")
const scheduledJob = require("./scheduled-job")

const main = async () => {
  const { app, apolloServer } = await createApolloServer()
  await scheduledJob()
  const PORT = process.env.PORT
  await new Promise(resolve => app.listen({ port: PORT }, resolve))
  console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
}

main()
