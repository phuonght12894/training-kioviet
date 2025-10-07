// Tạo đối tượng học sinh
import Student from './student.js';
import DataProcessor from './DataProcessor.js';
import fs from 'fs';

class ClassRoom {
    constructor(className, teacher) {
        this.className = className;
        this.teacher = teacher;
        this.students = [];
        this.subjects = ["Toán", "Lý", "Hóa", "Văn", "Anh"];
    }

    addStudent(student) {
        // Kiểm tra nếu học sinh đã tồn tại trong lớp (dựa trên studentId)
        if (this.students.some(s => s.studentId === student.studentId)) {
            console.log(`❌ Học sinh với mã ${student.studentId} đã tồn tại.`);
            return;
        }
        this.students.push(student);
        console.log(`✅ Đã thêm học sinh: ${student.name}`);
    }

    //Xóa học sinh khỏi lớp
removeStudent(studentId) {
    // Tìm chỉ số của học sinh trong mảng theo ID
    const index = this.students.findIndex(s => s.id === studentId);
    
    if (index !== -1) {
        // Nếu tìm thấy, xóa học sinh khỏi mảng
        const removedStudent = this.students.splice(index, 1)[0];
        console.log(`✅ Đã xóa học sinh: ${removedStudent.name} (ID: ${removedStudent.id})`);
    } else {
        // Nếu không tìm thấy, thông báo lỗi
        console.log(`❌ Không tìm thấy học sinh với mã ID: ${studentId}`);
    }
}
findStudent(keyword) {
    if (!keyword) {
        console.log("❌ Vui lòng nhập từ khóa tìm kiếm.");
        return [];
    }

    const lowerKeyword = keyword.toLowerCase();

    const results = this.students.filter(student => {
        const name = student.name || "";
        const id = student.id || "";
        return (
            name.toLowerCase().includes(lowerKeyword) ||
            id.toLowerCase().includes(lowerKeyword)
        );
    });

    if (results.length > 0) {
        console.log(`🔍 Kết quả tìm kiếm với từ khóa "${keyword}":`);
        results.forEach(student => {
            console.log(student.name.toString());
        });
    } else {
        console.log(`❌ Không tìm thấy học sinh với từ khóa: "${keyword}"`);
    }

    return results;
}
// Tính điểm trung bình của lớp
getClassAverage() {
    if (this.students.length === 0) {
        console.log("❌ Lớp chưa có học sinh.");
        return 0;
    }

    let total = 0;
    let count = 0;

    this.students.forEach(student => {
        const avg = student.getAverageScore();
        console.log(student.name);
        console.log(student.getAverageScore());
        if (!isNaN(avg)) {
            total += avg;
            count++;
        }
    });

    if (count === 0) {
        console.log("❌ Không có học sinh nào có điểm để tính trung bình.");
        return 0;
    }

    const classAvg = total / count;
    console.log(`📊 Điểm trung bình của lớp ${this.className}: ${classAvg.toFixed(2)}`);
    return classAvg;
}

getTopStudents(count = 3) {
    if (this.students.length === 0) {
        console.log("❌ Lớp chưa có học sinh.");
        return [];
    }

    // Sắp xếp học sinh theo điểm trung bình giảm dần
    const sorted = [...this.students].sort((a, b) => {
        return b.getAverageScore() - a.getAverageScore();
    });

    // Lấy top N học sinh
    const topStudents = sorted.slice(0, count);

    console.log(`🏆 Top ${count} học sinh có điểm trung bình cao nhất:`);
    topStudents.forEach((student, index) => {
        console.log(`${index + 1}. ${student.name} (ID: ${student.studentId}) - Avg: ${student.getAverageScore().toFixed(2)}`);
    });

    return topStudents;
}

getSubjectStatistics(subject) {
    if (!subject) {
        console.log("❌ Vui lòng nhập tên môn học.");
        return null;
    }

    let scores = [];
    let categories = { Gioi: 0, Kha: 0, TB: 0, Yeu: 0 };

    this.students.forEach(student => {
        const score = student.scores && student.scores[subject];
        if (typeof score === "number") {
            scores.push(score);
            if (score >= 8) categories.Gioi++;
            else if (score >= 6.5) categories.Kha++;
            else if (score >= 5) categories.TB++;
            else categories.Yeu++;
        }
    });

    if (scores.length === 0) {
        console.log(`❌ Không có điểm cho môn ${subject}.`);
        return null;
    }

    const max = Math.max(...scores);
    const min = Math.min(...scores);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

    console.log(`📊 Thống kê môn ${subject}:`);
    console.log(`- Điểm cao nhất: ${max}`);
    console.log(`- Điểm thấp nhất: ${min}`);
    console.log(`- Điểm trung bình: ${avg.toFixed(2)}`);
    console.log(`- Số học sinh Giỏi: ${categories.Gioi}`);
    console.log(`- Số học sinh Khá: ${categories.Kha}`);
    console.log(`- Số học sinh Trung Bình: ${categories.TB}`);
    console.log(`- Số học sinh Yếu: ${categories.Yeu}`);

    return { max, min, avg, categories };
}

generateReport() {
    console.log(`===== Báo cáo lớp ${this.className} =====`);
    console.log(`Giáo viên chủ nhiệm: ${this.teacher}`);
    console.log(`Sĩ số: ${this.students.length}`);
    console.log("Danh sách học sinh:");
    this.students.forEach(student => {
        console.log(`- ${student.name} (ID: ${student.studentId})`);
    });
    console.log("\nThống kê các môn học:");
    this.subjects.forEach(subject => {
        this.getSubjectStatistics(subject);
    });
    this.getClassAverage();
    this.getTopStudents();
}

exportStudentList(format = "simple") {
    if (format === "simple") {
        // CSV: StudentID,Name
        return "StudentID,Name\n" + 
            this.students.map(s => `${s.studentId},${s.name}`).join("\n");
    }
    if (format === "detailed") {
        // CSV: StudentID,Name,Age
        return "StudentID,Name,Age\n" + 
            this.students.map(s => `${s.studentId},${s.name},${s.age}`).join("\n");
    }
    if (format === "grades") {
        // CSV: StudentID,Name,Toán,Lý,Hóa,Văn,Anh
        const header = ["StudentID", "Name", ...this.subjects].join(",");
        const rows = this.students.map(s => {
            const grades = this.subjects.map(sub => s.scores?.[sub] ?? "").join(",");
            return `${s.studentId},${s.name},${grades}`;
        });
        return header + "\n" + rows.join("\n");
    }
    return "";
}

importScoresFromString(dataString) {
    // Format: "StudentID,Subject,Score"
    const lines = dataString.split("\n");
    lines.forEach(line => {
        const [studentId, subject, scoreStr] = line.split(",");
        const score = parseFloat(scoreStr);
        const student = this.students.find(s => s.studentId === studentId);
        if (student && this.subjects.includes(subject) && !isNaN(score)) {
            if (!student.scores) student.scores = {};
            student.scores[subject] = score;
            console.log(`✅ Đã nhập điểm ${score} cho ${student.name} môn ${subject}`);
        } else {
            console.log(`❌ Dữ liệu không hợp lệ: ${line}`);
        }
    });
}

validateAllData() {
    let valid = true;
    const ids = new Set();
    this.students.forEach(student => {
        // Kiểm tra thông tin học sinh
        if (!student.studentId || !student.name || typeof student.age !== "number") {
            console.log(`❌ Thiếu thông tin học sinh: ${JSON.stringify(student)}`);
            valid = false;
        }
        // Kiểm tra trùng lặp ID
        if (ids.has(student.studentId)) {
            console.log(`❌ Trùng lặp mã học sinh: ${student.studentId}`);
            valid = false;
        }
        ids.add(student.studentId);
        // Kiểm tra điểm
        if (student.scores) {
            for (const [subject, score] of Object.entries(student.scores)) {
                if (score < 0 || score > 10) {
                    console.log(`❌ Điểm không hợp lệ cho ${student.name} môn ${subject}: ${score}`);
                    valid = false;
                }
            }
        }
    });
    if (valid) {
        console.log("✅ Dữ liệu hợp lệ.");
    }
    return valid;
}

saveStudentListToCSV(filename = "students.csv", format = "simple") {
    const csvData = this.exportStudentList(format);
    fs.writeFileSync(filename, csvData, "utf8");
    console.log(`✅ Đã xuất danh sách học sinh ra file ${filename}`);
}

importScoresFromCSVFile(filename) {
    try {
        const dataString = fs.readFileSync(filename, "utf8");
        this.importScoresFromString(dataString);
        console.log(`✅ Đã nhập điểm từ file ${filename}`);
    } catch (err) {
        console.log(`❌ Lỗi khi đọc file: ${err.message}`);
    }
}

}

