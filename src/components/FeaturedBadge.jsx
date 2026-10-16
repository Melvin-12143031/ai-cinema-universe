const FeaturedBadge = ({
  children = 'Featured',
  className = 'details-featured-badge',
}) => {
  return (
    <span className={className}>
      {children}
    </span>
  );
};

export default FeaturedBadge;