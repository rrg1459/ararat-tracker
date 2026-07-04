'use client'

import { useState, useRef } from "react";
import { registerPerson, updatePerson } from "./actions";
import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";

registerLocale("es", es);

interface Person {
  id: string;
  id_number: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  email: string | null;
  birth_date: string | null; // Viene en formato "YYYY-MM-DD" o null
  person_type: string;
}

export default function PeopleManager({ initialPeople }: { initialPeople: Person[] }) {
  // Al crear una nueva persona, iniciamos en null para que se vea el placeholder limpio
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Interfaz para manipular directamente el formulario al editar
  interface PersonFormElements extends HTMLFormControlsCollection {
    id_number: HTMLInputElement;
    first_name: HTMLInputElement;
    last_name: HTMLInputElement;
    phone: HTMLInputElement;
    email: HTMLInputElement;
    person_type: HTMLSelectElement;
  }

  // Maneja el envío del formulario de manera dinámica
  async function handleSubmit(formData: FormData) {
    // Injectamos manualmente la fecha del DatePicker en el FormData antes de enviarlo
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split("T")[0];
      formData.set("birth_date", dateString);
    } else {
      formData.set("birth_date", "");
    }

    if (editingPerson) {
      await updatePerson(editingPerson.id, formData);
      setEditingPerson(null);
    } else {
      await registerPerson(formData);
    }

    // Resetear formulario y el estado del DatePicker (vuelve a mostrar el placeholder)
    formRef.current?.reset();
    setSelectedDate(null);
  }

  // Activa el modo edición cargando los datos de la persona seleccionada
  function handleEditClick(person: Person) {
    setEditingPerson(person);

    if (formRef.current) {
      const inputs = formRef.current.elements as PersonFormElements;

      inputs.id_number.value = person.id_number || "";
      inputs.first_name.value = person.first_name;
      inputs.last_name.value = person.last_name;
      inputs.phone.value = person.phone || "";
      inputs.email.value = person.email || "";
      inputs.person_type.value = person.person_type;

      // Cargamos la fecha en el DatePicker evitando desfases horarios de strings nativos
      if (person.birth_date) {
        setSelectedDate(new Date(person.birth_date.replace(/-/g, '\/')));
      } else {
        setSelectedDate(null);
      }
    }
  }

  // Cancela la edición y limpia todo
  function handleCancelEdit() {
    setEditingPerson(null);
    formRef.current?.reset();
    setSelectedDate(null);
  }

  return (
    <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* COLUMNA 1: FORMULARIO */}
      <section className="bg-white p-6 rounded-xl shadow-xs border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
        <h2 className="text-md sm:text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">
          {editingPerson ? `Editando: ${editingPerson.first_name}` : "Registro de Nueva Persona"}
        </h2>

        <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">

          <div>
            <label className="block text-sm font-bold mb-1 text-amber-600 dark:text-amber-400">
              Cédula de Identidad <span className="font-normal italic text-xs">(Opcional)</span>
            </label>
            <input
              type="text"
              name="id_number"
              placeholder="Ej: V-12345678 (No obligatorio)"
              className="w-full p-2 rounded-md border border-amber-300 dark:border-amber-600/50 bg-transparent focus:outline-amber-500 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            />
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
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
              Fecha de Nacimiento
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="dd/MMM/yyyy"
              placeholderText="Elige un día"
              locale="es"
              maxDate={new Date()}
              dayClassName={(date) => {
                const day = date.getDay();
                return day === 0 || day === 6 ? "weekend-day" : "";
              }}
              // Se cambia a w-full para que coincida visualmente con el resto de inputs del formulario
              className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-zinc-900 dark:text-zinc-100 dark:border-zinc-600 text-center"
            />
          </div>

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className={`flex-1 text-white p-2.5 rounded-md font-semibold transition-colors cursor-pointer ${editingPerson ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {editingPerson ? "Actualizar" : "Guardar Persona"}
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
        <h2 className="text-md sm:text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">
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
                    Cédula: {person.id_number || "No registrada"} {person.phone ? `• Tel: ${person.phone}` : ''}
                  </p>
                  <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${person.person_type === 'member'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                    {person.person_type === 'member' ? 'Miembro' : 'Visitante'}
                  </span>
                </div>

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