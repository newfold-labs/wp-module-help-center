import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { LocalStorageUtils } from './../utils';
import { toggleHelp } from '..';
import { ReactComponent as CloseIcon } from '../icons/close.svg';

const Modal = ({ onClose, contentComponent, iconComponent, sidebarHeading, sidebarHeadingId }) => {
  useEffect(() => {
    const helpVisible = LocalStorageUtils.getHelpVisible();
    toggleHelp( helpVisible );
  }, []);

  const [refresh, setRefresh] = useState(false);

  return (
    <div className="modal">
      <div className="modal-header">
        <h3 className="heading">
          <span className="icon">{iconComponent}</span>
          {__(sidebarHeading, sidebarHeadingId)}
        </h3>
        <button
          className="close-button"
          onClick={() => {
            onClose();
            setRefresh(!refresh);
          }}
        >
          <div className="icon-button">
            <CloseIcon />
          </div>
        </button>
      </div>
      {contentComponent && contentComponent({ onClose, refresh, setRefresh })}
    </div>
  );
};

export default Modal;