export const categories = [
  { id: 1, name: 'Pizza', icon: '🍕' },
  { id: 2, name: 'Burger', icon: '🍔' },
  { id: 3, name: 'Indian', icon: '🍛' },
  { id: 4, name: 'Chinese', icon: '🥡' },
  { id: 5, name: 'Healthy', icon: '🥗' },
  { id: 6, name: 'Desserts', icon: '🍰' },
  { id: 7, name: 'Italian', icon: '🍝' },
  { id: 8, name: 'Japanese', icon: '🍣' },
];

export interface MenuItemOption {
  name: string;
  extraPrice: number;
}

export interface MenuItemCustomization {
  name: string;
  type: string;
  options: MenuItemOption[];
}

export interface MenuItem {
  id: number;
  category: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  vegetarian: boolean;
  image: string;
  ingredients: string[];
  allergens: string[];
  customizations?: MenuItemCustomization[];
}

export interface ReviewItem {
  id: number;
  user: string;
  rating: number;
  date: string;
  text: string;
}

export interface Restaurant {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  cuisine: string;
  deliveryTime: number;
  deliveryTimeString: string;
  priceRange: string;
  image: string;
  featured: boolean;
  vegetarian: boolean;
  hasOffers: boolean;
  isOpenNow: boolean;
  location: string;
  offerDetails?: string | null;
  about?: string;
  menuCategories: string[];
  menu: MenuItem[];
  reviewsList: ReviewItem[];
  city?: string;
  distanceKm?: number;
}

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Truffle & Vine',
    rating: 4.9,
    reviews: 1240,
    cuisine: 'Italian',
    deliveryTime: 35,
    deliveryTimeString: '30-45 min',
    priceRange: '$$$$',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    vegetarian: true,
    hasOffers: true,
    isOpenNow: true,
    location: '124 Culinary Avenue, Food District',
    offerDetails: '20% off on premium wines',
    about: 'Experience authentic Italian fine dining with a modern twist. Truffle & Vine brings the essence of Tuscany directly to your plate.',
    menuCategories: ['Recommended', 'Starters', 'Main Course', 'Desserts', 'Drinks'],
    menu: [
      { 
        id: 101, category: 'Starters', name: 'Truffle Bruschetta', price: 18.50, rating: 4.8, 
        description: 'Toasted artisan bread with wild mushrooms and black truffle shavings.', 
        vegetarian: true, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Sourdough', 'Wild Mushrooms', 'Black Truffle', 'Garlic', 'Olive Oil'],
        allergens: ['Gluten'],
        customizations: []
      },
      { 
        id: 102, category: 'Recommended', name: 'Truffle Mushroom Risotto', price: 32.50, rating: 4.9, 
        description: 'Creamy Arborio rice slow-cooked with white wine and porcini.', 
        vegetarian: true, image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Arborio Rice', 'Porcini Mushrooms', 'Parmesan', 'White Wine', 'Truffle Oil'],
        allergens: ['Dairy'],
        customizations: [
          { name: 'Extra Truffle Shavings', type: 'single', options: [{ name: 'Yes', extraPrice: 8.00 }, { name: 'No', extraPrice: 0 }] }
        ]
      },
      { 
        id: 103, category: 'Main Course', name: 'Wagyu Beef Filet', price: 65.00, rating: 4.9, 
        description: 'A5 Wagyu served with asparagus and barolo reduction.', 
        vegetarian: false, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['A5 Wagyu Beef', 'Asparagus', 'Barolo Wine', 'Butter'],
        allergens: ['Dairy'],
        customizations: [
          { name: 'Meat Doneness', type: 'single', options: [{ name: 'Rare', extraPrice: 0 }, { name: 'Medium Rare', extraPrice: 0 }, { name: 'Medium', extraPrice: 0 }] }
        ]
      },
      { 
        id: 104, category: 'Desserts', name: 'Tiramisu Classico', price: 14.00, rating: 4.7, 
        description: 'Espresso-soaked ladyfingers layered with mascarpone cream.', 
        vegetarian: true, image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Ladyfingers', 'Espresso', 'Mascarpone', 'Cocoa Powder', 'Eggs'],
        allergens: ['Dairy', 'Eggs', 'Gluten'],
        customizations: []
      },
    ],
    reviewsList: [
      { id: 1, user: 'Eleanor R.', rating: 5, date: '2 days ago', text: 'Absolutely phenomenal. The truffle risotto is out of this world!' },
    ]
  },
  {
    id: 3,
    name: 'Bombay Spice',
    rating: 4.7,
    reviews: 2100,
    cuisine: 'Indian',
    deliveryTime: 30,
    deliveryTimeString: '25-40 min',
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    vegetarian: true,
    hasOffers: true,
    isOpenNow: true,
    location: '88 Masala Way, East District',
    offerDetails: 'Free Naan with any curry',
    about: 'Authentic Indian flavors cooked in a traditional clay oven.',
    menuCategories: ['Recommended', 'Starters', 'Main Course', 'Rice', 'Breads', 'Drinks'],
    menu: [
      { 
        id: 301, category: 'Recommended', name: 'Butter Chicken Curry', price: 22.00, rating: 4.8,
        description: 'Tender chicken marinated in yogurt and spices, served in a rich tomato cream sauce.', 
        vegetarian: false, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Chicken Breast', 'Tomato Puree', 'Heavy Cream', 'Garam Masala', 'Butter'],
        allergens: ['Dairy'],
        customizations: [
          { name: 'Spice Level', type: 'single', options: [{ name: 'Mild', extraPrice: 0 }, { name: 'Medium', extraPrice: 0 }, { name: 'Hot', extraPrice: 0 }] }
        ]
      },
      { 
        id: 302, category: 'Main Course', name: 'Palak Paneer', price: 19.00, rating: 4.6,
        description: 'Cottage cheese cubes cooked in a smooth, mildly spiced spinach curry.', 
        vegetarian: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Paneer (Cheese)', 'Spinach', 'Onions', 'Garlic', 'Spices'],
        allergens: ['Dairy'],
        customizations: [
          { name: 'Spice Level', type: 'single', options: [{ name: 'Mild', extraPrice: 0 }, { name: 'Medium', extraPrice: 0 }, { name: 'Hot', extraPrice: 0 }] }
        ]
      },
      { 
        id: 303, category: 'Breads', name: 'Garlic Naan', price: 4.50, rating: 4.9,
        description: 'Traditional flatbread baked in a tandoor oven, brushed with garlic butter.', 
        vegetarian: true, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Flour', 'Yeast', 'Garlic', 'Butter', 'Cilantro'],
        allergens: ['Gluten', 'Dairy'],
        customizations: []
      },
      { 
        id: 304, category: 'Rice', name: 'Saffron Basmati Rice', price: 6.00, rating: 4.5,
        description: 'Aromatic basmati rice steamed with pure saffron threads.', 
        vegetarian: true, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Basmati Rice', 'Saffron', 'Water'],
        allergens: [],
        customizations: []
      },
      { 
        id: 305, category: 'Starters', name: 'Chicken Tikka', price: 12.00, rating: 4.7,
        description: 'Spiced and grilled chicken chunks cooked to perfection in a tandoor.', 
        vegetarian: false, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Chicken Breast', 'Yogurt', 'Tikka Masala', 'Lemon'],
        allergens: ['Dairy'],
        customizations: []
      },
      { 
        id: 306, category: 'Starters', name: 'Vegetable Samosa', price: 5.50, rating: 4.8,
        description: 'Crispy pastry triangles filled with spiced potatoes and peas.', 
        vegetarian: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Potatoes', 'Peas', 'Flour', 'Spices'],
        allergens: ['Gluten'],
        customizations: []
      },
      { 
        id: 307, category: 'Starters', name: 'Paneer Tikka', price: 10.50, rating: 4.6,
        description: 'Marinated cottage cheese cubes grilled with onions and bell peppers.', 
        vegetarian: true, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Paneer', 'Bell Peppers', 'Onions', 'Yogurt', 'Spices'],
        allergens: ['Dairy'],
        customizations: []
      },
      { 
        id: 308, category: 'Main Course', name: 'Lamb Rogan Josh', price: 24.00, rating: 4.9,
        description: 'A robust and spicy lamb curry hailing from Kashmir.', 
        vegetarian: false, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Lamb', 'Onions', 'Tomatoes', 'Rogan Josh Spices'],
        allergens: [],
        customizations: []
      },
      { 
        id: 309, category: 'Main Course', name: 'Dal Makhani', price: 16.00, rating: 4.8,
        description: 'Creamy and buttery black lentils slow-cooked overnight.', 
        vegetarian: true, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Black Lentils', 'Kidney Beans', 'Butter', 'Cream', 'Spices'],
        allergens: ['Dairy'],
        customizations: []
      }
    ],
    reviewsList: []
  },
  {
    id: 4,
    name: 'The Green Bowl',
    rating: 4.6,
    reviews: 420,
    cuisine: 'Healthy',
    deliveryTime: 20,
    deliveryTimeString: '15-25 min',
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    vegetarian: true,
    hasOffers: false,
    isOpenNow: true,
    location: '12 Fitness Blvd',
    offerDetails: null,
    about: 'Your daily dose of fresh, organic, and locally sourced salads and bowls.',
    menuCategories: ['Recommended', 'Bowls', 'Smoothies'],
    menu: [
      { 
        id: 401, category: 'Recommended', name: 'Avocado Toast with Poached Egg', price: 16.50, rating: 4.8,
        description: 'Smashed avocado on sourdough with a perfectly poached egg.', 
        vegetarian: true, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Avocado', 'Sourdough Bread', 'Egg', 'Chili Flakes', 'Lemon'],
        allergens: ['Gluten', 'Eggs'],
        customizations: [
          { name: 'Add Extra Egg', type: 'single', options: [{ name: 'Yes', extraPrice: 2.50 }, { name: 'No', extraPrice: 0 }] },
          { name: 'Bread Type', type: 'single', options: [{ name: 'Sourdough', extraPrice: 0 }, { name: 'Gluten Free', extraPrice: 2.00 }] }
        ]
      },
    ],
    reviewsList: []
  },
  {
    id: 5,
    name: 'Sushi Zen',
    rating: 4.8,
    reviews: 890,
    cuisine: 'Japanese',
    deliveryTime: 40,
    deliveryTimeString: '35-50 min',
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    vegetarian: false,
    hasOffers: false,
    isOpenNow: true,
    location: '45 Sakura Lane, Downtown',
    offerDetails: null,
    about: 'Premium omakase and fresh sushi rolls crafted by master chefs.',
    menuCategories: ['Recommended', 'Rolls', 'Sashimi'],
    menu: [
      { 
        id: 501, category: 'Recommended', name: 'Dragon Roll', price: 24.00, rating: 4.9,
        description: 'Eel and cucumber topped with avocado and sweet eel sauce.', 
        vegetarian: false, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Eel', 'Cucumber', 'Avocado', 'Sushi Rice', 'Nori'],
        allergens: ['Seafood', 'Gluten'],
        customizations: []
      }
    ],
    reviewsList: []
  },
  {
    id: 6,
    name: 'Smash & Grab Burgers',
    rating: 4.5,
    reviews: 3200,
    cuisine: 'Burger',
    deliveryTime: 25,
    deliveryTimeString: '20-35 min',
    priceRange: '₹',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    vegetarian: false,
    hasOffers: true,
    isOpenNow: true,
    location: '12 Fast Lane',
    offerDetails: 'Free fries with double smash',
    about: 'Juicy, crispy-edged smash burgers made with 100% Angus beef.',
    menuCategories: ['Burgers', 'Sides'],
    menu: [
      { 
        id: 601, category: 'Burgers', name: 'Double Smash Burger', price: 12.00, rating: 4.6,
        description: 'Two smashed patties with American cheese, pickles, and house sauce.', 
        vegetarian: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Angus Beef', 'Cheese', 'Pickles', 'Brioche Bun'],
        allergens: ['Dairy', 'Gluten'],
        customizations: []
      }
    ],
    reviewsList: []
  },
  {
    id: 7,
    name: 'Napoli Woodfire',
    rating: 4.7,
    reviews: 1540,
    cuisine: 'Pizza',
    deliveryTime: 35,
    deliveryTimeString: '30-45 min',
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    vegetarian: true,
    hasOffers: true,
    isOpenNow: true,
    location: '99 Little Italy',
    offerDetails: '20% off all Margherita pizzas',
    about: 'Authentic Neapolitan pizza baked in a 900-degree wood-fired oven.',
    menuCategories: ['Pizzas', 'Starters'],
    menu: [
      { 
        id: 701, category: 'Pizzas', name: 'Margherita Verace', price: 18.00, rating: 4.8,
        description: 'San Marzano tomatoes, fresh mozzarella, basil, and olive oil.', 
        vegetarian: true, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Pizza Dough', 'San Marzano Tomatoes', 'Fresh Mozzarella', 'Basil'],
        allergens: ['Dairy', 'Gluten'],
        customizations: []
      }
    ],
    reviewsList: []
  },
  {
    id: 8,
    name: 'Orchard',
    rating: 4.8,
    reviews: 1250,
    cuisine: 'Chinese',
    deliveryTime: 45,
    deliveryTimeString: '40-55 min',
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    vegetarian: false,
    hasOffers: true,
    isOpenNow: true,
    location: 'Rajpur Road, Dehradun',
    city: 'Dehradun',
    distanceKm: 2.3,
    offerDetails: 'Free dimsum on orders above ₹1000',
    about: 'Famous for authentic Tibetan and Chinese cuisine with a beautiful view.',
    menuCategories: ['Starters', 'Main Course'],
    menu: [
      { 
        id: 801, category: 'Starters', name: 'Chicken Momo', price: 6.00, rating: 4.8,
        description: 'Steamed dumplings filled with minced chicken and herbs.', 
        vegetarian: false, image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Chicken', 'Flour', 'Garlic', 'Ginger'],
        allergens: ['Gluten'],
        customizations: []
      }
    ],
    reviewsList: []
  },
  {
    id: 9,
    name: 'Kalsang Friends Corner',
    rating: 4.7,
    reviews: 3200,
    cuisine: 'Asian',
    deliveryTime: 35,
    deliveryTimeString: '30-45 min',
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    vegetarian: false,
    hasOffers: false,
    isOpenNow: true,
    location: 'Chakarata Road, Dehradun',
    city: 'Dehradun',
    distanceKm: 1.5,
    offerDetails: null,
    about: 'The best Tibetan and Thai food in the valley.',
    menuCategories: ['Noodles', 'Soups'],
    menu: [
      { 
        id: 901, category: 'Noodles', name: 'Veg Hakka Noodles', price: 5.50, rating: 4.7,
        description: 'Stir-fried noodles with fresh vegetables.', 
        vegetarian: true, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Noodles', 'Cabbage', 'Carrot', 'Soy Sauce'],
        allergens: ['Gluten', 'Soy'],
        customizations: []
      }
    ],
    reviewsList: []
  },
  {
    id: 10,
    name: 'Doon Darbar',
    rating: 4.5,
    reviews: 2100,
    cuisine: 'Indian',
    deliveryTime: 25,
    deliveryTimeString: '20-30 min',
    priceRange: '₹',
    image: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    vegetarian: false,
    hasOffers: true,
    isOpenNow: true,
    location: 'Paltan Bazaar, Dehradun',
    city: 'Dehradun',
    distanceKm: 4.2,
    offerDetails: '10% off on all Mughlai dishes',
    about: 'Legendary Mughlai and North Indian cuisine right in the heart of the city.',
    menuCategories: ['Curries', 'Breads'],
    menu: [
      { 
        id: 1001, category: 'Curries', name: 'Mutton Korma', price: 14.00, rating: 4.6,
        description: 'Rich and flavorful mutton curry cooked in traditional spices.', 
        vegetarian: false, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop',
        ingredients: ['Mutton', 'Yogurt', 'Onions', 'Spices'],
        allergens: ['Dairy'],
        customizations: []
      }
    ],
    reviewsList: []
  }
];

