// Gunakan fungsi di bawah ini untuk menghasilkan id yang unik
function generateUniqueId() {
  return `_${Math.random().toString(36).slice(2, 9)}`;
}


// TODO: buatlah variabel yang menampung data orders
let order = [];

// TODO: selesaikan fungsi addOrder
function addOrder(customerName, items) {
  let sum = 0;
  for(let i = 0; i < items.length; i++){
    sum += items[i].price;
  }
  order.push({
    id: generateUniqueId(),
    customerName: customerName,
    items: items,
    totalPrice: sum,
    status: "Menunggu"
  });
}

// TODO: selesaikan fungsi updateOrderStatus
function updateOrderStatus(orderId, status) {
  for(let i = 0; i < order.length; i++){
    if(orderId == order[i].id){
      order[i].status = status;
    }
  }
}

// TODO: selesaikan fungsi calculateTotalRevenue dari order yang berstatus Selesai
function calculateTotalRevenue() {
  let sum = 0;
  for(let j = 0; j < order.length; j++){
    if(order[j].status == "Selesai"){
      sum += order[j].totalPrice;
    }
  }
  return sum;
}

// TODO: selesaikan fungsi deleteOrder
function deleteOrder(id) {
  for(let k = 0; k < order.length; k++){
    if(order[k].id == id){
      order.splice(k, 1);
    }
  }
}

export { order, addOrder, updateOrderStatus, calculateTotalRevenue, deleteOrder };
