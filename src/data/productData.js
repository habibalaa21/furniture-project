const products = [
  // =====================================================
  // LIVING ROOM
  // =====================================================

  {
    id: 1,
    name: "Modern Sofa",
    category: "Living Room",
    price: 499,
    oldPrice: 629,
    rating: 3.8,
    reviews: 128,
    image: "/images/sofa.jpeg",
    discount: 20,
  },

  {
    id: 2,
    name: "Comfort Armchair",
    category: "Living Room",
    price: 299,
    oldPrice: 349,
    rating: 5.0,
    reviews: 87,
    image: "/images/armchair.jpeg",
    discount: 15,
  },

  {
    id: 3,
    name: "Wooden Coffee Table",
    category: "Living Room",
    price: 249,
    oldPrice: 299,
    rating: 5.0,
    reviews: 64,
    image: "/images/coffe-table.jpeg",
    discount: 15,
  },

  {
    id: 4,
    name: "Luxury L-Shaped Sofa",
    category: "Living Room",
    price: 899,
    oldPrice: 1099,
    rating: 4.9,
    reviews: 154,
    image: "/images/l-sofa.jpeg",
    discount: 18,
  },

  {
    id: 5,
    name: "Minimalist TV Unit",
    category: "Living Room",
    price: 379,
    oldPrice: 429,
    rating: 3.5,
    reviews: 58,
    image: "/images/tv-unit.jpeg",
    discount: 12,
  },

  // =====================================================
  // BEDROOM
  // =====================================================

  {
    id: 6,
    name: "Wooden Bed",
    category: "Bedroom",
    price: 399,
    oldPrice: 459,
    rating: 4.7,
    reviews: 96,
    image: "/images/bed.jpeg",
    discount: 15,
  },

  {
    id: 7,
    name: "Modern Nightstand",
    category: "Bedroom",
    price: 149,
    oldPrice: 189,
    rating: 4.6,
    reviews: 42,
    image: "/images/nightstand.jpeg",
    discount: 20,
  },

  {
    id: 8,
    name: "Bedroom Dresser",
    category: "Bedroom",
    price: 449,
    oldPrice: 529,
    rating: 3.8,
    reviews: 71,
    image: "/images/dresser.jpeg",
    discount: 15,
  },

  {
    id: 9,
    name: "King Size Bed Frame",
    category: "Bedroom",
    price: 799,
    oldPrice: 949,
    rating: 4.9,
    reviews: 112,
    image: "/images/king-bed.jpeg",
    discount: 16,
  },

  {
    id: 10,
    name: "Bedroom Vanity",
    category: "Bedroom",
    price: 329,
    oldPrice: 399,
    rating: 4.5,
    reviews: 49,
    image: "/images/vanity.jpeg",
    discount: 18,
  },

  // =====================================================
  // DINING ROOM
  // =====================================================

  {
    id: 11,
    name: "Dining Table",
    category: "Dining Room",
    price: 339,
    oldPrice: 399,
    rating: 3.6,
    reviews: 78,
    image: "/images/table.jpg",
    discount: 15,
  },

  {
    id: 12,
    name: "Dining Chair",
    category: "Dining Room",
    price: 129,
    oldPrice: 159,
    rating: 4.5,
    reviews: 63,
    image: "/images/dining-chair.jpeg",
    discount: 19,
  },

  {
    id: 13,
    name: "Modern Dining Set",
    category: "Dining Room",
    price: 699,
    oldPrice: 799,
    rating: 4.8,
    reviews: 91,
    image: "/images/dining-set.jpeg",
    discount: 13,
  },

  {
    id: 14,
    name: "Modern Sideboard",
    category: "Dining Room",
    price: 449,
    oldPrice: 499,
    rating: 4.7,
    reviews: 53,
    image: "/images/sideboard.jpeg",
    discount: 10,
  },

  // =====================================================
  // OFFICE
  // =====================================================

  {
    id: 15,
    name: "Office Chair",
    category: "Office",
    price: 199,
    oldPrice: 249,
    rating: 4.5,
    reviews: 45,
    image: "/images/chair.jpeg",
    discount: 20,
  },

  {
    id: 16,
    name: "Modern Office Desk",
    category: "Office",
    price: 349,
    oldPrice: 399,
    rating: 4.7,
    reviews: 69,
    image: "/images/office-desk.jpeg",
    discount: 13,
  },

  {
    id: 17,
    name: "Ergonomic Chair",
    category: "Office",
    price: 459,
    oldPrice: 549,
    rating: 4.9,
    reviews: 138,
    image: "/images/ergonomic-chair.jpeg",
    discount: 16,
  },

  // =====================================================
  // OUTDOOR
  // =====================================================

  {
    id: 18,
    name: "Outdoor Sofa",
    category: "Outdoor",
    price: 599,
    oldPrice: 699,
    rating: 4.8,
    reviews: 39,
    image: "/images/outdoor-sofa.jpeg",
    discount: 15,
  },

  {
    id: 19,
    name: "Outdoor Lounge Chair",
    category: "Outdoor",
    price: 279,
    oldPrice: 329,
    rating: 4.6,
    reviews: 51,
    image: "/images/outdoor-chair.jpeg",
    discount: 15,
  },

  {
    id: 20,
    name: "Garden Dining Set",
    category: "Outdoor",
    price: 749,
    oldPrice: 899,
    rating: 4.7,
    reviews: 46,
    image: "/images/garden-set.jpeg",
    discount: 17,
  },

  // =====================================================
  // KITCHEN
  // =====================================================

  {
    id: 21,
    name: "Kitchen Island",
    category: "Kitchen",
    price: 649,
    oldPrice: 749,
    rating: 4.7,
    reviews: 38,
    image: "/images/kitchen-island.jpeg",
    discount: 13,
  },

  {
    id: 22,
    name: "Bar Stool",
    category: "Kitchen",
    price: 119,
    oldPrice: 149,
    rating: 4.5,
    reviews: 34,
    image: "/images/bar-stool.jpeg",
    discount: 20,
  },

  // =====================================================
  // LIGHTING
  // =====================================================

  {
    id: 23,
    name: "Modern Floor Lamp",
    category: "Lighting",
    price: 179,
    oldPrice: 219,
    rating: 4.8,
    reviews: 82,
    image: "/images/floor-lamp.jpeg",
    discount: 18,
  },

  {
    id: 24,
    name: "Pendant Light",
    category: "Lighting",
    price: 149,
    oldPrice: 189,
    rating: 4.6,
    reviews: 57,
    image: "/images/pendant-light.jpeg",
    discount: 21,
  },

  {
    id: 25,
    name: "Table Lamp",
    category: "Lighting",
    price: 89,
    oldPrice: 119,
    rating: 4.5,
    reviews: 44,
    image: "/images/table-lamp.jpeg",
    discount: 25,
  },

  // =====================================================
  // STORAGE
  // =====================================================

  {
    id: 26,
    name: "Wooden Bookshelf",
    category: "Storage",
    price: 299,
    oldPrice: 349,
    rating: 4.7,
    reviews: 63,
    image: "/images/bookshelf.jpeg",
    discount: 14,
  },

  {
    id: 27,
    name: "Storage Cabinet",
    category: "Storage",
    price: 399,
    oldPrice: 469,
    rating: 4.6,
    reviews: 52,
    image: "/images/storage-cabinet.jpeg",
    discount: 15,
  },

  // =====================================================
  // DECOR
  // =====================================================

  {
    id: 28,
    name: "Decorative Mirror",
    category: "Decor",
    price: 129,
    oldPrice: 159,
    rating: 4.8,
    reviews: 76,
    image: "/images/mirror.jpeg",
    discount: 19,
  },

  {
    id: 29,
    name: "Decorative Vase",
    category: "Decor",
    price: 69,
    oldPrice: 89,
    rating: 4.5,
    reviews: 31,
    image: "/images/vase.jpeg",
    discount: 22,
  },

  // =====================================================
  // KIDS
  // =====================================================

  {
    id: 30,
    name: "Kids Study Desk",
    category: "Kids",
    price: 229,
    oldPrice: 279,
    rating: 4.7,
    reviews: 48,
    image: "/images/kids-desk.jpeg",
    discount: 18,
  },
];

export default products;