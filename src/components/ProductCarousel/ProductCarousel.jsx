import ProductCard from '../ProductCard/ProductCard'
import './ProductCarousel.css'

function ProductCarousel({ products, title, layout = 'default' }) {  
  return (
    <div className={`carousel${layout === 'compact' ? ' carousel--compact' : ''}`}> 
      <h2 className="carousel__title">{title}</h2>  
      <div className="carousel__track">
        {products.map((product) => (
          <div key={product.id} className="carousel__item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductCarousel
