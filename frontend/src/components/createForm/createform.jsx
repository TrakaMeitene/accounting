import React, { useState, useEffect } from "react"
import "./createform.css"
import { MdOutlineNavigateNext } from "react-icons/md";
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import 'primereact/resources/primereact.min.css';
import { Button } from 'primereact/button';
import { MdDelete } from "react-icons/md";
import { Tooltip } from 'primereact/tooltip';

import Product from "./product";
import { useForm } from "react-hook-form"
import axios from 'axios';

export default function CreateForm({ close }) {
    const [anim, setanim] = useState(false)
    const [newproducts, setnewproducts] = useState(1)

    const [hiddenindex, setHidden] = useState([])
    const [total, setTotal] = useState(0.00)
    const [date, setDate] = useState(null);
    const [datetill, setDatetill] = useState(null);
    const { register, handleSubmit, errors, reset } = useForm();
    const [products, setProducts] = useState([])
    const [price, setPrice] = useState(0.00)
    const [count, setCount] = useState(0)
    const [units, setunits] = useState("")
    const [name, setName] = useState("")
    const [summ, setSumm] = useState(0.00)
    const [payd, setPayd] = useState("Neapmaksāts")

    addLocale('lv', {
        firstDayOfWeek: 1,
        showMonthAfterYear: true,
        dayNames: ['Pirmdiena', 'Otrdiena', 'Trešdiena', 'Ceturtdiena', 'Piektdiena', 'sestdiena', 'Svētdiena'],
        dayNamesShort: ['P', 'O', 'Tr', 'C', 'Pk', 'S', 'Sv'],
        dayNamesMin: ['P', 'O', 'T', 'C', 'Pk', 'S', 'Sv'],
        monthNames: ['Janvāris', 'Februāris', 'Marts', 'Aprīlis', 'Maijs', 'Jūnijs', 'Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Šodien',
        clear: 'Notīrīt'
    });


    useEffect(() => {
        setTotal(price * count)

    }, [count, price, products])

    const closing = () => {

        setanim(true)
        setTimeout(() => {
            close()
        }, 400)
    }


    const addproduct = (e) => {
        e.preventDefault()
        setnewproducts(newproducts + 1)
    }

    const removeitem = (ind) => {
        setHidden([...hiddenindex, ind])
    }

    const namechange = (name, ind) => {
        setName(name)
        if (products.length === 0) {
            setProducts([{ "ind": ind, "name": name }])
        } else {
            products.forEach(x => {
                if (x.ind === ind) { x.name = name } else {
                    setProducts(products => [...products, { "ind": ind, "name": name }])
                }
            })
        }
    }

    const pricechange = (price, ind) => {
        setPrice(price)
        totalsumm()

        if (products.length === 0) {
            setProducts([{ "ind": ind, "price": price }])
        } else {
            products.forEach(x => {
                if (x.ind === ind) { x.price = price } else {
                    setProducts(products => [...products, { "ind": ind, "price": price }])
                }
            })
        }
    }

    const countchange = (count, ind) => {
        products.forEach(x => { if (x.ind === ind) { x.count = count } })
        totalsumm()
    }

    const unitchange = (unit, ind) => {
        setunits(unit)
        products.forEach(x => { if (x.ind === ind) { x.unit = unit } })
        totalsumm()
    }

    const totalsumm = () => {

        const unique = products.filter((a, i) => products.findIndex((s) => a.ind === s.ind) === i)
        setProducts(unique)
        let set = []
        for (let i = 0; i < unique.length; i++) {
            if (!unique[i].price) {
                unique[i].price = 0.00
            }
            if (!unique[i].count) {
                unique[i].count = 0
            }
            console.log(products[i].price * products[i].count)
            set.push(Number((unique[i].price.toFixed(2) * unique[i].count).toFixed(2)))
        }
        const summ = set.reduce((value, a) => value + a, 0.00)

        setSumm(summ)
    }

    const onSubmit = (data) => {
        data.products = JSON.stringify(products)
        data.payd = payd
        console.log(data)
        axios.post("http://localhost:3300/create", { data })
            .then(response => console.log(response))
    };


    return (
        <>
            <div className={anim === true ? "create out" : "create in"}>
                <div className="createHeader" onClick={closing}> <MdOutlineNavigateNext color="#876FF3FF" size={25} className="transform" />Atpakaļ</div>
                <h1 className="text black">Jauns rēķins</h1>

                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="flex-row">
                        <span>
                            <label htmlFor="documentNr">Dokumenta numurs</label>
                            <InputText className="p-inputtext-sm" style={{ width: 200 }} id="documentNr" {...register("documentNr")} />
                        </span>
                        <span>
                            <label htmlFor="buttondisplay" className="font-bold block mb-2">
                                Datums
                            </label>

                            <Calendar className="p-inputtext-sm" id="buttondisplay" locale="lv" value={date} onChange={(e) => setDate(e.value)} showIcon dateFormat="dd.mm.yy" />
                        </span>
                    </div>

                    <label htmlFor="comment">Komentāri </label>
                    <InputText className="p-inputtext-sm" style={{ width: 700 }} id="comment" {...register("Comment")} />

                    <h2 >Partneris</h2>
                    <hr />
                    <div className="flex-row">
                    <span>
                        <label htmlFor="company">Nosaukums</label>
                        <InputText className="p-inputtext-sm" style={{ width: 200 }} id="company"  {...register("Company")} />
                        </span>
                        <span>
                        <label htmlFor="companyReg">Reģistrācijas numurs</label>
                        <InputText className="p-inputtext-sm" style={{ width: 300 }} id="companyReg" />
                        </span>
                    </div>
                    <h2 >Maksājuma dati</h2>
                    <hr />
                    <div className="flex-auto">
                    <span>
                        <label htmlFor="paytill">Maksājuma termiņš</label>
                        <Calendar id="paytill" locale="lv" onChange={(e) => setDatetill(e.value)} showIcon dateFormat="dd.mm.yy" />
                        </span>
                    </div>
                    <div className="flex-row">
                    <span>
                        <label htmlFor="companybank">Klienta bankas konts</label>
                        <InputText className="p-inputtext-sm" style={{ width: 200 }} id="companybank" {...register("bank")} />
                        </span>
                        <span>
                        <label htmlFor="companyadress">Juridiskā adrese</label>

                        <InputText className="p-inputtext-sm" style={{ width: 300 }} id="companyadress" {...register("adress")} />
                        </span>
                    </div>
                    <div className="flex-row">
                    <span>
                        <label htmlFor="email">E-pasts </label>
                        <InputText className="p-inputtext-sm" type="email" style={{ width: 250 }} id="email" {...register("email")} />
                        </span>
                        <span>
                        <label htmlFor="phone">Tālrunis</label>
                        <InputText className="p-inputtext-sm" style={{ width: 200 }} id="phone" {...register("phone")} />
                        </span>
                    </div>

                    <h2>Produkti un pakalpojumi</h2>
                    <hr />
                    <Tooltip target=".delete" className="delete-tooltip"/>

                    {
                        [...Array(newproducts)].map((v, i) =>
                            !hiddenindex.includes(i) && <div className="flex-row" key={i} index={i} >
                                <Product
                                    key={i}
                                    ind={i}
                                    price={pricechange}
                                    count={countchange}
                                    unit={unitchange}
                                    name={namechange}
                                    value={units}
                                /><MdDelete
                                    data-pr-tooltip="Dzēst produktu/pakalpojumu"
                                    data-pr-position="top"
                                    size={25}
                                    className="delete"

                                    tooltipoptions={{className: "delete-tooltip"}}
                                    onClick={() => removeitem(i)} /></div>)
                    }
                    <br />
                    <Button label="Pievienot produktu/pakalpojumu" onClick={addproduct} severity="secondary" outlined />
                    <br />
                    <div className="flex-auto">
                        <br />
                        <label htmlFor="total">Darījuma summa</label>
                        <hr />
                        <InputNumber className="p-inputtext-sm" currency="EUR" mode="currency" id="total" value={summ} disabled />
                    </div>
                    <br />
                    <div className="flex-auto">
                        <span className="margin">
                        <label htmlFor="payd" className="ml-2">Apmaksāts</label>
                            <RadioButton inputId="payd" name="payd" value="Apmaksāts" checked={payd === "Apmaksāts"} onChange={(e) => setPayd(e.value)} />
                        </span>
                        <span className="margin">
                        <label htmlFor="payd-not" className="ml-2">Nepmaksāts</label>
                            <RadioButton inputId="payd-not" name="payd" value="Neapmaksāts" checked={payd === "Neapmaksāts"} onChange={(e) => setPayd(e.value)} />
                        </span>
                    </div>
                    <div className="flex-row">
                        
                        <Button label="IZVEIDOT" />
                        <Button label="ATCELT" severity="secondary" outlined />
                    </div>
                </form >
            </div >

        </>
    )
}