<template>
    <div class="money-packet">
      <header>
        <button class="back-button">←</button>
        <h1>Money Packet</h1>
      </header>
      
      <nav>
        <button>Transfer</button>
        <button>Receive</button>
        <button class="active">Money Packet</button>
      </nav>
      
      <div class="main-content">
        <img src="path-to-your-image.png" alt="Money Packet Illustration">
        <h2>Send Money Packet to friends & family!</h2>
        <p>The total amount will be randomly distributed.</p>
        <button class="create-button">Create Money Packet</button>
      </div>
      
      <div class="history">
        <div class="history-header">
          <h3>History</h3>
          <a href="#">See all</a>
        </div>
        <ul class="transaction-list">
          <li v-for="transaction in transactions" :key="transaction.id">
            <div class="transaction-info">
              <span class="transaction-name">{{ transaction.name }}</span>
              <span class="transaction-date">{{ transaction.date }}</span>
            </div>
            <span :class="['transaction-amount', { 'negative': transaction.amount < 0 }]">
              {{ formatAmount(transaction.amount) }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MoneyPacket',
    data() {
      return {
        transactions: [
          { id: 1, name: 'Random Money Packet', date: '09/01/2023 17:17:32', amount: -1000.00 },
          { id: 2, name: 'Packet from Touch \'n Go eWallet', date: '09/01/2023 16:56:38', amount: 0.84 },
          { id: 3, name: 'Packet from Batman5954', date: '23/12/2022 14:45:46', amount: 1.06 },
          { id: 4, name: 'Random Money Packet', date: '23/12/2022 14:33:35', amount: -100.00 },
          { id: 5, name: 'Random Money Packet', date: '23/12/2022 14:09:31', amount: -100.00 },
        ]
      }
    },
    methods: {
      formatAmount(amount) {
        return amount < 0 ? `-RM${Math.abs(amount).toFixed(2)}` : `+RM${amount.toFixed(2)}`;
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add your styles here */
  .money-packet {
    background-color: #ffffff;
    font-family: Arial, sans-serif;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  
  header {
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #007bff;
    color: white;
  }
  
  .back-button {
    background: none;
    border: none;
    font-size: 24px;
    margin-right: 10px;
    color: white;
  }
  
  h1 {
    margin: 0;
    font-size: 24px;
  }
  
  nav {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #f0f0f0;
  }
  
  nav button {
    flex: 1;
    padding: 10px;
    border: none;
    background-color: transparent;
    font-size: 16px;
  }
  
  nav button.active {
    background-color: #007bff;
    color: white;
  }
  
  .main-content {
    text-align: center;
    padding: 20px;
    flex-grow: 1;
  }
  
  .main-content img {
    max-width: 100%;
    max-height: 200px;
    margin-bottom: 20px;
  }
  
  .create-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
  }
  
  .history {
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .history-header h3 {
    margin: 0;
  }
  
  .transaction-list {
    list-style-type: none;
    padding: 0;
  }
  
  .transaction-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .transaction-info {
    display: flex;
    flex-direction: column;
  }
  
  .transaction-name {
    font-weight: bold;
    margin-bottom: 4px;
  }
  
  .transaction-date {
    font-size: 12px;
    color: #666;
  }
  
  .transaction-amount {
    font-weight: bold;
  }
  
  .negative {
    color: red;
  }
  </style>