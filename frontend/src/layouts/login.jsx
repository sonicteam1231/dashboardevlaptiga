import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, reset } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isSuccess && user) {
            navigate("/"); // Navigasi hanya jika login berhasil
        }
        if (isError) {
            console.error("Login failed:", message); // Log kesalahan
        }
        dispatch(reset());
    }, [isSuccess, user, isError, message, dispatch, navigate]);


    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({ username, password }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
            <form
                onSubmit={Auth}
                className="p-6 bg-white dark:bg-slate-800 shadow-md rounded-md"
            >
                {isError && <p className="text-red-500 mb-4">{message}</p>}
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                <div className="mb-4">
                    <label className="block mb-2">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-slate-700"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-slate-700"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    {isLoading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;
