import React, { useEffect, useState } from "react";

function Trending() {
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("none");


  async function fetchTrending() {
    const response = await fetch(`/api/trending?category=${category}`);
    const data = await response.json();
    setTrending(data);
  }

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value)
    fetchTrending()
    console.log(trending)    
  }

  return (
    <div>
      <h1>NYT Best Sellers</h1>
      <label htmlFor="category">Select a category:</label>
      <select id="category" value={category} onChange={handleSelect}>
        <option value="none" disabled={category !== "none"}>None</option>
        <option value="combined-print-and-e-book-fiction">Combined Print and e-Book Fiction</option>
        <option value="combined-print-and-e-book-nonfiction">Combined Print and e-Book Nonfiction</option>
        <option value="hardcover-fiction">Hardcover Fiction</option>
        <option value="hardcover-nonfiction">Hardcover Nonfiction</option>
        <option value="trade-fiction-paperback">Paperback Trade Fiction</option>
        <option value="mass-market-paperback">Paperback Mass-Market Fiction</option>
        <option value="paperback-nonfiction">Paperback Nonfiction</option>
        <option value="e-book-fiction">E-Book Fiction</option>
        <option value="e-book-nonfiction">E-Book Nonfiction</option>
        <option value="hardcover-advice">Hardcover Advice</option>
        <option value="paperback-advice">Paperback Advice</option>
        <option value="advice-how-to-and-miscellaneous">Advice How-To and Miscellaneous</option>
        <option value="hardcover-graphic-books">Hardcover Graphic Books</option>
        <option value="paperback-graphic-books">Paperback Graphic Books</option>
        <option value="manga">Manga</option>
        <option value="combined-print-fiction">Combined Print Fiction</option>
        <option value="combined-print-nonfiction">Combined Print Nonfiction</option>
        <option value="chapter-books">Chapter Books</option>
        <option value="childrens-middle-grade">Childrens Middle Grade</option>
        <option value="childrens-middle-grade-e-book">Childrens Middle Grade E-Book</option>
        <option value="childrens-middle-grade-hardcover">Childrens Middle Grade Hardcover</option>
        <option value="childrens-middle-grade-paperback">Childrens Middle Grade Paperback</option>
        <option value="paperback-books">Childrens Paperback Books</option>
        <option value="picture-books">Childrens Picture Books</option>
        <option value="series-books">Childrens Series Books</option>
        <option value="young-adult">Young Adult</option>
        <option value="young-adult-e-book">Young Adult E-Book</option>
        <option value="young-adult-hardcover">Young Adult Hardcover</option>
        <option value="young-adult-paperback">Young Adult Paperback</option>
        <option value="animals">Animals</option>
        <option value="audio-fiction">Audio Fiction</option>
        <option value="audio-nonfiction">Audio Nonfiction</option>
        <option value="business-books">Business Books</option>
        <option value="celebrities">Celebrities</option>
        <option value="crime-and-punishment">Crime and Punishment</option>
        <option value="culture">Culture</option>
        <option value="education">Education</option>
        <option value="espionage">Espionage</option>
        <option value="expeditions-disasters-and-adventures">Expeditions Disasters and Adventures</option>
        <option value="fashion-manners-and-customs">Fashion Manners and Customs</option>
        <option value="food-and-fitness">Food and Fitness</option>
        <option value="games-and-activities">Games and Activities</option>
        <option value="graphic-books-and-manga">Graphic Books and Manga</option>
        <option value="hardcover-business-books">Hardcover Business Books</option>
        <option value="health">Health</option>
        <option value="humor">Humor</option>
        <option value="indigenous-americans">Indigenous Americans</option>
        <option value="relationships">Relationships</option>
        <option value="mass-market-monthly">Mass Market Monthly</option>
        <option value="middle-grade-paperback-monthly">Middle Grade Paperback Monthly</option>
        <option value="paperback-business-books">Paperback Business Books</option>
        <option value="family">Family</option>
        <option value="hardcover-political-books">Hardcover Political Books</option>
        <option value="race-and-civil-rights">Race and Civil Rights</option>
        <option value="religion-spirituality-and-faith">Religion Spirituality and Faith</option>
        <option value="science">Science</option>
        <option value="sports">Sports and Fitness</option>
        <option value="travel">Travel</option>
        <option value="young-adult-paperback-monthly">Young Adult Paperback Monthly</option>
      </select>
    </div>
  );
}

export default Trending;