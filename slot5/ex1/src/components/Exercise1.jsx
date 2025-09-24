export const Exercise1 = () => {
    const double = x => x * 2;

    const isEven = x => x%2 === 0;

    return (
      <>
        <h2>Exercise1</h2>
        <p>Ket qua ham double(5): {double(5)}</p>
        <p>Ket qua cu isEven(4): {isEven(4) ? "Chan" : "le"}</p>
      </>
    );
    
} 