import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';
describe('Teste da Página de Login', () => {
  test('Ao iniciar, o formulário de login deve ser mostrado', () => {
    render(<Login />);

    const EmailInput = screen.getByPlaceholderText('Email');
    expect(EmailInput).toBeInTheDocument();
  });
});
