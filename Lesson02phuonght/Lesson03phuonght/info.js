function formatName(fullName) {
    // Bước 1: Loại bỏ khoảng trắng thừa ở đầu, cuối và giữa
    let trimmed = fullName.trim().toLowerCase().replace(/\s+/g, ' ');

    // Bước 2: Viết hoa chữ cái đầu mỗi từ
    let words = trimmed.split(' ');
    let capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Bước 3: Ghép lại thành chuỗi
    return capitalizedWords.join(' ');
}
console.log(formatName("  nguyễn văn   an  ")); 


function validateEmail(email) {
    // Kiểm tra xem email có chứa dấu @ và kết thúc bằng .com
    const emailPattern =/ @ +\.(com)$/;
    return emailPattern.test(email);
}
console.log (validateEmail("test@gmail.com"));


function extractDomain(email) {
    // Lấy tên miền từ email. Tách chuỗi email tại dấu @ và lấy phần sau dấu @ (tên miền)
    const domain = email.split('@')[1];
    return domain;
}
console.log(extractDomain("user@gmail.com"));  // "gmail.com"

function createUsername(fullName) {
    // Bước 1: Xoá khoảng trắng thừa, chuyển về chữ thường
    let normalized = fullName.trim().toLowerCase();

    // Bước 2: Thay khoảng trắng bằng dấu gạch dưới
    let username = normalized.replace(/ /g, '_');

    return username;
}
console.log(createUsername("Nguyễn Văn An"));