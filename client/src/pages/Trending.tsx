import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar/Navbar'

import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { FormControl, InputLabel } from "@mui/material";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function Trending() {
  const [trending, setTrending] = useState<any[]>([]);


  async function fetchTrending(category: string) {
    const response = await fetch(`/api/trending?category=${category}`);
    const data = await response.json();
    setTrending(data.results.books);
  }

  function handleSelect(event: SelectChangeEvent<string>) {
    fetchTrending(event.target.value)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Navbar children={undefined} />
      <h1>NYT Best Sellers</h1>
      <FormControl sx={{width: '90%'}}>
        <InputLabel>Category</InputLabel>
        <Select
          onChange={handleSelect}
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="combined-print-and-e-book-fiction">Combined Print and e-Book Fiction</MenuItem>
          <MenuItem value="combined-print-and-e-book-nonfiction">Combined Print and e-Book Nonfiction</MenuItem>
          <MenuItem value="hardcover-fiction">Hardcover Fiction</MenuItem>
          <MenuItem value="hardcover-nonfiction">Hardcover Nonfiction</MenuItem>
          <MenuItem value="trade-fiction-paperback">Paperback Trade Fiction</MenuItem>
          <MenuItem value="mass-market-paperback">Paperback Mass-Market Fiction</MenuItem>
          <MenuItem value="paperback-nonfiction">Paperback Nonfiction</MenuItem>
          <MenuItem value="e-book-fiction">E-Book Fiction</MenuItem>
          <MenuItem value="e-book-nonfiction">E-Book Nonfiction</MenuItem>
          <MenuItem value="hardcover-advice">Hardcover Advice</MenuItem>
          <MenuItem value="paperback-advice">Paperback Advice</MenuItem>
          <MenuItem value="advice-how-to-and-miscellaneous">Advice How-To and Miscellaneous</MenuItem>
          <MenuItem value="hardcover-graphic-books">Hardcover Graphic Books</MenuItem>
          <MenuItem value="paperback-graphic-books">Paperback Graphic Books</MenuItem>
          <MenuItem value="manga">Manga</MenuItem>
          <MenuItem value="combined-print-fiction">Combined Print Fiction</MenuItem>
          <MenuItem value="combined-print-nonfiction">Combined Print Nonfiction</MenuItem>
          <MenuItem value="chapter-books">Chapter Books</MenuItem>
          <MenuItem value="childrens-middle-grade">Childrens Middle Grade</MenuItem>
          <MenuItem value="childrens-middle-grade-e-book">Childrens Middle Grade E-Book</MenuItem>
          <MenuItem value="childrens-middle-grade-hardcover">Childrens Middle Grade Hardcover</MenuItem>
          <MenuItem value="childrens-middle-grade-paperback">Childrens Middle Grade Paperback</MenuItem>
          <MenuItem value="paperback-books">Childrens Paperback Books</MenuItem>
          <MenuItem value="picture-books">Childrens Picture Books</MenuItem>
          <MenuItem value="series-books">Childrens Series Books</MenuItem>
          <MenuItem value="young-adult">Young Adult</MenuItem>
          <MenuItem value="young-adult-e-book">Young Adult E-Book</MenuItem>
          <MenuItem value="young-adult-hardcover">Young Adult Hardcover</MenuItem>
          <MenuItem value="young-adult-paperback">Young Adult Paperback</MenuItem>
          <MenuItem value="animals">Animals</MenuItem>
          <MenuItem value="audio-fiction">Audio Fiction</MenuItem>
          <MenuItem value="audio-nonfiction">Audio Nonfiction</MenuItem>
          <MenuItem value="business-books">Business Books</MenuItem>
          <MenuItem value="celebrities">Celebrities</MenuItem>
          <MenuItem value="crime-and-punishment">Crime and Punishment</MenuItem>
          <MenuItem value="culture">Culture</MenuItem>
          <MenuItem value="education">Education</MenuItem>
          <MenuItem value="espionage">Espionage</MenuItem>
          <MenuItem value="expeditions-disasters-and-adventures">Expeditions Disasters and Adventures</MenuItem>
          <MenuItem value="fashion-manners-and-customs">Fashion Manners and Customs</MenuItem>
          <MenuItem value="food-and-fitness">Food and Fitness</MenuItem>
          <MenuItem value="games-and-activities">Games and Activities</MenuItem>
          <MenuItem value="graphic-books-and-manga">Graphic Books and Manga</MenuItem>
          <MenuItem value="hardcover-business-books">Hardcover Business Books</MenuItem>
          <MenuItem value="health">Health</MenuItem>
          <MenuItem value="humor">Humor</MenuItem>
          <MenuItem value="indigenous-americans">Indigenous Americans</MenuItem>
          <MenuItem value="relationships">Relationships</MenuItem>
          <MenuItem value="mass-market-monthly">Mass Market Monthly</MenuItem>
          <MenuItem value="middle-grade-paperback-monthly">Middle Grade Paperback Monthly</MenuItem>
          <MenuItem value="paperback-business-books">Paperback Business Books</MenuItem>
          <MenuItem value="family">Family</MenuItem>
          <MenuItem value="hardcover-political-books">Hardcover Political Books</MenuItem>
          <MenuItem value="race-and-civil-rights">Race and Civil Rights</MenuItem>
          <MenuItem value="religion-spirituality-and-faith">Religion Spirituality and Faith</MenuItem>
          <MenuItem value="science">Science</MenuItem>
          <MenuItem value="sports">Sports and Fitness</MenuItem>
          <MenuItem value="travel">Travel</MenuItem>
          <MenuItem value="young-adult-paperback-monthly">Young Adult Paperback Monthly</MenuItem>
        </Select>
      </FormControl>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {trending.length === 0 ? (
          <div></div>
        ) : (
          trending.map((book) => (
            <Card variant="outlined" sx={{ width: 380, margin: '10px' }}>
              <CardOverflow>
                <AspectRatio ratio="2">
                  <img
                    src={book.book_image}
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
                <IconButton
                  aria-label="Like minimal photography"
                  size="md"
                  variant="solid"
                  color="danger"
                  sx={{
                    position: 'absolute',
                    zIndex: 2,
                    borderRadius: '50%',
                    right: '1rem',
                    bottom: 0,
                    transform: 'translateY(50%)',
                  }}
                >
                  <BookmarkAddIcon />
                </IconButton>
              </CardOverflow>
              <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
                <Link href="#multiple-actions" overlay underline="none">
                  {book.title}
                </Link>
              </Typography>
              <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                <Link href="#multiple-actions">{book.author}</Link>
              </Typography>
              <Divider inset="context" />
              <CardOverflow
                variant="soft"
                sx={{
                  display: 'flex',
                  gap: 1.5,
                  py: 1.5,
                  px: 'var(--Card-padding)',
                  bgcolor: 'background.level1',
                }}
              >
                <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary', fontSize: 'md' }}>
                  {book.rank}
                </Typography>
                <Divider orientation="vertical" />
                <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                  {book.rank > book.rank_last_week ? <ArrowUpwardIcon sx={{ color: 'green', fontSize: 'md' }} /> : <ArrowDownwardIcon sx={{ color: 'red', fontSize: 'md' }} />}
                </Typography>
              </CardOverflow>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Trending;