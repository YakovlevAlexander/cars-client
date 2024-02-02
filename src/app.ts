import { getCars, getCarById, createCar, updateCar, deleteCar, getToken } from './methods';

interface cmdArgs {
  method: string;
  args: string[];
}

function parseCmdArgs(): cmdArgs {
  const args = process.argv.slice(2);
  const [ method, ...rest ] = args;

  if (!method) {
    console.log('Help: node dist/app.js {method} {arguments}');
    process.exit(1);
  }

  return {
    method,
    args: rest,
  }
}

async function main() {
  const { method, args } = parseCmdArgs();
  const methods = {
    getToken: 'get-token',
    getCars: 'get-cars',
    getCarById: 'get-car-by-id',
    createCar: 'create-car',
    updateCar: 'update-car',
    deleteCar: 'delete-car', 
  };

  switch(method) {
    case methods.getToken:
      if (args.length === 2) {
        const [username, password] = args;
        await getToken(username, password);
      } else {
        console.log(`Arguments for ${methods.getToken}: username, password`);
        process.exit(1);
      }
      
      break;
    case methods.getCars:
      await getCars();
      break;
    case methods.getCarById:
      if (args.length === 1) {
        await getCarById(args[0]);
      } else {
        console.log(`Arguments for ${methods.getCarById}: id`);
        process.exit(1);
      }
      break;
    case methods.createCar:
      if (args.length === 4) {
        const [brand, name, year, price] = args;
        await createCar({ brand, name, year, price });
      } else {
        console.log(`Arguments for ${methods.createCar}: brand, name, year, price`);
        process.exit(1);
      }
      break;
    case methods.updateCar:
      if (args.length > 1) {
        const [id, brand, name, year, price] = args;
        await updateCar(id, { brand, name, year, price });
      } else {
        console.log(`Arguments for ${methods.updateCar} (2 min): id, brand, name, year, price`);
        process.exit(1);
      }
      break;
    case methods.deleteCar:
      if (args.length === 1) {
        await deleteCar(args[0]);
      } else {
        console.log(`Arguments for ${methods.deleteCar}: id`);
        process.exit(1);
      }
      break;
    default:
      console.log(`Available methods: ${Object.keys(methods)}`);
      process.exit(1);
  }
}

main();
