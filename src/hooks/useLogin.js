import { useApolloClient ,useMutation } from "@apollo/client"
import { LOGIN, SIGN_IN } from "../graphql/mutations"
import { useHistory } from "react-router-dom"


const useLogin = (setToken, setNotification) => {
  const history = useHistory()
  const client = useApolloClient()
  console.log("history", history)
  const [ signInMutation] = useMutation(SIGN_IN, {
    onError: (error) => {
      setNotification({ message: error.graphQLErrors[0].message })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

  })
  const [ loginMutation ] = useMutation(LOGIN, {
    onError: (error) => {
      setNotification({ message: error.graphQLErrors[0].message, error: true })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  })

  const login = async ({ username, password }) => {
    console.log(username, password)
    const result = await loginMutation({ variables: { username, password } })
    console.log(result)
    if(result.data.login.value){
      setToken(result.data.login.value)
      localStorage.setItem("user-token", result.data.login.value)
      history.push("/")
    }

  }

  const logout =  () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const signIn = async( username, name, password ) => {
    const result = await signInMutation({ variables: { username, name, password } })
    return result
  }



  return{
    login,
    logout,
    signIn
  }
}

export default useLogin