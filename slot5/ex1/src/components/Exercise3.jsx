export const Exercise3 = () => {
    const person = {
      name: "Costas",
      address: {
        street: "Lalaland 12",
      },
    };

    const {
      address: { street, city = "Unknown City" },
    } = person;

    return (
      <div>
        <h2>Ket qua exercise 3</h2>
        <p>Dia chi: {street}</p>
        <p>Thanh pho: {city}</p>
      </div>
    );
}