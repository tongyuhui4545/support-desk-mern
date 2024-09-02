import { useState } from "react";
import { FaUser } from "react-icons/fa";
import {toast} from "react-toastify"

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
     e.preventDefault()
     if(password !== password2) {
        toast.error('Passwords do not match')
     }
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser></FaUser> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={email}
              onChange={onChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password2"
              name="password2"
              className="form-control"
              value={password2}
              onChange={onChange}
              placeholder="Re-enter your password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
