import { User } from './user.interface';

export interface LoginCredentials {
  usuario: string;
  senha: string;
}

export interface LoginResponse{
  //conta: Conta,
  //contaCredito: Conta,
  dataFim: Date;
  dataInicio: Date;
  token: string;
  usuario: User;
}
