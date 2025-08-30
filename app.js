// ========== DADOS PRINCIPAIS ==========
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

// ========== LISTA COMPLETA DE MERCADO BRASILEIRO ==========
const produtosMercado = {
    hortifruti: [
        'Alface', 'Rúcula', 'Couve', 'Espinafre', 'Acelga', 'Agrião',
        'Tomate', 'Cebola', 'Alho', 'Batata', 'Batata-doce', 'Cenoura',
        'Beterraba', 'Abobrinha', 'Berinjela', 'Pimentão', 'Pepino', 'Chuchu',
        'Brócolis', 'Couve-flor', 'Vagem', 'Quiabo', 'Maxixe',
        'Banana', 'Maçã', 'Laranja', 'Limão', 'Mamão', 'Manga', 'Abacaxi',
        'Melancia', 'Melão', 'Uva', 'Pêra', 'Pêssego', 'Ameixa', 'Kiwi',
        'Morango', 'Abacate', 'Coco', 'Acerola', 'Goiaba', 'Caju',
        'Salsa', 'Cebolinha', 'Coentro', 'Manjericão', 'Hortelã'
    ],
    acougue: [
        'Carne Moída', 'Picanha', 'Contra-filé', 'Filé Mignon', 'Alcatra',
        'Fraldinha', 'Patinho', 'Coxão Mole', 'Lagarto', 'Acém', 'Músculo',
        'Costela Bovina', 'Frango Inteiro', 'Peito de Frango', 'Coxa e Sobrecoxa',
        'Asa de Frango', 'Linguiça Calabresa', 'Linguiça Toscana', 'Bacon',
        'Presunto', 'Mortadela', 'Salame', 'Salsicha', 'Peru Fatiado',
        'Ovos de Galinha', 'Ovos de Codorna', 'Tilápia', 'Salmão', 'Sardinha',
        'Camarão', 'Bacalhau'
    ],
    laticínios: [
        'Leite Integral', 'Leite Desnatado', 'Leite Condensado', 'Creme de Leite',
        'Iogurte Natural', 'Iogurte Grego', 'Iogurte com Polpa', 'Kefir',
        'Queijo Muçarela', 'Queijo Prato', 'Queijo Minas', 'Requeijão',
        'Queijo Cottage', 'Cream Cheese', 'Queijo Ralado', 'Ricota',
        'Manteiga', 'Margarina', 'Leite de Coco', 'Leite de Soja'
    ],
    padaria: [
        'Pão Francês', 'Pão de Forma', 'Pão Integral', 'Pão de Açúcar',
        'Pão Sírio', 'Torradas', 'Biscoito Cream Cracker', 'Biscoito Maria',
        'Bolacha Recheada', 'Biscoitos Doces', 'Bolo Pronto', 'Sonho',
        'Rosquinha', 'Pão de Mel', 'Croissant'
    ],
    mercearia: [
        'Arroz Branco', 'Arroz Integral', 'Feijão Carioca', 'Feijão Preto',
        'Macarrão Espaguete', 'Macarrão Penne', 'Macarrão Parafuso', 'Lentilha',
        'Grão-de-Bico', 'Ervilha Seca', 'Farinha de Trigo', 'Farinha de Mandioca',
        'Fubá', 'Aveia em Flocos', 'Granola', 'Açúcar Cristal', 'Açúcar Mascavo',
        'Sal Refinado', 'Azeite de Oliva', 'Óleo de Soja', 'Vinagre',
        'Molho de Tomate', 'Extrato de Tomate', 'Milho Verde', 'Ervilha em Conserva',
        'Sardinha em Lata', 'Atum', 'Café', 'Achocolatado', 'Chá'
    ],
    limpeza: [
        'Sabão em Pó', 'Amaciante', 'Água Sanitária', 'Detergente',
        'Desinfetante', 'Álcool', 'Esponja de Aço', 'Esponja Comum',
        'Papel Higiênico', 'Papel Toalha', 'Saco de Lixo', 'Lustra Móveis',
        'Limpa Vidros', 'Sabão em Barra'
    ],
    higiene: [
        'Sabonete', 'Shampoo', 'Condicionador', 'Creme Dental', 'Escova de Dente',
        'Fio Dental', 'Desodorante', 'Protetor Solar', 'Absorvente',
        'Papel Higiênico', 'Lenço Umedecido'
    ],
    bebidas: [
        'Refrigerante Cola', 'Guaraná', 'Fanta', 'Sprite', 'Suco de Caixinha',
        'Suco em Pó', 'Água Mineral', 'Água de Coco', 'Cerveja', 'Vinho',
        'Energético', 'Isotônico'
    ],
    outros: [
        'Ração para Cães', 'Ração para Gatos', 'Areia Sanitária', 'Carvão',
        'Fósforo', 'Vela', 'Pilha', 'Lâmpada'
    ]
};

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando Controle Pessoal Pro...');
    
    initTabs();
    initForms();
    initCategorias();
    initMercado();
    initMesAtual();
    updateDashboard();
    renderTransacoes();
    renderGastosCartao();
    renderListaMercado();
    renderCalorias();
    renderAtividades();
    renderInvestimentos();
    renderDividendos();
    renderEmocoes();
    
    console.log('✅ App inicializado com sucesso!');
});

// ========== SISTEMA DE TABS ==========
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
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Atualiza gráficos se for dashboard
            if (targetTab === 'dashboard') {
                setTimeout(() => {
                    updateDashboard();
                }, 100);
            }
        });
    });
}

