import { SignInSchema, SignUpSchema } from "@ghagevaibhav/medium-common";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";

type AuthType = "signup" | "signin";

interface AuthProps {
    type: AuthType;
}

export const Auth = ({ type }: AuthProps) => {
    const navigate = useNavigate();

    const [postInputs, setPostInputs] = useState<SignInSchema | SignUpSchema>(
        type === "signup"
            ? { username: "", password: "", email: "" } as SignUpSchema
            : { email: "", password: "" } as SignInSchema
    );

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/user/${type === 'signup' ? "signup" : "signin"}`, {
                email: postInputs.email,
                password: postInputs.password,
                ...(type === 'signup' && 'username' in postInputs ? { username: postInputs.username } : {})
            });

            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate('/blogs');
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <div>
                    <div className="px-10 flex flex-col justify-center">
                        <div className="text-3xl font-extrabold">
                            {type === "signup" ? "Create an account" : "Sign into account"}
                        </div>
                        <div className="text-slate-400 text-center">
                            {type === "signin" ? "Don't have an account?" : "Already have an account"}
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>{type === "signin" ? "Sign up" : "Sign in"}</Link>
                        </div>
                    </div>
                    <div className="pt-4">
                        {type === "signup" ? <LabelledInput
                            type="text"
                            label="Username"
                            placeholder="testuser"
                            onChange={(e) => setPostInputs((c) => ({ ...c, username: e.target.value }))}
                        /> : null}

                        <LabelledInput
                            type="email"
                            label="Email"
                            placeholder="testuser@gmail.com"
                            onChange={(e) => setPostInputs((c) => ({ ...c, email: e.target.value }))}
                        />

                        <LabelledInput
                            type="password"
                            label="Password"
                            placeholder="******"
                            onChange={(e) => setPostInputs((c) => ({ ...c, password: e.target.value }))}
                        />

                    </div>
                    <button onClick={sendRequest} type="button" className=" w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signin" ? "Sign in" : "Sign up"}</button>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputTypes {
    label: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputTypes) {
    return (
        <div className="mt-2">
            <label className="block mb-2 text-sm font-bold pt-2 text-gray-900 dark:text-black">{label}</label>
            <input onChange={onChange} type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    )
}  