import { Analytics } from "../components/Analytics";
export const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We are the World Best Team</p>
              <h1>Hello From Team Neuron</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint
                sit officiis non fugiat nemo minus quos maiores quam id
                cupiditate, voluptate officia eaque suscipit veniam doloribus,
                delectus asperiores a assumenda? Perferendis est accusamus at
                nostrum facilis vero ipsa consectetur fugit velit inventore
                iusto quaerat molestias earum, magni excepturi a asperiores illo
                expedita! Corporis ad, quibusdam sapiente distinctio dolor
                doloribus ab.
              </p>
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
              </div>
            </div>

            {/* hero images  */}
            <div className="hero-image">
              <img
                src="/images/car.jpeg"
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      {/* 2nd section  */}
      <Analytics />

      {/* 3rd section  */}
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          {/* hero images  */}
          <div className="hero-image">
            <img
              src="/images/car2.jpeg"
              alt="coding together"
              width="400"
              height="500"
            />
          </div>

          <div className="hero-content">
            <p>We are here to help you</p>
            <h1>Get Started Today</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium omnis odit natus. Assumenda officia expedita alias
              sint odit, porro facere delectus tempora odio quod natus
              perspiciatis autem rem laborum beatae. Eaque facilis unde quam
              dolor voluptas, sapiente eligendi voluptates tempore ea quia. A
              eveniet sequi accusamus rerum provident deserunt? Aspernatur
              dolorem a alias adipisci enim aliquam ipsa esse repellendus
              laudantium?
            </p>
            <div className="btn btn-group">
              <a href="/contact">
                <button className="btn">connect now</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
