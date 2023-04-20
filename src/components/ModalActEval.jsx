import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalActEval = ({ idGrupo }) => {
  const [lgShow, setLgShow] = useState(false);
  const [tdList, setTdList] = useState([]);
  const handleClose = () => setLgShow(false);
  const handleShow = () => setLgShow(true);

  const agregarEvaluacion = () => {
    const newTdList = [
      ...tdList,
      <tr key={tdList.length + 1}>
        <td>
          <input type="text" name={`valor1_${tdList.length + 1}`} />
        </td>
        <td>
          <input type="text" name={`valor2_${tdList.length + 1}`} />
        </td>
        <td>
          <button onClick={() => eliminarActividad(tdList.length)}>
            Eliminar
          </button>
        </td>
      </tr>,
    ];
    setTdList(newTdList);
  };

  const eliminarActividad = (index) => {
    const newTdList = tdList.filter((td, i) => i !== index);
    setTdList(newTdList);
  };
  const guardarActividades = () => {
    const data = {};
    let grupo = {};
    const codigoGrupo = idGrupo;
    grupo = { codigoGrupo };
    tdList.forEach((td, i) => {
      const concepto = td.props.children[0].props.value;
      const porcentaje = td.props.children[1].props.value;
      data[`td_${i + 1}`] = { concepto, porcentaje, grupo };
    });
    console.log(data);
  };

  return (
    <>
      <Button className="btn btn-info" onClick={() => setLgShow(true)}>
        Agregar actividad
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            ACTIVIDADES EVALUATIVAS
            <h1>{idGrupo}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <button onClick={agregarEvaluacion}>+</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>concepto</th>
                <th>porcentaje</th>
                <th>eliminar</th>
              </tr>
            </thead>
            <tbody id="actividad">{tdList}</tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarActividades}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalActEval;
