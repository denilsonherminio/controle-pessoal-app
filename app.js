// Dados principais
let transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
let gastosCartao = JSON.parse(localStorage.getItem('gastosCartao')) || [];
let listaMercado = JSON.parse(localStorage.getItem('listaMercado')) || [];
let registrosCalorias = JSON.parse(localStorage.getItem('registrosCalorias')) || [];
let registrosAtividade = JSON.parse(localStorage.getItem('registrosAtividade')) || [];
let investimentos = JSON.parse(localStorage.getItem('investimentos')) || [];
let dividendos = JSON.parse(localStorage.getItem('dividendos')) || [];
let registrosEmocoes = JSON.parse(localStorage.getItem('registrosEmocoes')) || [];

// Charts globais
let receitaDespesaChart = null;
let gastosChart = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initForms();
    initCategorias();
    updateDashboard();
    renderTransacoes();
    renderGastosCartao();
    renderListaMercado();
    renderCalorias();
    renderAtividades();
    renderInvestimentos();
    renderDividendos();
    renderEmocoes();
});

// Sistema de Tabs
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active de todos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adiciona active ao selecionado
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Atualiza gráficos se for dashboard
            if (targetTab === 'dashboard') {
                setTimeout(() => {
                    updateDashboard();
                }, 100);
            }
        });
    });
}

// Inicializar formulários
function initForms() {
    // Fluxo de Caixa
    document.getElementById('form-fluxo-caixa').addEventListener('submit', handleFluxoCaixa);
    document.getElementById('tipo-transacao').addEventListener('change', updateCategorias);
    
    // Cartão
    document.getElementById('form-cartao').addEventListener('submit', handleCartao);
    
    // Mercado
    document.getElementById('form-mercado').addEventListener('submit', handleMercado);
    
    // Calorias
    document.getElementById('form-calorias').addEventListener('submit', handleCalorias);
    
    // Atividade
    document.getElementById('form-atividade').addEventListener('submit', handleAtividade);
    
    // Investimentos
    document.getElementById('form-investimento').addEventListener('submit', handleInvestimento);
    
    // Dividendos
    document.getElementById('form-dividendos').addEventListener('submit', handleDividendos);
    
    // Emoções
    document.getElementById('form-emocoes').addEventListener('submit', handleEmocoes);
}

// Categorias dinâmicas
function initCategorias() {
    const categorias = {
        receita: ['Salário', 'Freelance', 'Venda', 'Dividendos', 'Aluguel', 'Outros'],
        despesa: ['Alimentação', 'Transporte', 'Saúde', 'Educação', 'Lazer', 'Casa', 'Roupas', 'Outros']
    };
    
    window.categorias = categorias;
}

function updateCategorias() {
    const tipoSelect = document.getElementById('tipo-transacao');
    const categoriaSelect = document.getElementById('categoria-transacao');
    const tipo = tipoSelect.value;
    
    categoriaSelect.innerHTML = '<option value="">Selecione uma categoria</option>';
    
    if (tipo && window.categorias[tipo]) {
        window.categorias[tipo].forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.toLowerCase();
            option.textContent = categoria;
            categoriaSelect.appendChild(option);
        });
    }
}

// Fluxo de Caixa
function handleFluxoCaixa(e) {
    e.preventDefault();
    
    const tipo = document.getElementById('tipo-transacao').value;
    const categoria = document.getElementById('categoria-transacao').value;
    const quinzena = document.getElementById('quinzena').value;
    const valor = parseFloat(document.getElementById('valor-transacao').value);
    const descricao = document.getElementById('descricao-transacao').value;
    
    const transacao = {
        id: Date.now(),
        tipo,
        categoria,
        quinzena,
        valor,
        descricao,
        data: new Date().toLocaleDateString()
    };
    
    transacoes.unshift(transacao);
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
    
    renderTransacoes();
    updateDashboard();
    e.target.reset();
}

