import React, { useState, useEffect } from "react"
import "./createform.css"
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineEuro } from "react-icons/md";
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import 'primereact/resources/primereact.min.css';
import { Button } from 'primereact/button';

import Product from "./product";
import { TiDeleteOutline } from "react-icons/ti";
import { useForm } from "react-hook-form"

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
        console.log(data);
    };
console.log(payd)
    return (
        <>
            <div className={anim === true ? "create out" : "create in"}>
                <div className="createHeader" onClick={closing}> <MdOutlineNavigateNext color="#876FF3FF" size={25} />Atpakaļ</div>
                <h1 className="text black">Jauns rēķins</h1>

                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="flex-row">

                        <label htmlFor="documentNr">Dokumenta numurs</label>
                        <InputText className="p-inputtext-sm" style={{ width: 200 }} id="documentNr" {...register("documentNr")} />
                        <label htmlFor="buttondisplay" className="font-bold block mb-2">
                            Datums
                        </label>
                        <Calendar className="p-inputtext-sm" id="buttondisplay" locale="lv" value={date} onChange={(e) => setDate(e.value)} showIcon dateFormat="dd.mm.yy" />
                    </div>
                    <label htmlFor="comment">Komentāri </label>
                    <InputText className="p-inputtext-sm" style={{ width: 700 }} id="comment" {...register("Comment")} />

                    <h2 >Partneris</h2>
                    <hr />
                    <div className="flex-row">

                        <label htmlFor="company">Nosaukums</label>
                        <InputText className="p-inputtext-sm" style={{ width: 200 }} id="company"  {...register("Company")} />

                        <label htmlFor="companyReg">Reģistrācijas numurs</label>
                        <InputText className="p-inputtext-sm" style={{ width: 300 }} id="companyReg" />
                    </div>
                    <h2 >Maksājuma dati</h2>
                    <hr />
                    <div className="flex-row">

                        <label htmlFor="paytill">Maksājuma termiņš</label>
                        <Calendar id="paytill" locale="lv" onChange={(e) => setDatetill(e.value)} showIcon dateFormat="dd.mm.yy" />

                    </div>
                    <div className="flex-row">

                        <label htmlFor="companybank">Klienta bankas konts</label>
                        <InputText className="p-inputtext-sm" style={{ width: 200 }} id="companybank" {...register("bank")} />


                        <label htmlFor="companyadress">Juridiskā adrese</label>

                        <InputText className="p-inputtext-sm" style={{ width: 200 }} id="companyadress" {...register("adress")} />
                    </div>
                    <div className="flex-row">

                        <label htmlFor="email">E-pasts </label>
                        <InputText className="p-inputtext-sm" type="email" style={{ width: 200 }} id="email" {...register("email")} />
                        <label htmlFor="phone">Tālrunis</label>
                        <InputText className="p-inputtext-sm" style={{ width: 200 }} id="phone" {...register("phone")} />
                    </div>

                    <h2>Produkti un pakalpojumi</h2>
                    <hr />
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
                                /><TiDeleteOutline size={30} onClick={() => removeitem(i)} /></div>)
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

                    <RadioButton inputId="payd" name="payd" value="Apmaksāts" checked={payd === "Apmaksāts"} onChange={(e) => setPayd(e.value)} />
                    <label htmlFor="payd" className="ml-2">Apmaksāts</label>
                    <RadioButton inputId="payd-not" name="payd" value="Neapmaksāts"  checked={payd === "Neapmaksāts"} onChange={(e) => setPayd(e.value)}/>
                    <label htmlFor="payd-not" className="ml-2">Nepmaksāts</label>

                    <div className="flex-row">
                        <Button label="IZVEIDOT" />
                        <Button label="ATCELT" severity="secondary" outlined />
                    </div>
                </form >
            </div >

        </>
    )
}