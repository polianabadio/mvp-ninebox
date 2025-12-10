"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
// Opções de resposta
var opcoesDeRespostas = [
    "Excelente",
    "Bom",
    "Satisfatório",
    "Insatisfatório",
    "Precisa melhorar"
];
var pontuacoes = [5, 4, 3, 2, 1];
// Perguntas 
var perguntasDesempenho = [
    "Qualidade da entrega e cumprimento das metas",
    "Organização e produtividade no dia a dia",
    "Resolução de problemas e tomada de decisão",
    "Comprometimento com prazos e resultados"
];
var perguntasPotencial = [
    "Capacidade de aprender rapidamente coisas novas",
    "Abertura para feedbacks e evolução contínua",
    "Perfil de liderança (iniciativa, influência, responsabilidade)",
    "Capacidade de lidar com desafios e mudanças"
];
// Configuração readline
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function perguntar(texto) {
    return new Promise(function (resolve) { return rl.question(texto, resolve); });
}
function obterPermissao() {
    return __awaiter(this, void 0, void 0, function () {
        var resposta, limpo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!true) return [3 /*break*/, 2];
                    console.log("\nQual o seu perfil?");
                    console.log("1 - Colaborador");
                    console.log("2 - Gestor");
                    console.log("3 - Admin");
                    return [4 /*yield*/, perguntar("Digite o nome ou número (ex: 'gestor' ou '2'): ")];
                case 1:
                    resposta = _a.sent();
                    limpo = resposta.trim().toLowerCase();
                    if (limpo === '1' || limpo === 'colaborador') {
                        return [2 /*return*/, 'colaborador'];
                    }
                    else if (limpo === '2' || limpo === 'gestor') {
                        return [2 /*return*/, 'gestor'];
                    }
                    else if (limpo === '3' || limpo === 'admin') {
                        return [2 /*return*/, 'admin'];
                    }
                    console.log("❌ Opção inválida! Digite apenas 'colaborador' ou 'gestor'.");
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
// Coleta respostas com validação
function coletar(perguntas, permisao) {
    return __awaiter(this, void 0, void 0, function () {
        var respostas, _i, perguntas_1, pergunta, respostaDigitada, indiceResposta;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    respostas = [];
                    _i = 0, perguntas_1 = perguntas;
                    _a.label = 1;
                case 1:
                    if (!(_i < perguntas_1.length)) return [3 /*break*/, 7];
                    pergunta = perguntas_1[_i];
                    console.log("\n".concat(pergunta));
                    opcoesDeRespostas.forEach(function (opcao, index) {
                        return console.log("".concat(index, " - ").concat(opcao));
                    });
                    return [4 /*yield*/, perguntar("Escolha o número da resposta: ")];
                case 2:
                    respostaDigitada = _a.sent();
                    indiceResposta = parseInt(respostaDigitada);
                    _a.label = 3;
                case 3:
                    if (!(isNaN(indiceResposta) ||
                        indiceResposta < 0 ||
                        indiceResposta >= opcoesDeRespostas.length)) return [3 /*break*/, 5];
                    console.log("Resposta inválida! Tente novamente.");
                    return [4 /*yield*/, perguntar("Escolha o número da resposta: ")];
                case 4:
                    respostaDigitada = _a.sent();
                    indiceResposta = parseInt(respostaDigitada);
                    return [3 /*break*/, 3];
                case 5:
                    respostas.push({
                        permissao: permisao,
                        pergunta: pergunta,
                        indiceResposta: indiceResposta,
                        pontuacao: pontuacoes[indiceResposta]
                    });
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/, respostas];
            }
        });
    });
}
// Média
function calcularMedia(respostas) {
    var soma = respostas.reduce(function (acc, r) { return acc + r.pontuacao; }, 0);
    return soma / respostas.length;
}
// Classificação Nine Box
function classificarNineBox(mediaDesempenho, mediaPotencial) {
    var desempenho = mediaDesempenho >= 4.0 ? "Alto" :
        mediaDesempenho >= 2.6 ? "Médio" : "Baixo";
    var potencial = mediaPotencial >= 4.0 ? "Alto" :
        mediaPotencial >= 2.6 ? "Médio" : "Baixo";
    var matriz = {
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
    return matriz["".concat(desempenho, "-").concat(potencial)];
}
// Execução principal
function executarAvaliacao(permissaoEscolhida) {
    return __awaiter(this, void 0, void 0, function () {
        var respostasDesempenho, respostasPotencial, mediaDesempenho, mediaPotencial, resultado;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("=== MVP Avaliação de Desempenho com Nine Box ===");
                    console.log("\n Avaliação de DESEMPENHO:");
                    return [4 /*yield*/, coletar(perguntasDesempenho, permissaoEscolhida)];
                case 1:
                    respostasDesempenho = _a.sent();
                    console.log("\n Avaliação de POTENCIAL:");
                    return [4 /*yield*/, coletar(perguntasPotencial, permissaoEscolhida)];
                case 2:
                    respostasPotencial = _a.sent();
                    rl.close();
                    mediaDesempenho = calcularMedia(respostasDesempenho);
                    mediaPotencial = calcularMedia(respostasPotencial);
                    console.log("\n=== RESULTADO FINAL ===");
                    console.log("M\u00E9dia de Desempenho: ".concat(mediaDesempenho.toFixed(2)));
                    console.log("M\u00E9dia de Potencial: ".concat(mediaPotencial.toFixed(2)));
                    resultado = classificarNineBox(mediaDesempenho, mediaPotencial);
                    console.log("\n Classifica\u00E7\u00E3o Nine Box: ".concat(resultado));
                    return [2 /*return*/];
            }
        });
    });
}
//crudAvaliacao
function selecionarBancoDePerguntas() {
    return __awaiter(this, void 0, void 0, function () {
        var opcao;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("\n--- Qual categoria você deseja editar? ---");
                    console.log("1 - Desempenho");
                    console.log("2 - Potencial");
                    console.log("0 - Voltar");
                    return [4 /*yield*/, perguntar("Opção: ")];
                case 1:
                    opcao = _a.sent();
                    if (opcao === '1')
                        return [2 /*return*/, perguntasDesempenho];
                    if (opcao === '2')
                        return [2 /*return*/, perguntasPotencial];
                    return [2 /*return*/, null];
            }
        });
    });
}
function crudListar(lista, titulo) {
    console.log("\n--- Lista de Perguntas: ".concat(titulo, " ---"));
    if (lista.length === 0) {
        console.log("(Nenhuma pergunta cadastrada)");
    }
    else {
        lista.forEach(function (p, index) { return console.log("".concat(index + 1, ". ").concat(p)); });
    }
}
function crudAdicionar(lista) {
    return __awaiter(this, void 0, void 0, function () {
        var novaPergunta;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, perguntar("\nDigite a nova pergunta: ")];
                case 1:
                    novaPergunta = _a.sent();
                    if (novaPergunta.trim()) {
                        lista.push(novaPergunta);
                        console.log("✅ Pergunta adicionada com sucesso!");
                    }
                    else {
                        console.log("❌ Texto inválido.");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function crudAtualizar(lista) {
    return __awaiter(this, void 0, void 0, function () {
        var indiceStr, index, novoTexto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    crudListar(lista, "SELEÇÃO PARA EDIÇÃO");
                    return [4 /*yield*/, perguntar("\nDigite o número da pergunta para editar: ")];
                case 1:
                    indiceStr = _a.sent();
                    index = parseInt(indiceStr) - 1;
                    if (!(index >= 0 && index < lista.length)) return [3 /*break*/, 3];
                    console.log("Atual: \"".concat(lista[index], "\""));
                    return [4 /*yield*/, perguntar("Novo texto: ")];
                case 2:
                    novoTexto = _a.sent();
                    if (novoTexto.trim()) {
                        lista[index] = novoTexto;
                        console.log("✅ Pergunta atualizada!");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    console.log("❌ Índice inválido.");
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function crudDeletar(lista) {
    return __awaiter(this, void 0, void 0, function () {
        var indiceStr, index, confirmacao;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    crudListar(lista, "SELEÇÃO PARA REMOÇÃO");
                    return [4 /*yield*/, perguntar("\nDigite o número da pergunta para apagar: ")];
                case 1:
                    indiceStr = _a.sent();
                    index = parseInt(indiceStr) - 1;
                    if (!(index >= 0 && index < lista.length)) return [3 /*break*/, 3];
                    return [4 /*yield*/, perguntar("Tem certeza que deseja apagar: \"".concat(lista[index], "\"? (s/n): "))];
                case 2:
                    confirmacao = _a.sent();
                    if (confirmacao.toLowerCase() === 's') {
                        lista.splice(index, 1);
                        console.log("✅ Pergunta removida!");
                    }
                    else {
                        console.log("Operação cancelada.");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    console.log("❌ Índice inválido.");
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function executarCrudAvaliacao() {
    return __awaiter(this, void 0, void 0, function () {
        var rodando, opcao, listaAlvo, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    rodando = true;
                    _b.label = 1;
                case 1:
                    if (!rodando) return [3 /*break*/, 13];
                    console.log("\n=== PAINEL ADMINISTRATIVO (CRUD) ===");
                    console.log("1 - Listar Perguntas");
                    console.log("2 - Adicionar Pergunta");
                    console.log("3 - Atualizar Pergunta");
                    console.log("4 - Apagar Pergunta");
                    console.log("0 - Sair / Voltar ao Início");
                    return [4 /*yield*/, perguntar("Escolha uma opção: ")];
                case 2:
                    opcao = _b.sent();
                    if (opcao === '0') {
                        rodando = false;
                        return [3 /*break*/, 13];
                    }
                    return [4 /*yield*/, selecionarBancoDePerguntas()];
                case 3:
                    listaAlvo = _b.sent();
                    if (!listaAlvo) return [3 /*break*/, 12];
                    _a = opcao;
                    switch (_a) {
                        case '1': return [3 /*break*/, 4];
                        case '2': return [3 /*break*/, 5];
                        case '3': return [3 /*break*/, 7];
                        case '4': return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 11];
                case 4:
                    crudListar(listaAlvo, "Visualização");
                    return [3 /*break*/, 12];
                case 5: return [4 /*yield*/, crudAdicionar(listaAlvo)];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 12];
                case 7: return [4 /*yield*/, crudAtualizar(listaAlvo)];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 12];
                case 9: return [4 /*yield*/, crudDeletar(listaAlvo)];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 12];
                case 11:
                    console.log("Opção inválida.");
                    _b.label = 12;
                case 12: return [3 /*break*/, 1];
                case 13: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var permissaoEscolhida, rodarAvaliacao;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, obterPermissao()];
                case 1:
                    permissaoEscolhida = _a.sent();
                    console.log("\u2705 Perfil selecionado: ".concat(permissaoEscolhida.toUpperCase()));
                    if (!(permissaoEscolhida === 'colaborador' || permissaoEscolhida === 'gestor')) return [3 /*break*/, 3];
                    return [4 /*yield*/, executarAvaliacao(permissaoEscolhida)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 3:
                    if (!(permissaoEscolhida === 'admin')) return [3 /*break*/, 7];
                    return [4 /*yield*/, executarCrudAvaliacao()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, perguntar("\nDeseja rodar uma simulação de avaliação agora? (s/n): ")];
                case 5:
                    rodarAvaliacao = _a.sent();
                    if (!(rodarAvaliacao.toLowerCase() === 's')) return [3 /*break*/, 7];
                    return [4 /*yield*/, executarAvaliacao('gestor')];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
main();
