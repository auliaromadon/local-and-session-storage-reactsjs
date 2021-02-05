import React from "react"

class Cart extends React.Component{
    constructor(){
        super()
        this.state ={
            cart: [], // untuk menyimpan list cart
            user: "", // untuk menyimpan data nama user
            total: 0, // untuk menyimpan data total belanja
            nilai: 0
        }
    }

    increment = (index) => {
        let temp = this.state.cart;
        let hitung = 0;
        let c = temp[index].jumlahBeli;
        temp[index].jumlahBeli = ++c; 
        for(let i = 0; i < temp.length; i++){
            hitung += (temp[i].harga*temp[i].jumlahBeli);
        } 
        localStorage.setItem("cart", JSON.stringify(temp))
        this.setState({
            cart: temp,
            total: hitung
        });   
    }

    decrement = (index) => {
        let temp = this.state.cart;
        let hitung = 0;
        let c = temp[index].jumlahBeli;
        temp[index].jumlahBeli = --c;  
        for(let i = 0; i < temp.length; i++){
            hitung += (temp[i].harga*temp[i].jumlahBeli);
        }
        localStorage.setItem("cart", JSON.stringify(temp))
        this.setState({
            cart: temp,
            total: hitung
        });  
    }

    changeJumlahBeli = (event, index) => {
        let temp = this.state.cart;
        let hitung = 0;
        let c = temp[index].jumlahBeli;
        temp[index].jumlahBeli = event.target.value; 
        for(let i = 0; i < temp.length; i++){
            hitung += (temp[i].harga*temp[i].jumlahBeli);
        } 
        localStorage.setItem("cart", JSON.stringify(temp))
        this.setState({
            cart: temp,
            total: hitung
        });   
    }  

    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            // menghapus data
            let temp = this.state.cart
            // posisi index data yg akan dihapus
            let index = temp.indexOf(item)

            let totalperbarang = temp[index].harga*temp[index].jumlahBeli;
            let totalHarga = this.state.total;

            let hitung = totalHarga-totalperbarang;

            // hapus data
            temp.splice(index, 1)

            localStorage.setItem("cart", JSON.stringify(temp))
            this.setState({
                cart: temp,
                total: hitung
            })
        }
    }

    initCart = () => {
        //memanggil data cart pada localStorage
        let tempCart = []
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        //memanggil data user pada localStorage
        let userName = localStorage.getItem("user")

        //kalkulasi total harga
        let totalHarga = 0;
        tempCart.map(item => {
            totalHarga += (item.harga * item.jumlahBeli)
        })

        //memasukkan data cart, user dan total harga pada state
        this.setState({
            cart: tempCart,
            user: userName,
            total: totalHarga
        })
    }

    componentDidMount(){
        this.initCart()
    }

    render(){
        return(
            <div className="container">
                <div className="card col-12 mt-2">
                    <div className="card-header bg-primary text-white">
                        <h4>Data Keranjang Belanja</h4>
                    </div>

                    <div className="card-body">
                        <h5 className="text-primary">
                            Nama User: { this.state.user }
                        </h5>

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nama Item</th>
                                    <th>Harga</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                { this.state.cart.map( (item, index) => (
                                    <tr key={index}>
                                        <td>{item.judul}</td>
                                        <td>Rp {item.harga}</td>
                                        <td>
                                            <div className="row col-12">
                                                <div className="col-sm-2">
                                                    <button className="btn btn-sm btn-danger btn-block" onClick={() => this.decrement(index)}> - </button>
                                                </div>
                                                <div className="col-4">
                                                    <input type="number" className="form-control btn-sm text-center"
                                                    onChange={(event) => this.changeJumlahBeli(event,index)}value={item.jumlahBeli}></input>
                                                </div>
                                                <div className="col-sm-2">
                                                <button className="btn btn-sm btn-success btn-block" onClick={() => this.increment(index)}> +  </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            Rp { item.harga * item.jumlahBeli }
                                        </td>
                                        <td>
                                        <button className="btn btn-sm btn-danger m-1"
                                            onClick={() => this.Drop(item)}>
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ) ) }
                            </tbody>
                        </table>

                        <h4 className="text-danger">
                            Total Harga: Rp {this.state.total}
                        </h4>
                    </div>
                </div>
            </div>
        )
    }
}
export default Cart;