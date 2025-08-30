// Dados da aplicação baseados nas listas brasileiras fornecidas
const appData = {
    "produtos_mercado": {
        "padaria_cafe": ["Pão francês", "Pão de forma", "Pão integral", "Pão de açúcar", "Pão sírio", "Torradas", "Biscoito cream cracker", "Biscoito maria", "Bolacha recheada", "Biscoitos doces", "Bolinho de pacote", "Aveia em flocos", "Cereal matinal", "Granola", "Muesli", "Café", "Achocolatado em pó", "Chocolate em pó", "Chá"],
        "laticinios": ["Leite integral", "Leite desnatado", "Leite condensado", "Leite em pó", "Creme de leite", "Leite de coco", "Leite de soja", "Leite de aveia", "Leite de amêndoa", "Queijo muçarela", "Queijo prato", "Queijo minas", "Requeijão", "Queijo cottage", "Cream cheese", "Queijo ralado", "Manteiga", "Margarina", "Margarina vegetal", "Iogurte natural", "Iogurte grego", "Iogurte com polpa", "Bebidas lácteas", "Kefir"],
        "carnes_proteinas": ["Carne moída", "Picanha", "Contra-filé", "Fraldinha", "Acém", "Músculo", "Costela bovina", "Bisteca suína", "Lombo suíno", "Costela suína", "Linguiça calabresa", "Linguiça toscana", "Bacon", "Presunto", "Mortadela", "Frango inteiro", "Peito de frango", "Coxa e sobrecoxa", "Asa de frango", "Peru", "Tilápia", "Salmão", "Sardinha fresca", "Camarão", "Linguado", "Bacalhau", "Ovos de galinha", "Ovos de codorna", "Salsicha", "Salame"],
        "graos_cereais": ["Arroz branco", "Feijão carioca", "Feijão preto", "Macarrão espaguete", "Macarrão parafuso", "Macarrão penne", "Lentilha", "Grão-de-bico", "Ervilha seca", "Farinha de trigo", "Farinha de mandioca", "Farinha de milho", "Fubá", "Farinha de rosca", "Macarrão instantâneo", "Lasanha", "Nhoque", "Capeletti"],
        "hortifruti": ["Banana", "Maçã", "Laranja", "Limão siciliano", "Abacaxi", "Mamão", "Manga", "Uva", "Morango", "Abacate", "Melancia", "Melão", "Açaí", "Framboesa", "Amora", "Mirtilo", "Cereja", "Romã", "Goiaba", "Acerola", "Tangerina", "Pêra", "Pêssego", "Kiwi", "Tomate", "Cebola", "Alho", "Batata", "Batata-doce", "Cenoura", "Beterraba", "Abobrinha", "Berinjela", "Pimentão", "Pepino", "Brócolis", "Couve-flor", "Alface", "Rúcula", "Espinafre", "Couve", "Acelga", "Repolho", "Gengibre", "Cúrcuma"],
        "condimentos": ["Sal refinado", "Açúcar cristal", "Açúcar mascavo", "Azeite de oliva", "Óleo de soja", "Óleo de girassol", "Óleo de coco", "Óleo de linhaça", "Vinagre branco", "Vinagre balsâmico", "Vinagre de maçã", "Molho de tomate", "Extrato de tomate", "Shoyu", "Ketchup", "Maionese", "Mostarda", "Molho inglês", "Orégano", "Cominho", "Pimenta-do-reino", "Colorau", "Alho em pó", "Cebola em pó", "Açafrão-da-terra", "Canela", "Cravo"],
        "bebidas": ["Água mineral", "Água de coco", "Coca-Cola", "Guaraná Antarctica", "Fanta", "Sprite", "Refrigerante zero", "Suco de laranja", "Suco de uva", "Suco em pó", "Cerveja", "Vinho tinto", "Vinho branco", "Cachaça", "Vodka", "Energético", "Isotônico", "Café em grão", "Café solúvel"],
        "limpeza": ["Sabão em pó", "Amaciante", "Sabão em barra", "Alvejante", "Detergente líquido", "Esponja de aço", "Buchinha de pia", "Água sanitária", "Desinfetante", "Álcool 70%", "Lustra móveis", "Limpa vidros", "Tira manchas", "Saco de lixo", "Papel higiênico", "Papel toalha", "Guardanapo"],
        "higiene": ["Sabonete", "Shampoo", "Condicionador", "Desodorante", "Creme dental", "Escova de dente", "Enxaguante bucal", "Fio dental", "Protetor solar", "Hidratante corporal", "Absorvente", "Lenço umedecido", "Creme para pentear", "Batom"]
    },
    
    "calorias_alimentos": {
        "Pão francês": {"calorias_porcao": 125, "porcao": "1 unidade (50g)"},
        "Pão de forma": {"calorias_porcao": 66, "porcao": "1 fatia (25g)"},
        "Banana": {"calorias_porcao": 107, "porcao": "1 unidade (120g)"},
        "Maçã": {"calorias_porcao": 78, "porcao": "1 unidade (150g)"},
        "Laranja": {"calorias_porcao": 85, "porcao": "1 unidade (180g)"},
        "Arroz branco": {"calorias_porcao": 195, "porcao": "1 xícara cozido (150g)"},
        "Feijão carioca": {"calorias_porcao": 77, "porcao": "1 concha (100g)"},
        "Peito de frango": {"calorias_porcao": 136, "porcao": "100g"},
        "Ovos de galinha": {"calorias_porcao": 78, "porcao": "1 unidade (50g)"},
        "Leite integral": {"calorias_porcao": 122, "porcao": "1 copo (200ml)"},
        "Queijo muçarela": {"calorias_porcao": 84, "porcao": "1 fatia (30g)"},
        "Macarrão espaguete": {"calorias_porcao": 197, "porcao": "1 xícara cozido (150g)"},
        "Tomate": {"calorias_porcao": 22, "porcao": "1 unidade (120g)"},
        "Batata": {"calorias_porcao": 116, "porcao": "1 unidade média (150g)"},
        "Carne moída": {"calorias_porcao": 250, "porcao": "100g"},
        "Azeite de oliva": {"calorias_porcao": 133, "porcao": "1 colher sopa (15ml)"}
    },

    "exercicios": {
        "aerobico": [
            {"nome": "Caminhada leve", "calorias_por_minuto": 3.5},
            {"nome": "Caminhada rápida", "calorias_por_minuto": 5.0},
            {"nome": "Corrida leve", "calorias_por_minuto": 8.0},
            {"nome": "Corrida intensa", "calorias_por_minuto": 12.0},
            {"nome": "Bicicleta", "calorias_por_minuto": 6.0},
            {"nome": "Natação", "calorias_por_minuto": 7.5},
            {"nome": "Dança", "calorias_por_minuto": 4.5},
            {"nome": "Elíptico", "calorias_por_minuto": 7.0},
            {"nome": "Esteira", "calorias_por_minuto": 6.5}
        ],
        "forca": [
            {"nome": "Musculação leve", "calorias_por_minuto": 3.0},
            {"nome": "Musculação pesada", "calorias_por_minuto": 6.0},
            {"nome": "Flexões", "calorias_por_minuto": 4.0},
            {"nome": "Abdominais", "calorias_por_minuto": 3.5},
            {"nome": "Agachamentos", "calorias_por_minuto": 5.0},
            {"nome": "Yoga", "calorias_por_minuto": 2.5},
            {"nome": "Pilates", "calorias_por_minuto": 3.0},
            {"nome": "Funcional", "calorias_por_minuto": 5.5}
        ]
    }
};

