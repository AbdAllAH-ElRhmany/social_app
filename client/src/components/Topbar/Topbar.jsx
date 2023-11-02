import { Chat, Notifications, Person, Search } from "@mui/icons-material"
import "./Topbar.css"
import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function Topbar(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const {user} = useContext(AuthContext)
    return <>
        <header>
            <div className="container">

                <div className="topbarContainer">
                    <div className="topbarLeft">
                        <Link to='/'>
                            <h1 className="logo">SocialApp</h1>
                        </Link>
                    </div>
                    <div className="topbarCenter">
                        <div className="searchbar">
                            <Search />
                            <input type="text" placeholder="Search for friend, post or video" className="searchInput" name="" id="" />
                        </div>
                    </div>
                    <div className="topbarRight">
                        <div className="topbarLinks">
                        <Link to='/'><span className="topbarLink">Homepage</span></Link>
                        <Link to='/'>  <span className="topbarLink">Timeline</span></Link>
                        </div>
                        <div className="topbarIcons">
                            <div className="topbarIconItem">
                                <Person />
                                <span className="topbarIconBadge">1</span>
                            </div>
                            <div className="topbarIconItem">
                                <Link to={'/messenger'}>
                                    <Chat />
                                    <span className="topbarIconBadge">2</span>

                                </Link>
                            </div>
                            <div className="topbarIconItem">
                                <Notifications />
                                <span className="topbarIconBadge">1</span>
                            </div>
                        </div>
                        <div>

                        <Link to={'/profile/'+user._id}><img src={user.profilePicture?PF+user.profilePicture:PF+'person/noAvatar.png '} alt="profileImg" className="topbarImg" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </>
}