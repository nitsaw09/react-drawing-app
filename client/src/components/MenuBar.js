import React, { useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faSave } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import SelectImageModal from './SelectImageModal';

const MenuBar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  // save the canvas element
  const onSave = async () => {
    const canvas = document.querySelector('#canvas');
    const imageFile = await canvas.toDataURL();
    axios.post("api/save", { imageFile }) 
      .then(res => {
        console.log(res);
        toast.success(res.data.success);
      })
      .catch(err =>  {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  // open the saved file
  const onModalOpen = () => {
    axios.get("api/allFiles") 
      .then(res => {
        console.log(res);
        setModalShow(true);
        setModalContent(res.data);
      })
      .catch(err =>  {
        console.log(err);
        toast.error("Something went wrong");
      });
  }
    
  return(
    <div>
      <div style={{ position:'fixed', width:'100%', padding:'10px', background: 'white', boxShadow: '2px 0px 10px grey' }}>
        <ul>
          <li style={{ display: 'inline-block', marginLeft: '30px'}}>
            <label onClick={onSave}>
            <FontAwesomeIcon icon={faSave} style={{ fontSize: '20px', marginLeft: '8px' }}  />
            <div>Save</div>
            </label>
          </li>
          <li style={{ display: 'inline-block', marginLeft: '30px'}}>
            <label onClick={onModalOpen}>
            <FontAwesomeIcon icon={faFile} style={{ fontSize: '20px', marginLeft: '15px' }} />
            <div>Open</div>
            </label>
          </li>
        </ul>
      </div>
      <SelectImageModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
        content={modalContent} 
      />
    </div>
  );
}

export default MenuBar;