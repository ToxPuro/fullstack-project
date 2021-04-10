const createApolloServer = require("./createApolloServer")


const main = async () => {
  const { app, apolloServer } = await createApolloServer()
  const PORT = process.env.PORT
  await new Promise(resolve => app.listen({ port: PORT }, resolve))
  console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
}

main()
