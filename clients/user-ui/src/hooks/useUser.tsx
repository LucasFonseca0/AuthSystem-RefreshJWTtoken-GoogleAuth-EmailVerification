import { useQuery } from '@apollo/client'
import { GET_USER } from '../graphql/actions/getUser.action'

const useUser = () => {
  try{
      const {loading,data} = useQuery(GET_USER)
    const user = data.getLoggedInUser.user
    console.log(user)
  return {
    loading,
    user
  }}catch(error){
    
    return{
      loading:null, 
      user:null
    }
  }
}

export default useUser
