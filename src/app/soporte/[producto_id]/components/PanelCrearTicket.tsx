'use client'
import { Dialog } from 'primereact/dialog'
import React, { useRef, useState } from 'react'

interface Props {
    visible: boolean,
    onHide: () => void,
    producto_id: number,
}

const url_base = `${process.env.NEXT_PUBLIC_URL_BASE}`

function PanelCrearTicket({ visible, onHide }: Props) {

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
        const url = `${url_base}/tickets`
        fetch(url, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({

            })
        })
            .then(response => {
                if (response.ok) {
                    onHide();
                }
            })
    };
    

    return <Dialog visible={visible} onHide={onHide} draggable={false}>
      <form onSubmit={handleSubmit}>

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
}

export default PanelCrearTicket;