export const allDishes = restaurants.flatMap(r => r.menu);

export const popularDishes = allDishes.slice(0, 4).map((m, i) => ({
  ...m,
  restaurant: restaurants[i % restaurants.length].name,
}));

export const trendingDishes = allDishes.slice(4, 6).map((m, i) => ({
  ...m,
  restaurant: restaurants[i % restaurants.length].name,
}));

export const recipes = [
  {
    id: 1,
    name: 'Classic Beef Wellington',
    cuisine: 'British',
    time: '2 hours',
    timeValue: 120, // minutes
    difficulty: 'Hard',
    rating: 4.9,
    servings: 4,
    vegetarian: false,
    healthy: false,
    highProtein: true,
    dessert: false,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1000&auto=format&fit=crop',
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Mock video link
    ingredients: [
      '1kg center-cut beef tenderloin',
      '2 tbsp olive oil',
      '250g chestnut mushrooms, finely chopped',
      '50g butter',
      '1 sprig fresh thyme',
      '100ml dry white wine',
      '12 slices prosciutto',
      '500g puff pastry',
      '2 egg yolks, beaten with 1 tbsp water'
    ],
    instructions: [
      'Sear the beef tenderloin quickly in a hot pan with olive oil until browned all over. Set aside to cool.',
      'Finely chop the mushrooms and fry them in a dry pan until they release their moisture. Add butter and thyme, cook for 5 mins, then add wine and reduce. Cool the mixture (duxelles).',
      'Lay out the prosciutto slices on cling film slightly overlapping. Spread the cooled mushroom mixture evenly over the prosciutto.',
      'Place the seared beef in the center. Using the cling film, wrap the prosciutto and mushrooms tightly around the beef. Chill for 15 mins.',
      'Roll out the puff pastry. Remove the cling film from the beef and wrap the pastry around the beef. Seal the edges with egg wash.',
      'Brush the entire pastry with egg wash and score the top lightly. Bake at 200°C (400°F) for 20-25 mins for medium-rare.',
      'Rest for 10 minutes before slicing.'
    ],
    nutrition: {
      calories: 850,
      protein: 45,
      carbs: 35,
      fat: 55
    }
  },
  {
    id: 2,
    name: 'Homemade Pasta Carbonara',
    cuisine: 'Italian',
    time: '30 mins',
    timeValue: 30,
    difficulty: 'Medium',
    rating: 4.8,
    servings: 2,
    vegetarian: false,
    healthy: false,
    highProtein: true,
    dessert: false,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1000&auto=format&fit=crop',
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    ingredients: [
      '200g spaghetti or rigatoni',
      '100g guanciale or pancetta, diced',
      '2 large eggs',
      '50g Pecorino Romano cheese, grated',
      '50g Parmesan cheese, grated',
      'Freshly ground black pepper'
    ],
    instructions: [
      'Boil the pasta in heavily salted water until al dente. Reserve 1 cup of pasta water before draining.',
      'In a cold pan, add the guanciale and cook over medium-low heat until the fat renders and it becomes crispy (about 10 mins). Remove from heat.',
      'In a bowl, whisk the eggs, grated cheeses, and a generous amount of black pepper until it forms a paste.',
      'Add the hot, drained pasta to the pan with the guanciale. Toss to coat in the fat.',
      'Quickly stir the egg and cheese mixture into the pasta off the heat. Add splashes of reserved pasta water as you toss rapidly to create a creamy emulsion.',
      'Serve immediately, garnished with more cheese and pepper.'
    ],
    nutrition: {
      calories: 650,
      protein: 28,
      carbs: 70,
      fat: 25
    }
  },
  {
    id: 3,
    name: 'Avocado Quinoa Salad',
    cuisine: 'Global',
    time: '15 mins',
    timeValue: 15,
    difficulty: 'Easy',
    rating: 4.7,
    servings: 2,
    vegetarian: true,
    healthy: true,
    highProtein: false,
    dessert: false,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop',
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    ingredients: [
      '1 cup cooked quinoa, cooled',
      '1 large avocado, diced',
      '1 cup cherry tomatoes, halved',
      '1/2 cucumber, diced',
      '1/4 red onion, finely chopped',
      '2 tbsp extra virgin olive oil',
      '1 tbsp fresh lemon juice',
      'Salt and pepper to taste'
    ],
    instructions: [
      'In a large bowl, combine the cooled quinoa, avocado, tomatoes, cucumber, and red onion.',
      'In a small bowl, whisk together the olive oil, lemon juice, salt, and pepper to create the dressing.',
      'Pour the dressing over the salad and toss gently to combine without mashing the avocado.',
      'Serve immediately or chill for 30 minutes to let the flavors meld.'
    ],
    nutrition: {
      calories: 320,
      protein: 8,
      carbs: 35,
      fat: 18
    }
  },
  {
    id: 4,
    name: 'Matcha Tiramisu',
    cuisine: 'Japanese Fusion',
    time: '45 mins',
    timeValue: 45,
    difficulty: 'Medium',
    rating: 4.9,
    servings: 6,
    vegetarian: true,
    healthy: false,
    highProtein: false,
    dessert: true,
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=1000&auto=format&fit=crop',
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    ingredients: [
      '250g mascarpone cheese, softened',
      '3 large egg yolks',
      '50g sugar',
      '1 cup heavy cream',
      '2 tbsp matcha powder (plus extra for dusting)',
      '1 cup hot water',
      '24 ladyfinger biscuits'
    ],
    instructions: [
      'Whisk the egg yolks and sugar together over a double boiler until pale and thick (about 5-7 mins). Remove from heat and cool slightly.',
      'Beat the mascarpone into the egg mixture until smooth.',
      'In a separate bowl, whip the heavy cream to soft peaks. Gently fold the whipped cream into the mascarpone mixture.',
      'Whisk 2 tbsp of matcha powder into the hot water until completely dissolved and smooth. Let it cool in a shallow dish.',
      'Quickly dip half of the ladyfingers into the matcha liquid and arrange them in the bottom of an 8x8 inch dish.',
      'Spread half of the mascarpone cream evenly over the ladyfingers.',
      'Repeat with a second layer of dipped ladyfingers and the remaining cream.',
      'Refrigerate for at least 4 hours (or overnight). Before serving, heavily dust the top with remaining matcha powder.'
    ],
    nutrition: {
      calories: 410,
      protein: 6,
      carbs: 45,
      fat: 26
    }
  }
];

