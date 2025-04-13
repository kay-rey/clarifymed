import React from 'react'
import { Button } from './ui/button'

const Logout = () => {
  return (
      <div>
     
        <a href="/auth/logout">
          <Button>Log out</Button>
        </a>
    
    </div>
  )
}

export default Logout