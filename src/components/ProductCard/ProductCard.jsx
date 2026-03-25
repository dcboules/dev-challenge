import './ProductCard.css'

function ProductCard({ product }) {
  const { title, type, price, compareAtPrice, image, available } = product
  const isOnSale = compareAtPrice !== null && compareAtPrice > price

  return (
    <article className="product-card">
      <div className="product-card__image-wrapper">
        <img className="product-card__image" src={image} alt={title} />
      </div>
      <div className="product-card__info">
        <h3 className="product-card__title">{title}</h3>
        <p className="product-card__type">{type}</p>
        <div className="product-card__pricing">
          <span className="product-card__price">${price.toFixed(2)}</span>
          {isOnSale && (
            <span className="product-card__compare-price">${compareAtPrice.toFixed(2)}</span>
          )}
        </div>
        {!available && <p className="product-card__sold-out">Sold Out</p>}
      </div>
    </article>
  )
}

export default ProductCard
