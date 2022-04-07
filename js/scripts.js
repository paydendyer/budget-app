const btn = document.getElementById("myBtn");
const amountInput = document.getElementById("number");
const addForm = document.getElementById("addForm");

const budgetAmount = document.getElementById("budgetAmount");
const balanceAmount = document.getElementById("balanceAmount");

const expForm = document.getElementById("expForm");
const expensesAmount = document.getElementById("expensesAmount");
const displayExpenses = document.getElementById("displayExpenses");
let expName = document.getElementById("expName");
let expNumber = document.getElementById("expNumber");

const budgetForm = document.getElementById("budget-form");

let id = 0;
let details = [];

//Takes budget amount and displays it after user adds an amount
function getBudgetAmount(amount) {
  if (!amount) {
    amountInput.style.border = "1px solid #b80c09";
    amountInput.placeholder = "input can not be empty";
    amountInput.style.color = "#b80c09";
    setTimeout(() => {
      amountInput.style.color = "#495057";
      amountInput.style.border = "1px solid gray";
    }, 3000);
  } else {
    budgetAmount.innerText = amount;
    balanceAmount.innerText = amount;
    expForm.style.display = "block";
    budgetForm.style.display = "none";
    amountInput.value = "";
  }
}
//Creates Expense
function addExpenses(name, number) {
  if(!name.length || !number.length) {
    expName.style.border = "1px solid #b80c09";
    expName.placeholder = "input can not be empty";
    expName.style.color = "#b80c09";

    expNumber.style.border = "1px solid #b80c09";
    expNumber.placeholder = "input can not be empty";
    expNumber.style.color = "#b80c09";

    setTimeout(() => {
      expName.style.color = "#495057";
      expName.style.border = "1px solid gray";
      expName.placeholder = "input can not be empty";

      expNumber.placeholder = "input can not be empty";
      expNumber.style.border = "1px solid gray";
      expNumber.style.color = "#495057";
    }, 3000);
  } else {
    const userExp = {
      id: id,
      name: name,
      number: parseInt(number),
    };
    details.push(userExp);
    displayExp(details);
    id++;
    expName.value = "";
    expNumber.value = "";
  }
}
//Displays expenses
function displayExp(details) {
  expValue.innerHTML = null;
  for (i=0; i < details.length; i++) {
    expValue.innerHTML += `
    <div class="expValue" id="${details[i].id}">
      <div id="expTitleName" class="exp col"><p>${details[i].name}</p></div>
      <div id="expValueAmount" class="exp col"><p> <span>$ </span> ${details[i].number}</p></div>
      <div id="edite_delete">
        <p>
          <button id="${details[i].id}" onclick="delExpenseDetails(${details[i].id})"><i class="fa-solid fa-trash"></i></button>
        </p>
      </div>
    </div>
    `;
  }
  calcExpenses();
  displayExpenses.style.display = "block";
}

//Calculates expenses
function calcExpenses() {
  let totalExp = 0;
  for (i=0; i < details.length; i++) {
    totalExp = details[i].number + totalExp;
  }
  expensesAmount.innerText = totalExp;
  updateBalance();
}

//Gets total balance
function updateBalance() {
  balanceAmount.innerText =
    parseInt(budgetAmount.innerText) - parseInt(expensesAmount.innerText);
}

//Delete an expense
function delExpenseDetails(id) {
  let index = details.findIndex((item) => item.id === id);
  details.splice(index, 1);
  displayExp(details);
}


expForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addExpenses(expName.value, expNumber.value);
});

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getBudgetAmount(amountInput.value);
  });