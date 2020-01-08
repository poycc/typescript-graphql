import DataLoader = require('dataloader');

const foods = [
  { id: 1, name: 'milk' },
  { id: 2, name: 'apple' },
  { id: 3, name: 'fish' },
];

const cats = [
  { color: 'white', foodId: 1 },
  { color: 'red', foodId: 2 },
  { color: 'black', foodId: 3 },
];

const fakerIO = (arg: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(arg), 300);
  });

  const getFoodByIds: (ids: any) => Promise<any> = async (ids:any) => {
    return fakerIO(foods.filter(food => ids.includes(food.id)))
  }
  
  const foodLoader = new DataLoader(ids => getFoodByIds(ids))
  
  const getFoodByIdBatching = (foodId: any) => foodLoader.load(foodId)

const catResolvers = {
  Query: {
    cats: (parent: any, args: any, context: any, info: any) => cats,
  },
  Cat: {
    love: async (cat: any, parent: any, args: any, context:any, info: any) => {
      console.log(parent,args, context, info)
      return getFoodByIdBatching(cat.foodId)}
  },
};

module.exports = catResolvers;
