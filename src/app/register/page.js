"use client"
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function Page() {
    const router = useRouter();
    const [form, setForm] = useState({
        "email-address": '',
        "password": '',
        "confirm-password": '',
        "name": ''
    });
    const [error, setError] = useState("")

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        setError("");
        if(form["password"] !== form["confirm-password"]){
            setError("Password didn't match!")
            return;
        }

        fetch("http://localhost:5000/api/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
            .then(res => {
                if(res.status === 200){
                    router.push('/')
                }
                return res.json()
            })
            .then(data => {
                setError(data.message)
            })
            .catch(err => console.log(err))
    }

    const navigateToLogin = () => {
        router.push('/');
    };


    return (
        <main className="row justify-content-center align-content-center mt-5">
            <div className="col-12 col-md-6 bg-white shadow-sm border rounded p-3">
                <h2 className={"text-center"}>Register</h2>
                {
                    error && <div className={"alert alert-danger"} role={"alert"}>
                        {error}
                    </div>
                }
                <form onSubmit={submitForm}>
                    <div className="my-2">
                        <label className="form-label">Name</label>
                        <input type={"text"} name={"name"} placeholder={"Name"}
                               className={"form-control"} required={true} onChange={handleChange}/>
                    </div>
                    <div className="my-2">
                        <label className="form-label">Email Address</label>
                        <input type={"email"} name={"email-address"} placeholder={"Email Address"}
                               className={"form-control"} required={true} onChange={handleChange}/>
                    </div>
                    <div className="my-2">
                        <label className="form-label">Password</label>
                        <input type={"password"} name={"password"} placeholder={"Password"} className={"form-control"}
                               required={true} onChange={handleChange}/>
                    </div>
                    <div className="my-2">
                        <label className="form-label">Confirm Password</label>
                        <input type={"password"} name={"confirm-password"} placeholder={"Confirm Password"}
                               className={"form-control"}
                               required={true} onChange={handleChange}/>
                    </div>
                    <div className={"my-2"}>
                        <a onClick={navigateToLogin} className={"link-primary"} style={{cursor: "pointer"}}>Already have
                            an account!</a>
                    </div>
                    <button className={"btn btn-primary"}>Register</button>
                </form>
            </div>
        </main>
    );
}