import React, { useState } from "react";

const Home: React.FC = () => {
  //const apiKey = process.env.OAI_KEY;
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([
    "What's on your mind today?",
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userMsg = message;
    setMessage("");
    console.log(userMsg);
    setMessages((currMessages) => [...currMessages, userMsg]);
    try {
      const unparsedResponse = await fetch("api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }), //TODO: need to pass through the entire messages array and then use that to send to openai
      });
      if (!unparsedResponse.ok) {
        const errorResponse = await unparsedResponse.json();
        throw new Error(errorResponse.error || "api request didn't succeed");
      }
      const response = await unparsedResponse.json();
      console.log(response);
      setMessages((currMessages) => [...currMessages, response.data]);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <div>
      <h1>Welcome to Melly, your Mental Health Assisant!</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <form onSubmit={handleFormSubmit}>
        <textarea
          rows={4}
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
