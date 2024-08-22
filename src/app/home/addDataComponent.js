import {useState} from "react";

export default function AddDataComponent({handleDataUpdate}) {
    const [form, setForm] = useState({
        "name": "",
        "quantity": "",
        "price": "",
        "market_value": "",
        "user_id": localStorage.getItem("user-id")
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/api/add-data", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(form)
        }).then(res => {
            if(res.status === 200){
                handleDataUpdate(form);
            }
        })
    }

    return (
        <div>
            <h5>Add Data</h5>
            <form onSubmit={handleSubmit} className={"d-flex align-items-end gap-2"}>
                <div className={"flex-grow-1"}>
                    <label className={"form-label"}>Name</label>
                    <input type={"text"} className={"form-control"} name={"name"} placeholder={"Name"} required={true} onChange={handleChange}/>
                </div>
                <div className={"flex-grow-1"}>
                    <label className={"form-label"}>Quantity</label>
                    <input type={"text"} className={"form-control"} name={"quantity"} placeholder={"Quantity"} required={true} onChange={handleChange}/>
                </div>
                <div className={"flex-grow-1"}>
                    <label className={"form-label"}>Price</label>
                    <input type={"text"} className={"form-control"} name={"price"} placeholder={"Price"} required={true} onChange={handleChange}/>
                </div>
                <div className={"flex-grow-1"}>
                    <label className={"form-label"}>Market Value</label>
                    <input type={"text"} className={"form-control"} name={"market_value"} placeholder={"Market Value"} required={true} onChange={handleChange}/>
                </div>
                <div>
                    <button type={"submit"} className={"btn btn-primary"}>Add Record</button>
                </div>
            </form>
        </div>
    );
}