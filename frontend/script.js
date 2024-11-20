// Handle cart storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add items to the cart
function addToCart(item, price) {
    const existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ item, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item} added to the cart.`);
    updateCart();
}

// Update the cart page
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-button');
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty. Start adding items from the menu!</p>';
        checkoutButton.style.display = 'none';
    } else {
        cartItemsDiv.innerHTML = '<h3>Items in Your Cart:</h3>';
        cart.forEach(item => {
            cartItemsDiv.innerHTML += `<p>${item.item} - $${item.price} x ${item.quantity}</p>`;
        });
        checkoutButton.style.display = 'inline-block';
    }
}

// Display order summary on checkout page
function displayOrderSummary() {
    const orderSummaryDiv = document.getElementById('order-summary');
    if (cart.length === 0) {
        orderSummaryDiv.innerHTML = '<p>No items in your order yet.</p>';
    } else {
        orderSummaryDiv.innerHTML = '<h3>Your Order:</h3>';
        cart.forEach(item => {
            orderSummaryDiv.innerHTML += `<p>${item.item} - $${item.price} x ${item.quantity}</p>`;
        }); 
    }
}

//clear the checkout
function submitOrder(){
    if(cart === 0){
        alert("add some itmes to the cart");
    }else{
        alert("your order is successfull");

    }
}

// Call the function to update cart on relevant pages
if (document.getElementById('cart-items')) {
    updateCart();
}

if (document.getElementById('order-summary')) {
    displayOrderSummary();
}

// Handle login logic
function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const storedUser = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUser.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('username', username);
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password.');
    }
    return false;
}
// Handle user registration logic (Sign Up)
function signupUser() {
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmpassword = document.getElementById('password').value;
    const mobile = document.getElementById('number').value;
    
    
    const mobilepattern =/^\d{10}$/;
    const emailpattern =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // emial verify
    if(email===" "){
        alert("this place must be filled");
        return false;
    }else if (!emailpattern.test(email)) {
         alert("Invalid email format");
         return false;
         }

    //mobile number pattern
     if(mobile===" ")
     {
        alert("enter the must be filled");
        return false;
     }else if (!mobilepattern.test(mobile)) {
        alert("Mobile number must be 10 digits");
         return false;
         }


// Check if the user already exists
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = storedUsers.find(u => u.username === username);

    if (userExists) {
        alert('Username already taken. Please choose another username.');
        return false;
    }
// Save new user to localStorage
    storedUsers.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(storedUsers));

    alert('Sign Up successful! Please log in to continue.');
    window.location.href = 'login.html';
    return false;
}

// Update profile page after login
function updateProfile() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('profile-username').textContent = username;
        document.getElementById('profile-email').textContent = 'user@example.com'; // Dummy email
    }
}

// Call updateProfile function on profile page load
if (document.getElementById('profile-username')) {
    updateProfile();
}

// Handle logout
function logoutUser() {
    localStorage.removeItem('username');
    alert('Logged out successfully');
    window.location.href = 'index.html';
}
