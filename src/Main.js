import React from "react"
import Alert from "./components/Alert";
import data from "./ArrayData"
import Counter from "./components/Counter";
import Gallery from './pages/Gallery'
import { Route } from "react-router-dom";

class Main extends React.Component{
    render(){
        return (
            <div className="container">
                {/* <Alert warna="danger" teks="Awas ada akuu"/>
                <Alert warna="warning" teks="Hati hati di jalan"/>  */}

                {/* cara untuk menampilkan satu elemen array saja */}
                {/* <Alert warna={data[2].color} teks={data[2].text} /> */}

                {/* mengimplementasikan Array */}
                {/* { data.map(item => (
                    <Alert warna={item.color} teks={item.text} />
                ))} */}

                <Counter />
                <Counter />
            </div>
        )
    }
}
export default Main;