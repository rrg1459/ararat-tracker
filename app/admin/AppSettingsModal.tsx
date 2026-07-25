'use client';

import { useState, useRef } from 'react';
import FcSettings from '../svg/FcSettings';
import { updateAppSetting } from '../actions/actions';

interface AppSettingItem {
  key: string;
  value: number;
}

interface AppSettingsModalProps {
  appSettings: AppSettingItem[];
}

const MIN_AGE_LIMIT = 0;
const MAX_AGE_LIMIT = 100;
const MIN_GAP = 10; // Rango mínimo de 10 años entre mín y máx

export default function AppSettingsModal({
  appSettings = [],
}: AppSettingsModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const [activeThumb, setActiveThumb] = useState<Record<string, 'min' | 'max'>>({});

  const [settingsValues, setSettingsValues] = useState<Record<string, number>>(() => {
    return appSettings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, number>);
  });

  const initialSettingsValues = appSettings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, number>);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const openModal = () => {
    setErrorMessage('');
    setSuccessMessage('');
    modalRef.current?.showModal();

    setSettingsValues(appSettings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, number>));
  };

  const closeModal = () => {
    setSettingsValues(initialSettingsValues); // <-- Resetea los sliders
    setErrorMessage('');
    setSuccessMessage('');
    modalRef.current?.close();
  };

  // Maneja el cambio de Edad Mínima asegurando la diferencia de 10 años
  const handleMinChange = (minKey: string, maxKey: string, val: number) => {
    setActiveThumb((prev) => ({ ...prev, [minKey]: 'min' }));
    setSettingsValues((prev) => {
      const currentMax = prev[maxKey] ?? MAX_AGE_LIMIT;
      // La edad mínima no puede ser mayor que (máximo - 10)
      const validMin = Math.min(val, currentMax - MIN_GAP);
      return { ...prev, [minKey]: validMin };
    });
  };

  // Maneja el cambio de Edad Máxima asegurando la diferencia de 10 años
  const handleMaxChange = (minKey: string, maxKey: string, val: number) => {
    setActiveThumb((prev) => ({ ...prev, [minKey]: 'max' }));
    setSettingsValues((prev) => {
      const currentMin = prev[minKey] ?? MIN_AGE_LIMIT;
      // La edad máxima no puede ser menor que (mínimo + 10)
      const validMax = Math.max(val, currentMin + MIN_GAP);
      return { ...prev, [maxKey]: validMax };
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {

      const updates = Object.entries(settingsValues).filter(
        ([key, value]) => initialSettingsValues[key] !== value
      );

      if (updates.length === 0) {
        throw new Error('No hay cambios para guardar.');
      }

      const results = await Promise.all(
        updates.map(([key, value]) => updateAppSetting(key, value))
      );
      const firstError = results.find((res) => !res?.success);

      if (firstError) {
        throw new Error(
          typeof firstError.error === 'string' && firstError.error.trim() !== ''
            ? firstError.error
            : 'No se pudo actualizar la configuración.'
        );
      }

      // setEditPassword('');
      setSuccessMessage('Configuración actualizada correctamente.');

      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (error) {
      console.error('Error al actualizar:', error);
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocurrió un error inesperado al guardar.');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderRangeSlider = (
    title: string,
    minKey: string,
    maxKey: string
  ) => {
    const minVal = settingsValues[minKey] ?? 18;
    const maxVal = settingsValues[maxKey] ?? 60;

    const minPercent = ((minVal - MIN_AGE_LIMIT) / (MAX_AGE_LIMIT - MIN_AGE_LIMIT)) * 100;
    const maxPercent = ((maxVal - MIN_AGE_LIMIT) / (MAX_AGE_LIMIT - MIN_AGE_LIMIT)) * 100;

    const currentActive = activeThumb[minKey] || 'min';

    return (
      <div className="flex flex-col gap-1 mb-6">
        <div className="flex justify-between items-center text-md font-semibold text-zinc-700 dark:text-zinc-300 mb-4">
          <span>{title}</span>
          <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">
            {minVal} - {maxVal} años
          </span>
        </div>

        <div className="relative w-full h-10 flex items-center select-none pt-4">
          {/* Pista o barra de fondo neutra */}
          <div className="absolute w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg pointer-events-none" />

          {/* Barra azul de rango activo */}
          <div
            className="absolute h-2 bg-blue-500 rounded-lg pointer-events-none"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />

          {/* Badge con edad flotante sobre MÍNIMA */}
          <div
            className="absolute -top-3 transform -translate-x-1/2 pointer-events-none text-[15px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded shadow z-30"
            style={{ left: `${minPercent}%` }}
          >
            {minVal}
          </div>

          {/* Badge con edad flotante sobre MÁXIMA */}
          <div
            className="absolute -top-3 transform -translate-x-1/2 pointer-events-none text-[15px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded shadow z-30"
            style={{ left: `${maxPercent}%` }}
          >
            {maxVal}
          </div>

          {/* Input MÍNIMO */}
          <input
            type="range"
            min={MIN_AGE_LIMIT}
            max={MAX_AGE_LIMIT}
            value={minVal}
            onMouseDown={() => setActiveThumb((prev) => ({ ...prev, [minKey]: 'min' }))}
            onTouchStart={() => setActiveThumb((prev) => ({ ...prev, [minKey]: 'min' }))}
            onChange={(e) => handleMinChange(minKey, maxKey, Number(e.target.value))}
            className="dual-range-input"
            style={{ zIndex: currentActive === 'min' ? 25 : 20 }}
          />

          {/* Input MÁXIMO */}
          <input
            type="range"
            min={MIN_AGE_LIMIT}
            max={MAX_AGE_LIMIT}
            value={maxVal}
            onMouseDown={() => setActiveThumb((prev) => ({ ...prev, [minKey]: 'max' }))}
            onTouchStart={() => setActiveThumb((prev) => ({ ...prev, [minKey]: 'max' }))}
            onChange={(e) => handleMaxChange(minKey, maxKey, Number(e.target.value))}
            className="dual-range-input"
            style={{ zIndex: currentActive === 'max' ? 25 : 20 }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <style jsx global>{`
        /* Reseteo completo del slider nativo para poder apilar y arrastrar ambos fácilmente */
        .dual-range-input {
          position: absolute;
          width: 100%;
          height: 0px; /* Evita que las barras invisibles choquen */
          margin: 0;
          outline: none;
          background: none;
          -webkit-appearance: none;
          appearance: none;
          pointer-events: none;
        }

        /* Perillas (Thumbs) de Webkit (Chrome, Safari, Edge) */
        .dual-range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          pointer-events: auto; /* Solo la perilla es interactiva */
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #2563eb;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
          cursor: grab;
        }

        .dual-range-input::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.15);
        }

        /* Perillas (Thumbs) de Firefox */
        .dual-range-input::-moz-range-thumb {
          pointer-events: auto;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #2563eb;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
          cursor: grab;
        }

        .dual-range-input::-moz-range-thumb:active {
          cursor: grabbing;
        }
      `}</style>

      <button
        type="button"
        onClick={openModal}
        className="text-zinc-700 dark:text-zinc-200 rounded-md font-semibold hover:bg-blue-300 dark:hover:bg-blue-600 transition-colors cursor-pointer text-sm me-2.5"
        title="Configuración de App"
      >
        <FcSettings size={30} />
      </button>

      <dialog
        ref={modalRef}
        className="backdrop:bg-black/40 p-6 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 w-full max-w-sm fixed top-20 left-1/2 -translate-x-1/2 m-0 text-zinc-900 dark:text-zinc-100 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
            Configuración de la Aplicación
          </p>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700 flex flex-col gap-1">
            <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Rangos de Edad Válidos
            </p>

            {renderRangeSlider('Para ser Miembro', 'min_age_member', 'max_age_member')}
            {renderRangeSlider('Para ser Líder', 'min_age_leader', 'max_age_leader')}
          </div>

          <div className="flex justify-center gap-2 mt-2">
            <button
              type="button"
              onClick={closeModal}
              disabled={loading}
              className="text-xs bg-zinc-200 text-zinc-700 px-3 py-1.5 rounded-md hover:bg-zinc-300 dark:bg-zinc-600 dark:text-zinc-200 disabled:opacity-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              disabled={loading}
              className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 font-semibold disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>

          {errorMessage && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-1 text-center">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 text-center">
              {successMessage}
            </p>
          )}
        </div>
      </dialog>
    </>
  );
}