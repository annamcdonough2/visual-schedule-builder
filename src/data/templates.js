// Pre-built routine templates (5 steps each for simplicity)
export const templates = {
  morning: {
    id: 'morning',
    name: 'Morning Routine',
    icon: 'Sun',
    color: 'yellow',
    description: 'Rise and shine!',
    defaultTitle: "My Morning Routine",
    steps: [
      { id: 'wake-up', icon: 'Sun', label: 'Wake Up' },
      { id: 'brush-teeth', icon: 'Sparkles', label: 'Brush Teeth' },
      { id: 'get-dressed', icon: 'Shirt', label: 'Get Dressed' },
      { id: 'eat-breakfast', icon: 'Coffee', label: 'Eat Breakfast' },
      { id: 'go-to-school', icon: 'School', label: 'Go To School' },
    ],
  },
  bedtime: {
    id: 'bedtime',
    name: 'Bedtime Routine',
    icon: 'Moon',
    color: 'purple',
    description: 'Sweet dreams!',
    defaultTitle: "My Bedtime Routine",
    steps: [
      { id: 'take-bath', icon: 'Bath', label: 'Take Bath' },
      { id: 'put-on-pajamas', icon: 'Moon', label: 'Put On Pajamas' },
      { id: 'brush-teeth', icon: 'Sparkles', label: 'Brush Teeth' },
      { id: 'read-story', icon: 'BookHeart', label: 'Read Story' },
      { id: 'hugs-kisses', icon: 'Heart', label: 'Hugs & Kisses' },
    ],
  },
  afterschool: {
    id: 'afterschool',
    name: 'After School',
    icon: 'Home',
    color: 'green',
    description: 'Time to play!',
    defaultTitle: "My After School Routine",
    steps: [
      { id: 'come-home', icon: 'Home', label: 'Come Home' },
      { id: 'wash-hands', icon: 'Droplets', label: 'Wash Hands' },
      { id: 'have-snack', icon: 'Apple', label: 'Have Snack' },
      { id: 'do-homework', icon: 'BookOpen', label: 'Do Homework' },
      { id: 'play-outside', icon: 'Trees', label: 'Play Outside' },
    ],
  },
  custom: {
    id: 'custom',
    name: 'Start Fresh',
    icon: 'Sparkles',
    color: 'pink',
    description: 'Create your own!',
    defaultTitle: "My Special Routine",
    steps: [],
  },
};

export const templateList = Object.values(templates);
