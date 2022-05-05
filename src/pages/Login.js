import React, {useState} from "react";
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth, db} from '../firebase'
import {updateDoc, doc} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [data,setData] = useState({
        email: '',
        password: '',
        error: '',
        loading: '',
    });

    const navigate = useNavigate();

    const {email, password, error, loading} = data;
    //fucntion to handle from changes
    const handleChange = e =>{
        setData({...data, [e.target.name]: e.target.value});
    };
    //fucntion to handle form submit
    const handleSubmit = async e => {
        e.preventDefault();
        setData({...data, error: null, loading: true});
        if (!email || !password){
            setData({...data, error: "All Fields Are Required!"})
        }
        try{
            //Creating user with firebase auth
            const result = await signInWithEmailAndPassword(auth, email, password);
            //Updating to set user isOnline to true
            await updateDoc(doc(db , 'users', result.user.uid), {
                isOnline: true,
            });
            //Reset form
            setData({email:'', password:'', error: null, loading: false });
            //Redirect to homepage
            navigate("../", {replace:true})
        }catch(err){
            //Display error message
            setData({...data, error: err.message, loading: false});
        }
    }
    return(
        <section>
            <h3>Create An Account</h3>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input_container">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={handleChange}/>
                </div>
                <div className="input_container">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" value={password} onChange={handleChange}/>
                </div>
                {error ? <p className="error">{error}</p>: null}
                <div className="btn_container">
                    <button className="btn" disabled={loading}>Login</button>
                </div>
            </form>
        </section>
    )
 }
   
 export default Login;