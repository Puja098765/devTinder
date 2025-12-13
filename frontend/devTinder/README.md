# DevTinder

- Created a Vite + React application
- Remove unnecessary code and create a hello World page
- Install Tailwind css
- Install Daisy UI
- Add NavBar component to App.jsx
- Create a NavBar.jsx separate Component file
- Install react router dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create an Outlet in your Body Component
- Create a footer
- Create a Login Page
- Make a function to make login api call by    using axios(Install axios) inplace of fetch and cors error came to solve this 
- install cors in backend and add it as a plugin/middleware with configurations: origin: "http://localhost:5173", credentials: true  in app.js by importing it
- Whenever making API call so pass  axios =>{ withCredentials: true }

- Install react-redux + @reduxjs/toolkit => configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store 
- NavBar should update as soon as user logs in
- Refactor our code to add constants file + create a components folder




Body
    NavBar
    Route=/  =>Feed
    Route=/login  =>Login
    Route=/connection => Connections
    Route=/profile => Profile