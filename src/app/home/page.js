"use client"

import useAuth from "@/app/useAuth";
import AddDataComponent from "@/app/home/addDataComponent";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function Page() {
    useAuth();
    const router = useRouter();

    const [userData, setUserData] = useState([])

    // Call the API one time
    useEffect(() => {
        const user_id = localStorage.getItem("user-id")
        if (user_id) {
            fetch(`http://localhost:5000/api/get-data/${user_id}`)
                .then(res => res.json())
                .then(data => {
                    setUserData(data)
                })
        }
    }, [])

    const handleDataUpdate = (form) => {
        setUserData([...userData, form])
    }

    const handleLogout = () => {
        localStorage.removeItem("user-id")
        router.push("/")
    }

    return (
        <main className={"bg-white p-3"}>
            <div className={"d-flex justify-content-between align-items-center mb-3"}>
                <h3>Manage your Portfolio</h3>
                <button className={"btn btn-danger"} onClick={handleLogout}>Logout</button>
            </div>
            <div className={"p-3 border rounded"}>
                <AddDataComponent handleDataUpdate={handleDataUpdate}/>
            </div>
            <div>
                <table className={"table table-striped"}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Market Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        userData.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{data.name}</td>
                                    <td>{data.quantity}</td>
                                    <td>{data.price}</td>
                                    <td>{data.market_value}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </main>
    )
}