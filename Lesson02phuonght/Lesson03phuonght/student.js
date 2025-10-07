// student.js

class Student {
    constructor(name, age, studentId) {
        // Khởi tạo thông tin học sinh
        this.name = name;
        this.age = age;
        this.studentId = studentId;
        this.scores = [];  // Mảng chứa điểm môn học
        this.subjects = []; // Mảng chứa tên các môn học
    }

    setScore(subject, score) {
        this.scores[subject] = score;
    }

    getAverageScore() {
        const values = Object.values(this.scores);
        if (values.length === 0) return 0;
        const total = values.reduce((sum, val) => sum + val, 0);
        return total / values.length;
    }

    toString() {
        return `${this.id} - ${this.name} (${this.age} tuổi, ${this.gender})`;
    }

    getGrade() {
        // Xếp loại: >= 8.5: "Giỏi", >= 7: "Khá", >= 5: "Trung bình", < 5: "Yếu"
        const average = this.getAverageScore();
        if (average >= 8.5) return "Giỏi";
        if (average >= 7) return "Khá";
        if (average >= 5) return "Trung bình";
        return "Yếu";
    }

    getSubjectCount() {
        // Đếm số môn học đã có điểm
        return this.scores.length;
    }

    displayInfo() {
        // Hiển thị thông tin đầy đủ của học sinh
        console.log(`Thông tin học sinh:`);
        console.log(`Tên: ${this.name}`);
        console.log(`Tuổi: ${this.age}`);
        console.log(`Mã SV: ${this.studentId}`);
        console.log(`Điểm trung bình: ${this.getAverageScore().toFixed(2)}`);
        console.log(`Xếp loại: ${this.getGrade()}`);
    }

    isEligibleForScholarship(minAverage = 8.0) {
        // Kiểm tra đủ điều kiện học bổng không
        return this.getAverageScore() >= minAverage;
    }
}

// Tạo đối tượng học sinh và kiểm tra các phương thức
// const student1 = new Student("Nguyễn Văn An", 20, "SV001");
// student1.addScore("Toán", 8.5);
// student1.addScore("Lý", 7.5);
// student1.addScore("Hóa", 9.0);

// console.log(student1.getAverageScore()); // Output: 8.33
// console.log(student1.getGrade()); // Output: "Khá"
// console.log(student1.isEligibleForScholarship()); // Output: true
// student1.displayInfo();

// Kết quả hiển thị thông tin đầy đủ của học sinh
export default Student;