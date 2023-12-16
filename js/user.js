class User {
    constructor(username, name, email, phone, subscription, balance = 0) {
      this.username = username;
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.subscription = subscription;
      this.balance = balance;
    }
  
    // Method to update user's balance
    updateBalance(amount) {
      this.balance += amount;
    }

    saveToLocalStorage() {
        localStorage.setItem('user', JSON.stringify(this));
      }
    
      // Retrieve user data from Local Storage
    static loadFromLocalStorage() {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          return new User(user.username, user.name, user.email, user.phone, user.subscription, user.balance);
        }
        return null; // If no user data is found
      }
}

function insertUserData(user) {
    document.querySelector('.user-username').textContent = user.name
    document.querySelector('.menu-username').textContent = user.name
    document.querySelector('.user-nickname').textContent = user.username;
    document.querySelector('.user-email').textContent = user.email;
    document.querySelector('.user-phone').textContent = user.phone;
    document.querySelector('.user-subscription').textContent = user.subscription;
}



