import React, { useEffect, useState} from "react";
import { MdOutlineEuro } from "react-icons/md";
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import 'primereact/resources/primereact.min.css';

export default function Product({ ind, price, count, unit, name}) {
const [prices, setprices] = useState(0.00)
const [counts, setcounts] = useState(0)

    const priceset= (pay, ind)=>{
        price(pay, ind)
setprices(pay)
    }

    const countset =(number, ind)=>{
       count(number, ind)
        setcounts(number)
    }
    console.log()
    return (
        <>
            <div className="p-inputgroup flex-1">

                <div className="flex-auto">
                    <label className="nomargin" htmlFor={"products.product" + ind}>Produkta/pakalpojuma nosaukums</label>
                    <InputText className="p-inputtext-sm" 
                        id={ind ? "products.product" + ind : "products.product"} style={{ width: 280 }} onChange={(e) => name(e.target.value, ind)}/>
                </div>
                <div className="flex-auto">


                    <label className="nomargin" htmlFor={"price" + ind}>Cena par vienību</label>
                    <InputNumber className="p-inputtext-sm" id={"price" + ind}  value={prices} onChange={(e)=>priceset(e.value, ind)}  locale="lv-LV" minFractionDigits={2} min={0} currency="EUR"  mode="currency"  style={{ width: 100 }} />
                </div>
                <div className="flex-auto">

                    <label className="nomargin" htmlFor={"count" + ind}>Daudzums</label>
                    <InputNumber className="p-inputtext-sm" id={"count" + ind} value={counts} locale="lv-LV" style={{ width: 80 }} onChange={(e) => countset(e.value, ind)} />
                </div>
                <div className="flex-auto">

                    <label className="nomargin" htmlFor={"products.unit" + ind} >Mērvienība</label>
                    <InputText className="p-inputtext-sm" id={ind ? "products.unit" + ind : "products.unit"}  style={{ width: 200 }} onChange={(e) => unit(e.target.value, ind)} />
                </div>
                <div className="flex-column" style={{ width: 150 }}>
                    <label className="nomargin" htmlFor={"total" + ind}>Cena kopā</label>
                    <div style={{ marginTop: "10px", paddingLeft: "20px" }}>{(prices * counts).toFixed(2)} <MdOutlineEuro size={12}/></div>
                </div>
            </div>
        </>
    )
}