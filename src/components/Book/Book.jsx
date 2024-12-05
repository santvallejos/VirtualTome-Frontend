import "./Book.css";
import PropTypes from "prop-types";
import { useState } from "react";

function Book({ id, nombre, autor, categoria, url, publicacion }) {
    // Estado para el modal de edición
    const [showModal, setShowModal] = useState(false);
    const [bookData, setBookData] = useState({ nombre, autor, categoria, url, publicacion });

    // Formatear la fecha de publicación
    const formatFecha = (publicacion) => {
        const fecha = new Date(publicacion);
        if (isNaN(fecha)) {
            return "Fecha no válida";
        }
        const day = String(fecha.getDate()).padStart(2, "0");
        const month = String(fecha.getMonth() + 1).padStart(2, "0");
        const year = String(fecha.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    };

    // Manejar la eliminación del libro
    const handleDelete = async () => {
        const deleteID = { id: id };
        try {
            const response = await fetch("http://localhost:3000/deleteBookID", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(deleteID),
            });
            if (response.ok) {
                alert(`¡Libro eliminado con éxito!`);
                window.location.reload(true);
            } else {
                console.log("Error en la eliminación");
            }
        } catch (error) {
            console.error("Error al eliminar el libro:", error);
            alert("No se pudo eliminar el libro. Intenta nuevamente.");
        }
    };

    // Manejar la apertura del modal de edición
    const handleEdit = () => {
        setShowModal(true);
    };

    // Manejar el cierre del modal de edición
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Manejar el clic fuera del modal para cerrarlo
    const handleClickOutside = (e) => {
        if (e.target.classList.contains("modal")) {
            setShowModal(false);
        }
    };

    // Manejar el cambio en los campos del formulario de edición
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value,
        });
    };

    // Manejar la actualización del libro
    const handleSave = async () => {
        try {
            const response = await fetch("http://localhost:3000/updateBook", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    ...bookData,
                }),
            });

            if (response.ok) {
                alert("¡Libro actualizado con éxito!");
                setShowModal(false); // Cerrar modal después de guardar
                window.location.reload(true); // Recargar la página para reflejar los cambios
            } else {
                alert("Error al actualizar el libro.");
            }
        } catch (error) {
            console.error("Error al actualizar el libro:", error);
            alert("No se pudo actualizar el libro. Intenta nuevamente.");
        }
    };

    return (
        <li>
            <div className="book">
                <p>
                    {nombre}
                    <br />
                    <br />
                    {autor}
                    <br />
                    <br />
                    {formatFecha(publicacion)}
                </p>
                <div className="cover">
                    <img src={url} alt={nombre} />
                </div>
            </div>
            <div>{categoria}</div>
            <div className="buttonsBooks">
                <button onClick={handleEdit}><img src="/edit-svgrepo-com.svg" alt="" /></button>
                <button onClick={handleDelete}><img src="/delete-svgrepo-com.svg" alt="" /></button>
            </div>

            {/* Modal de edición */}
            {showModal && (
                <div className="modal" onClick={handleClickOutside}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={handleCloseModal}>
                            &times;
                        </span>
                        <h2>Editar Libro</h2>
                        <form className="formModal">
                            <label>
                                Nombre:
                                <input
                                    type="text"
                                    name="nombre"
                                    value={bookData.nombre}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                Autor:
                                <input
                                    type="text"
                                    name="autor"
                                    value={bookData.autor}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                Categoría:
                                <select
                                    name="categoria"
                                    value={bookData.categoria}
                                    onChange={handleChange}
                                >
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
                            </label>

                            <br />
                            <label>
                                URL:
                                <input
                                    type="text"
                                    name="url"
                                    value={bookData.url}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                Fecha de publicación:
                                <input
                                    type="date"
                                    name="publicacion"
                                    value={bookData.publicacion.slice(0, 10)}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <button type="button" onClick={handleSave}>Guardar</button>
                        </form>
                    </div>
                </div>
            )}
        </li>
    );
}

// Validación de las props
Book.propTypes = {
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    autor: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    publicacion: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired, // Función para actualizar la lista de libros
};

export default Book;
