import React from 'react'
import { NavLink, Navigate, Outlet, useLocation, useRoutes } from 'react-router-dom'
import './index.css'

const users = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
  { id: 3, name: 'User 3' },
  { id: 4, name: 'User 4' },
  { id: 5, name: 'User 5' }
]

const routes = (location) => [
  {
    path: '/',
    element: (
      <>
        <h1>Home page</h1>
        <NavLink to='users'>Users</NavLink>
      </>
    )
  },
  {
    path: '/users',
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        path: '',
        element: (
          <>
            <h1>Users page</h1>
            <NavLink to='/'>Home</NavLink>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <NavLink to={`/users/${user.id}`}>{user.name}</NavLink>
                </li>
              ))}
            </ul>
          </>
        )
      },
      {
        path: ':userId',
        element: (
          <>
            <Outlet />
          </>
        ),
        children: [
          {
            path: '',
            element: (
              <>
                <h1>User page</h1>
                <p>userId: {location.pathname.slice(7)}</p>
                <div><NavLink to='/users'>All users</NavLink></div>
                <div><NavLink to='edit'>Edit user</NavLink></div>
              </>
            )
          },
          {
            path: 'edit',
            element: (
              <>
                <h1>Edit page</h1>
                <p>userId: {location.pathname.slice(7).slice(0, -5)}</p>
                <div><NavLink to='/users'>All users</NavLink></div>
                <div><NavLink to='..'>User page</NavLink></div>
                <div><NavLink to={`/users/${+location.pathname.slice(7).slice(0, -5) + 1}`}>Another user page</NavLink></div>
              </>
            )
          },
          {
            path: '*',
            element: <Navigate to={'edit'} />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to={''} />
  }
]

function App() {
  const location = useLocation()
  const elements = useRoutes(routes(location))
  return <div className='container'>{elements}</div>
}

export default App
