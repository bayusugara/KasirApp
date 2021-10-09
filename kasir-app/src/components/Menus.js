import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
  // console.log(menu);
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" onClick={() => masukKeranjang(menu)}>
        <Card.Img
          variant="top"
          src={"assets/images/" + menu.nam.toLowerCase() + "/" + menu.gambar}
        />
        <Card.Body>
          <Card.Title>
            {menu.na} <strong>({menu.kode})</strong>
          </Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
