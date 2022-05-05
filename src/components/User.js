import React from "react";
import Img from "../profile_image.png";

const User = ({user}) => {
  return (
    <div className='user_wrapper'>
        <div className='user_info'>
            <div className='user_detail'>
                <img className="avatar" alt="avatar" src={user.avatar || Img}/>
                <h4>{user.name}</h4>
            </div>
            <div className={`user_status ${user.isOnline? "online" : "offline"}`}></div>
        </div>

    </div>
  )
}

export default User