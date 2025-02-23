import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/auth/LoginPage"
import SignUpPage from "./pages/auth/SignUpPage"
import { AuthProvider } from "./contexts/AuthContext"
import TokenTest from "./pages/auth/TokenTest"

function App() {

  return (
    <>
      <AuthProvider>
        <div className="max-w6x1 mx-auto">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/dashboard' element={<TokenTest /> } />
          </Routes>
        </div>
      </AuthProvider>
    </>
  )
}

export default App
