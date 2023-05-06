import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  cargarActividades,
  guardarActividades,
} from "../services/GrupoService";

const ModalActEval = ({ idGrupo }) => {
  const [filas, setFilas] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [tdList, setTdList] = useState([]);

  const handleClose = () => setLgShow(false);
  const handleShow = () => setLgShow(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchComboBox = async () => {
      await cargarActividades(
        idGrupo,
        (response) => {
          setRows(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    fetchComboBox();
  }, []);

  const [Modulo, setModulo] = useState([]);

  const addRow = () => {
    const newRow = {
      id: null,
      concepto: "",
      porcentaje: "",
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = (index, notasAsociadas) => {
    if (notasAsociadas === true) {
      alert("La actividad cuenta con notas asociadas");
      return;
    } else {
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
    }
  };

  const handleChange = (event, index, key) => {
    const newRows = [...rows];
    newRows[index][key] = event.target.value;
    setRows(newRows);
  };

  const saveRows = async () => {
    const codigoGrupo = idGrupo; // Valor de ejemplo, puedes cambiarlo por una variable de estado si lo necesitas
    const grupo = { codigoGrupo };
    const updatedRows = rows.map((row) => ({ ...row, grupo: grupo }));
    //const data = { notas: updatedRows };
    const jsondata = JSON.stringify(updatedRows);
    //const data = { rows };
    await guardarActividades(
      idGrupo,
      jsondata,
      (response) => {
        console.log(response.data);
        //toast.success("Producto agregado con éxito");
      },
      (error) => {
        // toast.error("Error agregando el producto");
        console.error(error);
      }
    );
  };

  return (
    <>
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Guardar</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>¿Esta seguro que desea guardar?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Cancelar</Button>
          <Button variant="primary" onClick={saveRows}>Guardar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
      <Button className="btn btn-info" onClick={handleShow}>
        Agregar actividad
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            ACTIVIDADES EVALUATIVAS
            <h1>grupo: {idGrupo}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button onClick={addRow}>Agregar Actividad +</button>
          <table>
            <thead>
              <tr>
                <th style={{ display: "none" }}>Id</th>
                <th>Concepto</th>
                <th>Porcentaje</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td style={{ display: "none" }}>
                    <input
                      type="number"
                      value={row.id ? row.id : null}
                      onChange={(event) => handleChange(event, index, "id")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.concepto}
                      onChange={(event) =>
                        handleChange(event, index, "concepto")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.porcentaje}
                      onChange={(event) =>
                        handleChange(event, index, "porcentaje")
                      }
                    />
                  </td>
                  <td>
                    <button onClick={() => deleteRow(index, row.tieneNotas)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveRows}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalActEval;
