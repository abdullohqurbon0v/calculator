import React, { useState } from "react";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");

  const handleButtonClick = (value: string): void => {
    setInput((prev) => prev + value);
  };

  const calculateResult = (): void => {
    try {
      setInput(eval(input).toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const clearInput = (): void => {
    setInput("");
  };

  const deleteLast = (): void => {
    setInput((prev) => prev.slice(0, -1));
  };

  return (
    <div style={styles.container}>
      <div style={styles.calculator}>
        <input
          type="text"
          value={input}
          readOnly
          style={styles.display}
          placeholder="0"
        />
        <div style={styles.buttons}>
          {[
            "%", "CE", "C", "⌫",
            "1/x", "x²", "√", "/",
            "7", "8", "9", "*",
            "4", "5", "6", "-",
            "1", "2", "3", "+",
            "±", "0", ".", "="
          ].map((val) => (
            <button
              key={val}
              style={styles.button}
              onClick={() => {
                if (val === "C") clearInput();
                else if (val === "⌫") deleteLast();
                else if (val === "=") calculateResult();
                else if (val === "1/x") setInput((prev) => (1 / parseFloat(prev)).toString());
                else if (val === "x²") setInput((prev) => (Math.pow(parseFloat(prev), 2)).toString());
                else if (val === "√") setInput((prev) => Math.sqrt(parseFloat(prev)).toString());
                else if (val === "%") setInput((prev) => (parseFloat(prev) / 100).toString());
                else if (val === "±") setInput((prev) => (parseFloat(prev) * -1).toString());
                else handleButtonClick(val);
              }}
            >
              {val}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#121212",
  },
  calculator: {
    width: "360px",
    backgroundColor: "#1e1e1e",
    borderRadius: "10px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.6)",
    overflow: "hidden",
    padding: "20px",
  },
  display: {
    width: "100%",
    height: "60px",
    fontSize: "24px",
    textAlign: "right",
    padding: "10px",
    border: "1px solid #444",
    outline: "none",
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  buttons: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
  },
  button: {
    height: "60px",
    fontSize: "18px",
    border: "1px solid #444",
    borderRadius: "5px",
    backgroundColor: "#444",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.2s, transform 0.1s",
  },
};

export default App;