// Estado da aplicação
let state = {
    transacoes: JSON.parse(localStorage.getItem('transacoes')) || [],
    gastosCartao: JSON.parse(localStorage.getItem('gastosCartao')) || [],
    listaMercado: JSON.parse(localStorage.getItem('listaMercado')) || [],
    calorias: JSON.parse(localStorage.getItem('calorias')) || [],
    atividades: JSON.parse(localStorage.getItem('atividades')) || [],
    investimentos: JSON.parse(localStorage.getItem('investimentos')) || [],
    dividendos: JSON.parse(localStorage.getItem('dividendos')) || [],
    emocoes: JSON.parse(localStorage.getItem('emocoes')) || []
};

// Função para salvar no localStorage
function salvarDados() {
    Object.keys(state).forEach(key => {
        localStorage.setItem(key, JSON.stringify(state[key]));
    });
}

// Função para formatar moeda
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// Função para formatar data
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

// Função para obter data de hoje
function obterDataHoje() {
    return new Date().toISOString().split('T')[0];
}

// Configurar navegação por abas
function configurarAbas() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            switch(targetTab) {
                case 'dashboard':
                    atualizarDashboard();
                    break;
                case 'fluxo-caixa':
                    atualizarResumoFinanceiro();
                    break;
                case 'cartao':
                    atualizarCartao();
                    break;
                case 'mercado':
                    atualizarListaMercado();
                    break;
                case 'calorias':
                    atualizarCalorias();
                    break;
                case 'atividade':
                    atualizarAtividades();
                    break;
                case 'investimento':
                    atualizarInvestimentos();
                    break;
                case 'dividendos':
                    atualizarDividendos();
                    break;
                case 'emocoes':
                    atualizarEmocoes();
                    break;
            }
        });
    });
}

