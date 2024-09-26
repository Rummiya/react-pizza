import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <div className="loader">
    <ContentLoader
      speed={2}
      width={280}
      height={450}
      viewBox="0 0 280 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="145" cy="132" r="125" />
      <rect x="0" y="270" rx="5" ry="5" width="280" height="30" />
      <rect x="0" y="320" rx="10" ry="10" width="280" height="80" />
      <rect x="0" y="430" rx="5" ry="5" width="90" height="28" />
      <rect x="123" y="420" rx="20" ry="20" width="152" height="45" />
    </ContentLoader>
  </div>
);

export default Skeleton;
