import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalActEval = ({ idGrupo }) => {
  const [filas, setFilas] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [tdList, setTdList] = useState([]);

  const handleClose = () => setLgShow(false);
  const handleShow = () => setLgShow(true);
  const [rows, setRows] = useState([]);

  const addRow = () => {
    const newRow = {
      id: "",
      concepto: "",
      porcentaje: "",
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleChange = (event, index, key) => {
    const newRows = [...rows];
    newRows[index][key] = event.target.value;
    setRows(newRows);
  };

  const saveRows = () => {
    const codigoGrupo = idGrupo; // Valor de ejemplo, puedes cambiarlo por una variable de estado si lo necesitas
    const grupo = { codigoGrupo };
    const updatedRows = rows.map((row) => ({ ...row, grupo: grupo }));
    const data = { notas: updatedRows };
    //const data = { rows };
    console.log(data);
  };

  return (
    <>
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
                <th>Id</th>
                <th>Concepto</th>
                <th>Porcentaje</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="number"
                      value={row.id}
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
                    <button onClick={() => deleteRow(index)}>Eliminar</button>
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