const classRoom = new ClassRoom("Lớp 10A", "Cô Lan");
const student1 = new Student("Nguyễn Văn An", 16, "SV001");
const student2 = new Student("Trần Thị Bình", 17, "SV002");
//console.log(student1.getAverageScore()); 

// Thêm học sinh vào lớp
classRoom.addStudent(student1);  // Thêm học sinh thành công
classRoom.addStudent(student2);  // Thêm học sinh thành công
classRoom.addStudent({studentId:"SV001",name: "Anh Thư"});  // Thông báo lỗi, học sinh đã tồn tại
console.log(`✅ Đã thêm học sinh: ${student1.name}`);

//Xóa học sinh khỏi lớp
classRoom.removeStudent("SV002");
classRoom.removeStudent("SV003");

//tìm kiếm học sinh
const myClass = new ClassRoom("Lớp 10A", "Cô Lan");
const studentA = new Student("Nguyễn Văn An", 16, "HS01");
const studentB = new Student("Trần Thị Bình", 17, "HS02");
const studentC = new Student("Khổng Hoàng Anh Thư", 18, "HS03");
myClass.addStudent(studentA);
myClass.addStudent(studentB);
myClass.addStudent(studentC);
myClass.findStudent("An");  // Tìm thấy học sinh Nguyễn Văn An
myClass.findStudent("HS02");  // Tìm thấy học sinh với mã HS02
myClass.findStudent("XYZ");  // Không tìm thấy học sinh nào 

