import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from 'screens/Home'
import Favorites from 'screens/Favorites'
import PhotoModal from 'screens/PhotoModal'
import Navigation from 'components/Mainnav'

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="(/|/photos/:id)" component={Home} />
        <Route exact path="/favorites/:id?" component={Favorites} />
        <Redirect to="/" />
      </Switch>
      <Route path="(/photos|/favorites)/:id" component={PhotoModal} />
    </>
  )
}

export default App
