import React, { useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ContactosReducer } from "../reducers/ContactosReducer";
import FormularioAdd from "./FormularioAdd";
import TablaContactos from "./TablaContactos";

const init = () => {
  const contactos = localStorage.getItem("contactos");

  return contactos ? JSON.parse(contactos) : [];
};

const Contactos = () => {
  const [state, dispatch] = useReducer(ContactosReducer, [], init);
  const [formView, setFormView] = useState(false);

  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(state));
  }, [state]);

  const handleView = () => {
    setFormView(!formView);
  };

  return (
    <div className="container mt-3">
      <button onClick={handleView} className="btn btn-success mt-3">
        {formView ? "Cerrar formulario" : "Agregar Contacto"}
      </button>
      {formView && <FormularioAdd dispatch={dispatch} />}
      <TablaContactos contactos={state} dispatch={dispatch} />
    </div>
  );
};

export default Contactos;
