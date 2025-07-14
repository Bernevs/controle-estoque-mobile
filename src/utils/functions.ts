export function formataData(dataIso: Date) {
  const data = new Date(dataIso);

  const dataFormatada = `${data.getDate().toString().padStart(2, "0")}/${(
    data.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${data.getFullYear()}`;

  return dataFormatada;
}

export function formataHora(dataIso: string) {
  const data = new Date(dataIso);
}

export function formataValor() {}
