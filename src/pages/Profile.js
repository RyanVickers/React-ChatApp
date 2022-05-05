import React, {useState} from "react";
import Image from "../profile_image.png";
import UploadImage from "../components/svg/UploadImage";

const Profile = () => {
    const [img, setImg] = useState("")
    console.log(img);
    return (
        <section>
            <div className="profile_container">
                <div className="img_container">
                    <img src={Image} alt="Profile"/>
                </div>
                <div>
                    <div className="overlay">
                        <label htmlFor="photo"><UploadImage/></label>
                        <input 
                        type="file"
                        accept="image/*" 
                        style={{display: "none"}} 
                        id="photo" 
                        onChange={(e)=> setImg(e.target.files[0])}/>
                    </div>
                </div>
                <div className="text_container">
                    <h3>User Name</h3>
                    <p>User Email</p>
                    <small>Joined on: ...</small>
                </div>
            </div>
        </section>
    )
}

export default Profile;