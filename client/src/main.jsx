import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { Auth0Provider } from '@auth0/auth0-react';



ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="biswarup-ghosh.jp.auth0.com"
    clientId="762lymNJpkKrznrJPE4kWs3hyPSk4ufs"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <BrowserRouter >
      <App />
    </BrowserRouter >
  </Auth0Provider>
)
