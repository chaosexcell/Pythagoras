class PythagoreanTheoremSimulation {
    constructor() {
        this.canvas = document.getElementById('triangleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.sideA = 3;
        this.sideB = 4;
        this.sideC = 5;
        
        this.initializeControls();
        this.updateSimulation();
    }

    initializeControls() {
        const sideASlider = document.getElementById('sideA');
        const sideBSlider = document.getElementById('sideB');
        const sideCSlider = document.getElementById('sideC');

        sideASlider.addEventListener('input', (e) => {
            this.sideA = parseFloat(e.target.value);
            document.getElementById('sideAValue').textContent = this.sideA.toFixed(1);
            this.updateSimulation();
        });

        sideBSlider.addEventListener('input', (e) => {
            this.sideB = parseFloat(e.target.value);
            document.getElementById('sideBValue').textContent = this.sideB.toFixed(1);
            this.updateSimulation();
        });

        sideCSlider.addEventListener('input', (e) => {
            this.sideC = parseFloat(e.target.value);
            document.getElementById('sideCValue').textContent = this.sideC.toFixed(1);
            this.updateSimulation();
        });
    }

    updateSimulation() {
        this.drawTriangle();
        this.updateFormula();
        this.updateSquares();
        this.checkPythagoreanTheorem();
    }

    drawTriangle() {
        const ctx = this.ctx;
        const canvas = this.canvas;
        
        // 캔버스 초기화
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 스케일 계산 (캔버스에 맞게 삼각형 크기 조정)
        const maxSide = Math.max(this.sideA, this.sideB, this.sideC);
        const scale = Math.min(200 / maxSide, 150 / maxSide);
        
        const scaledA = this.sideA * scale;
        const scaledB = this.sideB * scale;
        const scaledC = this.sideC * scale;
        
        // 삼각형 위치 계산
        const startX = 100;
        const startY = canvas.height - 100;
        
        // 직각삼각형 그리기
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + scaledA, startY);
        ctx.lineTo(startX + scaledA, startY - scaledB);
        ctx.closePath();
        
        // 삼각형 채우기
        ctx.fillStyle = 'rgba(102, 126, 234, 0.2)';
        ctx.fill();
        
        // 삼각형 테두리
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // 직각 표시
        ctx.beginPath();
        ctx.moveTo(startX + scaledA - 15, startY - 15);
        ctx.lineTo(startX + scaledA - 15, startY);
        ctx.lineTo(startX + scaledA, startY);
        ctx.strokeStyle = '#ff6384';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 변 길이 표시
        ctx.font = '16px Arial';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        
        // 변 a (밑변)
        ctx.fillText(`a = ${this.sideA}`, startX + scaledA/2, startY + 25);
        
        // 변 b (높이)
        ctx.save();
        ctx.translate(startX + scaledA + 20, startY - scaledB/2);
        ctx.rotate(-Math.PI/2);
        ctx.fillText(`b = ${this.sideB}`, 0, 0);
        ctx.restore();
        
        // 변 c (빗변)
        ctx.save();
        ctx.translate(startX + scaledA/2 + 10, startY - scaledB/2 - 10);
        ctx.rotate(-Math.atan2(scaledB, scaledA));
        ctx.fillText(`c = ${this.sideC}`, 0, 0);
        ctx.restore();
        
        // 각 변에 색상 표시
        ctx.strokeStyle = '#ff6384';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + scaledA, startY);
        ctx.stroke();
        
        ctx.strokeStyle = '#36a2eb';
        ctx.beginPath();
        ctx.moveTo(startX + scaledA, startY);
        ctx.lineTo(startX + scaledA, startY - scaledB);
        ctx.stroke();
        
        ctx.strokeStyle = '#ffcd56';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + scaledA, startY - scaledB);
        ctx.stroke();
    }

    updateFormula() {
        const aSquared = this.sideA * this.sideA;
        const bSquared = this.sideB * this.sideB;
        const cSquared = this.sideC * this.sideC;
        
        document.getElementById('formulaA').textContent = `a² (${this.sideA}²)`;
        document.getElementById('formulaB').textContent = `b² (${this.sideB}²)`;
        document.getElementById('formulaC').textContent = `c² (${this.sideC}²)`;
        
        document.getElementById('calcA').textContent = aSquared.toFixed(1);
        document.getElementById('calcB').textContent = bSquared.toFixed(1);
        document.getElementById('calcC').textContent = cSquared.toFixed(1);
    }

    updateSquares() {
        const aSquared = this.sideA * this.sideA;
        const bSquared = this.sideB * this.sideB;
        const cSquared = this.sideC * this.sideC;
        
        document.getElementById('squareA').textContent = aSquared.toFixed(1);
        document.getElementById('squareB').textContent = bSquared.toFixed(1);
        document.getElementById('squareC').textContent = cSquared.toFixed(1);
        
        // 정사각형 크기 애니메이션
        const squares = document.querySelectorAll('.square');
        squares.forEach((square, index) => {
            const values = [aSquared, bSquared, cSquared];
            const size = Math.min(80, Math.max(40, 40 + values[index] * 2));
            square.style.width = size + 'px';
            square.style.height = size + 'px';
        });
    }

    checkPythagoreanTheorem() {
        const aSquared = this.sideA * this.sideA;
        const bSquared = this.sideB * this.sideB;
        const cSquared = this.sideC * this.sideC;
        
        const leftSide = aSquared + bSquared;
        const rightSide = cSquared;
        const difference = Math.abs(leftSide - rightSide);
        
        const resultElement = document.getElementById('result');
        
        // 오차 허용 범위 (부동소수점 오차 고려)
        if (difference < 0.1) {
            resultElement.textContent = `✓ 피타고라스 정리가 성립합니다! (오차: ${difference.toFixed(3)})`;
            resultElement.className = 'result success';
        } else {
            resultElement.textContent = `✗ 피타고라스 정리가 성립하지 않습니다. (오차: ${difference.toFixed(3)})`;
            resultElement.className = 'result error';
        }
    }
}