// ========== INICIALIZAR FORMULÁRIOS ==========
function initForms() {
    // Fluxo de Caixa
    const formFluxo = document.getElementById('form-fluxo-caixa');
    if (formFluxo) {
        formFluxo.addEventListener('submit', handleFluxoCaixa);
    }
    
    const tipoTransacao = document.getElementById('tipo-transacao');
    if (tipoTransacao) {
        tipoTransacao.addEventListener('change', updateCategorias);
    }

    // Seletores de mês/ano
    const mesFluxo = document.getElementById('mes-fluxo');
    const anoFluxo = document.getElementById('ano-fluxo');
    if (mesFluxo && anoFluxo) {
        mesFluxo.addEventListener('change', updatePeriodoAtual);
        anoFluxo.addEventListener('change', updatePeriodoAtual);
    }

    // Upload de planilha
    const uploadBtn = document.getElementById('processar-upload');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', processarUpload);
    }
    
    // Cartão
    const formCartao = document.getElementById('form-cartao');
    if (formCartao) {
        formCartao.addEventListener('submit', handleCartao);
    }
    
    const valorCartao = document.getElementById('valor-cartao');
    const parcelasCartao = document.getElementById('parcelas-cartao');
    if (valorCartao && parcelasCartao) {
        valorCartao.addEventListener('input', calcularParcela);
        parcelasCartao.addEventListener('change', calcularParcela);
    }
    
    // Mercado
    const formMercado = document.getElementById('form-mercado');
    if (formMercado) {
        formMercado.addEventListener('submit', handleMercado);
    }
    
    // Calorias
    const formCalorias = document.getElementById('form-calorias');
    if (formCalorias) {
        formCalorias.addEventListener('submit', handleCalorias);
    }
    
    // Atividade
    const formAtividade = document.getElementById('form-atividade');
    if (formAtividade) {
        formAtividade.addEventListener('submit', handleAtividade);
    }
    
    // Investimentos
    const formInvestimento = document.getElementById('form-investimento');
    if (formInvestimento) {
        formInvestimento.addEventListener('submit', handleInvestimento);
    }

    const valorInvestimento = document.getElementById('valor-investimento');
    const moedaInvestimento = document.getElementById('moeda-investimento');
    if (valorInvestimento && moedaInvestimento) {
        valorInvestimento.addEventListener('input', atualizarConversaoMoeda);
        moedaInvestimento.addEventListener('change', atualizarConversaoMoeda);
    }

    const atualizarCotacaoBtn = document.getElementById('atualizar-cotacao');
    if (atualizarCotacaoBtn) {
        atualizarCotacaoBtn.addEventListener('click', atualizarCotacao);
    }
    
    // Dividendos
    const formDividendos = document.getElementById('form-dividendos');
    if (formDividendos) {
        formDividendos.addEventListener('submit', handleDividendos);
    }
    
    // Emoções
    const formEmocoes = document.getElementById('form-emocoes');
    if (formEmocoes) {
        formEmocoes.addEventListener('submit', handleEmocoes);
    }
}

// ========== CATEGORIAS DINÂMICAS ==========
function initCategorias() {
    const categorias = {
        receita: ['Salário', 'Freelance', 'Venda', 'Dividendos', 'Aluguel', 'Bonificação', 'Outros'],
        despesa: ['Alimentação', 'Transporte', 'Saúde', 'Educação', 'Lazer', 'Casa', 'Roupas', 'Seguros', 'Outros']
    };
    
    window.categorias = categorias;
}

function updateCategorias() {
    const tipoSelect = document.getElementById('tipo-transacao');
    const categoriaSelect = document.getElementById('categoria-transacao');
    
    if (!tipoSelect || !categoriaSelect) return;
    
    const tipo = tipoSelect.value;
    
    categoriaSelect.innerHTML = '<option value="">Selecione uma categoria</option>';
    
    if (tipo && window.categorias[tipo]) {
        window.categorias[tipo].forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.toLowerCase().replace(' ', '-');
            option.textContent = categoria;
            categoriaSelect.appendChild(option);
        });
    }
}

// ========== INICIALIZAR MERCADO (CORRIGIDO) ==========
function initMercado() {
    const categoriaSelect = document.getElementById('categoria-mercado');
    const itemSelect = document.getElementById('item-mercado-select');
    
    if (!categoriaSelect || !itemSelect) {
        console.log('❌ Elementos do mercado não encontrados');
        return;
    }

    console.log('🛒 Inicializando mercado...');
    
    // Event listener para mudança de categoria
    categoriaSelect.addEventListener('change', function() {
        const categoria = this.value;
        console.log('📋 Categoria selecionada:', categoria);
        
        // Limpar select de itens
        itemSelect.innerHTML = '<option value="">Carregando...</option>';
        
        if (categoria && produtosMercado[categoria]) {
            // Adicionar opção padrão
            itemSelect.innerHTML = '<option value="">Selecione um item</option>';
            itemSelect.disabled = false;
            
            // Adicionar produtos da categoria
            produtosMercado[categoria].forEach(produto => {
                const option = document.createElement('option');
                option.value = produto;
                option.textContent = produto;
                itemSelect.appendChild(option);
            });
            
            console.log('✅ Produtos carregados:', produtosMercado[categoria].length);
        } else {
            itemSelect.innerHTML = '<option value="">Selecione a categoria primeiro</option>';
            itemSelect.disabled = true;
        }
    });
    
    console.log('✅ Mercado inicializado');
}

