import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
    
    
const GithubContext = createContext()

const GITHUB_URL= process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN= process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)


    //get initial Users (testing purposes)
    const fetchUsers=  async ()=>{

        setLoading()

        const response= await fetch(`${GITHUB_URL}/users`,{
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`
        }
     }) 

     
     const data= await response.json()
     
     dispatch({
        type: 'GET_USERS',
        payload: data,
     })
   }

   //Get searched users by text
   const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`,{
                        headers: {
                            Authorization: `token ${GITHUB_TOKEN}`
                            
                        }
                        
                    })

                    
        const {items}= await response.json()
         //const data= await response.json()
                    console.log(items)

         dispatch({

            type: 'SEARCH_USER',
            payload: items,
         }

         )
   }


   //Get single user
   const getUser = async (login) => {
    setLoading()

    
    const response = await fetch(`${GITHUB_URL}/users/${login}`,{
                    headers: {
                        Authorization: `token ${GITHUB_TOKEN}`
                        
                    }
                    
                })

        if(response.status=== 404){
            window.location('./not-found')
        }else{

            const data= await response.json()
     //const data= await response.json()
                console.log(data)

     dispatch({

        type: 'GET_USER',
        payload: data,
     })

        }
                
    
}
   


//clear users from UI on Clear btn clicked

 const clearUsers = () =>{
    setLoading()
    dispatch({
        type: 'CLEAR_USERS'

    })
 }

   //set Loading function using Reducers
   const setLoading = () => dispatch({
        type: 'SET_LOADING'
     })

   

    return <GithubContext.Provider value={{
           loading:  state.loading,
            users :  state.users,
            user :  state.user,
            fetchUsers,
            searchUsers,
            getUser,
            clearUsers,


    }}>
    
    {children}
    
    
    </GithubContext.Provider>

    
}

export default GithubContext