import { Product } from '../types';

export const categories = [
  'Semua',
  'Makanan',
  'Minuman',
  'Snack',
  'Kebutuhan Harian',
  'Dairy',
  'Bumbu & Saus',
  'Frozen Food',
];

export const products: Product[] = [
  // Makanan
  { id: '1', name: 'Indomie Goreng', price: 3500, category: 'Makanan', stock: 150, barcode: '8991234567001' },
  { id: '2', name: 'Indomie Kuah Soto', price: 3500, category: 'Makanan', stock: 120, barcode: '8991234567002' },
  { id: '3', name: 'Sedaap Goreng', price: 3200, category: 'Makanan', stock: 100, barcode: '8991234567003' },
  { id: '4', name: 'Beras Premium 5kg', price: 75000, category: 'Makanan', stock: 30, barcode: '8991234567004' },
  { id: '5', name: 'Minyak Goreng 2L', price: 35000, category: 'Makanan', stock: 45, barcode: '8991234567005' },
  { id: '6', name: 'Gula Pasir 1kg', price: 15000, category: 'Makanan', stock: 60, barcode: '8991234567006' },
  { id: '7', name: 'Kopi Kapal Api', price: 2500, category: 'Makanan', stock: 200, barcode: '8991234567007' },
  { id: '8', name: 'Roti Tawar Sari Roti', price: 18000, category: 'Makanan', stock: 25, barcode: '8991234567008' },
  
  // Minuman
  { id: '9', name: 'Aqua 600ml', price: 4000, category: 'Minuman', stock: 200, barcode: '8991234567009' },
  { id: '10', name: 'Teh Pucuk 350ml', price: 5000, category: 'Minuman', stock: 150, barcode: '8991234567010' },
  { id: '11', name: 'Coca Cola 390ml', price: 7500, category: 'Minuman', stock: 80, barcode: '8991234567011' },
  { id: '12', name: 'Sprite 390ml', price: 7500, category: 'Minuman', stock: 80, barcode: '8991234567012' },
  { id: '13', name: 'Pocari Sweat 500ml', price: 8000, category: 'Minuman', stock: 60, barcode: '8991234567013' },
  { id: '14', name: 'Ultra Milk 250ml', price: 5500, category: 'Minuman', stock: 100, barcode: '8991234567014' },
  { id: '15', name: 'Good Day Cappuccino', price: 5000, category: 'Minuman', stock: 90, barcode: '8991234567015' },
  { id: '16', name: 'Air Mineral Le Minerale', price: 4000, category: 'Minuman', stock: 180, barcode: '8991234567016' },

  // Snack
  { id: '17', name: 'Chitato Sapi Panggang', price: 10500, category: 'Snack', stock: 70, barcode: '8991234567017' },
  { id: '18', name: 'Qtela Coklat', price: 3000, category: 'Snack', stock: 120, barcode: '8991234567018' },
  { id: '19', name: 'Oreo Original', price: 8500, category: 'Snack', stock: 65, barcode: '8991234567019' },
  { id: '20', name: 'Taro Net', price: 6500, category: 'Snack', stock: 80, barcode: '8991234567020' },
  { id: '21', name: 'Tiger Wafer Coklat', price: 7000, category: 'Snack', stock: 55, barcode: '8991234567021' },
  { id: '22', name: 'Silverqueen Cashew', price: 17000, category: 'Snack', stock: 40, barcode: '8991234567022' },
  { id: '23', name: 'Pocky Strawberry', price: 9000, category: 'Snack', stock: 50, barcode: '8991234567023' },
  { id: '24', name: 'Cheezy Bubble', price: 5500, category: 'Snack', stock: 75, barcode: '8991234567024' },

  // Kebutuhan Harian
  { id: '25', name: 'Sabun Lifebuoy', price: 4500, category: 'Kebutuhan Harian', stock: 100, barcode: '8991234567025' },
  { id: '26', name: 'Shampoo Pantene', price: 25000, category: 'Kebutuhan Harian', stock: 30, barcode: '8991234567026' },
  { id: '27', name: 'Pasta Gigi Pepsodent', price: 12000, category: 'Kebutuhan Harian', stock: 50, barcode: '8991234567027' },
  { id: '28', name: 'Detergen Rinso 800g', price: 22000, category: 'Kebutuhan Harian', stock: 40, barcode: '8991234567028' },
  { id: '29', name: 'Tisu Paseo 250s', price: 11000, category: 'Kebutuhan Harian', stock: 60, barcode: '8991234567029' },
  { id: '30', name: 'Pembalut Laurier', price: 18000, category: 'Kebutuhan Harian', stock: 35, barcode: '8991234567030' },

  // Dairy
  { id: '31', name: 'Susu UHT Ultra 1L', price: 18000, category: 'Dairy', stock: 40, barcode: '8991234567031' },
  { id: '32', name: 'Yakult 5 pack', price: 12000, category: 'Dairy', stock: 50, barcode: '8991234567032' },
  { id: '33', name: 'Keju Kraft Slice', price: 28000, category: 'Dairy', stock: 25, barcode: '8991234567033' },
  { id: '34', name: 'Margarin Blueband', price: 15000, category: 'Dairy', stock: 35, barcode: '8991234567034' },
  { id: '35', name: 'Susu Kental Manis', price: 11000, category: 'Dairy', stock: 55, barcode: '8991234567035' },

  // Bumbu & Saus
  { id: '36', name: 'Kecap Manis ABC 600ml', price: 22000, category: 'Bumbu & Saus', stock: 30, barcode: '8991234567036' },
  { id: '37', name: 'Saus Sambal ABC', price: 13000, category: 'Bumbu & Saus', stock: 45, barcode: '8991234567037' },
  { id: '38', name: 'Saori Saus Tiram', price: 12000, category: 'Bumbu & Saus', stock: 40, barcode: '8991234567038' },
  { id: '39', name: 'Garam dapur 500g', price: 5000, category: 'Bumbu & Saus', stock: 80, barcode: '8991234567039' },
  { id: '40', name: 'Royco Kaldu Ayam', price: 8000, category: 'Bumbu & Saus', stock: 70, barcode: '8991234567040' },

  // Frozen Food
  { id: '41', name: 'Nugget So Good', price: 32000, category: 'Frozen Food', stock: 20, barcode: '8991234567041' },
  { id: '42', name: 'Sosis So Nice', price: 15000, category: 'Frozen Food', stock: 30, barcode: '8991234567042' },
  { id: '43', name: 'Bakso So Good', price: 28000, category: 'Frozen Food', stock: 25, barcode: '8991234567043' },
  { id: '44', name: 'Dimsum So Good', price: 35000, category: 'Frozen Food', stock: 15, barcode: '8991234567044' },
  { id: '45', name: 'Es Krim Walls', price: 25000, category: 'Frozen Food', stock: 20, barcode: '8991234567045' },
];
