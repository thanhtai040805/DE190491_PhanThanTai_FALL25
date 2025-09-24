export const Exercise4 = () => {

    const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

    const [first, , third = 0, ...restAge] = ages; 
    return (
      <div>
        <h2>Kết quả của Exercise 4</h2>

        <p>Phần tử đầu tiên của mảng là: {first}</p>

        <p>Phần tử thứ 3 của mảng là: {third}</p>
        <p>
          Các phần tử còn lại của mảng là: <span>{restAge.join(", ")}</span>
        </p>
      </div>
    );
}