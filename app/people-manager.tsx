'use client'

import { useState, useRef } from "react";
import { registerPerson, updatePerson } from "./actions/actions";
import { getRoleBadge } from "./utils/person-role-badge";
import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";

registerLocale("es", es);

interface Person {
  id: string;
  id_number: string | null;
  first_name: string;
  last_name: string;
  home_phone?: string | null;
  cell_phone?: string | null;
  email?: string | null;
  birth_date?: string | null;
  person_type: string;
  address?: string | null;
  city?: string | null;
  is_first_time_visitor?: boolean;
  comes_from_another_church?: boolean;
  needs_prayer?: boolean;
  wants_to_be_visited?: boolean;
  wants_bible_studies?: boolean;
  is_new_in_area?: boolean;
  accepted_jesus?: boolean;
  received_holy_spirit?: boolean;
  notes?: string | null;
  attendance_count: number;
}

export default function PeopleManager({ initialPeople }: { initialPeople: Person[] }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [personType, setPersonType] = useState<string>("visitor");
  const formRef = useRef<HTMLFormElement>(null);

  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({
    is_first_time_visitor: false,
    comes_from_another_church: false,
    needs_prayer: false,
    wants_to_be_visited: false,
    wants_bible_studies: false,
    is_new_in_area: false,
    accepted_jesus: false,
    received_holy_spirit: false,
  });

  interface PersonFormElements extends HTMLFormControlsCollection {
    id_number: HTMLInputElement;
    first_name: HTMLInputElement;
    last_name: HTMLInputElement;
    home_phone: HTMLInputElement;
    cell_phone: HTMLInputElement;
    email: HTMLInputElement;
    person_type: HTMLSelectElement;
    address: HTMLInputElement;
    city: HTMLInputElement;
    notes: HTMLTextAreaElement;
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxes({
      ...checkboxes,
      [e.target.name]: e.target.checked,
    });
  };

  const calculateAge = (birthDate: Date | null): number | null => {
    if (!birthDate) {
      return null;
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const getRoleValidationMessage = (): string | null => {
    const age = calculateAge(selectedDate);

    if (age !== null && age > 120) {
      return "No se puede registrar: la edad no puede ser mayor a 120 años.";
    }

    if (personType === "member") {
      const issues: string[] = [];

      if (age === null || age < 18) {
        issues.push("debe ser mayor de 18 años");
      }
      if (!checkboxes.accepted_jesus) {
        issues.push("debe haber aceptado a Jesús");
      }
      if (checkboxes.is_first_time_visitor) {
        issues.push("no debe ser visitante por primera vez");
      }
      if (checkboxes.comes_from_another_church) {
        issues.push("no debe venir de otra iglesia");
      }
      if (checkboxes.is_new_in_area) {
        issues.push("no debe ser nuevo en la zona");
      }

      if (issues.length > 0) {
        return `Para ser registrado como Miembro: ${issues.join(", ")}.`;
      }
    }

    if (personType === "leader") {
      const issues: string[] = [];

      if (age === null || age < 21) {
        issues.push("debe ser mayor de 21 años");
      }
      if (!checkboxes.accepted_jesus) {
        issues.push("debe haber aceptado a Jesús");
      }
      if (!checkboxes.received_holy_spirit) {
        issues.push("debe haber recibido el Espíritu Santo");
      }
      const shouldBeFalseFields = [
        { key: "is_first_time_visitor", label: "ser visitante por primera vez" },
        { key: "comes_from_another_church", label: "venir de otra iglesia" },
        { key: "wants_to_be_visited", label: "desear que lo visiten" },
        { key: "wants_bible_studies", label: "desear estudios bíblicos" },
        { key: "is_new_in_area", label: "ser nuevo en la zona" },
      ] as const;

      shouldBeFalseFields.forEach((field) => {
        if (checkboxes[field.key]) {
          issues.push(`no debe ${field.label.toLowerCase()}`);
        }
      });

      if (issues.length > 0) {
        return `Para ser registrado como Líder: ${issues.join(", ")}.`;
      }
    }

    return null;
  };

  const roleValidationMessage = getRoleValidationMessage();
  const ageLimitValidationMessage = roleValidationMessage?.includes("mayor a 120 años")
    ? roleValidationMessage
    : null;
  const roleRequirementsValidationMessage = ageLimitValidationMessage
    ? null
    : roleValidationMessage;

  async function handleSubmit(formData: FormData) {
    if (roleValidationMessage) {
      return;
    }

    if (selectedDate) {
      const dateString = selectedDate.toISOString().split("T")[0];
      formData.set("birth_date", dateString);
    } else {
      formData.set("birth_date", "");
    }

    Object.entries(checkboxes).forEach(([key, value]) => {
      if (value) {
        formData.set(key, "on");
      } else {
        formData.delete(key);
      }
    });

    if (editingPerson) {
      await updatePerson(editingPerson.id, formData);
      setEditingPerson(null);
    } else {
      await registerPerson(formData);
    }

    resetForm();
  }

  function handleEditClick(person: Person) {
    setEditingPerson(person);

    if (formRef.current) {
      const inputs = formRef.current.elements as PersonFormElements;

      inputs.id_number.value = person.id_number || "";
      inputs.first_name.value = person.first_name;
      inputs.last_name.value = person.last_name;
      inputs.home_phone.value = person.home_phone || "";
      inputs.cell_phone.value = person.cell_phone || "";
      inputs.email.value = person.email || "";
      inputs.person_type.value = person.person_type;
      setPersonType(person.person_type);
      inputs.address.value = person.address || "";
      inputs.city.value = person.city || "";
      inputs.notes.value = person.notes || "";

      setCheckboxes({
        is_first_time_visitor: person.is_first_time_visitor || false,
        comes_from_another_church: person.comes_from_another_church || false,
        needs_prayer: person.needs_prayer || false,
        wants_to_be_visited: person.wants_to_be_visited || false,
        wants_bible_studies: person.wants_bible_studies || false,
        is_new_in_area: person.is_new_in_area || false,
        accepted_jesus: person.accepted_jesus || false,
        received_holy_spirit: person.received_holy_spirit || false,
      });

      if (person.birth_date) {
        setSelectedDate(new Date(person.birth_date.replace(/-/g, '\/')));
      } else {
        setSelectedDate(null);
      }
    }
  }

  function resetForm() {
    formRef.current?.reset();
    setSelectedDate(null);
    setPersonType("visitor");
    setCheckboxes({
      is_first_time_visitor: false,
      comes_from_another_church: false,
      needs_prayer: false,
      wants_to_be_visited: false,
      wants_bible_studies: false,
      is_new_in_area: false,
      accepted_jesus: false,
      received_holy_spirit: false,
    });
  }

  function handleCancelEdit() {
    setEditingPerson(null);
    resetForm();
  }

  return (
    <main className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

      {/* COLUMNA 1: FORMULARIO */}
      <section className="lg:col-span-7 bg-white p-6 rounded-xl shadow-xs border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
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
              placeholder="Ej: V-12345678"
              className="w-full p-2 rounded-md border border-amber-300 dark:border-amber-600/50 bg-transparent focus:outline-amber-500 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            />
          </div>

          {/* Cambiado a grid-cols-1 por defecto, md:grid-cols-2 en pantallas medianas/grandes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Cambiado a grid-cols-1 por defecto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono Fijo</label>
              <input
                type="tel"
                name="home_phone"
                className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Celular</label>
              <input
                type="tel"
                name="cell_phone"
                className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>

          {/* Cambiado a grid-cols-1 por defecto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Persona *</label>
              <select
                name="person_type"
                required
                value={personType}
                onChange={(e) => setPersonType(e.target.value)}
                className="w-full p-2 rounded-md border border-zinc-300 bg-zinc-50 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100 focus:outline-blue-500"
              >
                <option value="visitor">Visitante</option>
                <option value="member">Miembro</option>
                <option value="leader">Líder</option>
              </select>
            </div>

            {roleRequirementsValidationMessage && (
              <p className="text-sm text-red-600 dark:text-red-400 sm:col-span-2 font-medium">
                {roleRequirementsValidationMessage}
              </p>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
              />
            </div>

          </div>

          {/* Cambiado a grid-cols-1 por defecto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ciudad</label>
              <input
                type="text"
                name="city"
                className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
                Fecha de Nacimiento (*)
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                dateFormat="dd/MMM/yyyy"
                placeholderText="Elige un día"
                required
                locale="es"
                maxDate={new Date()}
                className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-zinc-900 dark:text-zinc-100 dark:border-zinc-600 text-center"
              />
              {ageLimitValidationMessage && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 font-medium">
                  {ageLimitValidationMessage}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Dirección Completa</label>
            <input
              type="text"
              name="address"
              className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          {/* SECCIÓN: CHECKBOXES (En móvil van uno debajo del otro, en tablets/PC van en 2 columnas) */}
          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700/60 mt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Información y Necesidades Eclesiásticas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: "is_first_time_visitor", label: "Visitante por primera vez" },
                { name: "comes_from_another_church", label: "Viene de otra iglesia" },
                { name: "needs_prayer", label: "Necesita oración" },
                { name: "wants_to_be_visited", label: "Desea que lo visiten" },
                { name: "wants_bible_studies", label: "Desea estudios bíblicos" },
                { name: "is_new_in_area", label: "Nuevo en la zona" },
                { name: "accepted_jesus", label: "Aceptó a Jesús" },
                { name: "received_holy_spirit", label: "Recibió el Espíritu Santo" },
              ].map((item) => (
                <label key={item.name} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={checkboxes[item.name]}
                    onChange={handleCheckboxChange}
                    className="mt-0.5 w-4 h-4 text-blue-600 rounded-sm border-zinc-300 focus:ring-blue-500"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Observaciones / Notas</label>
            <textarea
              name="notes"
              rows={3}
              placeholder="Detalles o peticiones específicas..."
              className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100 resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <button
              type="submit"
              disabled={Boolean(roleValidationMessage)}
              className={`flex-1 text-white p-2 rounded-md font-semibold transition-colors ${roleValidationMessage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${editingPerson ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {editingPerson ? "Actualizar" : "Guardar Persona"}
            </button>

            {editingPerson && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-zinc-300 text-zinc-700 px-3 py-2 rounded-md font-semibold hover:bg-zinc-400 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600 cursor-pointer"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>


      {/* COLUMNA 2: LISTADO */}
      <section className="lg:col-span-5 bg-white p-6 rounded-xl shadow-xs border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
        <h2 className="text-md sm:text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">
          Personas Registradas ({initialPeople.length})
        </h2>

        <div className="flex flex-col gap-3 max-h-[700px] overflow-y-auto pr-2">
          {initialPeople.length === 0 ? (
            <p className="text-zinc-500 text-sm italic">No hay personas registradas aún.</p>
          ) : (
            initialPeople.map((person) => {
              // --- LÓGICA PARA CALCULAR LA EDAD ---
              let age: number | null = null;
              if (person.birth_date) {
                const birthDate = new Date(person.birth_date.replace(/-/g, '/'));
                const today = new Date();
                let calculatedAge = today.getFullYear() - birthDate.getFullYear();
                const monthDifference = today.getMonth() - birthDate.getMonth();

                if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                  calculatedAge--;
                }
                age = calculatedAge;
              }

              const currentRole = getRoleBadge(person.person_type);

              return (
                <div
                  key={person.id}
                  className="p-3 bg-zinc-50 rounded-lg border border-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 flex justify-between items-center gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm truncate">
                      {person.first_name} {person.last_name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      Cédula: {person.id_number || "No registrada"}
                    </p>
                    {person.cell_phone && (
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        📱 Cel: {person.cell_phone}
                      </p>
                    )}

                    {/* CONTENEDOR DE ETIQUETAS */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full ${currentRole.classes}`}>
                        {currentRole.label}
                      </span>

                      {/* ETIQUETA DE EDAD: BEBÉ O NIÑO */}
                      {age !== null && age >= 0 && age <= 3 && (
                        <span className="bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-0.5">
                          Bebé 👶
                        </span>
                      )}
                      {age !== null && age >= 4 && age <= 11 && (
                        <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-0.5">
                          Niño 👦
                        </span>
                      )}

                      {/* ETIQUETA: CRISTIANO (Aceptó a Jesús) */}
                      {person.accepted_jesus && (
                        <span className="bg-emerald-500 text-white dark:bg-emerald-600 text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5 shadow-xs">
                          Cristiano 🙏
                        </span>
                      )}

                      {person.is_first_time_visitor && person.attendance_count < 2 && (
                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] px-2 py-0.5 rounded-full font-medium">
                          1ra Vez
                        </span>
                      )}
                      {person.needs_prayer && (
                        <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 text-[10px] px-2 py-0.5 rounded-full font-medium">
                          Oración 🙏
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleEditClick(person)}
                    className="text-xs bg-white text-zinc-700 border border-zinc-300 px-3 py-1.5 rounded-md hover:bg-zinc-100 dark:bg-zinc-600 dark:text-zinc-200 dark:border-zinc-500 dark:hover:bg-zinc-500 transition-colors cursor-pointer font-medium whitespace-nowrap"
                  >
                    {editingPerson && editingPerson.id === person.id ? "Editando" : "Editar"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>

    </main>
  );
}