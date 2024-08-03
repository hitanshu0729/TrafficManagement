import { NavLink } from "react-router-dom";
import { Analytics } from "../components/Analytics";
import { useAuth } from "../store/auth";

export const About = () => {
  const { user } = useAuth();
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              {/* <p>We care to cure your Health</p> */}
              <p>
                Welcome,
                {user ? ` ${user.username} to our website` : ` to our website`}
              </p>
              <h1>What are the effects of Traffic Mismanagement? </h1>
              <p>
              Congestion: Inefficient traffic management often leads to congestion, causing delays and frustration for commuters.

              </p>
              <p>
              Increased Travel Time: Traffic mismanagement results in longer travel times, impacting productivity and quality of life for individuals.
              </p>
              <p>
              Inefficient Public Transportation: In cities where public transportation systems are not well-managed or integrated with other transportation modes, commuters may face delays, overcrowding, and unreliable service. This can discourage people from using public transit, leading to increased reliance on private vehicles and worsening traffic congestion.
              </p>
              <p>
              Road Rage: Frustration stemming from congestion and delays may escalate into road rage incidents, endangering public safety and exacerbating social tensions.
              </p>
              <p>
              Infrastructure Strain: Overloaded roads due to poor traffic management can accelerate wear and tear on infrastructure, necessitating costly repairs and maintenance.
              </p>
              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn"> Add Reviews</button>
                </NavLink>
                
              </div>
            </div>
            <div className="hero-image">
              <img
                src="/images/Designer.png"
                alt="coding buddies "
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      <Analytics />
    </>
  );
};
