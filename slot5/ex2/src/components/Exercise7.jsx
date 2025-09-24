export const Exercise7 = () => {
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 },
  ];

  const company0New = { ...companies[0], start: companies[0].start + 1 };

  function concatAll(...arrays) {
    return [].concat(...arrays);
  }

  return (
    <div>
      <h2>Kết quả của Exercise 7</h2>

      <p>Phần tử đầu tiên của mảng companies là companies[0]:</p>
      <div>
        {companies[0].name} - {companies[0].category} - {companies[0].start} -{" "}
        {companies[0].end}
      </div>

      <p>Giá trị của company0New là:</p>
      <div>
        {company0New.name} - {company0New.category} - {company0New.start} -{" "}
        {company0New.end}
      </div>

      <p>Kết quả của hàm concatAll([1,2],[3],[4,5]):</p>
      <div>{concatAll([1, 2], [3], [4, 5]).join(", ")}</div>
    </div>
  );
};