function renderTransacoes() {
    const lista = document.getElementById('lista-transacoes');
    
    if (transacoes.length === 0) {
        lista.innerHTML = '<p class="empty-message">Nenhuma transação registrada ainda.</p>';
        updateResumoFinanceiro();
        return;
    }
    
    lista.innerHTML = transacoes.map(transacao => `
        <div class="transaction-item ${transacao.tipo}">
            <div class="item-info">
                <div class="item-title">${transacao.descricao}</div>
                <div class="item-details">
                    ${transacao.categoria} • ${transacao.quinzena === 'primeira' ? '1ª' : '2ª'} Quinzena • ${transacao.data}
                </div>
            </div>
            <div class="item-value" style="color: ${transacao.tipo === 'receita' ? '#10b981' : '#ef4444'}">
                ${transacao.tipo === 'receita' ? '+' : '-'} R$ ${transacao.valor.toFixed(2)}
            </div>
            <div class="item-actions">
                <button class="btn btn--danger" onclick="removerTransacao(${transacao.id})">🗑️</button>
            </div>
        </div>
    `).join('');
    
    updateResumoFinanceiro();
}

function removerTransacao(id) {
    if (confirm('Deseja remover esta transação?')) {
        transacoes = transacoes.filter(t => t.id !== id);
        localStorage.setItem('transacoes', JSON.stringify(transacoes));
        renderTransacoes();
        updateDashboard();
    }
}

function updateResumoFinanceiro() {
    const totalReceitas = transacoes.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + t.valor, 0);
    const totalDespesas = transacoes.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + t.valor, 0);
    const saldo = totalReceitas - totalDespesas;
    
    document.getElementById('total-receitas').textContent = `R$ ${totalReceitas.toFixed(2)}`;
    document.getElementById('total-despesas').textContent = `R$ ${totalDespesas.toFixed(2)}`;
    document.getElementById('saldo-total').textContent = `R$ ${saldo.toFixed(2)}`;
}

// Cartão de Crédito
function handleCartao(e) {
    e.preventDefault();
    
    const categoria = document.getElementById('categoria-cartao').value;
    const vencimento = document.getElementById('vencimento-cartao').value;
    const valor = parseFloat(document.getElementById('valor-cartao').value);
    const estabelecimento = document.getElementById('estabelecimento-cartao').value;
    
    const gasto = {
        id: Date.now(),
        categoria,
        vencimento,
        valor,
        estabelecimento,
        data: new Date().toLocaleDateString()
    };
    
    gastosCartao.unshift(gasto);
    localStorage.setItem('gastosCartao', JSON.stringify(gastosCartao));
    
    renderGastosCartao();
    updateDashboard();
    e.target.reset();
}

