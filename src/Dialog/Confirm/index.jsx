import React from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '..';

function Confirm({
  open,
  onClose,
  onCancel,
  onConfirm,
  labelTitle,
  labelMessage,
  labelCancel,
  labelConfirm,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onCancel={onCancel}
      onConfirm={onConfirm}
      labelTitle={labelTitle}
      labelCancel={labelCancel}
      labelConfirm={labelConfirm}
    >
      {labelMessage && <DialogContentText>{labelMessage}</DialogContentText>}
    </Dialog>
  );
}

Confirm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  labelTitle: PropTypes.string,
  labelMessage: PropTypes.string,
  labelCancel: PropTypes.string,
  labelConfirm: PropTypes.string,
};

Confirm.defaultProps = {
  onClose: null,
  labelTitle: 'are you sure ?',
  labelMessage: null,
  labelCancel: 'Cancel',
  labelConfirm: 'Confirm',
};

export default Confirm;