import React from 'react';
import style from './popUp.module.css';

const Popup = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className={style.escolaPopUp}>
      <div className={style.escolaPopUpContainer}>
        {children}
      </div>
    </div>
  );
};

export default Popup;
