import { useEffect, useState } from "react"

export default function CategoriaListado() {
    const [categorias, setCategorias] = useState([]);
    const cargarDatos = async () => {
        try {
            const baseUrl = 'http://localhost:3000';
            const url = baseUrl + '/categoria';
            const respuesta = await fetch(url);

            if( !respuesta.ok ) throw new Error ("Problemas al recuperar las categorias");

            const cats = await respuesta.json();
            setCategorias(cats);
        } catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        cargarDatos();
    }, [])

    const eliminar = async (categoria) => {
        try {
            const baseUrl = 'http://localhost:3000';
            const url = baseUrl + '/categoria?id='+categoria.id;
            const respuesta = await fetch(url,{
                method: 'DELETE',
            });
            if( !respuesta.ok ) throw new Error ("No se pudo borrar");
            const resultado = await respuesta.json();
            console.log("Categoria borrada")
            cargarDatos();
        } catch (error){
            console.log({error: error.message});
        }
    }
    return (
        <>
        <h2>Listado de Categorias</h2>
        <table border={1}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Pregunta</th>
                    <th>Respuesta</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {categorias.map(categoria => (
                    <tr key={categoria.id}>
                        <td>{categoria.id}</td>
                        <td>{categoria.pregunta}</td>
                        <td>{categoria.opcion}</td>
                        <td>
                            <button>Editar</button>
                            <button onClick={ () => eliminar(categoria) }>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}