import { NextPage } from "next";

const Contact: NextPage = ({}) => {
  return (
    <main className={"AppComponent"}>
      <style jsx>{`
          .ContactForm {
            margin: auto;
            width: 500px;
            max-width: 100%
            color: white;
            padding: 5rem 2rem 2rem 2rem;
          }
          .ContactForm label {
            min-width: 100rem;
          }
          form p {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            color: white;
          }
          
        `}</style>
      <div className="ContactForm">
        <form name="contact" method="POST" data-netlify="true">
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
