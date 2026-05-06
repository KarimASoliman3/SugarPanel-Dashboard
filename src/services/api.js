const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const mockProducts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: ['Liam Anderson Red', 'Ava Reynolds Blue', 'Jackson White Blue', 'Bennett Reynolds Blue', 'Rue Reynolds Blue'][i % 5],
  revenue: `$${(1240 + Math.random() * 500).toFixed(2)}`,
  sales: Math.floor(1800 + Math.random() * 200),
  reviews: Math.floor(2900 + Math.random() * 300),
  views: Math.floor(3800 + Math.random() * 500),
  status: 'In Stock',
  active: true,
  image: `https://picsum.photos/seed/prod${i}/40/40`,
}));

const mockUsers = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: ['Ameerah Howard', 'Arthur Bell', 'Leslie Perez', 'Maria Chen', 'James Wilson'][i % 5],
  email: `user${i + 1}@sugarpanel.com`,
  role: ['Admin', 'Manager', 'Seller', 'Analyst'][i % 4],
  store: ['New York', 'Los Angeles', 'Chicago', 'Houston'][i % 4],
  status: i % 7 !== 0 ? 'Active' : 'Inactive',
  avatar: `https://i.pravatar.cc/40?img=${i + 1}`,
  joined: `Jan ${(i % 28) + 1}, 2025`,
}));

const mockStats = {
  grossRevenue: { value: '$2,480.32', change: '+8.32%', positive: true },
  avgOrderValue: { value: '$320.21', change: '-8.32%', positive: false },
  totalOrders: { value: '$1,899.49', change: '+8.32%', positive: true },
};

const mockTransactions = [
  { month: 'Jan', total: 400, success: 240 },
  { month: 'Feb', total: 300, success: 139 },
  { month: 'Mar', total: 600, success: 380 },
  { month: 'Apr', total: 800, success: 430 },
  { month: 'May', total: 500, success: 380 },
  { month: 'Jun', total: 900, success: 430 },
  { month: 'Jul', total: 700, success: 600 },
  { month: 'Aug', total: 400, success: 300 },
  { month: 'Sep', total: 600, success: 400 },
  { month: 'Oct', total: 800, success: 500 },
  { month: 'Nov', total: 500, success: 400 },
  { month: 'Dec', total: 700, success: 550 },
];

const mockSalePerf = [
  { month: 'Jan', value: 300 },
  { month: 'Feb', value: 500 },
  { month: 'Mar', value: 250 },
  { month: 'Apr', value: 600 },
  { month: 'May', value: 450 },
  { month: 'Jun', value: 700 },
  { month: 'Jul', value: 800 },
  { month: 'Aug', value: 500 },
  { month: 'Sep', value: 650 },
  { month: 'Oct', value: 400 },
  { month: 'Nov', value: 750 },
  { month: 'Dec', value: 900 },
];

const mockSchedule = [
  {
    id: 1,
    tag: "Product Design",
    color: "#E8F0FE",
    tagColor: "#4285F4",
    title: "Meeting with Arthur Bell",
    time: "09:00 - 09:45 AM (UTC)",
    attendees: 4,
  },
  {
    id: 2,
    tag: "Marketing Business",
    color: "#FFF3E0",
    tagColor: "#FF9800",
    title: "Meeting with Leslie Perez",
    time: "10:00 - 10:45 AM (UTC)",
    attendees: 3,
  },
  {
    id: 3,
    tag: "Brainstorming Session",
    color: "#FCE4EC",
    tagColor: "#E91E63",
    title: "Meeting with Leslie Perez",
    time: "11:00 - 11:45 AM (UTC)",
    attendees: 2,
  },
  {
    id: 4,
    tag: "Client Call",
    color: "#E8F5E9",
    tagColor: "#34A853",
    title: "Call with David Johnson",
    time: "12:00 - 12:30 PM (UTC)",
    attendees: 5,
  },
  {
    id: 5,
    tag: "UI Review",
    color: "#E3F2FD",
    tagColor: "#1E88E5",
    title: "Design Review Session",
    time: "01:00 - 01:45 PM (UTC)",
    attendees: 3,
  },
  {
    id: 6,
    tag: "Strategy Meeting",
    color: "#F3E5F5",
    tagColor: "#8E24AA",
    title: "Quarterly Planning",
    time: "02:00 - 02:45 PM (UTC)",
    attendees: 6,
  },
];

const mockStores = [
  { id: 1, name: 'New York Store', performance: 78, members: 12 },
  { id: 2, name: 'Los Angeles Store', performance: 76, members: 10 },
  { id: 3, name: 'Chicago Store', performance: 76, members: 12 },
  { id: 4, name: 'Houston Store', performance: 76, members: 13 },
];

const delay = (ms = 300) => new Promise(res => setTimeout(res, ms));

export const api = {
  async login(email, password) {
    await delay();
    if (email === 'admin@sugarpanel.com' && password === 'password') {
      return { token: 'mock-jwt-token-xyz', user: { name: 'Ameerah Howard', email, role: 'Admin', avatar: 'https://i.pravatar.cc/40?img=8' } };
    }
    throw new Error('Invalid credentials');
  },

  async getDashboardStats() {
    await delay();
    return mockStats;
  },

  async getTransactions() {
    await delay();
    return mockTransactions;
  },

  async getSalePerformance() {
    await delay();
    return mockSalePerf;
  },

  async getSchedule() {
    await delay();
    return mockSchedule;
  },

  async getStores() {
    await delay();
    return mockStores;
  },

  async getProducts(page = 1, limit = 10, search = '') {
    await delay();
    let filtered = mockProducts;
    if (search) filtered = mockProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    const total = filtered.length;
    const data = filtered.slice((page - 1) * limit, page * limit);
    return { data, total, page, limit };
  },

  async getProductById(id) {
    await delay();
    return mockProducts.find(p => p.id === Number(id)) || null;
  },

  async getUsers(page = 1, limit = 10, search = '') {
    await delay();
    let filtered = mockUsers;
    if (search) filtered = mockUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
    const total = filtered.length;
    const data = filtered.slice((page - 1) * limit, page * limit);
    return { data, total, page, limit };
  },

  async getUserById(id) {
    await delay();
    return mockUsers.find(u => u.id === Number(id)) || null;
  },
};