function renderGastosCartao() {
    const lista = document.getElementById('lista-cartao');
    const totalCartao = gastosCartao.reduce((sum, g) => sum + g.valor, 0);
    
    document.getElementById('total-cartao').textContent = `R$ ${totalCartao.toFixed(2)}`;
    
    if (gastosCartao.length === 0) {
        lista.innerHTML = '<p class="empty-message">Nenhum gasto no cartão registrado ainda.</p>';
        return;
    }
    
    lista.innerHTML = gastosCartao.map(gasto => `
        <div class="transaction-item">
            <div class="item-info">
                <div class="item-title">${gasto.estabelecimento}</div>
                <div class="item-details">
                    ${gasto.categoria} • ${gasto.vencimento === 'primeira' ? '1ª' : '2ª'} Quinzena • ${gasto.data}
                </div>
            </div>
            <div class="item-value" style="color: #ef4444">
                R$ ${gasto.valor.toFixed(2)}
            </div>
            <div class="item-actions">
                <button class="btn btn--danger" onclick="removerGastoCartao(${gasto.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function removerGastoCartao(id) {
    if (confirm('Deseja remover este gasto?')) {
        gastosCartao = gastosCartao.filter(g => g.id !== id);
        localStorage.setItem('gastosCartao', JSON.stringify(gastosCartao));
        renderGastosCartao();
        updateDashboard();
    }
}

// Lista de Mercado
function handleMercado(e) {
    e.preventDefault();
    
    const item = document.getElementById('item-mercado').value;
    const categoria = document.getElementById('categoria-mercado').value;
    const quantidade = document.getElementById('quantidade-mercado').value;
    const valor = parseFloat(document.getElementById('valor-mercado').value) || 0;
    
    const novoItem = {
        id: Date.now(),
        item,
        categoria,
        quantidade,
        valor,
        comprado: false,
        data: new Date().toLocaleDateString()
    };
    
    listaMercado.unshift(novoItem);
    localStorage.setItem('listaMercado', JSON.stringify(listaMercado));
    
    renderListaMercado();
    e.target.reset();
}

function renderListaMercado() {
    const lista = document.getElementById('lista-mercado');
    const totalMercado = listaMercado.reduce((sum, item) => sum + item.valor, 0);
    
    document.getElementById('total-mercado').textContent = `R$ ${totalMercado.toFixed(2)}`;
    
    if (listaMercado.length === 0) {
        lista.innerHTML = '<p class="empty-message">Nenhum item na lista ainda.</p>';
        return;
    }
    
    lista.innerHTML = listaMercado.map(item => `
        <div class="shopping-item ${item.comprado ? 'completed' : ''}">
            <div class="item-info">
                <div class="item-title">${item.item}</div>
                <div class="item-details">
                    ${item.categoria} • ${item.quantidade} • ${item.data}
                </div>
            </div>
            <div class="item-value">
                R$ ${item.valor.toFixed(2)}
            </div>
            <div class="item-actions">
                <button class="btn ${item.comprado ? 'btn--secondary' : 'btn--primary'}" 
                        onclick="toggleItemMercado(${item.id})">
                    ${item.comprado ? '↩️' : '✅'}
                </button>
                <button class="btn btn--danger" onclick="removerItemMercado(${item.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function toggleItemMercado(id) {
    const item = listaMercado.find(i => i.id === id);
    if (item) {
        item.comprado = !item.comprado;
        localStorage.setItem('listaMercado', JSON.stringify(listaMercado));
        renderListaMercado();
    }
}

function removerItemMercado(id) {
    if (confirm('Deseja remover este item?')) {
        listaMercado = listaMercado.filter(i => i.id !== id);
        localStorage.setItem('listaMercado', JSON.stringify(listaMercado));
        renderListaMercado();
    }
}

// Calorias
function handleCalorias(e) {
    e.preventDefault();
    
    const alimento = document.getElementById('alimento-calorias').value;
    const refeicao = document.getElementById('refeicao-calorias').value;
    const quantidade = parseFloat(document.getElementById('quantidade-calorias').value);
    const caloriasPor100g = parseFloat(document.getElementById('calorias-item').value);
    
    const totalCalorias = (quantidade * caloriasPor100g) / 100;
    
    const registro = {
        id: Date.now(),
        alimento,
        refeicao,
        quantidade,
        caloriasPor100g,
        totalCalorias,
        data: new Date().toLocaleDateString()
    };
    
    registrosCalorias.unshift(registro);
    localStorage.setItem('registrosCalorias', JSON.stringify(registrosCalorias));
    
    renderCalorias();
    updateDashboard();
    e.target.reset();
}

function renderCalorias() {
    const lista = document.getElementById('lista-calorias');
    const hoje = new Date().toLocaleDateString();
    const caloriasHoje = registrosCalorias.filter(r => r.data === hoje);
    const totalCaloriasHoje = caloriasHoje.reduce((sum, r) => sum + r.totalCalorias, 0);
    
    document.getElementById('total-calorias-dia').textContent = `${Math.round(totalCaloriasHoje)} kcal`;
    
    if (caloriasHoje.length === 0) {
        lista.innerHTML = '<p class="empty-message">Nenhum alimento registrado hoje.</p>';
        return;
    }
    
    lista.innerHTML = caloriasHoje.map(registro => `
        <div class="calorie-item">
            <div class="item-info">
                <div class="item-title">${registro.alimento}</div>
                <div class="item-details">
                    ${getRefeicaoText(registro.refeicao)} • ${registro.quantidade}g • ${registro.data}
                </div>
            </div>
            <div class="item-value" style="color: #f59e0b">
                ${Math.round(registro.totalCalorias)} kcal
            </div>
            <div class="item-actions">
                <button class="btn btn--danger" onclick="removerRegistroCalorias(${registro.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function getRefeicaoText(refeicao) {
    const map = {
        'cafe': '☕ Café da Manhã',
        'almoco': '🍽️ Almoço',
        'lanche': '🍪 Lanche',
        'jantar': '🍽️ Jantar',
        'ceia': '🌙 Ceia'
    };
    return map[refeicao] || refeicao;
}

function removerRegistroCalorias(id) {
    if (confirm('Deseja remover este registro?')) {
        registrosCalorias = registrosCalorias.filter(r => r.id !== id);
        localStorage.setItem('registrosCalorias', JSON.stringify(registrosCalorias));
        renderCalorias();
        updateDashboard();
    }
}

// Atividade Física
function handleAtividade(e) {
    e.preventDefault();
    
    const tipo = document.getElementById('tipo-atividade').value;
    const duracao = parseFloat(document.getElementById('duracao-atividade').value);
    const intensidade = document.getElementById('intensidade-atividade').value;
    const caloriasQueimadas = parseFloat(document.getElementById('calorias-queimadas').value) || calcularCaloriasQueimadas(tipo, duracao, intensidade);
    
    const registro = {
        id: Date.now(),
        tipo,
        duracao,
        intensidade,
        caloriasQueimadas,
        data: new Date().toLocaleDateString()
    };
    
    registrosAtividade.unshift(registro);
    localStorage.setItem('registrosAtividade', JSON.stringify(registrosAtividade));
    
    renderAtividades();
    e.target.reset();
}

function calcularCaloriasQueimadas(tipo, duracao, intensidade) {
    const baseCalories = {
        'caminhada': 4,
        'corrida': 10,
        'academia': 6,
        'natacao': 8,
        'ciclismo': 7,
        'yoga': 3,
        'futebol': 9,
        'outros': 5
    };
    
    const intensityMultiplier = {
        'baixa': 0.7,
        'moderada': 1,
        'alta': 1.3,
        'muito-alta': 1.6
    };
    
    const baseCal = baseCalories[tipo] || 5;
    const multiplier = intensityMultiplier[intensidade] || 1;
    
    return Math.round(baseCal * duracao * multiplier);
}

function renderAtividades() {
    const lista = document.getElementById('lista-atividades');
    const hoje = new Date().toLocaleDateString();
    const atividadesHoje = registrosAtividade.filter(r => r.data === hoje);
    const totalCaloriasQueimadas = atividadesHoje.reduce((sum, r) => sum + r.caloriasQueimadas, 0);
    
    document.getElementById('total-calorias-queimadas').textContent = `${totalCaloriasQueimadas} kcal`;
    
    if (atividadesHoje.length === 0) {
        lista.innerHTML = '<p class="empty-message">Nenhuma atividade registrada hoje.</p>';
        return;
    }
    
    lista.innerHTML = atividadesHoje.map(registro => `
        <div class="activity-item">
            <div class="item-info">
                <div class="item-title">${getTipoAtividadeText(registro.tipo)}</div>
                <div class="item-details">
                    ${registro.duracao} min • ${getIntensidadeText(registro.intensidade)} • ${registro.data}
                </div>
            </div>
            <div class="item-value" style="color: #10b981">
                ${registro.caloriasQueimadas} kcal
            </div>
            <div class="item-actions">
                <button class="btn btn--danger" onclick="removerRegistroAtividade(${registro.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function getTipoAtividadeText(tipo) {
    const map = {
        'caminhada': '🚶 Caminhada',
        'corrida': '🏃 Corrida',
        'academia': '💪 Academia',
        'natacao': '🏊 Natação',
        'ciclismo': '🚴 Ciclismo',
        'yoga': '🧘 Yoga',
        'futebol': '⚽ Futebol',
        'outros': '🏋️ Outros'
    };
    return map[tipo] || tipo;
}

function getIntensidadeText(intensidade) {
    const map = {
        'baixa': '😌 Baixa',
        'moderada': '😊 Moderada',
        'alta': '😤 Alta',
        'muito-alta': '🔥 Muito Alta'
    };
    return map[intensidade] || intensidade;
}

function removerRegistroAtividade(id) {
    if (confirm('Deseja remover este registro?')) {
        registrosAtividade = registrosAtividade.filter(r => r.id !== id);
        localStorage.setItem('registrosAtividade', JSON.stringify(registrosAtividade));
        renderAtividades();
    }
}

// Investimentos
function handleInvestimento(e) {
    e.preventDefault();
    
    const tipo = document.getElementById('tipo-investimento').value;
    const nome = document.getElementById('nome-investimento').value;
    const valor = parseFloat(document.getElementById('valor-investimento').value);
    const data = document.getElementById('data-investimento').value;
    
    const investimento = {
        id: Date.now(),
        tipo,
        nome,
        valor,
        data,
        dataRegistro: new Date().toLocaleDateString()
    };
    
    investimentos.unshift(investimento);
    localStorage.setItem('investimentos', JSON.stringify(investimentos));
    
    renderInvestimentos();
    updateDashboard();
    e.target.reset();
}

function renderInvestimentos() {
    const lista = document.getElementById('lista-investimentos');
    const totalInvestimentos = investimentos.reduce((sum, i) => sum + i.valor, 0);
    
    document.getElementById('total-investimentos').textContent = `R$ ${totalInvestimentos.toFixed(2)}`;
    
    if (investimentos.length === 0) {
        lista.innerHTML = '<p class="empty-message">Nenhum investimento registrado ainda.</p>';
        return;
    }
    
    lista.innerHTML = investimentos.map(investimento => `
        <div class="investment-item">
            <div class="item-info">
                <div class="item-title">${investimento.nome}</div>
                <div class="item-details">
                    ${getTipoInvestimentoText(investimento.tipo)} • ${formatarData(investimento.data)} • ${investimento.dataRegistro}
                </div>
            </div>
            <div class="item-value" style="color: #3b82f6">
                R$ ${investimento.valor.toFixed(2)}
            </div>
            <div class="item-actions">
                <button class="btn btn--danger" onclick="removerInvestimento(${investimento.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function getTipoInvestimentoText(tipo) {
    const map = {
        'acao': '📊 Ação',
        'fii': '🏢 FII',
        'cdb': '💰 CDB',
        'tesouro': '🏛️ Tesouro',
        'lci-lca': '📈 LCI/LCA',
        'cripto': '₿ Criptomoeda',
        'outros': '📋 Outros'
    };
    return map[tipo] || tipo;
}

function formatarData(data) {
    return new Date(data + 'T00:00:00').toLocaleDateString();
}

function removerInvestimento(id) {
    if (confirm('Deseja remover este investimento?')) {
        investimentos = investimentos.filter(i => i.id !== id);
        localStorage.setItem('investimentos', JSON.stringify(investimentos));
        renderInvestimentos();
        updateDashboard();
    }
}

// Dividendos
function handleDividendos(e) {
    e.preventDefault();
    
    const ativo = document.getElementById('ativo-dividendo').value;
    const tipo = document.getElementById('tipo-dividendo').value;
    const valor = parseFloat(document.getElementById('valor-dividendo').value);
    const data = document.getElementById('data-dividendo').value;
    
    const dividendo = {
        id: Date.now(),
        ativo,
        tipo,
        valor,
        data,
        dataRegistro: new Date().toLocaleDateString()
    };
    
    dividendos.unshift(dividendo);
    localStorage.setItem('dividendos', JSON.stringify(dividendos));
    
    renderDividendos();
    e.target.reset();
}

function renderDividendos() {
    const lista = document.getElementById('lista-dividendos');
    const totalDividendos = dividendos.reduce((sum, d) => sum + d.valor, 0);
    
    document.getElementById('total-dividendos').textContent = `R$ ${totalDividendos.toFixed(2)}`;
    
    if (dividendos.length === 0) {
        lista.innerHTML = '<p class="empty-message">Nenhum dividendo registrado ainda.</p>';
        return;
    }
    
    lista.innerHTML = dividendos.map(dividendo => `
        <div class="dividend-item">
            <div class="item-info">
                <div class="item-title">${dividendo.ativo}</div>
                <div class="item-details">
                    ${getTipoDividendoText(dividendo.tipo)} • ${formatarData(dividendo.data)} • ${dividendo.dataRegistro}
                </div>
            </div>
            <div class="item-value" style="color: #10b981">
                R$ ${dividendo.valor.toFixed(2)}
            </div>
            <div class="item-actions">
                <button class="btn btn--danger" onclick="removerDividendo(${dividendo.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function getTipoDividendoText(tipo) {
    const map = {
        'dividendo': '💰 Dividendo',
        'jcp': '💼 JCP',
        'rendimento': '🏢 Rendimento FII'
    };
    return map[tipo] || tipo;
}

function removerDividendo(id) {
    if (confirm('Deseja remover este dividendo?')) {
        dividendos = dividendos.filter(d => d.id !== id);
        localStorage.setItem('dividendos', JSON.stringify(dividendos));
        renderDividendos();
    }
}

// Emoções
function handleEmocoes(e) {
    e.preventDefault();
    
    const humor = document.getElementById('humor-emocao').value;
    const energia = document.getElementById('energia-emocao').value;
    const nota = document.getElementById('nota-emocao').value;
    
    const registro = {
        id: Date.now(),
        humor,
        energia,
        nota,
        data: new Date().toLocaleDateString()
    };
    
    registrosEmocoes.unshift(registro);
    localStorage.setItem('registrosEmocoes', JSON.stringify(registrosEmocoes));
    
    renderEmocoes();
    e.target.reset();
}

function renderEmocoes() {
    const lista = document.getElementById('lista-emocoes');
    
    if (registrosEmocoes.length === 0) {
        lista.innerHTML = '<p class="empty-message">Nenhum registro emocional ainda. Comece hoje!</p>';
        return;
    }
    
    lista.innerHTML = registrosEmocoes.map(registro => `
        <div class="emotion-item">
            <div class="item-info">
                <div class="item-title">${getHumorText(registro.humor)} • ${getEnergiaText(registro.energia)}</div>
                <div class="item-details">
                    ${registro.nota} • ${registro.data}
                </div>
            </div>
            <div class="item-actions">
                <button class="btn btn--danger" onclick="removerRegistroEmocao(${registro.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function getHumorText(humor) {
    const map = {
        'muito-feliz': '😄 Muito Feliz',
        'feliz': '😊 Feliz',
        'neutro': '😐 Neutro',
        'triste': '😞 Triste',
        'muito-triste': '😢 Muito Triste'
    };
    return map[humor] || humor;
}

function getEnergiaText(energia) {
    const map = {
        'muito-alta': '⚡ Muito Alta',
        'alta': '🔋 Alta',
        'media': '🔌 Média',
        'baixa': '🪫 Baixa',
        'muito-baixa': '😴 Muito Baixa'
    };
    return map[energia] || energia;
}

function removerRegistroEmocao(id) {
    if (confirm('Deseja remover este registro?')) {
        registrosEmocoes = registrosEmocoes.filter(r => r.id !== id);
        localStorage.setItem('registrosEmocoes', JSON.stringify(registrosEmocoes));
        renderEmocoes();
    }
}

// Dashboard
function updateDashboard() {
    updateMetricas();
    updateCharts();
}

function updateMetricas() {
    // Saldo atual
    const totalReceitas = transacoes.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + t.valor, 0);
    const totalDespesas = transacoes.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + t.valor, 0);
    const totalCartao = gastosCartao.reduce((sum, g) => sum + g.valor, 0);
    const saldo = totalReceitas - totalDespesas - totalCartao;
    
    document.getElementById('saldo-atual').textContent = `R$ ${saldo.toFixed(2)}`;
    
    // Gastos do mês
    const gastosMes = totalDespesas + totalCartao;
    document.getElementById('gastos-mes').textContent = `R$ ${gastosMes.toFixed(2)}`;
    
    // Total investido
    const totalInvestido = investimentos.reduce((sum, i) => sum + i.valor, 0);
    document.getElementById('total-investido').textContent = `R$ ${totalInvestido.toFixed(2)}`;
    
    // Calorias hoje
    const hoje = new Date().toLocaleDateString();
    const caloriasHoje = registrosCalorias.filter(r => r.data === hoje).reduce((sum, r) => sum + r.totalCalorias, 0);
    document.getElementById('calorias-hoje').textContent = `${Math.round(caloriasHoje)} kcal`;
}

function updateCharts() {
    updateReceitaDespesaChart();
    updateGastosChart();
}

function updateReceitaDespesaChart() {
    const ctx = document.getElementById('receitaDespesaChart');
    if (!ctx) return;
    
    if (receitaDespesaChart) {
        receitaDespesaChart.destroy();
    }
    
    const totalReceitas = transacoes.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + t.valor, 0);
    const totalDespesas = transacoes.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + t.valor, 0);
    const totalCartao = gastosCartao.reduce((sum, g) => sum + g.valor, 0);
    
    receitaDespesaChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Receitas', 'Despesas', 'Cartão'],
            datasets: [{
                data: [totalReceitas, totalDespesas, totalCartao],
                backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toFixed(0);
                        }
                    }
                }
            }
        }
    });
}

function updateGastosChart() {
    const ctx = document.getElementById('gastosChart');
    if (!ctx) return;
    
    if (gastosChart) {
        gastosChart.destroy();
    }
    
    // Agregar gastos por categoria
    const gastosPorCategoria = {};
    
    transacoes.filter(t => t.tipo === 'despesa').forEach(t => {
        gastosPorCategoria[t.categoria] = (gastosPorCategoria[t.categoria] || 0) + t.valor;
    });
    
    gastosCartao.forEach(g => {
        gastosPorCategoria[g.categoria] = (gastosPorCategoria[g.categoria] || 0) + g.valor;
    });
    
    const labels = Object.keys(gastosPorCategoria);
    const data = Object.values(gastosPorCategoria);
    
    if (labels.length === 0) return;
    
    gastosChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: [
                    '#ef4444', '#f59e0b', '#10b981', '#3b82f6',
                    '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}
