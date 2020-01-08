import DataLoader = require('dataloader');
import CrmuserController from "../../controllers/crmUser";

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

const foodLoader = new DataLoader(() => CrmuserController.getCrmuser());

const getFoodByIdBatching = (crmUser) => foodLoader.load(crmUser);

const catResolvers = {
  Query: {
    cats: (parent: any, args: any, context: any, info: any) => cats,
  },
  Cat: {
    love: async (cat: any, parent: any, args: any, context: any, info: any) => {
      console.log(cat)
      return getFoodByIdBatching('crmUsers');
    },
  },
};

module.exports = catResolvers;
