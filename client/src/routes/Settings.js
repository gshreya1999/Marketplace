import { Link } from "react-router-dom";
export default function Settings(props) {
    return <div>
       <Link to="/transactions">
       <button className="button">
        View Transaction History
      </button>
      </Link>
    </div>
  }