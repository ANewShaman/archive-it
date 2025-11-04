import React from 'react';

interface NewsTickerProps {
  headline: string;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ headline }) => {
  return (
    <div id="news-ticker">
      <p className="scrolling-headline">
        {headline}
      </p>
    </div>
  );
};
