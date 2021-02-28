export interface Dashboard {
  contaBanco: {
    saldo: number,
    id: number,
    lancamentos: []
  },
  contaCredito: {
    saldo: number,
    id: number,
    lancamentos: []
  }
}
