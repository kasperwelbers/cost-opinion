import { NextPage } from "next";

const Contact: NextPage = ({}) => {
  return (
    <main className={"AppComponent"}>
      <style jsx>{`
        .ContactForm {
          display: flex;
          margin: auto;
          color: white;
          max-width: 400px;
          padding: 5rem 2rem 2rem 2rem;
        }

        form {
          margin: auto;
          width: 100%;
        }
        form p {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          color: white;
        }
      `}</style>
      <div className="ContactForm">
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
            <textarea name="message"></textarea>
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
