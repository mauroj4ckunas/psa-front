'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { getVersiones } from '../services/getVersiones'
import { version } from '@/app/models/version'
import { InputText } from 'primereact/inputtext'
import { MultiSelect } from 'primereact/multiselect'
import { ticket } from '@/app/models/ticket'
import { allClientes } from '../../services/clientes/allClientes'
import { allColaboradores } from '../../services/colaboradores/allColaboradores'
import { cliente } from '@/app/models/cliente'
import { colaborador } from '@/app/models/colaborador'
import { Toast } from 'primereact/toast'
import { tarea } from '@/app/models/tarea'
import { getTareasDisponibles } from '../services/getTareas'
import { tareaResponse } from '@/app/models/tareaResponse'

interface Props {
    visible: boolean,
    productoId: number,
    editar: (nuevo: ticket | null) => void,
    cerrar: () => void,
    ticket: ticket,
}

function fetchVersiones(productoId: number) {
    return getVersiones(productoId)
}

function fetchClientes() {
    return allClientes()
}

function fetchColaboradores() {
    return allColaboradores()
}

function fetchTareas() {
    return getTareasDisponibles();
}

const url_base = `${process.env.NEXT_PUBLIC_URL_SOPORTE}`

function PanelEditarTicket({ visible, productoId, editar, cerrar, ticket }: Props) {

    const [versiones, setVersiones] = useState<version[]>([]);
    const [clientes, setClientes] = useState<cliente[]>([]);
    const [colaboradores, setColaboradores] = useState<colaborador[]>([]);
    const [selectedVersion, setSelectedVersion] = useState<number>();
    const [selectedCliente, setSelectedCliente] = useState<number>();
    const [selectedColaborador, setSelectedColaborador] = useState<number>();
    const [prioridad, setPrioridad] = useState<string>();
    const [severidad, setSeveridad] = useState<string>('');
    const [categoria, setCategoria] = useState<string>('');
    const [estado, setEstado] = useState<string>('');
    const [nombre, setNombre] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [tareas, setTareas] = useState<tarea[]>([]);
    const [selectedTareas, setSelectedTareas] = useState<number[]>([]);
    const [botonDeshabilitado, setBotonDeshabilitado] = useState<boolean>(false);

    const toast = useRef<Toast>(null);
    
    useEffect(() => {
        fetchVersiones(productoId).then(data => {
            if (!('error' in data)) {
                setVersiones(data);
                const versionesData: version[] = data;
                versionesData.forEach(v => {
                    if (v.version === ticket.versionNombre) setSelectedVersion(v.productoVersionId);
                })
            }
        })
        ticket.prioridad && setPrioridad(ticket.prioridad);
        ticket.severidad && setSeveridad(ticket.severidad);
        ticket.categoria && setCategoria(ticket.categoria);
        ticket.estado && setEstado(ticket.estado);
        ticket.nombre && setNombre(ticket.nombre);
        ticket.descripcion && setDescripcion(ticket.descripcion);
        ticket.tareas && setSelectedTareas(ticket.tareas.map(t => t.tareaId));
        ticket.clienteId && setSelectedCliente(ticket.clienteId);
        ticket.colaboradorId && setSelectedColaborador(ticket.colaboradorId);
        fetchClientes().then(data => {!('error' in data) && setClientes(data)})
        fetchColaboradores().then(data => {!('error' in data) && setColaboradores(data)})
        fetchTareas().then(data => setTareas(data));
    }, [productoId])

    const prioridades = ['ALTA', 'MEDIA', 'BAJA'];
    const severidades = ['S1', 'S2', 'S3', 'S4'];
    const categorias = ['PROYECTO', 'SOPORTE', 'FINANZAS', 'IT'];
    const estados = ['SIN_INICIAR', 'EN_PROGRESO', 'EN_DESARROLLO', 'EN_IMPLEMENTACION', 'ESPERANDO_AL_CLIENTE', 'BLOQUEADO', 'RESUELTO', 'CERRADO'];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prioridad || !severidad || !categoria || !estado || !selectedVersion || !selectedColaborador || selectedTareas.length === 0) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Por favor, complete todos los campos requeridos',
                life: 3000
            });
            return;
        }
        setBotonDeshabilitado(true);
        const ticketRequest = {
            nombre: nombre,
            descripcion: descripcion,
            prioridad: prioridad,
            severidad: severidad,
            categoria: categoria,
            estado: estado,
            clienteId: selectedCliente,
            colaboradorId: selectedColaborador,
            tareaIds: selectedTareas
        };
        fetch(`https://deploy-java-17.onrender.com/soporte/tickets/${ticket.ticketId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(ticketRequest),
        })
            .then(res => res.json())
            .then(data => {editar(data); setBotonDeshabilitado(false);})
            .catch(error => {editar(null); setBotonDeshabilitado(false);});
    };

    const header = (
        <div className='font-semibold text-lg underline underline-offset-2'>
            Editar ticket
        </div>
    )

    return (
        <>
        <Dialog visible={visible} header={header} className=' w-3/4'
                onHide={cerrar} draggable={false} closeOnEscape={true}>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-4">
                <div>
                    <p className=' font-bold'>Nombre del Ticket:</p>
                    <InputText
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre del Ticket"
                        className='w-full h-10'
                    />
                </div>
                <div>
                    <p className=' font-bold'>Descripción del Ticket:</p> 
                    <InputText 
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder="Descripción"
                        className='w-full h-10'
                    />
                </div>
                <div>
                    <p className=' font-bold'>Prioridad del Ticket:</p> 
                    <Dropdown 
                        value={prioridad} 
                        options={prioridades} 
                        onChange={(e) => setPrioridad(e.value)}
                        placeholder="Seleccione una prioridad"
                        className='w-full h-10'
                    />
                </div>
                <div>
                    <p className=' font-bold'>Severidad del Ticket:</p> 
                    <Dropdown 
                        value={severidad} 
                        options={severidades} 
                        onChange={(e) => setSeveridad(e.value)}
                        placeholder="Seleccione una severidad"
                        className='w-full h-10'
                    />
                </div>
                <div>
                    <p className=' font-bold'>Categoría del Ticket:</p> 
                    <Dropdown 
                        value={categoria} 
                        options={categorias} 
                        onChange={(e) => setCategoria(e.value)}
                        placeholder="Seleccione una categoría"
                        className='w-full h-10'
                    />
                </div>
                <div>
                    <p className=' font-bold'>Categoría del Ticket:</p> 
                    <Dropdown 
                        value={estado} 
                        options={estados} 
                        onChange={(e) => setEstado(e.value)}
                        placeholder="Seleccione un estado"
                        className='w-full h-10'
                    />
                </div>
                {/* <Dropdown 
                    value={selectedVersion}
                    options={versiones.map(ver => ({ label: ver.version, value: ver.productoVersionId }))}
                    onChange={(e) => setSelectedVersion(e.value)}
                    placeholder="Seleccione una versión"
                    
                /> */}
                <div>
                    <p className=' font-bold'>Cliente asignado al Ticket:</p> 
                    <Dropdown 
                        value={selectedCliente}
                        options={clientes.map(cli => ({ label: cli.razonSocial, value: cli.clientId }))}
                        onChange={(e) => setSelectedCliente(e.value)}
                        placeholder="Seleccione cliente asignado"
                        className='w-full h-10'
                    />
                </div>
                <div>
                    <p className=' font-bold'>Colaborador asignado al Ticket:</p> 
                    <Dropdown 
                        value={selectedColaborador}
                        options={colaboradores.map(col => ({ label: col.nombre, value: col.colaboradorId }))}
                        onChange={(e) => setSelectedColaborador(e.value)}
                        placeholder="Seleccione colaborador asignado"
                        className='w-full h-10'
                        
                    />
                </div>
                <div>
                    <p className=' font-bold'>Tareas asignadas al Ticket:</p> 
                    <MultiSelect
                        value={selectedTareas}
                        options={tareas.map(t => ({ label: `ID ${t.id} - ${t.descripcion}`, value: t.id }))}
                        onChange={(e) => setSelectedTareas(e.value)}
                        placeholder="Seleccionar tareas a asignar"
                        className='w-full h-10'
                        selectAll={false}
                    />
                </div>
                <div></div>
                <Button type="submit" label="Guardar" 
                    disabled={botonDeshabilitado}
                    className="mt-2 bg-blue-500 hover:bg-blue-600 focus:ring focus:ring-blue-300 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                />
            </form>
        </Dialog>
        <Toast ref={toast} />
        </>
    )
}

export default PanelEditarTicket;
