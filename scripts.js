const modal = {
  open() {
    document
      .querySelector('.modal-overlay')
      .classList
      .add('active')
  },
  close() {
    document
      .querySelector('.modal-overlay')
      .classList
      .remove('active')
  }
}

const Transaction = {
  all: [
    {
      description: 'luz',
      amount: -50000,
      date: '20/08/2021',
    },
    {
      description: 'Criação de Website',
      amount: 500000,
      date: '28/08/2021',
    },
    {
      description: 'Internet',
      amount: -10000,
      date: '25/08/2021',
    }
  ],

  add(transaction) {
    Transaction.all.push(transaction);
    App.reload()
  },

  remove(index) {
    Transaction.all.splice(index, 1); 
    App.reload();
  },

  incomes() {
    let income = 0

    Transaction.all.forEach(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    })

    return income;

  },

  expenses() {
    let expense = 0;

    Transaction.all.forEach(transaction => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    })

    return expense;
  },
  total() {
    return Transaction.incomes() + Transaction.expenses();
  }
}

const DOM = {
  transactionContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrecy(transaction.amount);
    console.log(amount);

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td class="cursor">
        <img src="./assets/minus.svg" alt="Remover transação">
      </td>
    `
    return html
  },

  updateBalance() {
    document
      .getElementById('incomesDisplay')
      .innerHTML = Utils.formatCurrecy(Transaction.incomes());

    document
      .getElementById('expensesDisplay')
      .innerHTML = Utils.formatCurrecy(Transaction.expenses());

    document
      .getElementById('totalDisplay')
      .innerHTML = Utils.formatCurrecy(Transaction.total());
  },

  clearTransaction() {
    DOM.transactionContainer.innerHTML = '';
  }
}

const Utils = {
  formatCurrecy(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
    return signal + value;
  }
}

const Form = {

  description = document.querySelector('input#description'),
  amount = document.querySelector('input#amount'),
  date = document.querySelector('input#date'),

  getValue() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    }
  },

  validateFields() {
      const { description, amount, date} = Form.getValue();

        if(description.trim() === "" ||
          amount.trim() === "" ||
          date.trim() === "") {
              throw new Error("Por favor preencha todos os campos")
        }
  }, 

  submit(event) {
    event.preventDefault();
     
      try {
          Form.validateFields()

      }catch (error) {
        alert(error.message);
      }

  }
}

const App = {
   init() {

    Transaction.all.forEach(transaction => {
      DOM.addTransaction(transaction);
    });
    
    DOM.updateBalance();
    
   },

   reload() {
     DOM.clearTransaction();
      App.init();
   },
}

App.init()

