import { Link, useMatch, useResolvedPath, useLocation } from "react-router-dom";


function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

function Navbar() {
  return (
    <nav className="nav">
      <Link to="/home" className="site-title">
        MarketPlace
      </Link>
      <ul>
        <CustomLink to="/post">Post An Ad</CustomLink>
        <CustomLink to="/settings">Settings</CustomLink>
      </ul>
    </nav>
  )
}

function App() {
  const location = useLocation();

  return location.pathname === "/" || location.pathname === "/signup" ? null : <Navbar />;
}

export default App;
