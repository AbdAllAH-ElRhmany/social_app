import { MoreVert } from "@mui/icons-material";
import "./Post.css";
import {useContext, useEffect, useState} from "react"
import axios from "axios";
import {format} from "timeago.js"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({post}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const {user:currentUser} = useContext(AuthContext);


    const [user, setUser] = useState({})
    useEffect(()=>{
        const fetchUser = async()=>{
            const res = await axios.get('/users/'+post.userId)
            setUser(res.data)
        }
        fetchUser()
    },[post.userId])


    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)

    
    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    const likeHandler = async()=>{
        try {
            await axios.put(`/posts/${post._id}/like`, {userId:currentUser._id});
        } catch (error) {
            console.log(error)
        }
        setLike(isLiked ? like-1: like+1)
        setIsLiked(!isLiked)
    }

    return <>
    <div className="post">

        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    {/* <img src={PF+Users.find(u=>u.id === post?.userId).profilePicture} alt="profileImg" className="postProfileImg" /> */}
                    {/* <span className="postUsername">{Users.find(u=>u.id === post?.userId).username}</span> */}
                    <Link to={"/profile/"+user._id}>
                        <img src={user.profilePicture?PF+user.profilePicture:PF+"person/noAvatar.png"} className="postProfileImg" alt="" />
                    </Link>
                    <div style={{display:"flex", flexDirection:"column",marginLeft:"10px"}}>
                        <Link to={"/profile/"+user._id}>
                            <span className="postUsername">{user.username}</span>
                        </Link>
                        <span className="postDate">{format(post.createdAt)}</span>

                    </div>
                </div>
                <div className="postTopRight">
                    <MoreVert />
                </div>
            </div>
            <div className="postCenter">
                <p className="postText">
                    {post?.desc}
                </p>
                <img src={PF+post.img||PF+"person/noCover.png"} alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={PF+`like.png`} className="likeIcon" alt="" onClick={likeHandler} />
                    <img src={PF+`heart.png`} className="likeIcon" alt="" onClick={likeHandler} />
                    <span className="postLikeCounter">{like} people like it</span>
                </div>
                <div className="postBottomRight">
                   <span className="postCommentText">{post.comment} comments</span> 
                </div>
            </div>
        </div>
    </div>
    </>
}