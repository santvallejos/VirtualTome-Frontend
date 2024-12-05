import './addBook.css';
import '../../App.jsx'
import { useState } from 'react';

function AddBook() {
    /* Datos del libro que se cambiaran modificando a medidad que el usuario modifique los inputs */
    const [formData, setFormData] = useState({
        nombre: "",
        autor: "",
        categoria: "",
        url: "",
        publicacion: "",
        isbn: ""
    })

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();/* Evitar que la pagina se recargue */
        if (!formData.categoria) {
            alert("Por favor, seleccione una categoría válida.");
            return;
        }

        try {
            /* Conexion a la API */
            const response = await fetch("http://localhost:3000/addBook", {
                /* El metodo y como se trabajaran los datos */
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`¡Libro añadido con éxito! ID: ${data["Id insertado"]}`);
                window.location.reload(true);
                /* Recesetear los valores */
                setFormData({
                    nombre: "",
                    autor: "",
                    categoria: "",
                    url: "",
                    publicacion: "",
                    isbn: "",
                });
            } else {
                alert("Hubo un error al añadir el libro.");
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            alert("No se pudo añadir el libro. Intenta nuevamente.");
        }
    };


    return (
        <div className="containerAddBook" id="addBookForm">
            <form className="formAddBook" onSubmit={handleSubmit}>
                <div className="addBook">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />

                    <label htmlFor="autor">Autor</label>
                    <input
                        type="text"
                        id="autor"
                        value={formData.autor}
                        onChange={handleChange}
                    />

                    <label htmlFor="categoria">Categoría</label>
                    <select
                        id="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        required
                    >
                        <option value="" hidden>
                            Seleccione una categoría
                        </option>
                        <option value="Aventura">Aventura</option>
                        <option value="Ciencia Ficción">Ciencia Ficción</option>
                        <option value="Fantasía">Fantasía</option>
                        <option value="Histórica">Histórica</option>
                        <option value="Juvenil">Juvenil</option>
                        <option value="Novela">Novela</option>
                        <option value="Policial">Policial</option>
                        <option value="Terror">Terror</option>
                        <option value="Otro">Otro</option>
                    </select>

                    <label htmlFor="url">URL IMG</label>
                    <input
                        type="text"
                        id="url"
                        value={formData.url}
                        onChange={handleChange}
                    />

                    <label htmlFor="publicacion">Publicación</label>
                    <input
                        type="date"
                        id="publicacion"
                        value={formData.publicacion}
                        onChange={handleChange}
                    />

                    <label htmlFor="isbn">ISBN</label>
                    <input
                        type="text"
                        id="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                    />

                    <button type="submit">Añadir Libro</button>
                </div>
            </form>
        </div>
    );
}

export default AddBook;