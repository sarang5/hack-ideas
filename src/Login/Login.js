import { useRef } from "react";
import './Login.css';

const Login = () => {
    const empRef = useRef();
    const loginUser = async () => {
        
        try {
            const id = empRef.current.value;
            const res = await fetch(`http://localhost:8000/users/${id}`);
            if (!res.ok) {
                throw Error('Login error');
            }
            const data = await res.json();
            sessionStorage.setItem('hackUser', JSON.stringify(data));
            window.location.href = "/";
        } catch (err) {
            console.error('Employee id does not exist, cannot login ' + err);
        }
    };

    return (
        <div className="login">
            <input ref={empRef} type="text" name="employee-id"></input>
            <button onClick={loginUser}>Login</button>
        </div>
    );
}

export default Login;