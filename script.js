        document.addEventListener('DOMContentLoaded', function() {
            const carrossel = document.querySelector('.carrossel');
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const indicadoresContainer = document.getElementById('indicadores');
            
            let currentIndex = 0;
            const totalSlides = slides.length;
            
            // Criar indicadores
            slides.forEach((_, index) => {
                const indicador = document.createElement('div');
                indicador.classList.add('indicador');
                if (index === 0) indicador.classList.add('ativo');
                indicador.addEventListener('click', () => goToSlide(index));
                indicadoresContainer.appendChild(indicador);
            });
            
            const indicadores = document.querySelectorAll('.indicador');
            
            // Função para atualizar o carrossel
            function updateCarrossel() {
                carrossel.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Atualizar indicadores
                indicadores.forEach((ind, index) => {
                    ind.classList.toggle('ativo', index === currentIndex);
                });
            }
            
            // Ir para slide específico
            function goToSlide(index) {
                currentIndex = index;
                updateCarrossel();
            }
            
            // Próximo slide
            function nextSlide() {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarrossel();
            }
            
            // Slide anterior
            function prevSlide() {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateCarrossel();
            }
            
            // Event listeners para os botões
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
            
            // Autoplay (opcional)
            let autoplay = setInterval(nextSlide, 5000);
            
            // Pausar autoplay quando o mouse estiver sobre o carrossel
            const carrosselContainer = document.querySelector('.carrossel-container');
            carrosselContainer.addEventListener('mouseenter', () => {
                clearInterval(autoplay);
            });
            
            carrosselContainer.addEventListener('mouseleave', () => {
                autoplay = setInterval(nextSlide, 5000);
            });
            
            // Navegação por teclado
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    nextSlide();
                } else if (e.key === 'ArrowLeft') {
                    prevSlide();
                }
            });

            // Redimensionamento da janela
            window.addEventListener('resize', () => {
                // Garante que o carrossel se ajuste ao novo tamanho da tela
                updateCarrossel();
            });
        });