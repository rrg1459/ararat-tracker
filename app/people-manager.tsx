'use client'

import { useState, useRef } from "react";
import { registerPerson, updatePerson } from "./actions";

interface Person {
  id: string;
  id_number: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  email: string | null;
  birth_date: string | null;
  person_type: string;
}

export default function PeopleManager({ initialPeople }: { initialPeople: Person[] }) {
  // Estado para saber si estamos editando a alguien
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Esta función maneja el envío del formulario de manera dinámica
  async function handleSubmit(formData: FormData) {
    if (editingPerson) {
      // Si estamos editando, llamamos a updatePerson
      await updatePerson(editingPerson.id, formData);
      setEditingPerson(null); // Salimos del modo edición
    } else {
      // Si no, registramos una nueva persona
      await registerPerson(formData);
    }
    formRef.current?.reset(); // Limpiamos el formulario
  }

  // Activa el modo edición cargando los datos de la persona seleccionada
  // 1. Define la estructura de tu formulario fuera de la función
  interface PersonFormElements extends HTMLFormControlsCollection {
    id_number: HTMLInputElement;
    first_name: HTMLInputElement;
    last_name: HTMLInputElement;
    phone: HTMLInputElement;
    email: HTMLInputElement;
    birth_date: HTMLInputElement;
    person_type: HTMLInputElement; // O HTMLSelectElement si es un <select>
  }

  // 2. Tu función queda así:
  function handleEditClick(person: Person) {
    setEditingPerson(person);

    if (formRef.current) {
      // Castamos los elementos a nuestra interfaz personalizada
      const inputs = formRef.current.elements as PersonFormElements;

      // Ahora TS sabe exactamente qué es cada campo y no da errores
      inputs.id_number.value = person.id_number || "";
      inputs.first_name.value = person.first_name;
      inputs.last_name.value = person.last_name;
      inputs.phone.value = person.phone || "";
      inputs.email.value = person.email || "";
      inputs.birth_date.value = person.birth_date || "";
      inputs.person_type.value = person.person_type;
    }
  }

  // Cancela la edición y limpia el formulario
  function handleCancelEdit() {
    setEditingPerson(null);
    formRef.current?.reset();
  }

  return (
    <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* COLUMNA 1: FORMULARIO (REGISTRAR / EDITAR) */}
      <section className="bg-white p-6 rounded-xl shadow-xs border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
        <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">
          {editingPerson ? `Editando: ${editingPerson.first_name}` : "Registro de Nueva Persona"}
        </h2>

        <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">

          {/* CAMBIO: Campo de Cédula Opcional y destacado visualmente */}
          <div>
            <label className="block text-sm font-bold mb-1 text-amber-600 dark:text-amber-400">
              Cédula de Identidad <span className="font-normal italic text-xs">(Opcional)</span>
            </label>
            <input
              type="text"
              name="id_number"
              // SE QUITÓ EL ATRIBUTO "required" AQUÍ
              placeholder="Ej: V-12345678 (No obligatorio)"
              className="w-full p-2 rounded-md border border-amber-300 dark:border-amber-600/50 bg-transparent focus:outline-amber-500 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            />
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
              Puedes dejar este espacio en blanco si el miembro o visitante no posee el documento a la mano.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre(s) *</label>
              <input
                type="text"
                name="first_name"
                required
                className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Apellido(s) *</label>
              <input
                type="text"
                name="last_name"
                required
                className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input
                type="tel"
                name="phone"
                className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Persona *</label>
              <select
                name="person_type"
                required
                className="w-full p-2 rounded-md border border-zinc-300 bg-zinc-50 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100 focus:outline-blue-500"
              >
                <option value="visitor">Visitante</option>
                <option value="member">Miembro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fecha de Nacimiento</label>
            <input
              type="date"
              name="birth_date"
              className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className={`flex-1 text-white p-2.5 rounded-md font-semibold transition-colors cursor-pointer ${editingPerson ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {editingPerson ? "Actualizar Cambios" : "Guardar Persona"}
            </button>

            {editingPerson && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-zinc-300 text-zinc-700 px-4 py-2.5 rounded-md font-semibold hover:bg-zinc-400 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600 cursor-pointer"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      {/* COLUMNA 2: LISTADO */}
      <section className="bg-white p-6 rounded-xl shadow-xs border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
        <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">
          Personas Registradas ({initialPeople.length})
        </h2>

        <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2">
          {initialPeople.length === 0 ? (
            <p className="text-zinc-500 text-sm italic">No hay personas registradas aún.</p>
          ) : (
            initialPeople.map((person) => (
              <div
                key={person.id}
                className="p-3 bg-zinc-50 rounded-lg border border-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-sm">
                    {person.first_name} {person.last_name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {/* CAMBIO: Muestra un guion o texto aclaratorio si no tiene cédula cargada */}
                    Cédula: {person.id_number || "No registrada"} {person.phone ? `• Tel: ${person.phone}` : ''}
                  </p>
                  <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${person.person_type === 'member'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                    {person.person_type === 'member' ? 'Miembro' : 'Visitante'}
                  </span>
                </div>

                {/* Botón para activar la edición */}
                <button
                  onClick={() => handleEditClick(person)}
                  className="text-xs bg-white text-zinc-700 border border-zinc-300 px-3 py-1.5 rounded-md hover:bg-zinc-100 dark:bg-zinc-600 dark:text-zinc-200 dark:border-zinc-500 dark:hover:bg-zinc-500 transition-colors cursor-pointer font-medium"
                >
                  Editar
                </button>
              </div>
            ))
          )}
        </div>
      </section>

    </main>
  );
}