// ========== MÊS ATUAL ==========
function initMesAtual() {
    const mesFluxo = document.getElementById('mes-fluxo');
    const anoFluxo = document.getElementById('ano-fluxo');
    
    if (mesFluxo && anoFluxo) {
        const agora = new Date();
        mesFluxo.value = agora.getMonth() + 1;
        anoFluxo.value = agora.getFullYear();
        updatePeriodoAtual();
    }
}

function updatePeriodoAtual() {
    const mesFluxo = document.getElementById('mes-fluxo');
    const anoFluxo = document.getElementById('ano-fluxo');
    const periodoAtual = document.getElementById('periodo-atual');
    
    if (mesFluxo && anoFluxo && periodoAtual) {
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        
        const mesNome = meses[parseInt(mesFluxo.value) - 1];
        const ano = anoFluxo.value;
        
        periodoAtual.textContent = `${mesNome} ${ano}`;
        
        // Atualizar visualizações
        renderTransacoes();
        updateQuinzenalView();
    }
}

// ========== FLUXO DE CAIXA ==========
function handleFluxoCaixa(e) {
    e.preventDefault();
    
    const tipo = document.getElementById('tipo-transacao')?.value;
    const categoria = document.getElementById('categoria-transacao')?.value;
    const quinzena = document.getElementById('quinzena')?.value;
    const valor = parseFloat(document.getElementById('valor-transacao')?.value || 0);
    const descricao = document.getElementById('descricao-transacao')?.value;
    const recorrente = document.getElementById('recorrente-checkbox')?.checked;
    
    const mesFluxo = document.getElementById('mes-fluxo')?.value;
    const anoFluxo = document.getElementById('ano-fluxo')?.value;
    
    if (!tipo || !categoria || !quinzena || !valor || !descricao) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    const transacao = {
        id: Date.now(),
        tipo,
        categoria,
        quinzena,
        valor,
        descricao,
        mes: parseInt(mesFluxo),
        ano: parseInt(anoFluxo),
        data: new Date().toLocaleDateString(),
        recorrente: recorrente || false
    };
    
    // Adicionar lançamento atual
    transacoes.unshift(transacao);
    
    // Se for recorrente, criar lançamentos para próximos 11 meses
    if (recorrente) {
        for (let i = 1; i <= 11; i++) {
            let novoMes = parseInt(mesFluxo) + i;
            let novoAno = parseInt(anoFluxo);
            
            if (novoMes > 12) {
                novoMes = novoMes - 12;
                novoAno = novoAno + 1;
            }
            
            const transacaoRecorrente = {
                ...transacao,
                id: Date.now() + i,
                mes: novoMes,
                ano: novoAno
            };
            
            transacoes.unshift(transacaoRecorrente);
        }
    }
    
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
    
    renderTransacoes();
    updateQuinzenalView();
    updateDashboard();
    e.target.reset();
    
    console.log('✅ Transação adicionada:', transacao);
}

function renderTransacoes() {
    const lista = document.getElementById('lista-transacoes');
    if (!lista) return;
    
    const mesFluxo = parseInt(document.getElementById('mes-fluxo')?.value || new Date().getMonth() + 1);
    const anoFluxo = parseInt(document.getElementById('ano-fluxo')?.value || new Date().getFullYear());
    
    const transacoesPeriodo = transacoes.filter(t => t.mes === mesFluxo && t.ano === anoFluxo);
    
    if (transacoesPeriodo.length === 0) {
        lista.innerHTML = '<p class="empty-message">Nenhuma transação registrada para este período.</p>';
        updateResumoFinanceiro([]);
        return;
    }
    
    lista.innerHTML = transacoesPeriodo.map(transacao => `
        <div class="transaction-item ${transacao.tipo}">
            <div class="item-info">
                <div class="item-title">${transacao.descricao}</div>
                <div class="item-details">
                    ${transacao.categoria} • ${transacao.quinzena === 'primeira' ? '1ª' : '2ª'} Quinzena • ${transacao.data}
                    ${transacao.recorrente ? ' • 🔄 Recorrente' : ''}
                </div>
            </div>
            <div class="item-value" style="color: ${transacao.tipo === 'receita' ? '#10b981' : '#ef4444'}">
                ${transacao.tipo === 'receita' ? '+' : '-'} R$ ${transacao.valor.toFixed(2)}
            </div>
            <div class="item-actions">
                <button class="btn btn--danger" onclick="removerTransacao(${transacao.id})" title="Remover">🗑️</button>
            </div>
        </div>
    `).join('');
    
    updateResumoFinanceiro(transacoesPeriodo);
}

function updateResumoFinanceiro(transacoesPeriodo) {
    const totalReceitas = transacoesPeriodo.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + t.valor, 0);
    const totalDespesas = transacoesPeriodo.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + t.valor, 0);
    const saldo = totalReceitas - totalDespesas;
    
    const receitasEl = document.getElementById('total-receitas');
    const despesasEl = document.getElementById('total-despesas');
    const saldoEl = document.getElementById('saldo-total');
    
    if (receitasEl) receitasEl.textContent = `R$ ${totalReceitas.toFixed(2)}`;
    if (despesasEl) despesasEl.textContent = `R$ ${totalDespesas.toFixed(2)}`;
    if (saldoEl) saldoEl.textContent = `R$ ${saldo.toFixed(2)}`;
}

