
import { useEffect, useState } from "react";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import "./Profile.css";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function Profile(){

    const {userId} = useParams();
    const [user, setUser] = useState({})
    useEffect(()=>{
        const fetchUser = async()=>{
            const res = await axios.get('/users/'+userId)
            setUser(res.data)

        }
        fetchUser()
    },[userId])

    // console.log(params)

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return <>
    <Topbar />
    <div className="profile">
        <Sidebar />
        <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
                <img src={user.coverPicture|| PF+"person/noCover.png"} alt="" className="profileCoverImg" />
                <img src={user.profilePicture|| PF+"person/noAvatar.png"} alt="" className="profileUserImg" />

            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <p className="profileInfoDesc">{user.desc}</p>
            </div>
        </div>
        <div className="profileRightBottom">
            <Feed userId={userId} />
            <Rightbar user={user} />

        </div>
        </div>

    </div>
</>
}