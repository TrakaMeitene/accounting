import React, { useState } from "react"
import "./createform.css"
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineEuro } from "react-icons/md";

import "rsuite/dist/rsuite.min.css";
import { DatePicker, Input, InputNumber, Radio, Form } from "rsuite";
import Product from "./product";
import { TiDeleteOutline } from "react-icons/ti";

export default function CreateForm({ close }) {
    const [anim, setanim] = useState(false)
    const [product, setProduct] = useState([<Product key={0} />])
    let newproducts = [...product]
    const [formValue, setFormValue] = React.useState({
        documentNr: "",
        date: "",
        comment: "",
        company: "",
        companyReg: "",
        paytillDate: "",
        companybank: "",
        companyadress: "",
        email: "",
        phone: "",
        total: ""
    });

    const closing = () => {
        console.log("te atnak")
        setanim(true)
        setTimeout(() => {
            close()
        }, 400)
    }

    const Label = props => {
        return <label style={{ width: "auto", display: 'inline-block' }} {...props} />;
    };


    const addproduct = (e) => {
        e.preventDefault()
        setProduct([...product, <Product key={product.length} />]);
        newproducts = [...product]
    }

    const removeitem = (ind, e) => {
        let newprod = product.filter((x, index) => index !== ind)
        setProduct(newprod)
        newproducts = [...newprod]
    }

    const onSubmit = (data) => {
        console.log(data);
    };

    const dateofreceipt =(e)=>{
console.log(e)
setFormValue(formValue => ({...formValue, date: e}))
    }

    const paytilldate =(e)=>{
        setFormValue(formValue => ({...formValue, paytillDate: e}))
    }    
    console.log(formValue)
    return (
        <>
            <div className={anim === true ? "create out" : "create in"}>
                <div className="createHeader" onClick={closing}> <MdOutlineNavigateNext color="#876FF3FF" size={25} />Atpakaļ</div>
                <h1 className="text black">Jauns rēķins</h1>
                <Form fluid onChange={setFormValue} formValue={formValue} layout="inline">
                    <Form.Group controlId="name-6">
                        <Form.ControlLabel>Dokumenta numurs</Form.ControlLabel>
                        <Form.Control size="md" style={{ width: 200 }} name="documentNr" />
                    </Form.Group>
                    <Form.Group controlId="date-6">
                        <Form.ControlLabel>Datums </Form.ControlLabel>
                        <DatePicker
                            format="dd.MM.yyyy"
                            locale={{
                                sunday: 'Sv',
                                monday: 'P',
                                tuesday: 'O',
                                wednesday: 'T',
                                thursday: 'C',
                                friday: 'Pk',
                                saturday: 'S',
                                ok: 'OK',
                                today: 'Šodien',
                                yesterday: 'Vakar',
                            }}
                            placeholder=" "
                            name="date"
                            required
                            onChange={dateofreceipt}
                        />
                    </Form.Group>
                    <Form.Group controlId="comment">

                        <Form.ControlLabel>Komentāri </Form.ControlLabel>
                        <Form.Control size="md" style={{ width: 700 }} name="comment"
                        />
                    </Form.Group>

                    <h2 >Partneris</h2>

                    <Form.Group controlId="company">
                        <Form.ControlLabel>Nosaukums</Form.ControlLabel>
                        <Form.Control size="md" style={{ width: 200 }} name="company"
                        />
                    </Form.Group>
                    <Form.Group controlId="reg-nr">
                        <Form.ControlLabel>Reģistrācijas numurs</Form.ControlLabel>
                        <Form.Control size="md" style={{ width: 300 }} name="companyReg"
                        />
                    </Form.Group>

                    <h2 >Maksājuma dati</h2>

                    <Form.Group controlId="company-data">
                        <Form.ControlLabel>Maksājuma termiņš</Form.ControlLabel>
                        <DatePicker
                            format="dd.MM.yyyy"
                            locale={{
                                sunday: 'Sv',
                                monday: 'P',
                                tuesday: 'O',
                                wednesday: 'T',
                                thursday: 'C',
                                friday: 'Pk',
                                saturday: 'S',
                                ok: 'OK',
                                today: 'Šodien',
                                yesterday: 'Vakar',
                            }}
                            placeholder=" "
                            required
                            onChange={paytilldate}
                            name="paytillDate"
                        />
                    </Form.Group>
                    <Form.Group controlId="company-data2">
                        <Form.ControlLabel>Klienta bankas konts</Form.ControlLabel>
                        <Form.Control size="md" style={{ width: 200 }} name="companybank"
                        />
                    </Form.Group>
                    <Form.Group controlId="adress">
                        <Form.ControlLabel>Juridiskā adrese</Form.ControlLabel>
                        <Form.Control size="md" style={{ width: 200 }} name="companyadress"
                        />
                    </Form.Group>
                    <Form.Group controlId="company-data3">
                        <Label>E-pasts </Label>
                        <Form.Control size="md" type="email" style={{ width: 200 }} name="email" />
                        <Form.ControlLabel>Tālrunis</Form.ControlLabel>
                        <Form.Control size="md" style={{ width: 200 }} name="phone"
                        />
                    </Form.Group>

                    <h2>Produkti un pakalpojumi</h2>
                    {newproducts.map((x, index) => { return <div className="flex-row" key={index}>{x}<TiDeleteOutline onClick={() => removeitem(index)} size={30} /></div> })}

                    <button onClick={addproduct} className="addbutton">Pievienot produktu/paklapojumu</button>
                    <br />
                    <Form.Group controlId="total">
                        <Form.ControlLabel>Darījuma summa</Form.ControlLabel>
                        <InputNumber postfix={<MdOutlineEuro />} name="total" defaultValue={0.01} min={0.00} step={0.01} style={{ width: 200 }}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="payment-data"  >
                        <Radio name="payd"> Apmaksāts</Radio>
                        <Radio checked name="not"> Neapmaksāts</Radio>
                    </Form.Group>

                    <div className="flex-row">
                        <button className="invoice" type="submit">IZEIDOT</button>
                        <button className="cancel">ATCELT</button>
                    </div>
                </Form>
            </div>

        </>
    )
}