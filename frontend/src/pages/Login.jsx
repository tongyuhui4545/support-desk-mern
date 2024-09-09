import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import {toast} from "react-toastify"
import {useNavigate} from 'react-router-dom'
import  {useSelector, useDispatch} from 'react-redux'
import Spinner from "../components/Spinner"
import {login, reset} from '../features/auth/authSlice'


function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const {email, password } = formData;

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

  useEffect(() => {
    if(isError) { 
      toast.error(message)
    }
    if(isSuccess) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
     e.preventDefault()

     const userData = {
      email,
      password
     }

     dispatch(login(userData))
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt></FaSignInAlt> Login
        </h1>
        <p>Please log in</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
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
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
