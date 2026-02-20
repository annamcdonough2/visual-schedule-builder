// Step library with Lucide icon names and categories
export const stepLibrary = [
  // Hygiene
  { id: 'brush-teeth', icon: 'Sparkles', label: 'Brush Teeth', category: 'hygiene' },
  { id: 'wash-hands', icon: 'Droplets', label: 'Wash Hands', category: 'hygiene' },
  { id: 'wash-face', icon: 'Droplet', label: 'Wash Face', category: 'hygiene' },
  { id: 'take-bath', icon: 'Bath', label: 'Take Bath', category: 'hygiene' },
  { id: 'take-shower', icon: 'ShowerHead', label: 'Take Shower', category: 'hygiene' },
  { id: 'use-toilet', icon: 'Toilet', label: 'Use Toilet', category: 'hygiene' },
  { id: 'comb-hair', icon: 'Comb', label: 'Comb Hair', category: 'hygiene' },
  { id: 'use-bathroom', icon: 'DoorOpen', label: 'Use Bathroom', category: 'hygiene' },

  // Getting Ready
  { id: 'get-dressed', icon: 'Shirt', label: 'Get Dressed', category: 'getting-ready' },
  { id: 'put-on-shoes', icon: 'Footprints', label: 'Put On Shoes', category: 'getting-ready' },
  { id: 'put-on-coat', icon: 'Cloudy', label: 'Put On Coat', category: 'getting-ready' },
  { id: 'pack-backpack', icon: 'Backpack', label: 'Pack Backpack', category: 'getting-ready' },
  { id: 'check-weather', icon: 'CloudSun', label: 'Check Weather', category: 'getting-ready' },
  { id: 'put-on-pajamas', icon: 'Moon', label: 'Put On Pajamas', category: 'getting-ready' },

  // Meals
  { id: 'eat-breakfast', icon: 'Coffee', label: 'Eat Breakfast', category: 'meals' },
  { id: 'eat-lunch', icon: 'Sandwich', label: 'Eat Lunch', category: 'meals' },
  { id: 'eat-dinner', icon: 'UtensilsCrossed', label: 'Eat Dinner', category: 'meals' },
  { id: 'have-snack', icon: 'Apple', label: 'Have Snack', category: 'meals' },
  { id: 'drink-water', icon: 'GlassWater', label: 'Drink Water', category: 'meals' },
  { id: 'take-vitamins', icon: 'Pill', label: 'Take Vitamins', category: 'meals' },

  // Activities
  { id: 'do-homework', icon: 'BookOpen', label: 'Do Homework', category: 'activities' },
  { id: 'read-book', icon: 'Book', label: 'Read Book', category: 'activities' },
  { id: 'read-story', icon: 'BookHeart', label: 'Read Story', category: 'activities' },
  { id: 'play-outside', icon: 'Trees', label: 'Play Outside', category: 'activities' },
  { id: 'screen-time', icon: 'Tablet', label: 'Screen Time', category: 'activities' },
  { id: 'clean-up-toys', icon: 'Package', label: 'Clean Up Toys', category: 'activities' },
  { id: 'practice-music', icon: 'Music', label: 'Practice Music', category: 'activities' },
  { id: 'exercise', icon: 'Dumbbell', label: 'Exercise', category: 'activities' },
  { id: 'feed-pet', icon: 'PawPrint', label: 'Feed Pet', category: 'activities' },
  { id: 'tidy-room', icon: 'Bed', label: 'Tidy Room', category: 'activities' },

  // Sleep
  { id: 'wake-up', icon: 'Sun', label: 'Wake Up', category: 'sleep' },
  { id: 'go-to-bed', icon: 'Moon', label: 'Go To Bed', category: 'sleep' },
  { id: 'make-bed', icon: 'Bed', label: 'Make Bed', category: 'sleep' },
  { id: 'lights-out', icon: 'LightbulbOff', label: 'Lights Out', category: 'sleep' },
  { id: 'hugs-kisses', icon: 'Heart', label: 'Hugs & Kisses', category: 'sleep' },

  // Transitions
  { id: 'go-to-school', icon: 'School', label: 'Go To School', category: 'transitions' },
  { id: 'come-home', icon: 'Home', label: 'Come Home', category: 'transitions' },
  { id: 'leave-house', icon: 'DoorOpen', label: 'Leave House', category: 'transitions' },
  { id: 'get-in-car', icon: 'Car', label: 'Get In Car', category: 'transitions' },
  { id: 'wait-for-bus', icon: 'Bus', label: 'Wait For Bus', category: 'transitions' },
];

export const categories = [
  { id: 'hygiene', label: 'Hygiene', icon: 'Sparkles' },
  { id: 'getting-ready', label: 'Getting Ready', icon: 'Shirt' },
  { id: 'meals', label: 'Meals', icon: 'UtensilsCrossed' },
  { id: 'activities', label: 'Activities', icon: 'Gamepad2' },
  { id: 'sleep', label: 'Sleep', icon: 'Moon' },
  { id: 'transitions', label: 'Transitions', icon: 'ArrowRight' },
];

export const getStepsByCategory = (categoryId) => {
  return stepLibrary.filter(step => step.category === categoryId);
};

export const getStepById = (stepId) => {
  return stepLibrary.find(step => step.id === stepId);
};
