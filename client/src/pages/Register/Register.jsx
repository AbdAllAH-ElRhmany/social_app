import { Link, useNavigate } from "react-router-dom";
import "./Register.css"
import { useRef,  } from "react";
import axios from "axios";

function Register() {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()

  const history = useNavigate()

  async function handleSubmit(e){
    e.preventDefault();
    console.log(passwordAgain.current.value )
    console.log(password.current.value )
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("Password don't match!")
    }else{
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
        await axios.post('/auth/register', user)
        history('/login')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">SocialApp</h3>
                <p className="loginDesc">Connect with friends and the world around you on SocialApp</p>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleSubmit}>
                    <input placeholder="Username" className="loginInput" type="text" ref={username} />
                    <input placeholder="Email" className="loginInput" type="email" ref={email} />
                    <input placeholder="Password" className="loginInput" type="password" ref={password} />
                    <input placeholder="Password Again" className="loginInput" type="password" ref={passwordAgain} />
                    <button className="loginButton" type="submit">Sign Up</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginRegisterButton">
                      <Link to={'/login'}>
                        Log into Account
                      </Link>
                    </button>
                </form>
            </div>
        </div>
      </div>
    </>
  );
}

export default Register;
