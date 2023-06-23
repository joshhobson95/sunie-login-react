import { useState, useEffect, useCallback, createContext } from 'react'

let logoutTimer

const AuthContext = createContext({
  jwtToken: '',
  login: () => {},
  logout: () => {},
  userId: null,
  accountType: ''
})

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime()
  const expTime = exp 
  const remainingTime = expTime - currentTime
  return remainingTime
}

const getLocalData = () => {
  const storedToken = localStorage.getItem('jwtToken')
  const storedExp = localStorage.getItem('exp')
  const storedId = localStorage.getItem('userId')
  const storedAccountType = localStorage.getItem('accountType')

  const remainingTime = calculateRemainingTime(storedExp)

  if (remainingTime <=   60 * 1000) {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('exp')
    localStorage.removeItem('userId')
    localStorage.removeItem('accountType')
    return null
  }


  return {
    jwtToken: storedToken,
    duration: remainingTime,
    userId: +storedId,
    accountType: storedAccountType
  }
}



export const AuthContextProvider = (props) => {
  const localData = getLocalData()
  
  let initialToken
  let initialId
  let initialAccountType
  if (localData) {
    initialToken = localData.jwtToken
    initialId = localData.userId
    initialAccountType = localData.accountType
  }

  const [jwtToken, setjwtToken] = useState(initialToken)
  const [userId, setUserId] = useState(initialId)
  const [accountType, setAcccountType] = useState(initialAccountType)


  const logout = useCallback(() => {
    setjwtToken(null)
    setUserId(null)
    setAcccountType('')

    localStorage.removeItem('jwtToken')
    localStorage.removeItem('exp')
    localStorage.removeItem('userId')
    localStorage.removeItem('accountType')
    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }, [])

  const login = (jwtToken, exp, userId, accountType) => {
    setjwtToken(jwtToken)
    setUserId(userId)
    setAcccountType(accountType)

    localStorage.setItem('jwtToken', jwtToken)
    localStorage.setItem('exp', exp)
    localStorage.setItem('userId', userId)
    localStorage.setItem('accountType', accountType)

    const remainingTime = calculateRemainingTime(exp)

    logoutTimer = setTimeout(logout, remainingTime)
  }

  useEffect(() => {
    if (localData) {
      logoutTimer = setTimeout(logout, localData.duration)
    }
  }, [localData, logout])

  const contextValue = {
    jwtToken,
    login,
    logout, 
    userId,
    accountType
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
