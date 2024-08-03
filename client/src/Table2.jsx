import React, { useState, useEffect } from "react";
import Circle from "./Circle";

const Table2 = ({ data }) => {
  const [totals, setTotals] = useState([]);
  const [timeArray, setTimeArray] = useState([]);
  const [prefix, setPrefix] = useState([0]);
  const [curtime, setCurtime] = useState(0);

  useEffect(() => {
    const calculateTotals = () => {
      const newTotals = [];
      for (const key in data) {
        const total = data[key].Total;
        newTotals.push(total);
      }
      setTotals(newTotals);
    };
    if (data) {
      calculateTotals();
    }
  }, [data]);

  useEffect(() => {
    const t = [];
    let maxN = Math.max(...totals);
    for (let i = 0; i < totals.length; i++) {
      t.push(Math.floor((totals[i] / maxN) * 5));
    }
    setTimeArray(t);
  }, [totals]);

  useEffect(() => {
    if (timeArray.length > 0) {
      let sum = 0;
      let arr = [];
      for (let i = 0; i < timeArray.length; i++) {
        sum += timeArray[i];
        arr.push(sum);
      }
      setPrefix([0, ...arr]);
    }
  }, [timeArray]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurtime(
        (prevCurtime) => (prevCurtime + 1) % (prefix[prefix.length - 1] || 1)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [prefix]);
  console.log(prefix);
  console.log(timeArray);
  console.log(totals);
  return (
    <div>
      <table style={{ borderCollapse: "collapse", border: "1px solid #ccc",marginTop:"32px" }}>
        <tbody>
          {data &&
            Object.entries(data).map(([key, value], indexMap) => {
              return (
                <tr key={key}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    Camera:{key}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                   Available: {value.available}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    Total:{value.total}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table2;
