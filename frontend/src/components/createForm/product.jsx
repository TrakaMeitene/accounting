import React from "react";
import {  Input, InputNumber } from "rsuite";
import { MdOutlineEuro } from "react-icons/md";

const Label = props => {
    return <label style={{ width: "auto", display: 'inline-block' }} {...props} />;
};

export default function Product(){


    return(
        <>
        <div className="flex-row">
        <div className="flex-column">
    
            <Label>Produkta/pakalpojuma nosaukums</Label>
            <Input size="md" style={{ width: 200 }} />
        </div>
        <div className="flex-column">
    
            <Label>Cena par vienību</Label>
            <InputNumber postfix={<MdOutlineEuro />} defaultValue={0.01} min={0.00} step={0.01} style={{ width: 150 }} />
        </div>
        <div className="flex-column">
    
            <Label>Daudzums</Label>
            <InputNumber defaultValue={1} step={1} min={0} style={{ width: 80 }} />
        </div>
        <div className="flex-column">
    
            <Label>Mērvienība</Label>
            <Input size="md" style={{ width: 200 }} />
        </div>
        <div className="flex-column">
            <Label>Cena kopā</Label>
            {"te būs cena"}
        </div>

    </div>
    </>
    )
}