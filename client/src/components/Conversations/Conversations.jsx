import './Conversations.css'

export default function Conversations() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
    <div className='conversation'>
        <img src={PF+'person/1.jpeg'} alt="" className="conversationImg" />
        <p className="conversationName">John Doe</p>
    </div>
  )
}
