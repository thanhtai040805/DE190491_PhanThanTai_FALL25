export const Exercise2 = () => {
    const numbers = [1,12,-3,4,15,20,-10,8,7,6]

    const sum = (nums) => {
      let sumResult = 0;
      const newArr = nums.filter((num) => !isNaN(num));
      newArr.map((num) => (sumResult = Number(num) + sumResult));
      return sumResult;
    };

    const sum2 = numbers.reduce((acc , current) => acc += current,0);


    const avg = (nums) => {
        const count = nums.filter((num) => !isNaN(num)).length;
        if(count === 0) return 0;
        return sum(nums) / count; 
    }

    // Khai bao mang chuoi names, in ra danh sach cac ten theo thu tu tang dan alphabet
    const names = ["Buuu", "Bob", "Alice", "Joy", "Ponk"];
    names.sort();


    const students = [
      { id: 1, name: "Alice", age: 20, grade: 8.5 },
      { id: 2, name: "Bob", age: 21, grade: 7.2 },
      { id: 3, name: "Charlie", age: 19, grade: 9.0 },
      { id: 4, name: "David", age: 22, grade: 6.8 },
      { id: 5, name: "Eva", age: 20, grade: 8.0 },
    ];

    const topStudent = students.filter(student => student.grade >= 7.5).sort((a,b) => b.grade - a.grade)
    const avgGradeTopStudent = (
      topStudent.reduce((acc, current) => (acc += current.grade), 0) /
      topStudent.length
    ).toFixed(2);



    return (
      <div>
        <h2>Ket qua Exercise2</h2>
        <p>In ra mang so nguyen</p>
        <ul>
          {numbers.map((number, key) => (
            <li key={key}>{number}</li>
          ))}
        </ul>
        <p>Ket qua cua ham sum(numbers): {sum(numbers)}</p>
        <p>Gia tri cua tong cac phan tu trong mang: {sum2}</p>
        <p>
          Gia tri trung binh cua cac phan tu trong mang:{" "}
          {avg(numbers).toFixed(2)}
        </p>

        <p>Hien thi danh sach duoi dang mang</p>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Grade</th>
            </tr>
          </thead>

          <tbody>
            {topStudent.map((student) => {
              return (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.grade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>Diem trung binh cua ca hoc sinh tren la: {avgGradeTopStudent}</p>
      </div>
    );
}