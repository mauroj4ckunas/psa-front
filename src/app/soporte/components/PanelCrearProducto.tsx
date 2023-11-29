'use client'
import { Dialog } from 'primereact/dialog';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';

interface Props {
  visible: boolean;
  onHide: () => void;
}

const url_base = `${process.env.NEXT_PUBLIC_URL_BASE}`

function PanelCrearProducto({ visible, onHide }: Props) {
  const [formData, setFormData] = useState({
    version: '',
    proyecto_id: 0,
  });
  
  const btnAgregar = useRef<HTMLButtonElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (btnAgregar.current) btnAgregar.current.disabled = true;
    const url = `${url_base}/productos`
    fetch(url, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            version: formData.version,
            proyecto_id: Number(formData.proyecto_id),
        })
    })
        .then(response => {
            if (response.ok) {
                onHide();
            }
        })
  };

  return (
    <Dialog visible={visible} onHide={onHide} draggable={false}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="version" className="block text-gray-700 font-bold mb-2">
            Versión:
          </label>
          <input
            type="text"
            id="version"
            name="version"
            value={formData.version}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="proyecto_id" className="block text-gray-700 font-bold mb-2">
            Proyecto Id:
          </label>
          <input
            type="number"
            id="proyecto_id"
            name="proyecto_id"
            value={formData.proyecto_id}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            ref={btnAgregar}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Crear
          </button>
        </div>
      </form>
    </Dialog>
  );
}

export default PanelCrearProducto;