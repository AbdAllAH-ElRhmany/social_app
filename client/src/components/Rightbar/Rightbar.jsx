import "./Rightbar.css";
import { Users } from "../../dummyData";
import Online from "../Online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({user}){
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([])
  const {user:currentUser, dispatch} = useContext(AuthContext)

  const [followed, setFollowed] = useState(currentUser.following.includes(user?._id))


  useEffect(()=>{
    const getFriends = async()=>{
      try {
        if(user){
        const res = await axios('/users/friends/'+user?._id);
        console.log(999, user)
        setFriends(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
      getFriends();
  }, [user])
  
  
  useEffect(()=>{
    setFollowed(currentUser.following.includes(user?._id))
  },[currentUser, user])
  
  async function followHandler(){
    try {
      await axios.put(`/users/${user._id}/${followed?"unfollow":'follow'}`, {userId: currentUser._id});
      dispatch({type:followed?"UNFOLLOW":'FOLLOW',payload: user._id})
      setFollowed(!followed)
    } catch (error) {
      console.log(error)
    }
  }


    const HomeRightbar = ()=>{
        return <>
            <div className="birthdayContainer">
                <img src={PF+`gift.png`} alt="" className="birthdayImg" />
                <span className="birthdayText">
                    <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
                </span>
            </div>
            <img src={PF+`ad.png`} alt="" className="rightbarAd" />
            <h4 className="rightbarTitle">Online Friends</h4>
            <ul className="rightbarFriendList">
                {Users.map(u=> (<Online key={u.id} user={u} />))}
            </ul>
        </>
    }


    const ProfileRightbar = () => {
        return (
          <>
          {user._id !== currentUser._id && (
            <button className="rightbarFollowButton" onClick={followHandler}>
              {followed? "Unfollow":"Follow"} 
              {followed? <Remove />:<Add />} 
            </button>
          )}
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoValue">{user.city}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoValue">{user.from}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoValue">{user.relationship === 1 ? "Single":"Married"}</span>
              </div>
            </div>
            <h4 className="rightbarTitle">User friends</h4>
            <div className="rightbarFollowings">
               {friends.map(f=>(
                <Link key={f._id} to={'/profile/'+f._id} className="rightbarFollowing">
                  <img
                    src={f.profilePicture?PF+f.profilePicture:PF+'person/noAvatar.png'}
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">{f.username}</span>
                </Link>

              ))} 
              
            </div>
          </>
        );
      };

    return <>
    <div className="rightbar">
        <div className="rightbarWrapper">
          {user ? <ProfileRightbar /> : <HomeRightbar />}

        </div>

    </div>
    </>
}