export const Exercise5 = () => {

    const people = [
      { name: "Bob", age: 25 },
      { name: "Alice", age: 18 },
      { name: "Joy", age: 30 },
      { name: "Ponk", age: 19 },
      { name: "Buuu", age: 12 },
    ];

    const teens = people
      .filter((p) => (p.age >= 13) & (p.age <= 19))
      .map((p) => (p = `${p.name} (${p.age})`));


    const peopleMax = Math.max(...people.map((p) => p.age));

    return (
      <div>
        <h2>Kết quả của Exercise5 là</h2>
        <p>những người tuổi 13–19 là</p>
        <ul>
          {teens.map((teen, key) => (
            <li key={key}>{teen}</li>
          ))}
        </ul>

        <p>Người có tuổi cao nhất</p>
        <p>
          {peopleMax.name} {peopleMax.age}
        </p>
      </div>
    );
}