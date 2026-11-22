"use client";

import { useId } from "react";

const MIN_SEARCH_LENGTH = 3;

interface SearchablePerson {
  first_name: string;
  last_name: string;
  id_number: string | null;
}

export function isPersonSearchActive(searchTerm: string): boolean {
  return searchTerm.trim().length >= MIN_SEARCH_LENGTH;
}

export function filterPeopleBySearch<T extends SearchablePerson>(people: T[], searchTerm: string): T[] {
  if (!isPersonSearchActive(searchTerm)) {
    return people;
  }

  const term = searchTerm.toLowerCase();
  return people.filter((person) =>
    person.first_name.toLowerCase().includes(term) ||
    person.last_name.toLowerCase().includes(term) ||
    (person.id_number || "").toLowerCase().includes(term)
  );
}

export default function PersonSearch({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const inputId = useId();
  const length = value.trim().length;

  return (
    <div className="mb-6">
      <label htmlFor={inputId} className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
        Buscar Persona
      </label>
      <div className="relative">
        <input
          id={inputId}
          type="text"
          placeholder="por cédula, nombre o apellido... (mínimo 3 caracteres)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2.5 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
        />
        {length > 0 && length < MIN_SEARCH_LENGTH && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
            Escribe al menos 3 caracteres para activar el filtro.
          </p>
        )}
      </div>
    </div>
  );
}
