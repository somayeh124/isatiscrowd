import React from 'react';
import PropTypes from 'prop-types'; 
import { Modal, Box, Typography, Button } from '@mui/material';

const ConfirmDeleteModal = ({ open, onClose, onConfirm }) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="confirm-delete-modal"
    aria-describedby="confirm-delete-description"
  >
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 8,
        p: 4,
        textAlign: 'center',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        id="confirm-delete-modal"
        variant="h6"
        sx={{ fontSize: 18, mb: 3, color: 'text.primary', fontWeight: 'bold' }}
      >
        آیا مطمئن هستید که می‌خواهید این کارت را حذف کنید؟
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Button variant="contained" onClick={onConfirm}>
          تایید
        </Button>
        <Button variant="outlined" onClick={onClose}>
          انصراف
        </Button>
      </Box>
    </Box>
  </Modal>
);

ConfirmDeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmDeleteModal;
