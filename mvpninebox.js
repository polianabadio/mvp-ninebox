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
                    return [4 /*yield*/, perguntar("Digite o nome ou número (ex: 'gestor' ou '2'): ")];
                case 1:
                    resposta = _a.sent();
                    limpo = resposta.trim().toLowerCase();
                    // Validação flexível (aceita número ou nome)
                    if (limpo === '1' || limpo === 'colaborador') {
                        return [2 /*return*/, 'colaborador'];
                    }
                    else if (limpo === '2' || limpo === 'gestor') {
                        return [2 /*return*/, 'gestor'];
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
function executar() {
    return __awaiter(this, void 0, void 0, function () {
        var permissaoEscolhida, respostasDesempenho, respostasPotencial, mediaDesempenho, mediaPotencial, resultado;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("=== MVP Avaliação de Desempenho com Nine Box ===");
                    return [4 /*yield*/, obterPermissao()];
                case 1:
                    permissaoEscolhida = _a.sent();
                    console.log("\u2705 Perfil selecionado: ".concat(permissaoEscolhida.toUpperCase()));
                    console.log("\n Avaliação de DESEMPENHO:");
                    return [4 /*yield*/, coletar(perguntasDesempenho, permissaoEscolhida)];
                case 2:
                    respostasDesempenho = _a.sent();
                    console.log("\n Avaliação de POTENCIAL:");
                    return [4 /*yield*/, coletar(perguntasPotencial, permissaoEscolhida)];
                case 3:
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
executar();
