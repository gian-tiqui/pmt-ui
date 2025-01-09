import { useState } from "react";
import { Mention } from "primereact/mention";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS

const App = () => {
  const [suggestions, setSuggestions] = useState<{ name: string }[]>([]);

  const fetchSuggestions = (event: { query: string }) => {
    const query = event.query.toLowerCase();
    const names = [
      { name: "Michael Gian Tiqui" },
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Alice Johnson" },
      { name: "Bob Brown" },
    ];

    const filteredSuggestions = names.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    setSuggestions(filteredSuggestions);
  };

  return (
    <div className="h-screen w-screen grid place-content-center">
      <Mention
        suggestions={suggestions}
        onSearch={fetchSuggestions}
        field={"name"}
        placeholder="Type @ to mention someone..."
        trigger="@"
        cols={50}
      />
    </div>
  );
};

export default App;
