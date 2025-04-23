// Sample data - In a real application, this would come from a database
const lotteryData = {
    hotNumbers: [7, 12, 23],
    coldNumbers: [3, 18, 29],
    frequencyData: {
        labels: Array.from({length: 49}, (_, i) => i + 1),
        data: Array.from({length: 49}, () => Math.floor(Math.random() * 100))
    }
};

// Initialize Chart when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('frequencyChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: lotteryData.frequencyData.labels,
            datasets: [{
                label: 'Frequency of Numbers',
                data: lotteryData.frequencyData.data,
                backgroundColor: 'rgba(52, 152, 219, 0.5)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Update Hot & Cold Numbers
    document.getElementById('hotNumbers').innerHTML = lotteryData.hotNumbers
        .map(num => `<span class="hot-number mx-2">${num}</span>`)
        .join('');
    
    document.getElementById('coldNumbers').innerHTML = lotteryData.coldNumbers
        .map(num => `<span class="cold-number mx-2">${num}</span>`)
        .join('');
});

function generatePatterns() {
    const input = document.getElementById('inputNumber').value;
    if (!/^\d{6}$/.test(input)) {
        alert('Please enter a valid 6-digit number');
        return;
    }

    const patterns = calculatePatterns(input);
    displayPatterns(patterns);
}

function calculatePatterns(input) {
    const patterns = {
        plus: [input],
        minus: [input]
    };

    let currentPlus = input;
    let currentMinus = input;

    for (let i = 0; i < 5; i++) {
        // Calculate +1 pattern
        currentPlus = calculatePlusOne(currentPlus);
        patterns.plus.push(currentPlus);

        // Calculate -1 pattern
        currentMinus = calculateMinusOne(currentMinus);
        patterns.minus.push(currentMinus);
    }

    return patterns;
}

function calculatePlusOne(number) {
    return number.split('').map(digit => {
        const num = parseInt(digit);
        return num === 9 ? '0' : (num + 1).toString();
    }).join('');
}

function calculateMinusOne(number) {
    return number.split('').map(digit => {
        const num = parseInt(digit);
        return num === 0 ? '9' : (num - 1).toString();
    }).join('');
}

function displayPatterns(patterns) {
    const tbody = document.getElementById('patternTableBody');
    tbody.innerHTML = '';

    for (let i = 0; i < patterns.plus.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i}</td>
            <td>${patterns.plus[i]}</td>
            <td>${patterns.minus[i]}</td>
        `;
        tbody.appendChild(row);
    }
}

function searchNumber() {
    const searchNum = document.getElementById('searchNumber').value;
    if (!/^\d{6}$/.test(searchNum)) {
        alert('Please enter a valid 6-digit number');
        return;
    }

    const tbody = document.getElementById('patternTableBody');
    const rows = tbody.getElementsByTagName('tr');
    let found = false;

    for (const row of rows) {
        const cells = row.getElementsByTagName('td');
        if (cells[1].textContent === searchNum || cells[2].textContent === searchNum) {
            found = true;
            break;
        }
    }

    const resultDiv = document.getElementById('searchResult');
    if (found) {
        resultDiv.innerHTML = '<p class="match-found">✅ मिलान मिला!</p>';
    } else {
        resultDiv.innerHTML = '<p class="no-match">❌ कोई मिलान नहीं मिला</p>';
    }
} 