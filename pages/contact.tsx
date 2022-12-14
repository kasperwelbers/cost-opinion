import { NextPage } from "next";

const Contact: NextPage = ({}) => {
  return (
    <main className={"AppComponent"}>
      <style jsx>{`
        .ContactForm {
          display: flex;
          flex-direction: column;
          margin: auto;
          color: white;
          max-width: 400px;
          padding: 5rem 2rem 2rem 2rem;
          text-align: justify;
          hyptens: auto;
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
        }
        form textarea {
          font-size: 2rem;
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
            <label>Your Name:</label>
            <input type="text" name="name" />
          </p>
          <p>
            <label>Your Email:</label>
            <input type="email" name="email" />
          </p>

          <p>
            <label>Message:</label>
            <textarea rows={10} name="message"></textarea>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Contact;
