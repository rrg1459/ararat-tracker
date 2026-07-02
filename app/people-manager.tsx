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
  function handleEditClick(person: Person) {
    setEditingPerson(person);

    // Programamos el llenado de campos en el formulario de forma segura
    if (formRef.current) {
      const inputs = formRef.current.elements as any;
      inputs.id_number.value = person.id_number;
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
          {editingPerson ? `Editing: ${editingPerson.first_name}` : "Register New Person"}
        </h2>

        <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Cédula / ID Number *</label>
            <input
              type="text"
              name="id_number"
              required
              className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name *</label>
              <input
                type="text"
                name="first_name"
                required
                className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name *</label>
              <input
                type="text"
                name="last_name"
                required
                className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Person Type *</label>
              <select
                name="person_type"
                required
                className="w-full p-2 rounded-md border border-zinc-300 bg-zinc-50 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100 focus:outline-blue-500"
              >
                <option value="member">Member</option>
                <option value="visitor">Visitor</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Birth Date</label>
            <input
              type="date"
              name="birth_date"
              className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500"
            />
          </div>

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className={`flex-1 text-white p-2.5 rounded-md font-semibold transition-colors cursor-pointer ${editingPerson ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {editingPerson ? "Update Changes" : "Save Person"}
            </button>

            {editingPerson && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-zinc-300 text-zinc-700 px-4 py-2.5 rounded-md font-semibold hover:bg-zinc-400 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600 cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* COLUMNA 2: LISTADO */}
      <section className="bg-white p-6 rounded-xl shadow-xs border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
        <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">
          Registered People ({initialPeople.length})
        </h2>

        <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2">
          {initialPeople.length === 0 ? (
            <p className="text-zinc-500 text-sm italic">No people registered yet.</p>
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
                    ID: {person.id_number} {person.phone ? `• Tel: ${person.phone}` : ''}
                  </p>
                  <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${person.person_type === 'member'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                    {person.person_type === 'member' ? 'Member' : 'Visitor'}
                  </span>
                </div>

                {/* Botón para activar la edición */}
                <button
                  onClick={() => handleEditClick(person)}
                  className="text-xs bg-white text-zinc-700 border border-zinc-300 px-3 py-1.5 rounded-md hover:bg-zinc-100 dark:bg-zinc-600 dark:text-zinc-200 dark:border-zinc-500 dark:hover:bg-zinc-500 transition-colors cursor-pointer font-medium"
                >
                  Edit
                </button>
              </div>
            ))
          )}
        </div>
      </section>

    </main>
  );
}