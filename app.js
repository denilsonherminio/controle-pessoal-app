// Aplicação de Controle Financeiro Pessoal
class FinancialApp {
    constructor() {
        this.initializeData();
        this.initializeNavigation();
        this.initializeEventListeners();
        this.loadCurrentData();
        this.updateDashboard();
        this.updateFluxoCaixa();
        this.updateCartaoCredito();
        this.updateInvestimentos();
        this.updateCalorias();
    }

    initializeData() {
        // Dados das categorias de mercado
        this.categoriasMercado = {
            "hortifruti": ["Banana", "Maçã", "Laranja", "Tomate", "Cebola", "Alho", "Batata", "Cenoura", "Alface", "Brócolis"],
            "acougue": ["Frango", "Carne Bovina", "Carne Suína", "Peixe", "Linguiça", "Bacon"],
            "laticinios": ["Leite", "Queijo", "Iogurte", "Manteiga", "Cream Cheese", "Requeijão"],
            "padaria": ["Pão Francês", "Pão de Forma", "Croissant", "Bolo", "Biscoito"],
            "mercearia": ["Arroz", "Feijão", "Óleo", "Açúcar", "Sal", "Macarrão", "Molho de Tomate"],
            "limpeza": ["Detergente", "Sabão em Pó", "Desinfetante", "Amaciante", "Esponja"],
            "higiene": ["Shampoo", "Condicionador", "Sabonete", "Pasta de Dente", "Papel Higiênico"],
            "bebidas": ["Refrigerante", "Suco", "Cerveja", "Vinho", "Água"],
            "outros": ["Pilha", "Lâmpada", "Remédio", "Diversos"]
        };

        // Categorias de gastos
        this.categoriasGastos = ["Alimentação", "Transporte", "Lazer", "Saúde", "Casa", "Educação", "Compras", "Outros"];

        // Dados iniciais
        this.fluxoCaixa = {
            "2025": {
                "8": {
                    "receitas": [
                        {"id": 1, "descricao": "Salário", "valor": 12374.65, "data": "2025-08-15"},
                        {"id": 2, "descricao": "Salário", "valor": 7064.95, "data": "2025-08-30"}
                    ],
                    "despesas": [
                        {"id": 1, "categoria": "Casa", "descricao": "Aluguel", "valor": 4570.01, "data": "2025-08-05"},
                        {"id": 2, "categoria": "Casa", "descricao": "Condomínio", "valor": 1348.62, "data": "2025-08-05"},
                        {"id": 3, "categoria": "Casa", "descricao": "Luz", "valor": 206.42, "data": "2025-08-10"},
                        {"id": 4, "categoria": "Transporte", "descricao": "Transporte QMC", "valor": 120.00, "data": "2025-08-01"},
                        {"id": 5, "categoria": "Saúde", "descricao": "Academia", "valor": 720.00, "data": "2025-08-15"}
                    ],
                    "investimentos": [
                        {"id": 1, "descricao": "Investimento", "valor": 2200.00, "data": "2025-08-15"},
                        {"id": 2, "descricao": "Investimento", "valor": 800.00, "data": "2025-08-30"}
                    ]
                }
            }
        };

        this.cartaoCredito = [];
        this.listaMercado = [];
        this.investimentos = [];
        this.calorias = [];
        this.cotacaoDolar = 5.43;

        // Contadores para IDs únicos
        this.nextId = {
            fluxo: 10,
            cartao: 1,
            mercado: 1,
            investimento: 1,
            caloria: 1
        };

        this.currentTab = 'dashboard';
    }

