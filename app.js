// Arquivo para gerenciar cotação do dólar
let cotacaoDolar = 5.00; // Valor padrão

async function atualizarCotacao() {
    const botao = document.getElementById('atualizar-cotacao');
    const display = document.getElementById('cotacao-dolar');
    
    if (botao) {
        botao.textContent = '🔄 Atualizando...';
        botao.disabled = true;
    }
    
    try {
        const response = await fetch('https://api.awesomeapi.com.br/json/last/USD-BRL');
        const data = await response.json();
        
        if (data.USDBRL && data.USDBRL.bid) {
            cotacaoDolar = parseFloat(data.USDBRL.bid);
            if (display) {
                display.textContent = cotacaoDolar.toFixed(2);
            }
            
            // Salvar no localStorage
            localStorage.setItem('cotacaoDolar', cotacaoDolar.toString());
            localStorage.setItem('ultimaAtualizacaoCotacao', new Date().getTime().toString());
            
            console.log('Cotação atualizada:', cotacaoDolar);
        }
    } catch (error) {
        console.error('Erro ao buscar cotação:', error);
        // Usar cotação salva ou padrão
        const cotacaoSalva = localStorage.getItem('cotacaoDolar');
        if (cotacaoSalva) {
            cotacaoDolar = parseFloat(cotacaoSalva);
            if (display) {
                display.textContent = cotacaoDolar.toFixed(2);
            }
        }
    }
    
    if (botao) {
        botao.textContent = '🔄 Atualizar';
        botao.disabled = false;
    }
    
    // Atualizar campos de conversão se existirem
    atualizarConversaoMoeda();
}

function atualizarConversaoMoeda() {
    const valorInput = document.getElementById('valor-investimento');
    const moedaSelect = document.getElementById('moeda-investimento');
    const valorRealDisplay = document.getElementById('valor-real-display');
    
    if (valorInput && moedaSelect && valorRealDisplay) {
        const valor = parseFloat(valorInput.value) || 0;
        const moeda = moedaSelect.value;
        
        if (moeda === 'USD') {
            const valorEmReal = valor * cotacaoDolar;
            valorRealDisplay.value = `R$ ${valorEmReal.toFixed(2)}`;
        } else {
            valorRealDisplay.value = `R$ ${valor.toFixed(2)}`;
        }
    }
}

// Carregar cotação salva ao inicializar
function inicializarCotacao() {
    const cotacaoSalva = localStorage.getItem('cotacaoDolar');
    const ultimaAtualizacao = localStorage.getItem('ultimaAtualizacaoCotacao');
    
    if (cotacaoSalva) {
        cotacaoDolar = parseFloat(cotacaoSalva);
        const display = document.getElementById('cotacao-dolar');
        if (display) {
            display.textContent = cotacaoDolar.toFixed(2);
        }
    }
    
    // Verificar se precisa atualizar (mais de 1 hora)
    if (!ultimaAtualizacao || (new Date().getTime() - parseInt(ultimaAtualizacao)) > 3600000) {
        atualizarCotacao();
    }
}

// Função para converter valor conforme moeda
function converterParaReal(valor, moeda) {
    if (moeda === 'USD') {
        return valor * cotacaoDolar;
    }
    return valor;
}

// Inicializar quando DOM carregar
document.addEventListener('DOMContentLoaded', inicializarCotacao);
