import React, { useState } from "react";
import Helmet from "../../assets/helmet/Helmet";
import { Container, Form, FormGroup } from "reactstrap";

function ResetPassword(props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Helmet title="ResetPassword">
      <section>
        <Container>
          <Form
            onSubmit={handleResetPassword}
            className="auth__form resetPassword"
            style={{
              height: "250px",
            }}
          >
            {" "}
            <h3
              className="fw-bold fs-4
                 mb-4
                "
            >
              ResetPassword
            </h3>
            <FormGroup>
              <input
                placeholder="Your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>{" "}
            <button>
              <span class="circle1"></span>
              <span class="circle2"></span>
              <span class="circle3"></span>
              <span class="circle4"></span>
              <span class="circle5"></span>
              <span class="text">Submit</span>
            </button>
            {message && <p>{message}</p>}
          </Form>
        </Container>
      </section>
    </Helmet>
  );
}

export default ResetPassword;
