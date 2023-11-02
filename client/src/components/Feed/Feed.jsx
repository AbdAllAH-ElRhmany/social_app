import { useContext, useEffect, useState } from "react";
import Post from "../Post/Post";
import Share from "../Share/Share";
import axios from "axios"
import "./Feed.css";
import { AuthContext } from "../../context/AuthContext";
// import {Posts} from "../../dummyData"

export default function Feed({userId}){
    const [posts, setPosts] = useState([]);

    const {user} = useContext(AuthContext);



    useEffect(()=>{
        const fetchData = async()=>{
            const res = userId? await axios.get('/posts/profile/'+user._id)
            : await axios.get('posts/timeline/'+user._id)
            // const data = await res.json()
            setPosts(res.data.sort((p1, p2)=>(
                new Date(p2.createdAt) - new Date(p1.createdAt)
            )))
            // console.log(res)

        }
        fetchData()
    },[user._id])
    return <>
    <div className="feed">

        <div className="feedWrapper">
            {(!userId || userId === user._id) && <Share />}
            {posts.map(p=> (<Post key={p._id} post={p} />))}
        </div>
    </div>
    </>
}