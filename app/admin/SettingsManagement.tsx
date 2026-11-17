'use client';

import { useState } from 'react';
import { updateAppSetting } from '../actions/actions';

interface AppSettingItem {
  key: string;
  value: number;
}

interface SettingsManagementProps {
  appSettings: AppSettingItem[];
}

const MIN_AGE_LIMIT = 0;
const MAX_AGE_LIMIT = 100;
const MIN_GAP = 10;

export default function SettingsManagement({
  appSettings = [],
}: SettingsManagementProps) {
  const [activeThumb, setActiveThumb] = useState<Record<string, 'min' | 'max'>>({});
  const [initialSettingsValues, setInitialSettingsValues] = useState<Record<string, number>>(() =>
    appSettings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, number>)
  );
  const [settingsValues, setSettingsValues] = useState<Record<string, number>>(
    initialSettingsValues
  );
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleMinChange = (minKey: string, maxKey: string, val: number) => {
    setActiveThumb((prev) => ({ ...prev, [minKey]: 'min' }));
    setSettingsValues((prev) => {
      const currentMax = prev[maxKey] ?? MAX_AGE_LIMIT;
      return { ...prev, [minKey]: Math.min(val, currentMax - MIN_GAP) };
    });
  };

  const handleMaxChange = (minKey: string, maxKey: string, val: number) => {
    setActiveThumb((prev) => ({ ...prev, [minKey]: 'max' }));
    setSettingsValues((prev) => {
      const currentMin = prev[minKey] ?? MIN_AGE_LIMIT;
      return { ...prev, [maxKey]: Math.max(val, currentMin + MIN_GAP) };
    });
  };

  const handleCancel = () => {
    setSettingsValues(initialSettingsValues);
    setErrorMessage('');
    setSuccessMessage('');
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
      const firstError = results.find((result) => !result?.success);

      if (firstError) {
        throw new Error(
          typeof firstError.error === 'string' && firstError.error.trim() !== ''
            ? firstError.error
            : 'No se pudo actualizar la configuración.'
        );
      }

      setInitialSettingsValues(settingsValues);
      setSuccessMessage('Configuración actualizada correctamente.');
    } catch (error) {
      console.error('Error al actualizar:', error);
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : 'Ocurrió un error inesperado al guardar.'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderRangeSlider = (title: string, minKey: string, maxKey: string) => {
    const minVal = settingsValues[minKey] ?? 18;
    const maxVal = settingsValues[maxKey] ?? 60;
    const minPercent = ((minVal - MIN_AGE_LIMIT) / (MAX_AGE_LIMIT - MIN_AGE_LIMIT)) * 100;
    const maxPercent = ((maxVal - MIN_AGE_LIMIT) / (MAX_AGE_LIMIT - MIN_AGE_LIMIT)) * 100;
    const currentActive = activeThumb[minKey] || 'min';

    return (
      <div className="mb-6 flex flex-col gap-1">
        <div className="mb-4 flex items-center justify-between text-md font-semibold text-zinc-700 dark:text-zinc-300">
          <span>{title}</span>
          <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
            {minVal} - {maxVal} años
          </span>
        </div>

        <div className="relative flex h-10 w-full select-none items-center pt-4">
          <div className="pointer-events-none absolute h-1.5 w-full rounded-lg bg-zinc-200 dark:bg-zinc-700" />
          <div
            className="pointer-events-none absolute h-2 rounded-lg bg-blue-500"
            style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
          />
          <div
            className="pointer-events-none absolute -top-3 z-30 -translate-x-1/2 transform rounded bg-blue-600 px-1.5 py-0.5 text-[15px] font-bold text-white shadow"
            style={{ left: `${minPercent}%` }}
          >
            {minVal}
          </div>
          <div
            className="pointer-events-none absolute -top-3 z-30 -translate-x-1/2 transform rounded bg-blue-600 px-1.5 py-0.5 text-[15px] font-bold text-white shadow"
            style={{ left: `${maxPercent}%` }}
          >
            {maxVal}
          </div>

          <input
            type="range"
            min={MIN_AGE_LIMIT}
            max={MAX_AGE_LIMIT}
            value={minVal}
            aria-label={`${title}: edad mínima`}
            onMouseDown={() => setActiveThumb((prev) => ({ ...prev, [minKey]: 'min' }))}
            onTouchStart={() => setActiveThumb((prev) => ({ ...prev, [minKey]: 'min' }))}
            onChange={(event) => handleMinChange(minKey, maxKey, Number(event.target.value))}
            className="dual-range-input"
            style={{ zIndex: currentActive === 'min' ? 25 : 20 }}
          />
          <input
            type="range"
            min={MIN_AGE_LIMIT}
            max={MAX_AGE_LIMIT}
            value={maxVal}
            aria-label={`${title}: edad máxima`}
            onMouseDown={() => setActiveThumb((prev) => ({ ...prev, [minKey]: 'max' }))}
            onTouchStart={() => setActiveThumb((prev) => ({ ...prev, [minKey]: 'max' }))}
            onChange={(event) => handleMaxChange(minKey, maxKey, Number(event.target.value))}
            className="dual-range-input"
            style={{ zIndex: currentActive === 'max' ? 25 : 20 }}
          />
        </div>
      </div>
    );
  };

  return (
    <section className="w-full max-w-2xl rounded-lg border border-zinc-200 bg-white p-6 text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
          Configuración de la Aplicación
        </p>

        <div className="flex flex-col gap-1 border-t border-zinc-200 pt-3 dark:border-zinc-700">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Rangos de Edad Válidos
          </p>
          {renderRangeSlider('Para ser Miembro', 'min_age_member', 'max_age_member')}
          {renderRangeSlider('Para ser Líder', 'min_age_leader', 'max_age_leader')}
        </div>

        <div className="mt-2 flex justify-center gap-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="cursor-pointer rounded-md bg-zinc-200 px-3 py-1.5 text-xs text-zinc-700 hover:bg-zinc-300 disabled:opacity-50 dark:bg-zinc-600 dark:text-zinc-200"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            disabled={loading}
            className="cursor-pointer rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>

        {errorMessage && (
          <p role="alert" className="mt-1 text-center text-xs text-red-600 dark:text-red-400">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p role="status" className="mt-1 text-center text-xs text-green-600 dark:text-green-400">
            {successMessage}
          </p>
        )}
      </div>

      <style jsx global>{`
        .dual-range-input {
          position: absolute;
          width: 100%;
          height: 0;
          margin: 0;
          outline: none;
          background: none;
          -webkit-appearance: none;
          appearance: none;
          pointer-events: none;
        }

        .dual-range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          pointer-events: auto;
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
    </section>
  );
}