import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateTree from "./components/CreateTree";
import TreeHistory from "./components/TreeHistory";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>🌳 Binary Search Tree Visualizer</h1>
          <p>Create and visualize binary search trees</p>
        </header>

        <nav className="nav">
          <Link to="/" className="nav-link">
            Create Tree
          </Link>
          <Link to="/history" className="nav-link">
            View History
          </Link>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<CreateTree />} />
            <Route path="/history" element={<TreeHistory />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2024 BST Visualizer | Keyin College Sprint Project</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
