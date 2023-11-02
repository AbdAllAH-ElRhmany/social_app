import { Cancel, EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material"
import "./Share.css"
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Share({userId}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext)

    const desc = useRef();
    const [file, setFile] = useState(null)



    const handleSubmit = async(e)=>{
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        }
        if(file){
            const data = new FormData();
            
            data.append('file', file);
            try {
                const res = await axios({
                    method:'post',
                    url: '/upload',
                    data: data,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                newPost.img = res.data.name;

            } catch (error) {
                console.log(error)
            }
        }
        try {
           await axios.post('/posts', newPost)
           window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    
    return <>
    <div className="share">

        <div className="shareWrapper">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture? PF+user.profilePicture: PF+"person/noAvatar.png"} alt="profileImg" className="shareProfileImg" />
                
                    <input type="text" placeholder={`What's in your mind ${user.username}?`} className="shareInput" ref={desc} />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} className="shareImg" alt="" />
                        <Cancel className="shareCancelImg" onClick={()=>setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={handleSubmit}>
                    <label htmlFor="file" className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon" />
                        <span className="shareOptionText">Photo/Video</span>
                        <input type="file" hidden name="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=> setFile(e.target.files[0])} />
                    </label>
                    <div className="shareOption">
                        <Label htmlColor="green" className="shareIcon" />
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room className="shareIcon" htmlColor="blue" />
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                        <span className="shareOptionText">Feelings</span>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    </div>
    </>
}