    initializeNavigation() {
        // Sistema de navegação personalizado
        const tabButtons = document.querySelectorAll('#mainTabs button');
        const tabPanes = document.querySelectorAll('.tab-pane');

        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = button.getAttribute('data-bs-target').replace('#', '');
                this.showTab(targetId);
            });
        });

        // Mostrar a primeira aba por padrão
        this.showTab('dashboard');
    }

    showTab(tabId) {
        // Esconder todas as abas
        const tabPanes = document.querySelectorAll('.tab-pane');
        const tabButtons = document.querySelectorAll('#mainTabs button');
        
        tabPanes.forEach(pane => {
            pane.classList.remove('show', 'active');
        });
        
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        // Mostrar a aba selecionada
        const targetPane = document.getElementById(tabId);
        const targetButton = document.querySelector(`[data-bs-target="#${tabId}"]`);
        
        if (targetPane) {
            targetPane.classList.add('show', 'active');
        }
        
        if (targetButton) {
            targetButton.classList.add('active');
        }

        this.currentTab = tabId;

        // Atualizar dados da aba específica
        this.updateTabData(tabId);
    }

    updateTabData(tabId) {
        switch(tabId) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'fluxo-caixa':
                this.updateFluxoCaixa();
                break;
            case 'cartao-credito':
                this.updateCartaoCredito();
                break;
            case 'lista-mercado':
                this.updateListaMercado();
                break;
            case 'investimentos':
                this.updateInvestimentos();
                break;
            case 'calorias':
                this.updateCalorias();
                break;
        }
    }

    initializeEventListeners() {
        // Aguardar o DOM estar completamente carregado
        setTimeout(() => {
            // Navegação entre meses
            const anoSelect = document.getElementById('ano-select');
            const mesSelect = document.getElementById('mes-select');
            if (anoSelect) anoSelect.addEventListener('change', () => this.updateFluxoCaixa());
            if (mesSelect) mesSelect.addEventListener('change', () => this.updateFluxoCaixa());

            // Formulário de novo lançamento
            const lancamentoForm = document.getElementById('lancamento-form');
            if (lancamentoForm) {
                lancamentoForm.addEventListener('submit', (e) => this.handleNovoLancamento(e));
            }
            
            const lancamentoTipo = document.getElementById('lancamento-tipo');
            if (lancamentoTipo) {
                lancamentoTipo.addEventListener('change', (e) => this.toggleCategoriaField(e));
            }

            // Formulário de cartão de crédito
            const cartaoForm = document.getElementById('cartao-form');
            if (cartaoForm) {
                cartaoForm.addEventListener('submit', (e) => this.handleNovoGastoCartao(e));
            }
            
            const cartaoValor = document.getElementById('cartao-valor');
            if (cartaoValor) {
                cartaoValor.addEventListener('input', () => this.calculateParcelaValue());
            }
            
            const cartaoParcelas = document.getElementById('cartao-parcelas');
            if (cartaoParcelas) {
                cartaoParcelas.addEventListener('change', () => this.calculateParcelaValue());
            }

            // Formulário de lista de mercado
            const mercadoForm = document.getElementById('mercado-form');
            if (mercadoForm) {
                mercadoForm.addEventListener('submit', (e) => this.handleNovoItemMercado(e));
            }
            
            const mercadoCategoria = document.getElementById('mercado-categoria');
            if (mercadoCategoria) {
                mercadoCategoria.addEventListener('change', (e) => this.updateItensCategoria(e));
            }
            
            const finalizarCompras = document.getElementById('finalizar-compras');
            if (finalizarCompras) {
                finalizarCompras.addEventListener('click', () => this.finalizarCompras());
            }

            // Formulário de investimentos
            const investimentoForm = document.getElementById('investimento-form');
            if (investimentoForm) {
                investimentoForm.addEventListener('submit', (e) => this.handleNovoInvestimento(e));
            }

            // Formulário de calorias
            const caloriaForm = document.getElementById('caloria-form');
            if (caloriaForm) {
                caloriaForm.addEventListener('submit', (e) => this.handleNovaCaloria(e));
            }

            // Popula campos de categoria
            this.populateCategoriaSelects();

            // Define data atual nos campos de data
            this.setCurrentDate();
        }, 100);
    }

    populateCategoriaSelects() {
        const selects = ['cartao-categoria', 'lancamento-categoria'];
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                // Limpar opções existentes (exceto a primeira)
                while (select.children.length > 1) {
                    select.removeChild(select.lastChild);
                }
                
                this.categoriasGastos.forEach(categoria => {
                    const option = document.createElement('option');
                    option.value = categoria;
                    option.textContent = categoria;
                    select.appendChild(option);
                });
            }
        });
    }

    setCurrentDate() {
        const today = new Date().toISOString().split('T')[0];
        const dateInputs = ['cartao-data', 'lancamento-data', 'investimento-data'];
        dateInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.value = today;
            }
        });
    }

    loadCurrentData() {
        // Carrega dados do mês atual
        const currentYear = "2025";
        const currentMonth = "8";
        
        if (!this.fluxoCaixa[currentYear]) {
            this.fluxoCaixa[currentYear] = {};
        }
        if (!this.fluxoCaixa[currentYear][currentMonth]) {
            this.fluxoCaixa[currentYear][currentMonth] = {
                receitas: [],
                despesas: [],
                investimentos: []
            };
        }
    }

    // =================== DASHBOARD ===================
    updateDashboard() {
        const currentYear = document.getElementById('ano-select')?.value || "2025";
        const currentMonth = document.getElementById('mes-select')?.value || "8";
        
        const data = this.fluxoCaixa[currentYear]?.[currentMonth] || {receitas: [], despesas: [], investimentos: []};
        
        // Calcular valores
        const totalReceitas = data.receitas.reduce((sum, item) => sum + item.valor, 0);
        const totalDespesas = data.despesas.reduce((sum, item) => sum + item.valor, 0);
        const totalInvestimentos = data.investimentos.reduce((sum, item) => sum + item.valor, 0);
        const saldoAtual = totalReceitas - totalDespesas - totalInvestimentos;
        
        const totalInvestido = this.investimentos.reduce((sum, item) => sum + item.valor, 0);
        const caloriasHoje = this.calorias
            .filter(item => this.isToday(item.data))
            .reduce((sum, item) => sum + item.calorias, 0);

        // Atualizar cards
        const saldoAtualEl = document.getElementById('saldo-atual');
        const gastosMesEl = document.getElementById('gastos-mes');
        const totalInvestidoEl = document.getElementById('total-investido');
        const caloriasHojeEl = document.getElementById('calorias-hoje');
        
        if (saldoAtualEl) saldoAtualEl.textContent = this.formatCurrency(saldoAtual);
        if (gastosMesEl) gastosMesEl.textContent = this.formatCurrency(totalDespesas);
        if (totalInvestidoEl) totalInvestidoEl.textContent = this.formatCurrency(totalInvestido);
        if (caloriasHojeEl) caloriasHojeEl.textContent = `${caloriasHoje} kcal`;

        // Atualizar gráficos apenas se estiver na aba dashboard
        if (this.currentTab === 'dashboard') {
            setTimeout(() => this.updateDashboardCharts(data), 100);
        }
    }

    updateDashboardCharts(data) {
        // Gráfico Receitas vs Despesas
        const receitasDespesasCanvas = document.getElementById('receitasDespesasChart');
        if (!receitasDespesasCanvas) return;
        
        const receitasDespesasCtx = receitasDespesasCanvas.getContext('2d');
        
        if (this.receitasDespesasChart) {
            this.receitasDespesasChart.destroy();
        }

        const totalReceitas = data.receitas.reduce((sum, item) => sum + item.valor, 0);
        const totalDespesas = data.despesas.reduce((sum, item) => sum + item.valor, 0);

        this.receitasDespesasChart = new Chart(receitasDespesasCtx, {
            type: 'bar',
            data: {
                labels: ['Receitas', 'Despesas'],
                datasets: [{
                    data: [totalReceitas, totalDespesas],
                    backgroundColor: ['#1FB8CD', '#B4413C'],
                    borderColor: ['#1FB8CD', '#B4413C'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
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

        // Gráfico Distribuição de Gastos
        const distribuicaoCanvas = document.getElementById('distribuicaoGastosChart');
        if (!distribuicaoCanvas) return;
        
        const distribuicaoCtx = distribuicaoCanvas.getContext('2d');
        
        if (this.distribuicaoGastosChart) {
            this.distribuicaoGastosChart.destroy();
        }

        const gastosPorCategoria = {};
        data.despesas.forEach(despesa => {
            gastosPorCategoria[despesa.categoria] = (gastosPorCategoria[despesa.categoria] || 0) + despesa.valor;
        });

        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325'];
        
        this.distribuicaoGastosChart = new Chart(distribuicaoCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(gastosPorCategoria),
                datasets: [{
                    data: Object.values(gastosPorCategoria),
                    backgroundColor: colors.slice(0, Object.keys(gastosPorCategoria).length),
                    borderColor: colors.slice(0, Object.keys(gastosPorCategoria).length),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }

    // =================== FLUXO DE CAIXA ===================
    updateFluxoCaixa() {
        const currentYear = document.getElementById('ano-select')?.value || "2025";
        const currentMonth = document.getElementById('mes-select')?.value || "8";
        
        const data = this.fluxoCaixa[currentYear]?.[currentMonth] || {receitas: [], despesas: [], investimentos: []};
        
        this.renderReceitas(data.receitas);
        this.renderDespesas(data.despesas);
        this.renderInvestimentosFluxo(data.investimentos);
        this.calculateSaldoDisponivel(data);
    }

    renderReceitas(receitas) {
        const container = document.getElementById('receitas-lista');
        if (!container) return;
        
        const total = receitas.reduce((sum, item) => sum + item.valor, 0);
        
        container.innerHTML = receitas.map(receita => `
            <div class="list-item">
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>${receita.descricao}</strong>
                        <div class="text-muted small">${this.formatDate(receita.data)}</div>
                    </div>
                    <div class="value-positive">${this.formatCurrency(receita.valor)}</div>
                </div>
            </div>
        `).join('');

        const totalReceitasEl = document.getElementById('total-receitas');
        if (totalReceitasEl) totalReceitasEl.textContent = this.formatCurrency(total);
    }

    renderDespesas(despesas) {
        const container = document.getElementById('despesas-lista');
        if (!container) return;
        
        const total = despesas.reduce((sum, item) => sum + item.valor, 0);
        
        container.innerHTML = despesas.map(despesa => `
            <div class="list-item">
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>${despesa.descricao}</strong>
                        <div class="category-badge">${despesa.categoria}</div>
                        <div class="text-muted small">${this.formatDate(despesa.data)}</div>
                    </div>
                    <div class="value-negative">${this.formatCurrency(despesa.valor)}</div>
                </div>
            </div>
        `).join('');

        const totalDespesasEl = document.getElementById('total-despesas');
        if (totalDespesasEl) totalDespesasEl.textContent = this.formatCurrency(total);
    }

    renderInvestimentosFluxo(investimentos) {
        const container = document.getElementById('investimentos-lista');
        if (!container) return;
        
        const total = investimentos.reduce((sum, item) => sum + item.valor, 0);
        
        container.innerHTML = investimentos.map(investimento => `
            <div class="list-item">
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>${investimento.descricao}</strong>
                        <div class="text-muted small">${this.formatDate(investimento.data)}</div>
                    </div>
                    <div class="value-neutral">${this.formatCurrency(investimento.valor)}</div>
                </div>
            </div>
        `).join('');

        const totalInvestimentosEl = document.getElementById('total-investimentos');
        if (totalInvestimentosEl) totalInvestimentosEl.textContent = this.formatCurrency(total);
    }

    calculateSaldoDisponivel(data) {
        const totalReceitas = data.receitas.reduce((sum, item) => sum + item.valor, 0);
        const totalDespesas = data.despesas.reduce((sum, item) => sum + item.valor, 0);
        const totalInvestimentos = data.investimentos.reduce((sum, item) => sum + item.valor, 0);
        const saldo = totalReceitas - totalDespesas - totalInvestimentos;
        
        const element = document.getElementById('saldo-disponivel');
        if (element) {
            element.textContent = this.formatCurrency(saldo);
            element.className = saldo >= 0 ? 'text-center mb-0 value-positive' : 'text-center mb-0 value-negative';
        }
    }

    handleNovoLancamento(e) {
        e.preventDefault();
        
        const tipo = document.getElementById('lancamento-tipo').value;
        const categoria = document.getElementById('lancamento-categoria').value;
        const descricao = document.getElementById('lancamento-descricao').value;
        const valor = parseFloat(document.getElementById('lancamento-valor').value);
        const data = document.getElementById('lancamento-data').value;
        
        const currentYear = document.getElementById('ano-select')?.value || "2025";
        const currentMonth = document.getElementById('mes-select')?.value || "8";
        
        if (!this.fluxoCaixa[currentYear]) {
            this.fluxoCaixa[currentYear] = {};
        }
        if (!this.fluxoCaixa[currentYear][currentMonth]) {
            this.fluxoCaixa[currentYear][currentMonth] = {receitas: [], despesas: [], investimentos: []};
        }
        
        const lancamento = {
            id: this.nextId.fluxo++,
            descricao,
            valor,
            data
        };
        
        if (tipo === 'despesa') {
            lancamento.categoria = categoria;
        }
        
        this.fluxoCaixa[currentYear][currentMonth][tipo === 'receita' ? 'receitas' : tipo === 'despesa' ? 'despesas' : 'investimentos'].push(lancamento);
        
        this.updateFluxoCaixa();
        this.updateDashboard();
        
        // Fechar modal e limpar form
        const modal = document.getElementById('novoLancamentoModal');
        if (modal && window.bootstrap) {
            const bsModal = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal);
            bsModal.hide();
        }
        document.getElementById('lancamento-form').reset();
        
        alert('Lançamento adicionado com sucesso!');
    }

    toggleCategoriaField(e) {
        const categoriaField = document.getElementById('categoria-despesa');
        if (categoriaField) {
            categoriaField.style.display = e.target.value === 'despesa' ? 'block' : 'none';
        }
        
        if (e.target.value !== 'despesa') {
            const categoriaSelect = document.getElementById('lancamento-categoria');
            if (categoriaSelect) categoriaSelect.value = '';
        }
    }

    // =================== CARTÃO DE CRÉDITO ===================
    calculateParcelaValue() {
        const valor = parseFloat(document.getElementById('cartao-valor')?.value) || 0;
        const parcelas = parseInt(document.getElementById('cartao-parcelas')?.value) || 1;
        const valorParcela = valor / parcelas;
        
        const valorParcelaEl = document.getElementById('valor-parcela');
        if (valorParcelaEl) {
            valorParcelaEl.value = this.formatCurrency(valorParcela);
        }
    }

    handleNovoGastoCartao(e) {
        e.preventDefault();
        
        const data = document.getElementById('cartao-data').value;
        const categoria = document.getElementById('cartao-categoria').value;
        const valor = parseFloat(document.getElementById('cartao-valor').value);
        const parcelas = parseInt(document.getElementById('cartao-parcelas').value);
        const estabelecimento = document.getElementById('cartao-estabelecimento').value;
        
        const gasto = {
            id: this.nextId.cartao++,
            data,
            categoria,
            valor,
            parcelas,
            estabelecimento,
            valorParcela: valor / parcelas
        };
        
        this.cartaoCredito.push(gasto);
        
        // Adicionar parcelas automaticamente no fluxo de caixa
        this.addParcelasToFluxoCaixa(gasto);
        
        this.updateCartaoCredito();
        this.updateFluxoCaixa();
        this.updateDashboard();
        
        document.getElementById('cartao-form').reset();
        
        alert('Gasto adicionado com sucesso! As parcelas foram lançadas automaticamente no fluxo de caixa.');
    }

    addParcelasToFluxoCaixa(gasto) {
        const dataInicial = new Date(gasto.data);
        
        for (let i = 0; i < gasto.parcelas; i++) {
            const dataVencimento = new Date(dataInicial);
            dataVencimento.setMonth(dataVencimento.getMonth() + i);
            
            const ano = dataVencimento.getFullYear().toString();
            const mes = (dataVencimento.getMonth() + 1).toString();
            
            if (!this.fluxoCaixa[ano]) {
                this.fluxoCaixa[ano] = {};
            }
            if (!this.fluxoCaixa[ano][mes]) {
                this.fluxoCaixa[ano][mes] = {receitas: [], despesas: [], investimentos: []};
            }
            
            const parcela = {
                id: this.nextId.fluxo++,
                categoria: gasto.categoria,
                descricao: `${gasto.estabelecimento} - Parcela ${i + 1}/${gasto.parcelas}`,
                valor: gasto.valorParcela,
                data: dataVencimento.toISOString().split('T')[0],
                origem: 'cartao'
            };
            
            this.fluxoCaixa[ano][mes].despesas.push(parcela);
        }
    }

    updateCartaoCredito() {
        const totalAtual = this.cartaoCredito.reduce((sum, gasto) => sum + gasto.valor, 0);
        const proximasParcelas = this.cartaoCredito.reduce((sum, gasto) => {
            return sum + (gasto.valorParcela * (gasto.parcelas - 1));
        }, 0);
        
        const totalAtualEl = document.getElementById('total-cartao-atual');
        const proximasParcelasEl = document.getElementById('proximas-parcelas');
        
        if (totalAtualEl) totalAtualEl.textContent = this.formatCurrency(totalAtual);
        if (proximasParcelasEl) proximasParcelasEl.textContent = this.formatCurrency(proximasParcelas);
        
        const container = document.getElementById('gastos-cartao-lista');
        if (container) {
            if (this.cartaoCredito.length === 0) {
                container.innerHTML = '<p class="text-muted text-center">Nenhum gasto registrado</p>';
            } else {
                container.innerHTML = this.cartaoCredito.map(gasto => `
                    <div class="list-item">
                        <div class="d-flex justify-content-between">
                            <div>
                                <strong>${gasto.estabelecimento}</strong>
                                <div class="category-badge">${gasto.categoria}</div>
                                <div class="text-muted small">${this.formatDate(gasto.data)} - ${gasto.parcelas}x ${this.formatCurrency(gasto.valorParcela)}</div>
                            </div>
                            <div class="value-negative">${this.formatCurrency(gasto.valor)}</div>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    // =================== LISTA DE MERCADO ===================
    updateItensCategoria(e) {
        const categoria = e.target.value;
        const select = document.getElementById('mercado-item-predefinido');
        
        if (!select) return;
        
        // Limpar opções existentes
        select.innerHTML = '<option value="">Selecione um item</option>';
        
        if (categoria && this.categoriasMercado[categoria]) {
            this.categoriasMercado[categoria].forEach(item => {
                const option = document.createElement('option');
                option.value = item;
                option.textContent = item;
                select.appendChild(option);
            });
        }
    }

    handleNovoItemMercado(e) {
        e.preventDefault();
        
        const categoria = document.getElementById('mercado-categoria').value;
        const itemPredefinido = document.getElementById('mercado-item-predefinido').value;
        const itemCustom = document.getElementById('mercado-item-custom').value;
        const quantidade = document.getElementById('mercado-quantidade').value;
        const valor = parseFloat(document.getElementById('mercado-valor').value) || 0;
        
        const item = itemPredefinido || itemCustom;
        
        if (!categoria || !item) {
            alert('Por favor, selecione uma categoria e um item.');
            return;
        }
        
        const novoItem = {
            id: this.nextId.mercado++,
            categoria,
            item,
            quantidade,
            valor,
            comprado: false
        };
        
        this.listaMercado.push(novoItem);
        this.updateListaMercado();
        
        document.getElementById('mercado-form').reset();
        const itemSelect = document.getElementById('mercado-item-predefinido');
        if (itemSelect) {
            itemSelect.innerHTML = '<option value="">Selecione um item</option>';
        }
        
        alert('Item adicionado à lista!');
    }

    updateListaMercado() {
        const container = document.getElementById('lista-compras');
        if (!container) return;
        
        const totalItens = this.listaMercado.length;
        const totalValor = this.listaMercado.reduce((sum, item) => sum + item.valor, 0);
        
        const totalItensEl = document.getElementById('total-itens');
        const totalListaEl = document.getElementById('total-lista');
        
        if (totalItensEl) totalItensEl.textContent = `${totalItens} itens`;
        if (totalListaEl) totalListaEl.textContent = this.formatCurrency(totalValor);
        
        if (totalItens === 0) {
            container.innerHTML = '<p class="text-muted text-center">Nenhum item adicionado</p>';
            return;
        }
        
        container.innerHTML = this.listaMercado.map(item => `
            <div class="shopping-item ${item.comprado ? 'completed' : ''}">
                <input type="checkbox" class="form-check-input" ${item.comprado ? 'checked' : ''} 
                       onchange="app.toggleItemComprado(${item.id})">
                <div class="shopping-item-content">
                    <div class="shopping-item-name">${item.item}</div>
                    <div class="shopping-item-details">
                        ${item.categoria} - ${item.quantidade}
                    </div>
                </div>
                <div class="shopping-item-price">${this.formatCurrency(item.valor)}</div>
            </div>
        `).join('');
    }

    toggleItemComprado(id) {
        const item = this.listaMercado.find(item => item.id === id);
        if (item) {
            item.comprado = !item.comprado;
            this.updateListaMercado();
        }
    }

    finalizarCompras() {
        const itensComprados = this.listaMercado.filter(item => item.comprado);
        
        if (itensComprados.length === 0) {
            alert('Nenhum item foi marcado como comprado.');
            return;
        }
        
        const hoje = new Date();
        
        // Se for até dia 9, lançar no próximo mês dia 15
        if (hoje.getDate() <= 9) {
            const proximoMes = new Date(hoje);
            proximoMes.setMonth(proximoMes.getMonth() + 1);
            proximoMes.setDate(15);
            
            const ano = proximoMes.getFullYear().toString();
            const mes = (proximoMes.getMonth() + 1).toString();
            
            if (!this.fluxoCaixa[ano]) {
                this.fluxoCaixa[ano] = {};
            }
            if (!this.fluxoCaixa[ano][mes]) {
                this.fluxoCaixa[ano][mes] = {receitas: [], despesas: [], investimentos: []};
            }
            
            const totalCompras = itensComprados.reduce((sum, item) => sum + item.valor, 0);
            
            if (totalCompras > 0) {
                const despesa = {
                    id: this.nextId.fluxo++,
                    categoria: 'Alimentação',
                    descricao: 'Compras do Mercado',
                    valor: totalCompras,
                    data: proximoMes.toISOString().split('T')[0],
                    origem: 'mercado'
                };
                
                this.fluxoCaixa[ano][mes].despesas.push(despesa);
            }
        }
        
        // Remover itens comprados da lista
        this.listaMercado = this.listaMercado.filter(item => !item.comprado);
        this.updateListaMercado();
        this.updateFluxoCaixa();
        this.updateDashboard();
        
        alert('Compras finalizadas! Itens comprados foram lançados automaticamente no fluxo de caixa.');
    }

    // =================== INVESTIMENTOS ===================
    handleNovoInvestimento(e) {
        e.preventDefault();
        
        const tipo = document.getElementById('investimento-tipo').value;
        const descricao = document.getElementById('investimento-descricao').value;
        const valor = parseFloat(document.getElementById('investimento-valor').value);
        const data = document.getElementById('investimento-data').value;
        
        const investimento = {
            id: this.nextId.investimento++,
            tipo,
            descricao,
            valor,
            data
        };
        
        this.investimentos.push(investimento);
        this.updateInvestimentos();
        this.updateDashboard();
        
        // Fechar modal e limpar form
        const modal = document.getElementById('novoInvestimentoModal');
        if (modal && window.bootstrap) {
            const bsModal = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal);
            bsModal.hide();
        }
        document.getElementById('investimento-form').reset();
        
        alert('Investimento adicionado com sucesso!');
    }

    updateInvestimentos() {
        const totalCarteira = this.investimentos.reduce((sum, inv) => sum + inv.valor, 0);
        const totalCarteiraEl = document.getElementById('total-carteira');
        if (totalCarteiraEl) {
            totalCarteiraEl.textContent = this.formatCurrency(totalCarteira);
        }
        
        const container = document.getElementById('investimentos-tabela');
        if (!container) return;
        
        if (this.investimentos.length === 0) {
            container.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Nenhum investimento cadastrado</td></tr>';
            return;
        }
        
        container.innerHTML = this.investimentos.map(inv => `
            <tr>
                <td>${inv.tipo}</td>
                <td>${inv.descricao}</td>
                <td>${this.formatCurrency(inv.valor)}</td>
                <td>${this.formatDate(inv.data)}</td>
            </tr>
        `).join('');
    }

    // =================== CALORIAS ===================
    handleNovaCaloria(e) {
        e.preventDefault();
        
        const refeicao = document.getElementById('refeicao').value;
        const alimento = document.getElementById('alimento').value;
        const calorias = parseInt(document.getElementById('calorias-alimento').value);
        
        const registro = {
            id: this.nextId.caloria++,
            refeicao,
            alimento,
            calorias,
            data: new Date().toISOString().split('T')[0]
        };
        
        this.calorias.push(registro);
        this.updateCalorias();
        this.updateDashboard();
        
        document.getElementById('caloria-form').reset();
        
        alert('Alimento registrado com sucesso!');
    }

    updateCalorias() {
        const caloriasHoje = this.calorias.filter(item => this.isToday(item.data));
        const totalCalorias = caloriasHoje.reduce((sum, item) => sum + item.calorias, 0);
        
        const totalCaloriasDiaEl = document.getElementById('total-calorias-dia');
        if (totalCaloriasDiaEl) {
            totalCaloriasDiaEl.textContent = `${totalCalorias} kcal`;
        }
        
        const container = document.getElementById('lista-calorias');
        if (!container) return;
        
        if (caloriasHoje.length === 0) {
            container.innerHTML = '<p class="text-muted text-center">Nenhum alimento registrado hoje</p>';
            return;
        }
        
        container.innerHTML = caloriasHoje.map(item => `
            <div class="calorie-item">
                <div>
                    <div class="meal-badge">${item.refeicao}</div>
                    <div><strong>${item.alimento}</strong></div>
                </div>
                <div class="value-positive">${item.calorias} kcal</div>
            </div>
        `).join('');
    }

    // =================== UTILITY FUNCTIONS ===================
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    isToday(dateString) {
        const today = new Date().toISOString().split('T')[0];
        return dateString === today;
    }
}

// Inicializar aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.app = new FinancialApp();
});