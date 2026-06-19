
// /// inteface vs type 


// //სინტაქსი

// interface Menu {
//     dishes: string[];
//     sum: number;
// }

// const menu1:Menu = {
// dishes: ['pizza', 'pasta'],
// sum: 567
// }

// console.log(menu1)


// type Bill = {
//     finalSum: number;
//     date?: string;
//     isPayed: boolean
// }



// const bill1:Bill = {
// finalSum: 150,
// date: '19.06',
// isPayed:true
// }

// const bill2:Bill = {
//     finalSum: 167,
//     isPayed:true
// }




// //type -ების გაერთიანება

// type User = {
//     name: string
// }
// type Admin = {
//     password: string
// }

// type AdminUser = User & Admin

// const admin1:AdminUser = {
//     name: 'natia',
//     password: 'password123'
// }



// //interface - ების გაერთიანება 

// interface Pizza {
//     ingredients: string[]
// }

// interface CookingBook{
//     time: number
// }
// interface CookingBook extends Pizza{}

// const receipt: CookingBook = {

// }


// //interface merging
// interface Test {
//     grade: number
// }

// interface Test{
//   date: string
// }


// const exam:Test = {
// grade: 365,
// date: '19.06'
// }

// //union types

// type Hat = 'red' | 'green' | 'blue'

// const hat:Hat = 'red' 



// // generics

// function postData<T>(x:T):T {
//    let newX = 34



// return x
// }
// postData<number>(345)


// interface UserObj<T> {
// name: T
// }


// const newUser:UserObj<string> ={
//     name: 'sdgh',
// } 

// 1.  define  'Pizza' type/interface with 'name' (string) and 'price' (number)
// 2. define  'Order' type/interface with 'id' (number), 'pizza' (Pizza), and 'status' ("ordered" | "completed")

interface Pizza {
    name:string;
    price:number
}
interface Order{
    id:number;
    pizza:Pizza;
    status:"ordered" | "completed"
}

let cashInRegister = 0;
let nextOrderId = 1;

//set types to these arrays
const menu: Pizza[] = [];
const orderQueue: Order[] = [];

function addNewPizza(pizzaObj: Pizza) {
  menu.push(pizzaObj);
}

function placeOrder(pizzaName:string) {
  const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);
  if (!selectedPizza) {
    console.error(`${pizzaName} does not exist in the menu`);
    return;
  }
  cashInRegister += selectedPizza.price;
  const newOrder:Order = {
    id: nextOrderId++,
    pizza: selectedPizza,
    status: "ordered",
  };
  orderQueue.push(newOrder);
  return newOrder;
}


 // TypeScript warns that 'order' might be 'undefined' because .find() can fail

function completeOrder(orderId:number) {
  const order:Order|undefined = orderQueue.find(
    (order) => order.id === orderId,
  );

  // fix the red line under 'order.status', check if the order exists, if not - return

if(!order){
    return
}
    order.status = "completed";


  return order;
}

// --- test data & execution ---

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy Sausage", price: 11 });

placeOrder("Chicken Bacon Ranch");
completeOrder(1);

console.log("Menu:", menu);
console.log("Cash in register:", cashInRegister);
console.log("Order queue:", orderQueue);

