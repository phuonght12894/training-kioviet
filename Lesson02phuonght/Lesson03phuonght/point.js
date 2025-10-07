const { zstdCompress } = require("zlib");

function calculateAverage(scores) {
    // Bước 1: Tính tổng điểm
    const total = scores.reduce((acc, score) => acc + score, 0);
    
    // Bước 2: Tính điểm trung bình
    const average = total / scores.length;
    
    // Trả về điểm trung bình
    return average;
}
console.log(calculateAverage([8, 7, 9, 6, 10]));

function findHighestScore(scores) {
    // Sử dụng Math.max để tìm điểm cao nhất trong mảng
    return Math.max(...scores);
}
console.log(findHighestScore([8, 7, 9, 6, 10]));


function countPassingGrades(scores, passingScore = 5) {
    // Lọc ra các điểm số >= điểm đậu và đếm số phần tử trong mảng đã lọc
    return scores.filter(score => score >= passingScore).length;
}
console.log(countPassingGrades([8, 4, 9, 3, 10], 5));

function filterFailingStudents(students, scores) {
    const failingStudents = [];

    for (let i = 0; i < students.length; i++) {
        if (scores[i] < 5) {
            failingStudents.push(students[i]);
        }
    }

    return failingStudents;
}
console.log(filterFailingStudents(["An", "Bình", "Chi"], [8, 4, 6]));  

function sortStudentsByScore(students, scores) {
    // Tạo mảng các cặp [học sinh, điểm]
    const studentScores = students.map((student, index) => [student, scores[index]]);
    
    // Sắp xếp mảng theo điểm giảm dần
    studentScores.sort((a, b) => b[1] - a[1]);
    
    return studentScores;
}
console.log(sortStudentsByScore(["An", "Bình", "Chi"], [6, 9, 7]));
// Output: [["Bình", 9], ["Chi", 7], ["An", 6]]