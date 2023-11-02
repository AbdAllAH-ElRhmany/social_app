import './Message.css'

export default function Message() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div lassName="message">
        <div className="messageTop">
            <img src={PF+'person/1.jpeg'} alt="" className="messageImg" />
            <p className="messageText">Hello this is a message</p>
        </div>
        <div className="messageBottom">
            1 hour ago
        </div>
    </div>
  )
}
