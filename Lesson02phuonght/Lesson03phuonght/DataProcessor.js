class DataProcessor {
    static formatStudentData(students) {
        // Trả về mảng thông tin học sinh dạng chuỗi
        return students.map(s => `ID: ${s.studentId}, Name: ${s.name}, Age: ${s.age}`);
    }

    static calculateGradeDistribution(students, subjects = ["Toán", "Lý", "Hóa", "Văn", "Anh"]) {
        // Tính phân bố điểm cho từng loại
        let total = 0, gioi = 0, kha = 0, tb = 0, yeu = 0;
        students.forEach(s => {
            subjects.forEach(sub => {
                const score = s.scores?.[sub];
                if (typeof score === "number") {
                    total++;
                    if (score >= 8) gioi++;
                    else if (score >= 6.5) kha++;
                    else if (score >= 5) tb++;
                    else yeu++;
                }
            });
        });
        return {
            Gioi: total ? (gioi / total * 100).toFixed(2) : 0,
            Kha: total ? (kha / total * 100).toFixed(2) : 0,
            TB: total ? (tb / total * 100).toFixed(2) : 0,
            Yeu: total ? (yeu / total * 100).toFixed(2) : 0
        };
    }

    static generateStudentId(name, existingIds) {
        // Tạo mã học sinh từ tên, ví dụ: "Nguyễn Văn An" => "NVA01"
        const initials = name.split(" ").map(w => w[0]).join("").toUpperCase();
        let id = initials + "01";
        let count = 1;
        while (existingIds.has(id)) {
            count++;
            id = initials + String(count).padStart(2, "0");
        }
        return id;
    }

    static parseCSVData(csvString) {
        // Parse CSV thành array object
        const lines = csvString.trim().split("\n");
        const header = lines[0].split(",");
        return lines.slice(1).map(line => {
            const values = line.split(",");
            const obj = {};
            header.forEach((key, i) => obj[key.trim()] = values[i]?.trim());
            return obj;
        });
    }
}

export default DataProcessor;