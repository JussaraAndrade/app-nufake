import { Plans } from 'src/app/shared/interfaces/plans.interface';

export interface Dashboard {
  contaBanco: {
    saldo: number;
    id: number;
    lancamentos: Lancamento[];
  };
  contaCredito: {
    saldo: number;
    id: number;
    lancamentos: Lancamento[];
  };
}

export interface Lancamento {
  conta: number;
  data: string;
  descricao: string;
  id: number;
  planoConta: Plans;
  tipo: string;
  valor: number;
}
