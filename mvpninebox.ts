import * as readline from "readline";

type TipoPermissao = 'colaborador' | 'gestor' | 'admin';

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
    console.log("3 - Admin");
    
    const resposta = await perguntar("Digite o nome ou número (ex: 'gestor' ou '2'): ");
    const limpo = resposta.trim().toLowerCase();

    if (limpo === '1' || limpo === 'colaborador') {
      return 'colaborador';
    } 
    else if (limpo === '2' || limpo === 'gestor') {
      return 'gestor';
    }else if (limpo === '3' || limpo === 'admin') {
      return 'admin';
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
async function executarAvaliacao() {
  console.log("=== MVP Avaliação de Desempenho com Nine Box ===");

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

//crudAvaliacao
async function selecionarBancoDePerguntas(): Promise<string[] | null> {
  console.log("\n--- Qual categoria você deseja editar? ---");
  console.log("1 - Desempenho");
  console.log("2 - Potencial");
  console.log("0 - Voltar");

  const opcao = await perguntar("Opção: ");

  if (opcao === '1') return perguntasDesempenho;
  if (opcao === '2') return perguntasPotencial;
  return null;
}

function crudListar(lista: string[], titulo: string) {
  console.log(`\n--- Lista de Perguntas: ${titulo} ---`);
  if (lista.length === 0) {
    console.log("(Nenhuma pergunta cadastrada)");
  } else {
    lista.forEach((p, index) => console.log(`${index + 1}. ${p}`));
  }
}

async function crudAdicionar(lista: string[]) {
  const novaPergunta = await perguntar("\nDigite a nova pergunta: ");
  if (novaPergunta.trim()) {
    lista.push(novaPergunta);
    console.log("✅ Pergunta adicionada com sucesso!");
  } else {
    console.log("❌ Texto inválido.");
  }
}

async function crudAtualizar(lista: string[]) {
  crudListar(lista, "SELEÇÃO PARA EDIÇÃO");
  
  const indiceStr = await perguntar("\nDigite o número da pergunta para editar: ");
  const index = parseInt(indiceStr) - 1;

  if (index >= 0 && index < lista.length) {
    console.log(`Atual: "${lista[index]}"`);
    const novoTexto = await perguntar("Novo texto: ");
    if (novoTexto.trim()) {
      lista[index] = novoTexto;
      console.log("✅ Pergunta atualizada!");
    }
  } else {
    console.log("❌ Índice inválido.");
  }
}

async function crudDeletar(lista: string[]) {
  crudListar(lista, "SELEÇÃO PARA REMOÇÃO");
  
  const indiceStr = await perguntar("\nDigite o número da pergunta para apagar: ");
  const index = parseInt(indiceStr) - 1;

  if (index >= 0 && index < lista.length) {
    const confirmacao = await perguntar(`Tem certeza que deseja apagar: "${lista[index]}"? (s/n): `);
    if (confirmacao.toLowerCase() === 's') {
      lista.splice(index, 1);
      console.log("✅ Pergunta removida!");
    } else {
      console.log("Operação cancelada.");
    }
  } else {
    console.log("❌ Índice inválido.");
  }
}

async function executarCrudAvaliacao() {
  let rodando = true;

  while (rodando) {
    console.log("\n=== PAINEL ADMINISTRATIVO (CRUD) ===");
    console.log("1 - Listar Perguntas");
    console.log("2 - Adicionar Pergunta");
    console.log("3 - Atualizar Pergunta");
    console.log("4 - Apagar Pergunta");
    console.log("0 - Sair / Voltar ao Início");

    const opcao = await perguntar("Escolha uma opção: ");

    if (opcao === '0') {
      rodando = false;
      break;
    }

    const listaAlvo = await selecionarBancoDePerguntas();
    
    if (listaAlvo) {
      switch (opcao) {
        case '1':
          crudListar(listaAlvo, "Visualização");
          break;
        case '2':
          await crudAdicionar(listaAlvo);
          break;
        case '3':
          await crudAtualizar(listaAlvo);
          break;
        case '4':
          await crudDeletar(listaAlvo);
          break;
        default:
          console.log("Opção inválida.");
      }
    }
  }
}

const permissaoEscolhida = await obterPermissao();
console.log(`✅ Perfil selecionado: ${permissaoEscolhida.toUpperCase()}`);
if(permissaoEscolhida==='colaborador' || permissaoEscolhida === 'gestor'){
executarAvaliacao();
}else if(permissaoEscolhida==='admin'){
  executarCrudAvaliacao();
}
