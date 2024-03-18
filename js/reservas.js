var today = new Date().toISOString().split('T')[0];
document.getElementById('dia').setAttribute('min', today);
console.log(today);