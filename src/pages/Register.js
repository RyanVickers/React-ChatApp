import React, {useState} from "react";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth, db} from '../firebase'
import {setDoc, doc, timeStamp, Timestamp} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

const Register = () => {
    const [data,setData] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: '',
    });

    const navigate = useNavigate();

    const {name, email, password, error, loading} = data;
    //fucntion to handle from changes
    const handleChange = e =>{
        setData({...data, [e.target.name]: e.target.value});
    };
    //fucntion to handle form submit
    const handleSubmit = async e => {
        e.preventDefault();
        setData({...data, error: null, loading: true});
        if (!name || !email || !password){
            setData({...data, error: "All Fields Are Required!"})
        }
        try{
            //Creating user with firebase auth
            const result = await createUserWithEmailAndPassword(auth, email, password);
            //Adding user to database
            await setDoc(doc(db , 'users', result.user.uid), {
                uid: result.user.uid,
                name, 
                email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true,
            });
            //Reset form
            setData({name:'', email:'', password:'', error: null, loading: false });
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
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={handleChange}/>
                </div>
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
                    <button className="btn" disabled={loading}>Register</button>
                </div>
            </form>
        </section>
    )
 }
   
 export default Register;