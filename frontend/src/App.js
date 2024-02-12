import './App.css';
import MainList from './components/mainList/mainList.jsx';
import { useDescope, useSession, useUser } from '@descope/react-sdk'
import { Descope } from '@descope/react-sdk'
import { getSessionToken } from '@descope/react-sdk';
import { useCallback, useEffect} from 'react'

function App() {
  const { isAuthenticated, isSessionLoading } = useSession()
  const { user, isUserLoading } = useUser()
  const { logout } = useDescope()


  const handleLogout = useCallback(() => {
    console.log("te atnak")
    logout()
  }, [logout])


  return (
    <>
      {!isAuthenticated &&
        (
          <div className='auth'>
          <Descope
            flowId="sign-up-or-in"
            onSuccess={(e) => console.log(e.detail.user)}
            onError={(e) => console.log('Could not log in!')}
          />
          </div>
        )
      }

      {
        (isSessionLoading || isUserLoading) && <p>Loading...</p>
      }

      {!isUserLoading && isAuthenticated &&
        (
          <div>
            <MainList />
            <button className='signout' onClick={handleLogout}>izrakstities</button>
          </div>

        )
      }
    </>
  )
}
export default App
