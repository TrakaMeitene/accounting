import React, { useEffect, useState } from "react"
import "./mainList.css"
import axios from 'axios';
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import { MdOutlineEuro } from "react-icons/md";
import { MdOutlineNavigateNext } from "react-icons/md";
import CreateForm from "../createForm/createform";

export default function MainList() {
const [data, setData] = useState([])
const [mode, setMode]= useState(true)
const [open, setOpen] = useState(false)

useEffect(()=>{
getData()
if(mode){
    document.body.style.backgroundColor="hsl(233, 30%, 11%)"

}else{
    document.body.style.backgroundColor="hsl(252, 45%, 98%)"

}
}, [mode])

const getData =()=>{
    axios.get("http://localhost:3300/")
    .then(response => setData(response.data))
}

const modechange=()=>{
    setMode(!mode)

}

const opencraeteform =()=>{
    setOpen(true)
}

const closecraeteform =()=>{
    setOpen(false)
}
    
    return (
        <>  
          <div className="leftContainer">
        <div className="image">
            "test"
        </div>
       <div className="moon" onClick={modechange}>{mode === true? <FaMoon color="white" size={20}/>: <IoMdSunny color="white" size={20} />}</div>


    </div>
        <section>
        
            <div className="header">
                <h1 className={mode ? "text" : "text black"}>Rēķini</h1>
                <button className="new" onClick={opencraeteform}><div>+</div>Pievienot jaunu</button>
            </div>
            <div className="table">
                    {data.map(x => <div key={x.number} className={mode ? "tr" : "tr light"}>
                        <span className="td">#{x.number}</span>
                        <span className="td">{x.date}</span>
                        <span className="td">{x.client}</span>
                        <span className="td">{x.cost.toFixed(2)} <MdOutlineEuro /></span>
                        <span className="td"> <div className={x.statuss === 1 ? "paid" : "pending"}>{x.statuss === 1 ? "Apmaksāts" : "Neapmaksāts"}</div></span>
                   <MdOutlineNavigateNext color="#876FF3FF" size={25}/>
                    </div>)}
            </div>
        </section>
       {open && <CreateForm close={closecraeteform}/>}
        </>
    )
}