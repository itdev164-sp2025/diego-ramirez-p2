import React from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { Flex, Text, Button } from "rebass";
import { Sun, Moon } from "styled-icons/feather";

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [input, setInput] = React.useState("");

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleAdd = () => {
    if (input.trim() === "") return;
    setItems([...items, { text: input.trim(), done: false }]);
    setInput("");
  };

  const handleRemove = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const toggleDone = (index) => {
    const newItems = [...items];
    newItems[index].done = !newItems[index].done;
    setItems(newItems);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <StyledApp>
        <Flex alignItems="center" justifyContent="space-between" mb={3}>
          <Text fontSize={4} fontWeight="bold">
            Smart To Do App
          </Text>
          <Button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            sx={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color: isDarkMode ? "#FFC107" : "#333",
            }}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </Button>
        </Flex>

        <Text fontSize={2} color="gray" mb={4}>
          Your friendly neighborhood to-do list — helping you stay organized and productive, one task at a time!
        </Text>

        <Flex mb={3} as="form" onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a new item"
            style={{
              flexGrow: 1,
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: `1px solid ${isDarkMode ? "#555" : "#ccc"}`,
              marginRight: "10px",
              backgroundColor: isDarkMode ? "#222" : "#fff",
              color: isDarkMode ? "#eee" : "#111",
            }}
          />
          <Button
            type="submit"
            sx={{
              backgroundColor: "#007BFF",
              color: "white",
              "&:hover": { backgroundColor: "#0056b3" },
            }}
          >
            Add
          </Button>
        </Flex>

        {items.length === 0 ? (
          <Text>No items added yet.</Text>
        ) : (
          <ul style={{ paddingLeft: "20px" }}>
            {items.map((item, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <label style={{ flexGrow: 1, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleDone(index)}
                    style={{ marginRight: "10px" }}
                  />
                  <Text
                    as="span"
                    sx={{
                      textDecoration: item.done ? "line-through" : "none",
                      color: item.done ? "gray" : "inherit",
                    }}
                  >
                    {item.text}
                  </Text>
                </label>
                <Button
                  onClick={() => handleRemove(index)}
                  sx={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    fontSize: "14px",
                    padding: "4px 8px",
                    "&:hover": { backgroundColor: "#a71d2a" },
                    marginLeft: "10px",
                  }}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </StyledApp>
    </ThemeProvider>
  );
}

const StyledApp = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export default App;















