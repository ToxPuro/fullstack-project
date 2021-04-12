import { useApolloClient ,useMutation } from "@apollo/client"
import { LOGIN } from "../graphql/mutations"
import { useHistory } from "react-router-dom"


const useLogin = (setToken) => {
  const client = useApolloClient()
  const history = useHistory()
  const [ loginMutation ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    }
  })

  const login = async ({ username, password }) => {
    console.log(username, password)
    const result = await loginMutation({ variables: { username, password } })
    setToken(result.data.login.value)
    localStorage.setItem("user-token", result.data.login.value)
    history.push("/")
  }

  const logout =  () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }



  return{
    login,
    logout
  }
}

export default useLogin