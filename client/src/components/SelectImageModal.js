import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const SelectImageModal = (props) => {
  let imageUrl;
  const onSelectImage = (event) => {
    imageUrl = event.target.src;
  }
  
  const onSelect = () => {
    const canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d'),
    img = new Image();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    img.src = imageUrl;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(imageUrl);
      props.onHide(() => false);
    }
    localStorage.setItem("selectedImg", true);
  }

  return (
      <Modal 
        {...props}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Select Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul>
          {props.content.map(data => (
            <li style={{ display: 'inline', margin: '10px 10px'}}>
              <img src={data} className="canvasImg img-fluid" onClick={onSelectImage} width="30%" style={{ border: '1px solid grey', marginBottom: '20px'}} />
            </li>
          ))}
        </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSelect}>Select</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default SelectImageModal;