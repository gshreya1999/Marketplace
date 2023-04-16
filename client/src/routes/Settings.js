import { Link } from "react-router-dom";
import "./Settings.css";

export default function Settings(prop) {
  return (
    <div className="container">
      <h1 className="heading">Account Settings</h1>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="d-grid gap-3">
            <Link to="/update-listing">
              <button className="btn btn-primary btn-lg btn-custom" style={{ marginBottom: "50px", marginTop: "25px",width:"50%",height:"50%" }}>
                <i className="fas fa-pencil-alt"></i>Update a Listing
              </button>
            </Link>
            <Link to="/remove-listing">
              <button className="btn btn-primary btn-lg btn-custom" style={{ marginBottom: "50px",width:"50%",height:"50%"}}>
                <i className="far fa-trash-alt"></i>Remove a Listing
              </button>
            </Link>
            <Link to="/changepass">
              <button className="btn btn-primary btn-lg btn-custom" style={{ marginBottom: "50px",width:"50%",height:"50%"}}>
                <i className="fas fa-key"></i>Change Password
              </button>
            </Link>
            <Link to="/transactions">
              <button className="btn btn-primary btn-lg btn-custom" style={{ marginBottom: "50px", width:"50%",height:"50%"}}>
                <i className="fas fa-history"></i>View Transaction History
              </button>
            </Link>
            <Link to="/delete-account">
              <button className="btn btn-danger btn-lg" style={{ marginBottom: "50px", width:"50%",height:"50%"}}>
                <i className="fas fa-trash-alt"></i>Delete Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
