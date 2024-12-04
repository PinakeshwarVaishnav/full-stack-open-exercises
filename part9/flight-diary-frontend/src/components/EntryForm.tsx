import React, { useState } from "react";
import axios from "axios";

const EntryForm: React.FC = () => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();

    try {
      const diaryEntry = {
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment,
      };
      console.log("new created diary entry is", diaryEntry);

      const response = await axios.post(
        "http://localhost:3000/api/diaries",
        diaryEntry,
      );
      console.log("response after saving new diary entry is", response.data);
      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error saving new entry", error);
        alert(error.response?.data);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold text-gray-800 leading-tight">
        Add new entry
      </h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="mt-4 text-gray-700 font-medium">date</label>
        <input
          type="date"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label className="mt-4 text-gray-700 font-medium">visibility</label>
        <label
          htmlFor="great"
          className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
        >
          <input
            id="great"
            value="great"
            type="radio"
            checked={visibility === "great"}
            name="options"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setVisibility(e.target.value)}
          />
          great
        </label>
        <label
          htmlFor="good"
          className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
        >
          <input
            id="good"
            value="good"
            type="radio"
            checked={visibility === "good"}
            name="options"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setVisibility(e.target.value)}
          />
          good
        </label>
        <label
          htmlFor="okay"
          className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
        >
          <input
            id="okay"
            value="okay"
            type="radio"
            checked={visibility === "okay"}
            name="options"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setVisibility(e.target.value)}
          />
          okay
        </label>
        <label
          htmlFor="poor"
          className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
        >
          <input
            id="poor"
            value="poor"
            type="radio"
            checked={visibility === "poor"}
            name="options"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setVisibility(e.target.value)}
          />
          poor
        </label>

        <label className="mt-4 text-gray-700 font-medium">weather</label>
        <label
          htmlFor="sunny"
          className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
        >
          <input
            id="sunny"
            value="sunny"
            type="radio"
            checked={weather === "sunny"}
            name="options"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setWeather(e.target.value)}
          />
          sunny
        </label>
        <label
          htmlFor="rainy"
          className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
        >
          <input
            id="rainy"
            value="rainy"
            type="radio"
            checked={weather === "rainy"}
            name="options"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setWeather(e.target.value)}
          />
          rainy
        </label>
        <label
          htmlFor="cloudy"
          className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
        >
          <input
            id="cloudy"
            value="cloudy"
            type="radio"
            checked={weather === "cloudy"}
            name="options"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setWeather(e.target.value)}
          />
          cloudy
        </label>
        <label
          htmlFor="stormy"
          className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
        >
          <input
            id="stormy"
            value="stormy"
            type="radio"
            checked={weather === "stormy"}
            name="options"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setWeather(e.target.value)}
          />
          stormy
        </label>
        <label
          htmlFor="windy"
          className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
        >
          <input
            id="windy"
            value="windy"
            type="radio"
            checked={weather === "windy"}
            name="options"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setWeather(e.target.value)}
          />
          windy
        </label>
        <label className="mt-4 text-gray-700 font-medium">comment</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold p-2 px-4 rounded-lg transition duration-200"
        >
          add
        </button>
      </form>
    </div>
  );
};

export default EntryForm;
