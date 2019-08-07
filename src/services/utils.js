export default {
  formatCurrency: function (num) {
    return '$' + Number(num.toFixed(1)).toLocaleString() + ' ';
  },
  baseUrl: function () {
    return 'http://localhost:8000/products';
  }
}