import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "./style/Laoder.css";
import Login from "./components/Login";
import Cards from "./components/Cards";
import Register from "./components/Register";
import NavBar from "./components/NavBar";
import PageNotFound from "./components/PageNotFound";
import NewCard from "./components/NewCard";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
import About from "./components/About";
import FavoriteCards from "./components/FavoriteCards";
import MyCards from "./components/MyCards";
import { ThemeProvider } from "./context/ThemeContext";
import SearchProvider from "./context/SearchContext";
import AdminPanel from "./components/AdminControl";
import EditCard from "./components/EditCard";
import Header from "./components/Header";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {

  return (
    <ThemeProvider>
      <SearchProvider>
      <div className="col-12 container-fluid d-flex flex-column align-items-center p-0 m-0">
        <ToastContainer />
        <Router>
          <AuthProvider>
            <NavBar />
            <Header />
            <Routes>
              <Route path="/" element={<Cards />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/new-card" element={<NewCard />} />
              <Route path="/about" element={<About />} />
              <Route path="/favorite-cards" element={
                <ProtectedRoute>
                  <FavoriteCards />
                </ProtectedRoute>
              } />
              <Route path="/my-cards" element={<MyCards />} />
              <Route path="/admin-panel" element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } />
              <Route path="/edit-card/:id" element={
                <ProtectedRoute>
                  <EditCard />
                </ProtectedRoute>
              } />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </AuthProvider>
        </Router>
        <div className="col-12 p-5"></div>
      </div>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