// Função para mostrar feedback
function mostrarFeedback(mensagem, tipo = 'success') {
    const feedback = document.createElement('div');
    feedback.className = `feedback feedback--${tipo}`;
    feedback.textContent = mensagem;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        background: ${tipo === 'success' ? '#059669' : '#dc2626'};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.remove();
        }
    }, 3000);
}

// Atualizar Dashboard (função simplificada)
function atualizarDashboard() {
    const totalReceitas = state.transacoes
        .filter(t => t.tipo === 'receita')
        .reduce((total, t) => total + t.valor, 0);

    const totalDespesas = state.transacoes
        .filter(t => t.tipo === 'despesa')
        .reduce((total, t) => total + t.valor, 0);
    
    const totalCartao = state.gastosCartao
        .reduce((total, g) => total + g.valor, 0);

    const saldo = totalReceitas - totalDespesas - totalCartao;
    
    const totalInvestido = state.investimentos
        .reduce((total, inv) => total + inv.valorInvestido, 0);

    const hoje = obterDataHoje();
    const caloriasHoje = state.calorias
        .filter(c => c.data === hoje)
        .reduce((total, c) => total + c.total_calorias, 0);

    document.getElementById('saldo-atual').textContent = formatarMoeda(saldo);
    document.getElementById('gastos-mes').textContent = formatarMoeda(totalDespesas + totalCartao);
    document.getElementById('total-investido').textContent = formatarMoeda(totalInvestido);
    document.getElementById('calorias-hoje').textContent = `${caloriasHoje} kcal`;
}

// Placeholder para outras funções (implementar conforme necessário)
function atualizarResumoFinanceiro() { console.log('Função de fluxo de caixa a implementar'); }
function atualizarCartao() { console.log('Função de cartão a implementar'); }
function atualizarListaMercado() { console.log('Função de mercado a implementar'); }
function atualizarCalorias() { console.log('Função de calorias a implementar'); }
function atualizarAtividades() { console.log('Função de atividades a implementar'); }
function atualizarInvestimentos() { console.log('Função de investimentos a implementar'); }
function atualizarDividendos() { console.log('Função de dividendos a implementar'); }
function atualizarEmocoes() { console.log('Função de emoções a implementar'); }

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    configurarAbas();
    atualizarDashboard();
    
    console.log('✅ Aplicativo Controle Pessoal Pro carregado com sucesso!');
    mostrarFeedback('Aplicativo carregado com sucesso! 🚀', 'success');
});
