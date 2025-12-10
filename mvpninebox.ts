import * as readline from "readline";

type TipoPermissao = 'colaborador' | 'gestor';

interface Resposta {
  pergunta: string;
  indiceResposta: number;
  pontuacao: number;
  permissao: TipoPermissao;
}

// Opções de resposta
const opcoesDeRespostas = [
  "Excelente",
  "Bom",
  "Satisfatório",
  "Insatisfatório",
  "Precisa melhorar"
] as const;

const pontuacoes = [5, 4, 3, 2, 1];

// Perguntas 
const perguntasDesempenho = [
  "Qualidade da entrega e cumprimento das metas",
  "Organização e produtividade no dia a dia",
  "Resolução de problemas e tomada de decisão",
  "Comprometimento com prazos e resultados"
];

const perguntasPotencial = [
  "Capacidade de aprender rapidamente coisas novas",
  "Abertura para feedbacks e evolução contínua",
  "Perfil de liderança (iniciativa, influência, responsabilidade)",
  "Capacidade de lidar com desafios e mudanças"
];

// Configuração readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function perguntar(texto: string): Promise<string> {
  return new Promise((resolve) => rl.question(texto, resolve));
}

async function obterPermissao(): Promise<TipoPermissao> {
  while (true) {
    console.log("\nQual o seu perfil?");
    console.log("1 - Colaborador");
    console.log("2 - Gestor");
    
    const resposta = await perguntar("Digite o nome ou número (ex: 'gestor' ou '2'): ");
    const limpo = resposta.trim().toLowerCase();

    // Validação flexível (aceita número ou nome)
    if (limpo === '1' || limpo === 'colaborador') {
      return 'colaborador';
    } 
    else if (limpo === '2' || limpo === 'gestor') {
      return 'gestor';
    }

    console.log("❌ Opção inválida! Digite apenas 'colaborador' ou 'gestor'.");
  }
}

// Coleta respostas com validação
async function coletar(perguntas: string[], permisao:TipoPermissao): Promise<Resposta[]> {
  const respostas: Resposta[] = [];

  for (const pergunta of perguntas) {
    console.log(`\n${pergunta}`);

    opcoesDeRespostas.forEach((opcao, index) =>
      console.log(`${index} - ${opcao}`)
    );

    let respostaDigitada = await perguntar("Escolha o número da resposta: ");
    let indiceResposta = parseInt(respostaDigitada);

    while (
      isNaN(indiceResposta) ||
      indiceResposta < 0 ||
      indiceResposta >= opcoesDeRespostas.length
    ) {
      console.log("Resposta inválida! Tente novamente.");
      respostaDigitada = await perguntar("Escolha o número da resposta: ");
      indiceResposta = parseInt(respostaDigitada);
    }

    respostas.push({
      permissao:permisao,
      pergunta: pergunta!,
      indiceResposta,
      pontuacao: pontuacoes[indiceResposta]!
    });
  }

  return respostas;
}

// Média
function calcularMedia(respostas: Resposta[]): number {
  const soma = respostas.reduce((acc, r) => acc + r.pontuacao, 0);
  return soma / respostas.length;
}

// Classificação Nine Box
function classificarNineBox(mediaDesempenho: number, mediaPotencial: number): string {
  const desempenho =
    mediaDesempenho >= 4.0 ? "Alto" :
    mediaDesempenho >= 2.6 ? "Médio" : "Baixo";

  const potencial =
    mediaPotencial >= 4.0 ? "Alto" :
    mediaPotencial >= 2.6 ? "Médio" : "Baixo";

  const matriz: Record<string, string> = {
    "Alto-Alto": "Estrela (Top Talent) ",
    "Alto-Médio": "Alto desempenho, médio potencial",
    "Alto-Baixo": "Alto desempenho, baixo potencial",
    "Médio-Alto": "Talento em desenvolvimento",
    "Médio-Médio": "Regular",
    "Médio-Baixo": "Desempenho médio, baixo potencial",
    "Baixo-Alto": "Alto potencial, baixo desempenho",
    "Baixo-Médio": "Desempenho fraco",
    "Baixo-Baixo": "Crítico — atenção urgente"
  };

  return matriz[`${desempenho}-${potencial}`];
}

// Execução principal
async function executar() {
  console.log("=== MVP Avaliação de Desempenho com Nine Box ===");

  const permissaoEscolhida = await obterPermissao();
  console.log(`✅ Perfil selecionado: ${permissaoEscolhida.toUpperCase()}`);

  console.log("\n Avaliação de DESEMPENHO:");
  const respostasDesempenho = await coletar(perguntasDesempenho,permissaoEscolhida);

  console.log("\n Avaliação de POTENCIAL:");
  const respostasPotencial = await coletar(perguntasPotencial,permissaoEscolhida);

  rl.close();

  const mediaDesempenho = calcularMedia(respostasDesempenho);
  const mediaPotencial = calcularMedia(respostasPotencial);

  console.log("\n=== RESULTADO FINAL ===");
  console.log(`Média de Desempenho: ${mediaDesempenho.toFixed(2)}`);
  console.log(`Média de Potencial: ${mediaPotencial.toFixed(2)}`);

  const resultado = classificarNineBox(mediaDesempenho, mediaPotencial);
  console.log(`\n Classificação Nine Box: ${resultado}`);
}


executar();
