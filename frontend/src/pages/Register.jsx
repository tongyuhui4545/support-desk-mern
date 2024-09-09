import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom"
import { FaUser } from "react-icons/fa";
import {toast} from "react-toastify"
import  {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)
 
  useEffect(() => { console.log(isError, isSuccess);
  
    if(isError) {   
      toast.error(message)
    }
   if(isSuccess && user) { 
      toast.success('User registered successfully')
    navigate('/')
    }

   dispatch(reset())
  }, [isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
     e.preventDefault()
     if(password !== password2) {
        toast.error('Passwords do not match')
     } else {
      const userData = {
        name,
        email,
        password
      }
     dispatch(register(userData))

     }
  }

  if(isLoading) {
    return <Spinner />
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
