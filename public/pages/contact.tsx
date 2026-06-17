import { NextPage } from "next";

const Contact: NextPage = ({}) => {
  return (
    <main className={"AppComponent"}>
      <style jsx>{`
        .AppComponent {
          background: #0005;
        }
        .ContactForm {
          display: flex;
          flex-direction: column;
          margin: auto;
          color: white;
          max-width: 400px;
          padding: 5rem 2rem 2rem 2rem;
          text-align: center;
        }
        .Title {
          text-align: center;
        }

        form {
          margin: auto;
          box-sizing: border-box;
          width: 100%;
          border: 1px solid white;
          padding: 1rem 2rem;
          border-radius: 5px;
          font-size: 2rem;
          margin-top: 2rem;
        }
        form p {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          color: white;
        }
        form input {
          height: 3rem;
          font-size: 2rem;
          margin-top: 0.5rem;
        }
        form textarea {
          font-size: 2rem;
          margin-top: 0.5rem;
        }
        button {
          cursor: pointer;
          margin-top: 2rem;
          height: 5rem;
          font-size: 2.5rem;
          background: var(--primary);
          color: white;
          border: 3px solid white;
          border-radius: 5px;
        }
        button:hover,
        button:focus {
          background: var(--primary-light);
          color: var(--primary);
        }
        .LinkBox {
          padding: 1rem 0;
        }
      `}</style>
      <div className="ContactForm">
        <h2 className="Title">Contact us</h2>
        <p>
          If you have any questions or comments about this project, please feel
          free to reach out to us.{" "}
        </p>
        <form name="contact" method="post" data-netlify="true">
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <label>Name</label>
            <input type="text" name="name" />
          </p>
          <p>
            <label>Email</label>
            <input type="email" name="email" />
          </p>

          <p>
            <label>Message</label>
            <textarea rows={10} name="message"></textarea>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
        <br />
        <br />
        <div className="LinkBox">
          <h2 className="Title">Join the network</h2>
          <p>
            Are you interested in joining the network? Please use the following
            link for more details on how to apply
          </p>
          <a
            className="JoinLink"
            href="https://cost.eu/actions/CA21129/#tabs+Name:Working%20Groups%20and%20Membership"
            target="_blank"
            rel="noreferrer"
          >
            Apply to join OPINION
          </a>
        </div>
      </div>
    </main>
  );
};

export default Contact;
