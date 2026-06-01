import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

export async function loginUser(credentials) {
  return api.post('/auth/login', credentials).then(res => res.data);
}

export async function fetchCustomers() {
  return api.get('/customers').then(res => res.data);
}

export async function createCustomer(payload) {
  return api.post('/customers', payload).then(res => res.data);
}

export async function fetchProducts() {
  return api.get('/products').then(res => res.data);
}

export async function createProduct(payload) {
  return api.post('/products', payload).then(res => res.data);
}

export async function fetchSales() {
  return api.get('/sales').then(res => res.data);
}

export async function createSale(payload) {
  return api.post('/sales', payload).then(res => res.data);
}

export async function updateSale(invoiceNumber, payload) {
  return api.put(`/sales/${invoiceNumber}`, payload).then(res => res.data);
}

export async function deleteSale(invoiceNumber) {
  return api.delete(`/sales/${invoiceNumber}`).then(res => res.data);
}

export async function fetchSummary() {
  return api.get('/reports/summary').then(res => res.data);
}

export async function fetchDailyReport() {
  return api.get('/reports/daily').then(res => res.data);
}

export async function fetchWeeklyReport() {
  return api.get('/reports/weekly').then(res => res.data);
}

export async function fetchMonthlyReport() {
  return api.get('/reports/monthly').then(res => res.data);
}
