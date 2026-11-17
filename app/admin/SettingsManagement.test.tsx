import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { updateAppSetting } = vi.hoisted(() => ({
  updateAppSetting: vi.fn(),
}));

vi.mock('../actions/actions', () => ({
  updateAppSetting,
}));

import SettingsManagement from './SettingsManagement';

const appSettings = [
  { key: 'min_age_member', value: 18 },
  { key: 'max_age_member', value: 60 },
  { key: 'min_age_leader', value: 25 },
  { key: 'max_age_leader', value: 65 },
];

describe('SettingsManagement', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    updateAppSetting.mockResolvedValue({ success: true });
  });

  it('edits, cancels and saves settings without rendering a modal', async () => {
    render(<SettingsManagement appSettings={appSettings} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const memberMin = screen.getByRole('slider', { name: 'Para ser Miembro: edad mínima' });
    fireEvent.change(memberMin, { target: { value: '30' } });
    expect(memberMin).toHaveValue('30');

    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(memberMin).toHaveValue('18');

    fireEvent.change(memberMin, { target: { value: '20' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));

    await waitFor(() => {
      expect(updateAppSetting).toHaveBeenCalledOnce();
    });
    expect(updateAppSetting).toHaveBeenCalledWith('min_age_member', 20);
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Configuración actualizada correctamente.'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(memberMin).toHaveValue('20');
  });
});