export const offers = [
  {
    id: 1,
    title: '50% OFF',
    subtitle: 'On your first order',
    code: 'AURORA50',
    color: 'from-aurora-cyan to-aurora-blue',
  },
];

export const mockOrders = [
  {
    id: 'ORD-982134',
    date: 'Today, 7:42 PM',
    status: 'on_the_way',
    restaurant: 'Gourmet Kitchen',
    total: 42.50,
    items: [
      { name: 'Truffle Mushroom Risotto', quantity: 1 },
      { name: 'Garlic Bread', quantity: 1 }
    ],
    isActive: true
  },
  {
    id: 'ORD-445129',
    date: 'Oct 12, 2023, 1:15 PM',
    status: 'delivered',
    restaurant: 'Spice Route',
    total: 28.00,
    items: [
      { name: 'Chicken Tikka Masala', quantity: 1 },
      { name: 'Butter Naan', quantity: 2 },
      { name: 'Mango Lassi', quantity: 1 }
    ],
    isActive: false
  },
  {
    id: 'ORD-332901',
    date: 'Sep 28, 2023, 8:30 PM',
    status: 'delivered',
    restaurant: 'Sushi Master',
    total: 65.20,
    items: [
      { name: 'Dragon Roll', quantity: 2 },
      { name: 'Spicy Tuna Roll', quantity: 1 },
      { name: 'Miso Soup', quantity: 2 }
    ],
    isActive: false
  }
];
