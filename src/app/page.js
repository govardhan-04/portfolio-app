"use client"

import {useRouter} from "next/navigation";
import {useState} from "react";

export default function Page() {
    const router = useRouter();
    const [form, setForm] = useState({
        "email-address": '',
        "password": ''
    });
    const [error, setError] = useState("")

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setError("");

        fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(form)
        }).then(res => {
            if(res.status !== 200){
                return res.json().then(data => {
                    setError(data.message);
                })
            }

            return res.json().then(data => {
                localStorage.setItem("user-id", data.user[0])
                router.push('/home');
            })
        })
    }

    const navigateToRegister = () => {
        router.push('/register');
    };


    return (
        <main className="row justify-content-center align-content-center mt-5">
            <div className="col-12 col-md-6 bg-white shadow-sm border rounded p-3">
                <h2 className={"text-center"}>Login</h2>
                {
                    error && <div className={"alert alert-danger"}>
                        {error}
                    </div>
                }
                <form onSubmit={handleFormSubmit}>
                    <div className="my-2">
                        <label className="form-label">Email Address</label>
                        <input type={"email"} name={"email-address"} placeholder={"Email Address"}
                               className={"form-control"} onChange={handleChange} required={true}/>
                    </div>
                    <div className="my-2">
                        <label className="form-label">Password</label>
                        <input type={"password"} name={"password"} placeholder={"Password"} className={"form-control"}
                               onChange={handleChange} required={true}/>
                    </div>
                    <div className={"my-2"}>
                        <a onClick={navigateToRegister} className={"link-primary"} style={{cursor: "pointer"}}>Don't
                            have an account!</a>
                    </div>
                    <button className={"btn btn-primary"}>Login</button>
                </form>
            </div>
        </main>
    );
}
