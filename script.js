// Navegação entre páginas
        document.addEventListener('DOMContentLoaded', function() {
            // Menu mobile
            document.querySelector('.mobile-menu').addEventListener('click', function() {
                document.querySelector('nav').classList.toggle('active');
            });
            
            // Navegação entre páginas
            const pageLinks = document.querySelectorAll('[data-page]');
            const pages = document.querySelectorAll('.page');
            
            pageLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Fechar menu mobile se estiver aberto
                    document.querySelector('nav').classList.remove('active');
                    
                    const targetPage = this.getAttribute('data-page');
                    
                    // Esconder todas as páginas
                    pages.forEach(page => {
                        page.classList.remove('active');
                    });
                    
                    // Mostrar a página alvo
                    document.getElementById(targetPage).classList.add('active');
                    
                    // Atualizar a URL (sem recarregar a página)
                    window.history.pushState({}, '', `#${targetPage}`);
                });
            });
            
            // Simulação de cálculo de financiamento
            document.getElementById('calculate-btn').addEventListener('click', function() {
                const vehiclePrice = parseFloat(document.getElementById('vehicle-price').value);
                const downPayment = parseFloat(document.getElementById('down-payment').value);
                const installments = parseInt(document.getElementById('installments').value);
                const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
                
                const financedAmount = vehiclePrice - downPayment;
                const monthlyRate = interestRate;
                
                // Cálculo da parcela (sistema price)
                const monthlyPayment = financedAmount * (monthlyRate * Math.pow(1 + monthlyRate, installments)) / (Math.pow(1 + monthlyRate, installments) - 1);
                const totalAmount = monthlyPayment * installments;
                const totalInterest = totalAmount - financedAmount;
                
                // Atualizar os resultados
                document.getElementById('monthly-payment').textContent = 'R$ ' + monthlyPayment.toFixed(2).replace('.', ',');
                document.getElementById('total-amount').textContent = 'Total financiado: R$ ' + financedAmount.toFixed(2).replace('.', ',');
                document.getElementById('total-interest').textContent = 'Total de juros: R$ ' + totalInterest.toFixed(2).replace('.', ',');
            });
            
            // Verificar hash na URL para carregar a página correta
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                // Esconder todas as páginas
                pages.forEach(page => {
                    page.classList.remove('active');
                });
                
                // Mostrar a página do hash
                document.getElementById(hash).classList.add('active');
            }
            
            // Prevenir envio de formulários (apenas para demonstração)
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Formulário enviado com sucesso! (Esta é uma demonstração)');
                });
            });
        });