// 페이지 로드 시 시뮬레이션 시작
document.addEventListener('DOMContentLoaded', () => {
    new PythagoreanTheoremSimulation();
});

// 추가 기능: 자동 피타고라스 정리 계산
function calculateHypotenuse(a, b) {
    return Math.sqrt(a * a + b * b);
}

function calculateLeg(hypotenuse, leg) {
    return Math.sqrt(hypotenuse * hypotenuse - leg * leg);
}

// 키보드 단축키 추가
document.addEventListener('keydown', (e) => {
    const simulation = window.pythagoreanSimulation;
    if (!simulation) return;
    
    switch(e.key) {
        case '1':
            // 3-4-5 삼각형
            document.getElementById('sideA').value = 3;
            document.getElementById('sideB').value = 4;
            document.getElementById('sideC').value = 5;
            simulation.sideA = 3; simulation.sideB = 4; simulation.sideC = 5;
            simulation.updateSimulation();
            break;
        case '2':
            // 5-12-13 삼각형
            document.getElementById('sideA').value = 5;
            document.getElementById('sideB').value = 12;
            document.getElementById('sideC').value = 13;
            simulation.sideA = 5; simulation.sideB = 12; simulation.sideC = 13;
            simulation.updateSimulation();
            break;
        case '3':
            // 6-8-10 삼각형
            document.getElementById('sideA').value = 6;
            document.getElementById('sideB').value = 8;
            document.getElementById('sideC').value = 10;
            simulation.sideA = 6; simulation.sideB = 8; simulation.sideC = 10;
            simulation.updateSimulation();
            break;
    }
});

// 전역 변수로 시뮬레이션 인스턴스 저장
window.pythagoreanSimulation = null;

document.addEventListener('DOMContentLoaded', () => {
    window.pythagoreanSimulation = new PythagoreanTheoremSimulation();
}); 