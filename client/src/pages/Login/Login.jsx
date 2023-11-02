import { useContext, useRef } from "react";
import "./Login.css"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

function Login() {
  const email = useRef();
  const password = useRef();

  const {user, isFetching, error, dispatch} = useContext(AuthContext)

  function handleClick(e){
    e.preventDefault();
    loginCall({email:email.current.value, password:password.current.value}, dispatch)
  }
  console.log(user)
  return (
    <>
      <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">SocialApp</h3>
                <p className="loginDesc">Connect with friends and the world around you on SocialApp</p>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Email" type="email" className="loginInput" ref={email} />
                    <input placeholder="Password" type="password" minLength={6} className="loginInput" ref={password} />
                    <button className="loginButton">{isFetching? <CircularProgress color="secondary" />:"Log In"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginRegisterButton">
                    <Link to={'/register'}>
                        Create a New Account
                    </Link>
                    </button>

                </form>
            </div>
        </div>
      </div>
    </>
  );
}

export default Login;