function updateQuinzenalView() {
    const mesFluxo = parseInt(document.getElementById('mes-fluxo')?.value || new Date().getMonth() + 1);
    const anoFluxo = parseInt(document.getElementById('ano-fluxo')?.value || new Date().getFullYear());
    
    const transacoesPeriodo = transacoes.filter(t => t.mes === mesFluxo && t.ano === anoFluxo);
    
    // Primeira quinzena
    const receitasQ1 = transacoesPeriodo.filter(t => t.tipo === 'receita' && t.quinzena === 'primeira').reduce((sum, t) => sum + t.valor, 0);
    const despesasQ1 = transacoesPeriodo.filter(t => t.tipo === 'despesa' && t.quinzena === 'primeira').reduce((sum, t) => sum + t.valor, 0);
    const saldoQ1 = receitasQ1 - despesasQ1;
    
    // Segunda quinzena
    const receitasQ2 = transacoesPeriodo.filter(t => t.tipo === 'receita' && t.quinzena === 'segunda').reduce((sum, t) => sum + t.valor, 0);
    const despesasQ2 = transacoesPeriodo.filter(t => t.tipo === 'despesa' && t.quinzena === 'segunda').reduce((sum, t) => sum + t.valor, 0);
    const saldoQ2 = receitasQ2 - despesasQ2;
    
    // Atualizar elementos
    const elements = [
        { id: 'receita-q1', value: receitasQ1 },
        { id: 'despesa-q1', value: despesasQ1 },
        { id: 'saldo-q1', value: saldoQ1 },
        { id: 'receita-q2', value: receitasQ2 },
        { id: 'despesa-q2', value: despesasQ2 },
        { id: 'saldo-q2', value: saldoQ2 }
    ];
    
    elements.forEach(({ id, value }) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value.toFixed(2);
        }
    });
}

function removerTransacao(id) {
    if (confirm('Deseja remover esta transação?')) {
        transacoes = transacoes.filter(t => t.id !== id);
        localStorage.setItem('transacoes', JSON.stringify(transacoes));
        renderTransacoes();
        updateQuinzenalView();
        updateDashboard();
    }
}

