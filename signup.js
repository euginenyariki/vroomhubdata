// Sign Up Form Validation
document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Basic client-side validation
    if (username.trim() === "" || email.trim() === "" || password.trim() === "") {
        alert("All fields are required");
        return;
    }

    // You can add more validation, such as checking email format, password strength, etc.

    // If all validation passes, you can submit the form to the server here.
    // Example: Send the data to the server using fetch or XMLHttpRequest.
    // See the PHP code for handling the form submission on the server.
});

// Login Form Validation
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Basic client-side validation
    if (email.trim() === "" || password.trim() === "") {
        alert("Email and password are required");
        return;
    }

    // You can add more validation, such as checking email format, password strength, etc.

    // If all validation passes, you can submit the form to the server here.
    // Example: Send the data to the server using fetch or XMLHttpRequest.
    // See the PHP code for handling the form submission on the server.
});
