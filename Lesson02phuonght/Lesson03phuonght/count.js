function basicCalculator(operation, a, b) {
    switch (operation) {
        case "add":
            return a + b;
        
        case "multiply":
            return a * b;
        }
}
console.log(basicCalculator("add", 5, 3)); 
console.log(basicCalculator("multiply", 4, 6));


 //  // Tính thuế (mặc định 10%)
function calculateTax(amount, taxRate = 0.1) {
   return amount * taxRate;
}
console.log(calculateTax(1000)); 


// Tính giá sau khi giảm giá
function calculateDiscount(originalPrice, discountPercent) {
    
    return originalPrice * (1 - discountPercent / 100);
}
console.log(calculateDiscount(100, 20));  // Output: 80 (Giảm 20% từ 100)


    // Tính lãi kép: A = P(1 + r/n)^(nt)
function calculateCompoundInterest(principal, rate, time, compound = 1) {
    const amount = principal * Math.pow(1 + rate / compound, compound * time);
    return amount;
}
console.log(calculateCompoundInterest(1000, 0.05, 2, 12)); // Output: ~1104.89 (Lãi kép hàng tháng)



// Định dạng số với dấu phẩy phân cách, sau đó thêm loại tiền tệ
function formatCurrency(amount, currency = "VND") {
    return amount.toLocaleString() + " " + currency;
}
console.log(formatCurrency(1234567, "VND"));  // Output: "1,234,567 VND"


