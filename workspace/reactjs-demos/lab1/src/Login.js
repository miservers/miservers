import {useState} from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import { Avatar, Image } from 'antd';

const clientId = '1033765349451-2omc7ek4hcs40v6lihqhglpqcmf0qgfo.apps.googleusercontent.com'

export const Login = () => {
    const [logged, setlogged] = useState(false)
    const [profile, setProfile] = useState({email:null, familyName: null,
                                            givenName: null, imageUrl: null,
                                            name: null})  //retrieved from response profileObj  

    const onSuccess = (response) => {
        setlogged(true)
        setProfile(response.profileObj)
        console.log(response.profileObj.name, ' is logged!')
    }
    const onFailure = (error) => console.log(error)

    const onLogoutSuccess = () => setlogged(false)
    
    if (logged) 
        return (
            <> 
            <Avatar src={<Image src={profile.imageUrl}/> }/> {profile.name}
            <br/>
            <GoogleLogout 
             clientId={clientId}
             buttonText="Sign out"
             onLogoutSuccess={onLogoutSuccess}
            />
            </>
        )
    
    return (
        <>  
         <GoogleLogin
            clientId={clientId}
            buttonText="Sign in"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
            style={{margin:'200px'}}
        />
        </>
    )
}

export const Logout = (name, onLogoutSuccess) => {
    console.log(onLogoutSuccess)
    return (
        <>
        <GoogleLogout 
             clientId={clientId}
             buttonText="Sign out"
             onLogoutSuccess={onLogoutSuccess}
        />
        </>
    )
}