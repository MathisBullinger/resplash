import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PageContainer from 'screens/PageContainer'
import PhotoModal from 'screens/PhotoModal'
import Navigation from 'components/Mainnav'

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Switch>
        <Route
          exact
          path={['/', '/favorites/:id?', '/photos/:id']}
          component={PageContainer}
        />
        <Redirect to="/" />
      </Switch>
      <Route path="(/photos|/favorites)/:id" component={PhotoModal} />
    </>
  )
}

export default App
