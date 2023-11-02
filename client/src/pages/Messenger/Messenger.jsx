import Conversations from '../../components/Conversations/Conversations'
import Message from '../../components/Message/Message';
import Topbar from '../../components/Topbar/Topbar'
import './Messenger.css'

export default function Messenger() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
        <Topbar />
        <div className='messenger'>
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder='Search for friends' className="chatMenuInput" />
                    <Conversations />
                    <Conversations />
                    <Conversations />
                    <Conversations />
                    <Conversations />
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <Message />
                        <Message />
                        <Message />
                    </div>
                    <div className="chatBoxBottom"></div>
                </div>

            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper"></div>

            </div>
        </div>
    </>
  )
}
