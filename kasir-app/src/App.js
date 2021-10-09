import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Hasil, NavbarComponent, ListCategories, Menus } from "./components";
import { API_URL } from "./utils/constants";
import axios from "axios";
import swal from "sweetalert";
// import dataJson from "../src/data/db.json";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: 1,
      keranjangs: [],
    };
  }

  componentDidMount() {
    // console.log(dataJson);
    axios
      .get(API_URL + "products/" + this.state.categoriYangDipilih)
      .then((res) => {
        // console.log(res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
    // axios
    //   .get(API_URL + "products/200")
    //   .then((res) => {
    //     console.log(res);
    //     // const menus = res.data;
    //     // this.setState({ menus });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus: [],
    });
    axios
      .get(API_URL + "category/" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs/" + value.id_product)
      .then((res) => {
        // console.log(res);
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            id_product: value.id_product,
          };
          console.log(keranjang);
          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              swal({
                title: "Berhasil",
                text: "Sukses Masuk Keranjang satu satu ",
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            id_product: value.id_product,
          };
          console.log(keranjang);
          axios
            .put(API_URL + "keranjangs/" + res.data[0].id_keranjang, keranjang)
            .then((res) => {
              swal({
                title: "Berhasil",
                text: "Sukses Masuk Keranjang update",
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menus, categoriYangDipilih } = this.state;
    return (
      <div>
        <NavbarComponent />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                categoriYangDipilih={categoriYangDipilih}
              />
              <Col>
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row>
                  {menus &&
                    menus.map((men) => (
                      <Menus
                        key={men.id_product}
                        menu={men}
                        masukKeranjang={this.masukKeranjang}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
