let AddToBill = document.getElementById("btn");

AddToBill.addEventListener("click", addOrderToCrudCrud);

var editId = null;

async function addOrderToCrudCrud(event) {
  try {
    // event.preventDefault();
    // console.log("working")
    let price = document.getElementById("price").value;
    let dish = document.getElementById("dish").value;
    let table = document.getElementById("table").value;

    if (price === "" || dish === "" || table === "") {
      confirm("price , dish and table number required");
      return;
    }

    // console.log(price +" " +dish + " " + table)

    let obj = {
      price,
      dish,
      table,
    };

    if (editId) {
      try {
        let value = await axios.put(
          `https://crudcrud.com/api/bf8ea78090bc44d5ae7509fc3019c2ae/OrderData/${editId} `,
          obj
        );

        console.log(value);
        showOrderOnUI(editId);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        let res = await axios.post(
          `https://crudcrud.com/api/bf8ea78090bc44d5ae7509fc3019c2ae/OrderData`,
          obj
        );
        console.log(res);
        // console.log(res.data._id);
        let ID = res.data._id;
        // console.log(ID);
        showOrderOnUI(ID);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function showOrderOnUI(ID) {
  try {
    document.getElementById("price").value = "";
    document.getElementById("dish").value = "Dish";
    document.getElementById("table").value = "table";

    let res = await axios.get(
      `https://crudcrud.com/api/bf8ea78090bc44d5ae7509fc3019c2ae/OrderData/${ID}`
    );

    let table = res.data.table;
    let price = res.data.price;
    let dish = res.data.dish;

    let parentElem = document.getElementById(table);
    let childElem = `<li id='${ID}'>  ${price} - ${dish} - ${table} 
                <button class="btn btn-warning mb-2" onclick=editOrder('${ID}') >Change Order</button>
                <button class="btn btn-danger mb-2" onclick=deleteOrder('${ID}') >Delete Order</button>
                </li>`;

    parentElem.innerHTML = parentElem.innerHTML + childElem;
  } catch (error) {
    console.log(error);
  }
}

async function editOrder(ID) {
  try {
    // console.log(ID)
    editId = ID;

    let res = await axios.get(
      `https://crudcrud.com/api/bf8ea78090bc44d5ae7509fc3019c2ae/OrderData/${ID}`
    );

    // console.log(res.data.price);
    document.getElementById("price").value = res.data.price;
    document.getElementById("dish").value = res.data.dish;
    document.getElementById("table").value = res.data.table;

    removeOrderFromUI(ID);
  } catch (error) {
    console.log(error);
  }
}

async function deleteOrder(ID) {
  try {
    // console.log(ID)

    removeOrderFromUI(ID);
    let res = await axios.delete(
      `https://crudcrud.com/api/bf8ea78090bc44d5ae7509fc3019c2ae/OrderData/${ID}`
    );

    console.log(res);
    // console.log();
  } catch (error) {
    console.log(error);
  }
}

async function removeOrderFromUI(ID) {
  try {
    // console.log(harish);

    let res = await axios.get(
      `https://crudcrud.com/api/bf8ea78090bc44d5ae7509fc3019c2ae/OrderData/${ID}`
    );

    // console.log(res.data.table);
    let parentElem = document.getElementById(res.data.table);
    let childElem = document.getElementById(ID);

    parentElem.removeChild(childElem);
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    let res = await axios.get(
      `https://crudcrud.com/api/bf8ea78090bc44d5ae7509fc3019c2ae/OrderData`
    );

    // console.log(res);

    res.data.forEach((element) => {
      // console.log(element._id);
      showOrderOnUI(element._id);
    });
  } catch (err) {
    console.log(err);
  }
});