studentA.setScore("Toán", 8.5);
studentA.setScore("Lý", 7.5);
studentA.setScore("Hóa", 9.0);

studentB.setScore("Toán", 8.5);
studentB.setScore("Lý", 8.0);
studentB.setScore("Hóa", 9.0);

studentC.setScore("Toán", 8.5);
studentC.setScore("Lý", 8.5);
studentC.setScore("Hóa", 9.0);

console.log(`Điểm trung bình của ${student1.name} : ${student1.getAverageScore()}`); 
// Tính điểm trung bình của lớp 
myClass.getClassAverage();

myClass.getTopStudents();         // Mặc định: top 3
myClass.getSubjectStatistics("Toán"); // Thống kê môn Toán
myClass.generateReport();         // Báo cáo tổng quát về lớp
myClass.saveStudentListToCSV("students.csv", "grades");
myClass.importScoresFromCSVFile("students.csv");
myClass.validateAllData();        // Kiểm tra tính hợp lệ của dữ liệu

const formatted = DataProcessor.formatStudentData(myClass.students);
console.log(formatted);

const distribution = DataProcessor.calculateGradeDistribution(myClass.students);
console.log(distribution);

const newId = DataProcessor.generateStudentId("Nguyễn Văn An", new Set(myClass.students.map(s => s.studentId)));
console.log(newId);

const csvString = fs.readFileSync("students.csv", "utf8");
const csvArray = DataProcessor.parseCSVData(csvString);
console.log(csvArray);

export default ClassRoom;




