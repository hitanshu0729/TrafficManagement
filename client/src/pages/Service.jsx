import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const Service = () => {
  const { services } = useAuth();

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="">Services </h1>
      </div>
      <ul>
      <li><Link to="/parking" className="btn btn-primary">Parking</Link></li>
      <li><Link to="/traffic" className="btn btn-primary">Traffic</Link></li>
      <li><Link to="/pedestrain" className="btn btn-primary">Pedestrian</Link></li>
      </ul>
    </section>
  );
};