export type IInfo = {
  bairro: string;
  cidade: string;
  nome: string;
  titulo: string;
  vendedor: string;
};

export type IRangeDetalhes = {
  inicio_range: number;
  final_range: number;
  intervalo: number;
  valor: string;
};

export type IChances = {
  simples: IRangeDetalhes;
  dupla: IRangeDetalhes;
  tripla: IRangeDetalhes;
  quadrupla: IRangeDetalhes;
  quintupla: IRangeDetalhes;
  sextupla: IRangeDetalhes;
};

export type IInfoPremio = {
  nome: string;
  imagem: string;
  ganhadores: Array<IInfo>;
  numsorteados: string;
};

export type IRange = {
  codigo: string;
  dezenas: Array<string>;
  numero_titulo: string;
  cod: string;
};

export type ISorteio = {
    id: string;
    nome: string;
    edicao: string;
    premio1: IInfoPremio;
    premio2: IInfoPremio;
    premio3: IInfoPremio;
    premio4: IInfoPremio;
    premiogiro?: IInfoPremio;
    chances: IChances;
    urlImagem: string;
    valor: string;
    resultado?: string;
    ativo?: boolean;
    range_id: string;
    status: string;
};
