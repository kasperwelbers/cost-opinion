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
        <h2>
          The contact form is disabled, because the project has ended
        </h2>
      </div>
    </main>
  );
};

export default Contact;