// ========== UPLOAD DE PLANILHA ==========
function processarUpload() {
    const fileInput = document.getElementById('upload-planilha');
    if (!fileInput || !fileInput.files[0]) {
        alert('Por favor, selecione um arquivo.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const text = e.target.result;
            const linhas = text.split('\n');
            let importados = 0;

            // Pular cabeçalho (primeira linha)
            for (let i = 1; i < linhas.length; i++) {
                const linha = linhas[i].trim();
                if (!linha) continue;

                const colunas = linha.split(',').map(col => col.trim().replace(/"/g, ''));
                
                // Formato esperado: tipo,categoria,valor,descricao,quinzena
                if (colunas.length >= 5) {
                    const [tipo, categoria, valor, descricao, quinzena] = colunas;
                    
                    if (tipo && categoria && valor && descricao && quinzena) {
                        const mesFluxo = parseInt(document.getElementById('mes-fluxo')?.value || new Date().getMonth() + 1);
                        const anoFluxo = parseInt(document.getElementById('ano-fluxo')?.value || new Date().getFullYear());
                        
                        const transacao = {
                            id: Date.now() + i,
                            tipo: tipo.toLowerCase(),
                            categoria: categoria.toLowerCase(),
                            quinzena: quinzena.toLowerCase().includes('primeira') ? 'primeira' : 'segunda',
                            valor: parseFloat(valor),
                            descricao,
                            mes: mesFluxo,
                            ano: anoFluxo,
                            data: new Date().toLocaleDateString(),
                            recorrente: false
                        };
                        
                        transacoes.unshift(transacao);
                        importados++;
                    }
                }
            }

            if (importados > 0) {
                localStorage.setItem('transacoes', JSON.stringify(transacoes));
                renderTransacoes();
                updateQuinzenalView();
                updateDashboard();
                alert(`${importados} transações importadas com sucesso!`);
            } else {
                alert('Nenhuma transação válida encontrada no arquivo.');
            }

        } catch (error) {
            console.error('Erro ao processar arquivo:', error);
            alert('Erro ao processar arquivo. Verifique o formato.');
        }
    };

    reader.readAsText(file);
}

// ========== CARTÃO COM PARCELAMENTO ==========
function calcularParcela() {
    const valorInput = document.getElementById('valor-cartao');
    const parcelasSelect = document.getElementById('parcelas-cartao');
    const valorParcelaDisplay = document.getElementById('valor-parcela-display');
    
    if (!valorInput || !parcelasSelect || !valorParcelaDisplay) return;
    
    const valor = parseFloat(valorInput.value) || 0;
    const parcelas = parseInt(parcelasSelect.value) || 1;
    
    const valorParcela = valor / parcelas;
    valorParcelaDisplay.value = `R$ ${valorParcela.toFixed(2)}`;
}

function handleCartao(e) {
    e.preventDefault();
    
    const categoria = document.getElementById('categoria-cartao')?.value;
    const vencimento = document.getElementById('vencimento-cartao')?.value;
    const valorTotal = parseFloat(document.getElementById('valor-cartao')?.value || 0);
    const estabelecimento = document.getElementById('estabelecimento-cartao')?.value;
    const parcelas = parseInt(document.getElementById('parcelas-cartao')?.value || 1);
    
    if (!categoria || !vencimento || !valorTotal || !estabelecimento) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    const valorParcela = valorTotal / parcelas;
    const dataBase = new Date();
    
    // Criar uma entrada para cada parcela
    for (let i = 0; i < parcelas; i++) {
        const dataVencimento = new Date(dataBase);
        dataVencimento.setMonth(dataVencimento.getMonth() + i);
        
        const gasto = {
            id: Date.now() + i,
            categoria,
            vencimento,
            valor: valorParcela,
            valorTotal,
            estabelecimento,
            parcela: i + 1,
            totalParcelas: parcelas,
            dataVencimento: dataVencimento.toLocaleDateString(),
            data: new Date().toLocaleDateString()
        };
        
        gastosCartao.unshift(gasto);
    }
    
    localStorage.setItem('gastosCartao', JSON.stringify(gastosCartao));
    
    renderGastosCartao();
    updateDashboard();
    e.target.reset();
    
    // Limpar campo de parcela
    const valorParcelaDisplay = document.getElementById('valor-parcela-display');
    if (valorParcelaDisplay) {
        valorParcelaDisplay.value = '';
    }
    
    console.log('✅ Gasto no cartão adicionado:', { valorTotal, parcelas });
}

function renderGastosCartao() {
    const lista = document.getElementById('lista-cartao');
    if (!lista) return;
    
    const totalCartao = gastosCartao.reduce((sum, g) => sum + g.valor, 0);
    const parcelasFuturas = gastosCartao.filter(g => new Date(g.dataVencimento.split('/').reverse().join('-')) > new Date()).reduce((sum, g) => sum + g.valor, 0);
    
    const totalCartaoEl = document.getElementById('total-cartao');
    const parcelasFuturasEl = document.getElementById('parcelas-futuras');
    
    if (totalCartaoEl) totalCartaoEl.textContent = `R$ ${totalCartao.toFixed(2)}`;
    if (parcelasFuturasEl) parcelasFuturasEl.textContent = `R$ ${parcelasFuturas.toFixed(2)}`;
    
    if (gastosCartao.length === 0) {
        lista.innerHTML = '<p class="empty-message">Nenhum gasto no cartão registrado ainda.</p>';
        return;
    }
    
    lista.innerHTML = gastosCartao.map(gasto => `
        <div class="transaction-item">
            <div class="item-info">
                <div class="item-title">${gasto.estabelecimento}</div>
                <div class="item-details">
                    ${gasto.categoria} • ${gasto.vencimento === 'primeira' ? '1ª' : '2ª'} Quinzena
                    ${gasto.totalParcelas > 1 ? ` • ${gasto.parcela}/${gasto.totalParcelas}x de R$ ${gasto.valor.toFixed(2)}` : ''}
                    <br>Vence: ${gasto.dataVencimento} • ${gasto.data}
                </div>
            </div>
            <div class="item-value" style="color: #ef4444">
                R$ ${gasto.valor.toFixed(2)}
            </div>
            <div class="item-actions">
                <button class="btn btn--danger" onclick="removerGastoCartao(${gasto.id})" title="Remover">🗑️</button>
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

// ========== LISTA DE MERCADO (CORRIGIDA) ==========
function handleMercado(e) {
    e.preventDefault();
    
    const categoria = document.getElementById('categoria-mercado')?.value;
    const itemSelect = document.getElementById('item-mercado-select')?.value;
    const itemPersonalizado = document.getElementById('item-personalizado')?.value;
    const quantidade = document.getElementById('quantidade-mercado')?.value;
    const valor = parseFloat(document.getElementById('valor-mercado')?.value || 0);
    
    const item = itemPersonalizado || itemSelect;
    
    if (!categoria || !item) {
        alert('Por favor, selecione uma categoria e um item.');
        return;
    }
    
    const novoItem = {
        id: Date.now(),
        item,
        categoria,
        quantidade: quantidade || '1 unidade',
        valor,
        comprado: false,
        data: new Date().toLocaleDateString()
    };
    
    listaMercado.unshift(novoItem);
    localStorage.setItem('listaMercado', JSON.stringify(listaMercado));
    
    renderListaMercado();
    e.target.reset();
    
    // Reset dos selects
    const categoriaSelect = document.getElementById('categoria-mercado');
    const itemSelectReset = document.getElementById('item-mercado-select');
    if (categoriaSelect && itemSelectReset) {
        categoriaSelect.value = '';
        itemSelectReset.innerHTML = '<option value="">Selecione a categoria primeiro</option>';
        itemSelectReset.disabled = true;
    }
    
    console.log('✅ Item adicionado ao mercado:', novoItem);
}

function renderListaMercado() {
    const lista = document.getElementById('lista-mercado');
    if (!lista) return;
    
    const totalMercado = listaMercado.reduce((sum, item) => sum + item.valor, 0);
    
    const totalMercadoEl = document.getElementById('total-mercado');
    if (totalMercadoEl) {
        totalMercadoEl.textContent = `R$ ${totalMercado.toFixed(2)}`;
    }
    
    if (listaMercado.length === 0) {
        lista.innerHTML = '<p class="empty-message">Nenhum item na lista ainda.</p>';
        return;
    }
    
    lista.innerHTML = listaMercado.map(item => `
        <div class="shopping-item ${item.comprado ? 'completed' : ''}" data-categoria="${item.categoria}" data-status="${item.comprado ? 'comprado' : 'pendente'}">
            <div class="item-info">
                <div class="item-title">${item.item}</div>
                <div class="item-details">
                    ${getCategoriaIcon(item.categoria)} ${item.categoria} • ${item.quantidade} • ${item.data}
                </div>
            </div>
            <div class="item-value">
                R$ ${item.valor.toFixed(2)}
            </div>
            <div class="item-actions">
                <button class="btn ${item.comprado ? 'btn--secondary' : 'btn--primary'}" 
                        onclick="toggleItemMercado(${item.id})" title="${item.comprado ? 'Desmarcar' : 'Marcar como comprado'}">
                    ${item.comprado ? '↩️' : '✅'}
                </button>
                <button class="btn btn--danger" onclick="removerItemMercado(${item.id})" title="Remover">🗑️</button>
            </div>
        </div>
    `).join('');
}

function getCategoriaIcon(categoria) {
    const icons = {
        'hortifruti': '🥕',
        'acougue': '🥩',
        'laticínios': '🥛',
        'padaria': '🥖',
        'mercearia': '🍞',
        'limpeza': '🧽',
        'higiene': '🧴',
        'bebidas': '🥤',
        'outros': '📦'
    };
    return icons[categoria] || '📦';
}

function filtrarMercado(filtro) {
    const itens = document.querySelectorAll('.shopping-item');
    const botoes = document.querySelectorAll('.filtros-mercado .btn');
    
    // Atualizar botões ativos
    botoes.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    itens.forEach(item => {
        if (filtro === 'todos') {
            item.style.display = 'flex';
        } else {
            const status = item.getAttribute('data-status');
            item.style.display = status === filtro ? 'flex' : 'none';
        }
    });
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

// ========== CALORIAS ==========
function handleCalorias(e) {
    e.preventDefault();
    
    const alimento = document.getElementById('alimento-calorias')?.value;
    const refeicao = document.getElementById('refeicao-calorias')?.value;
    const quantidade = parseFloat(document.getElementById('quantidade-calorias')?.value || 0);
    const caloriasPor100g = parseFloat(document.getElementById('calorias-item')?.value || 0);
    
    if (!alimento || !refeicao || !quantidade || !caloriasPor100g) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
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
    
    console.log('✅ Registro de calorias adicionado:', registro);
}

function renderCalorias() {
    const lista = document.getElementById('lista-calorias');
    if (!lista) return;
    
    const hoje = new Date().toLocaleDateString();
    const caloriasHoje = registrosCalorias.filter(r => r.data === hoje);
    const totalCaloriasHoje = caloriasHoje.reduce((sum, r) => sum + r.totalCalorias, 0);
    
    const totalCaloriasDiaEl = document.getElementById('total-calorias-dia');
    if (totalCaloriasDiaEl) {
        totalCaloriasDiaEl.textContent = `${Math.round(totalCaloriasHoje)} kcal`;
    }
    
    if (caloriasHoje.length === 0) {
        lista.innerHTML = '<p class="empty-message">Nenhum alimento registrado hoje.</p>';
        return;
    }
    
    lista.innerHTML = caloriasHoje.map(registro => `
        <div class="calorie-item">
            <div class="item-info">
                <div class="item-title">${registro.alimento}</div>
                <div class="item-details">
                    ${getRefeicaoText(registro.refeicao)} • ${registro.quantidade}g • ${registro.caloriasPor100g} kcal/100g • ${registro.data}
                </div>
            </div>
            <div class="item-value" style="color: #f59e0b">
                ${Math.round(registro.totalCalorias)} kcal
            </div>
            <div class="item-actions">
                <button class="btn btn--danger" onclick="removerRegistroCalorias(${registro.id})" title="Remover">🗑️</button>
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

// ========== ATIVIDADE FÍSICA ==========
function handleAtividade(e) {
    e.preventDefault();
    
    const tipo = document.getElementById('tipo-atividade')?.value;
    const duracao = parseFloat(document.getElementById('duracao-atividade')?.value || 0);
    const intensidade = document.getElementById('intensidade-atividade')?.value;
    const caloriasQueimadas = parseFloat(document.getElementById('calorias-queimadas')?.value || 0) || calcularCaloriasQueimadas(tipo, duracao, intensidade);
    
    if (!tipo || !duracao || !intensidade) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
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
    
    console.log('✅ Atividade registrada:', registro);
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
    if (!lista) return;
    
    const hoje = new Date().toLocaleDateString();
    const atividadesHoje = registrosAtividade.filter(r => r.data === hoje);
    const totalCaloriasQueimadas = atividadesHoje.reduce((sum, r) => sum + r.caloriasQueimadas, 0);
    
    const totalCaloriasQueimadasEl = document.getElementById('total-calorias-queimadas');
    if (totalCaloriasQueimadasEl) {
        totalCaloriasQueimadasEl.textContent = `${totalCaloriasQueimadas} kcal`;
    }
    
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
                <button class="btn btn--danger" onclick="removerRegistroAtividade(${registro.id})" title="Remover">🗑️</button>
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

// ========== INVESTIMENTOS COM COTAÇÃO ==========
function handleInvestimento(e) {
    e.preventDefault();
    
    const tipo = document.getElementById('tipo-investimento')?.value;
    const nome = document.getElementById('nome-investimento')?.value;
    const valor = parseFloat(document.getElementById('valor-investimento')?.value || 0);
    const moeda = document.getElementById('moeda-investimento')?.value || 'BRL';
    const data = document.getElementById('data-investimento')?.value;
    
    if (!tipo || !nome || !valor || !data) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    const cotacaoAtual = parseFloat(document.getElementById('cotacao-dolar')?.textContent) || 5.0;
    const valorEmReal = moeda === 'USD' ? valor * cotacaoAtual : valor;
    
    const investimento = {
        id: Date.now(),
        tipo,
        nome,
        valor,
        valorEmReal,
        moeda,
        cotacaoUsada: moeda === 'USD' ? cotacaoAtual : 1,
        data,
        dataRegistro: new Date().toLocaleDateString()
    };
    
    investimentos.unshift(investimento);
    localStorage.setItem('investimentos', JSON.stringify(investimentos));
    
    renderInvestimentos();
    updateDashboard();
    e.target.reset();
    
    // Reset campo conversão
    const valorRealDisplay = document.getElementById('valor-real-display');
    if (valorRealDisplay) {
        valorRealDisplay.value = '';
    }
    
    console.log('✅ Investimento adicionado:', investimento);
}

function renderInvestimentos() {
    const lista = document.getElementById('lista-investimentos');
    if (!lista) return;
    
    const totalInvestimentos = investimentos.reduce((sum, i) => sum + i.valorEmReal, 0);
    
    const totalInvestimentosEl = document.getElementById('total-investimentos');
    if (totalInvestimentosEl) {
        totalInvestimentosEl.textContent = `R$ ${totalInvestimentos.toFixed(2)}`;
    }
    
    if (investimentos.length === 0) {
        lista.innerHTML = '<p class="empty-message">Nenhum investimento registrado ainda.</p>';
        return;
    }
    
    lista.innerHTML = investimentos.map(investimento => `
        <div class="investment-item">
            <div class="item-info">
                <div class="item-title">${investimento.nome}</div>
                <div class="item-details">
                    ${getTipoInvestimentoText(investimento.tipo)} • ${formatarData(investimento.data)}
                    ${investimento.moeda === 'USD' ? `<br>US$ ${investimento.valor.toFixed(2)} (Cotação: R$ ${investimento.cotacaoUsada.toFixed(2)})` : ''}
                    <br>${investimento.dataRegistro}
                </div>
            </div>
            <div class="item-value" style="color: #3b82f6">
                R$ ${investimento.valorEmReal.toFixed(2)}
            </div>
            <div class="item-actions">
                <button class="btn btn--danger" onclick="removerInvestimento(${investimento.id})" title="Remover">🗑️</button>
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
        'exterior': '🌎 Exterior',
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

// ========== DIVIDENDOS ==========
function handleDividendos(e) {
    e.preventDefault();
    
    const ativo = document.getElementById('ativo-dividendo')?.value;
    const tipo = document.getElementById('tipo-dividendo')?.value;
    const valor = parseFloat(document.getElementById('valor-dividendo')?.value || 0);
    const data = document.getElementById('data-dividendo')?.value;
    
    if (!ativo || !tipo || !valor || !data) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    const dividendo = {
        id: Date.now(),
        ativo: ativo.toUpperCase(),
        tipo,
        valor,
        data,
        dataRegistro: new Date().toLocaleDateString()
    };
    
    dividendos.unshift(dividendo);
    localStorage.setItem('dividendos', JSON.stringify(dividendos));
    
    renderDividendos();
    e.target.reset();
    
    console.log('✅ Dividendo registrado:', dividendo);
}

function renderDividendos() {
    const lista = document.getElementById('lista-dividendos');
    if (!lista) return;
    
    const totalDividendos = dividendos.reduce((sum, d) => sum + d.valor, 0);
    
    const totalDividendosEl = document.getElementById('total-dividendos');
    if (totalDividendosEl) {
        totalDividendosEl.textContent = `R$ ${totalDividendos.toFixed(2)}`;
    }
    
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
                <button class="btn btn--danger" onclick="removerDividendo(${dividendo.id})" title="Remover">🗑️</button>
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

// ========== EMOÇÕES ==========
function handleEmocoes(e) {
    e.preventDefault();
    
    const humor = document.getElementById('humor-emocao')?.value;
    const energia = document.getElementById('energia-emocao')?.value;
    const nota = document.getElementById('nota-emocao')?.value;
    
    if (!humor || !energia) {
        alert('Por favor, selecione seu humor e nível de energia.');
        return;
    }
    
    const registro = {
        id: Date.now(),
        humor,
        energia,
        nota: nota || '',
        data: new Date().toLocaleDateString()
    };
    
    registrosEmocoes.unshift(registro);
    localStorage.setItem('registrosEmocoes', JSON.stringify(registrosEmocoes));
    
    renderEmocoes();
    e.target.reset();
    
    console.log('✅ Estado emocional registrado:', registro);
}

function renderEmocoes() {
    const lista = document.getElementById('lista-emocoes');
    if (!lista) return;
    
    if (registrosEmocoes.length === 0) {
        lista.innerHTML = '<p class="empty-message">Nenhum registro emocional ainda. Comece hoje!</p>';
        return;
    }
    
    lista.innerHTML = registrosEmocoes.map(registro => `
        <div class="emotion-item">
            <div class="item-info">
                <div class="item-title">${getHumorText(registro.humor)} • ${getEnergiaText(registro.energia)}</div>
                <div class="item-details">
                    ${registro.nota ? `"${registro.nota}"` : 'Sem observações'} • ${registro.data}
                </div>
            </div>
            <div class="item-actions">
                <button class="btn btn--danger" onclick="removerRegistroEmocao(${registro.id})" title="Remover">🗑️</button>
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

// ========== DASHBOARD ==========
function updateDashboard() {
    updateMetricas();
    setTimeout(() => {
        updateCharts();
    }, 100);
}

function updateMetricas() {
    // Saldo atual (mês atual)
    const mesAtual = new Date().getMonth() + 1;
    const anoAtual = new Date().getFullYear();
    
    const transacoesMesAtual = transacoes.filter(t => t.mes === mesAtual && t.ano === anoAtual);
    const totalReceitas = transacoesMesAtual.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + t.valor, 0);
    const totalDespesas = transacoesMesAtual.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + t.valor, 0);
    const totalCartao = gastosCartao.reduce((sum, g) => sum + g.valor, 0);
    const saldo = totalReceitas - totalDespesas - totalCartao;
    
    const saldoAtualEl = document.getElementById('saldo-atual');
    if (saldoAtualEl) {
        saldoAtualEl.textContent = `R$ ${saldo.toFixed(2)}`;
        saldoAtualEl.style.color = saldo >= 0 ? '#10b981' : '#ef4444';
    }
    
    // Gastos do mês
    const gastosMes = totalDespesas + totalCartao;
    const gastosMesEl = document.getElementById('gastos-mes');
    if (gastosMesEl) {
        gastosMesEl.textContent = `R$ ${gastosMes.toFixed(2)}`;
    }
    
    // Total investido
    const totalInvestido = investimentos.reduce((sum, i) => sum + i.valorEmReal, 0);
    const totalInvestidoEl = document.getElementById('total-investido');
    if (totalInvestidoEl) {
        totalInvestidoEl.textContent = `R$ ${totalInvestido.toFixed(2)}`;
    }
    
    // Calorias hoje
    const hoje = new Date().toLocaleDateString();
    const caloriasHoje = registrosCalorias.filter(r => r.data === hoje).reduce((sum, r) => sum + r.totalCalorias, 0);
    const caloriasHojeEl = document.getElementById('calorias-hoje');
    if (caloriasHojeEl) {
        caloriasHojeEl.textContent = `${Math.round(caloriasHoje)} kcal`;
    }
}

function updateCharts() {
    updateReceitaDespesaChart();
    updateGastosChart();
}

function updateReceitaDespesaChart() {
    const ctx = document.getElementById('receitaDespesaChart');
    if (!ctx) return;
    
    // Destruir gráfico anterior
    if (receitaDespesaChart) {
        receitaDespesaChart.destroy();
    }
    
    const mesAtual = new Date().getMonth() + 1;
    const anoAtual = new Date().getFullYear();
    
    const transacoesMesAtual = transacoes.filter(t => t.mes === mesAtual && t.ano === anoAtual);
    const totalReceitas = transacoesMesAtual.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + t.valor, 0);
    const totalDespesas = transacoesMesAtual.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + t.valor, 0);
    const totalCartao = gastosCartao.reduce((sum, g) => sum + g.valor, 0);
    
    receitaDespesaChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Receitas', 'Despesas', 'Cartão'],
            datasets: [{
                data: [totalReceitas, totalDespesas, totalCartao],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ],
                borderColor: [
                    'rgba(16, 185, 129, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(245, 158, 11, 1)'
                ],
                borderWidth: 1,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toLocaleString('pt-BR');
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
    
    // Destruir gráfico anterior
    if (gastosChart) {
        gastosChart.destroy();
    }
    
    // Agregar gastos por categoria
    const gastosPorCategoria = {};
    
    const mesAtual = new Date().getMonth() + 1;
    const anoAtual = new Date().getFullYear();
    
    const transacoesMesAtual = transacoes.filter(t => t.mes === mesAtual && t.ano === anoAtual);
    
    transacoesMesAtual.filter(t => t.tipo === 'despesa').forEach(t => {
        const categoria = t.categoria || 'outros';
        gastosPorCategoria[categoria] = (gastosPorCategoria[categoria] || 0) + t.valor;
    });
    
    gastosCartao.forEach(g => {
        const categoria = g.categoria || 'outros';
        gastosPorCategoria[categoria] = (gastosPorCategoria[categoria] || 0) + g.valor;
    });
    
    const labels = Object.keys(gastosPorCategoria);
    const data = Object.values(gastosPorCategoria);
    
    if (labels.length === 0) {
        ctx.getContext('2d').clearRect(0, 0, ctx.width, ctx.height);
        const context = ctx.getContext('2d');
        context.font = '16px Arial';
        context.textAlign = 'center';
        context.fillText('Nenhum gasto registrado', ctx.width / 2, ctx.height / 2);
        return;
    }
    
    gastosChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels.map(label => label.charAt(0).toUpperCase() + label.slice(1)),
            datasets: [{
                data,
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(20, 184, 166, 0.8)',
                    'rgba(249, 115, 22, 0.8)'
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(236, 72, 153, 1)',
                    'rgba(20, 184, 166, 1)',
                    'rgba(249, 115, 22, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// ========== UTILIDADES ==========
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function showNotification(message, type = 'success') {
    console.log(`${type.toUpperCase()}: ${message}`);
}

// ========== LOG INICIAL ==========
console.log('🎉 Controle Pessoal Pro carregado com sucesso!');
console.log('📱 Versão mobile otimizada');
console.log('💾 Dados salvos localmente no navegador');
