'use client'
import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react';
import { producto } from '../models/producto';

interface Props {
  visible: boolean;
  onHide: () => void;
  producto: producto;
}

const url_base = `${process.env.NEXT_PUBLIC_URL_BASE}`

function PanelEliminarProducto({ visible, onHide, producto }: Props) {
  const [formData, setFormData] = useState({
    version: '',
    proyecto_id: 0,
  });
  
  const handleDelete = () => {
    const url = `${url_base}/productos/${producto.producto_id}`
    fetch(url)
        .then(response => {
            if (response.ok) {
                onHide();
            }
        })
  };

  return (
    <Dialog visible={visible} onHide={onHide} draggable={false}>
      
    </Dialog>
  );
}

export default PanelEliminarProducto;