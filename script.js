document.addEventListener("DOMContentLoaded", function () {
    const lengthSlider = document.getElementById("length");
    const lengthValue = document.getElementById("length-value");
    const uppercaseCheckbox = document.getElementById("uppercase");
    const lowercaseCheckbox = document.getElementById("lowercase");
    const numbersCheckbox = document.getElementById("numbers");
    const symbolsCheckbox = document.getElementById("symbols");
    const generateBtn = document.getElementById("generate");
    const resultDiv = document.getElementById("result");
    const passwordDiv = document.getElementById("password");
    const copyBtn = document.getElementById("copy");
    const strengthBar = document.getElementById("strength-bar");

    // Update length display when slider changes
    lengthSlider.addEventListener("input", function () {
        lengthValue.textContent = this.value;
    });

    // Generate password when button is clicked
    generateBtn.addEventListener("click", function () {
        const length = lengthSlider.value;
        const includeUppercase = uppercaseCheckbox.checked;
        const includeLowercase = lowercaseCheckbox.checked;
        const includeNumbers = numbersCheckbox.checked;
        const includeSymbols = symbolsCheckbox.checked;

        if (
            !includeUppercase &&
            !includeLowercase &&
            !includeNumbers &&
            !includeSymbols
        ) {
            alert("Please select at least one character type!");
            return;
        }

        const password = generatePassword(
            length,
            includeUppercase,
            includeLowercase,
            includeNumbers,
            includeSymbols
        );
        passwordDiv.textContent = password;
        resultDiv.style.display = "block";

        // Calculate and display password strength
        const strength = calculatePasswordStrength(password);
        updateStrengthMeter(strength);
    });

    // Copy password to clipboard
    copyBtn.addEventListener("click", function () {
        const password = passwordDiv.textContent;
        navigator.clipboard.writeText(password).then(function () {
            copyBtn.textContent = "Copied!";
            setTimeout(function () {
                copyBtn.textContent = "Copy";
            }, 2000);
        });
    });

    // Password generation function
    function generatePassword(length, uppercase, lowercase, numbers, symbols) {
        let chars = "";
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const numberChars = "0123456789";
        const symbolChars = "!@#$%^&*()_+~`|}{[]\\:;?><,./-=";

        if (uppercase) chars += uppercaseChars;
        if (lowercase) chars += lowercaseChars;
        if (numbers) chars += numberChars;
        if (symbols) chars += symbolChars;

        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }

        return password;
    }

    // Password strength calculation
    function calculatePasswordStrength(password) {
        let strength = 0;
        const length = password.length;

        // Length contributes up to 50 points (4-50 chars)
        strength += Math.min(50, (length / 50) * 50);

        // Character variety contributes up to 50 points
        let varietyScore = 0;
        if (password.match(/[a-z]/)) varietyScore += 10;
        if (password.match(/[A-Z]/)) varietyScore += 10;
        if (password.match(/[0-9]/)) varietyScore += 10;
        if (password.match(/[^a-zA-Z0-9]/)) varietyScore += 20;

        strength += varietyScore;

        // Normalize to 0-100 scale
        return Math.min(100, strength);
    }

    // Update strength meter display
    function updateStrengthMeter(strength) {
        strengthBar.style.width = strength + "%";

        if (strength < 30) {
            strengthBar.style.backgroundColor = "#e74c3c"; // Red
        } else if (strength < 70) {
            strengthBar.style.backgroundColor = "#f39c12"; // Orange
        } else {
            strengthBar.style.backgroundColor = "#2ecc71"; // Green
        }
    }
});
