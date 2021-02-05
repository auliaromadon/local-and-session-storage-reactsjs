import React from "react"
class Alert extends React.Component{
    render(){
        let color = this.props.warna;
        let style = "alert alert-" + color;
        let teks = this.props.teks;
        return (
            <div className={style}>
               {teks}
            </div>
        )
    }
}
export default Alert; 