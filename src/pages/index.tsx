import React, { useState } from "react";

const Home = () => {
  const apiKey = process.env.OAI_KEY;
  const [message, setMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(message);
    setMessage("");
  };

  return (
    <div>
      <h1>What&apos;s on your mind today?</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Type thoughts here"
          value={message}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
