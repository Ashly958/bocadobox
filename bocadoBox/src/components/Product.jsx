import React from 'react';

export function Product({
  indice,
  nombre,
  descripcion,
  precio,
  imagen,
  tag,
  categoria,
  calorias,
  onAddToCart,
  onEdit
}) {
  // Verificación de disponibilidad condicional (temporada baja de limones)
  const isUnavailable =
    /lim[oó]n|limones|limonada/i.test(nombre) ||
    /lim[oó]n|limones|limonada/i.test(descripcion);

  // Parseo del precio numérico para reglas de descuento
  const numericPrice = typeof precio === 'number'
    ? precio
    : parseInt(String(precio).replace(/\D/g, '') || '0', 10);

  const formattedPrice = typeof precio === 'string' && precio.startsWith('$')
    ? precio
    : `$ ${Number(numericPrice).toLocaleString('es-CO')}`;

  const tieneDescuentoMayor = numericPrice > 50000;
  const tieneDescuentoBowls = String(categoria).toLowerCase().includes('bowl');

  return (
    <article
      className={`product-card ${isUnavailable ? 'is-unavailable' : ''}`}
      key={indice}
    >
      {/* Contenedor de Imagen del Bowl y Badges */}
      <div className="product-media-wrapper">
        {onEdit && (
          <button type="button" className="product-edit-btn" onClick={onEdit} title="Editar producto">
            ✏️
          </button>
        )}
        {tag && !isUnavailable && (
          <span className="product-pill-badge tag-special">{tag}</span>
        )}
        {isUnavailable ? (
          <span className="product-pill-badge tag-soldout">❌ Agotado Temporalmente</span>
        ) : (
          <span className="product-category-chip">{categoria || 'Bowl Saludable'}</span>
        )}

        {imagen ? (
          <img
            src={imagen}
            alt={nombre}
            className="product-media-img"
            loading="lazy"
          />
        ) : (
          <div className="product-media-placeholder">
            <span className="placeholder-emoji">🥗</span>
          </div>
        )}
      </div>

      {/* Información del Bowl */}
      <div className="product-body-content">
        <div className="product-header-info">
          <div className="product-title-row">
            <h3 className="product-item-title">{nombre}</h3>
            {calorias && <span className="calories-badge">🔥 {calorias} kcal</span>}
          </div>
          <p className="product-item-description">{descripcion}</p>
        </div>

        {/* Badges de Descuentos Condicionales */}
        <div className="product-discounts-box">
          {tieneDescuentoMayor && (
            <div className="discount-banner discount-high">
              <span className="discount-icon">🏷️</span>
              <span>¡15% de descuento especial por compra mayor!</span>
            </div>
          )}
          {tieneDescuentoBowls && (
            <div className="discount-banner discount-bowl">
              <span className="discount-icon">🥑</span>
              <span>10% especial en la semana del Bowl Saludable</span>
            </div>
          )}
        </div>

        {/* Pie de Tarjeta: Precio y Botón de Acción */}
        <div className="product-footer-action">
          <div className="product-price-box">
            <span className="price-caption">Precio Bowl</span>
            <span className="price-amount">{formattedPrice}</span>
          </div>

          <button
            type="button"
            className="btn-add-cart"
            onClick={() => onAddToCart && onAddToCart(nombre)}
            disabled={isUnavailable}
            title={isUnavailable ? 'Producto temporalmente no disponible' : `Agregar ${nombre} a tu Box`}
          >
            {isUnavailable ? (
              <>
                <span className="btn-icon">🚫</span>
                <span>Agotado</span>
              </>
            ) : (
              <>
                <span className="btn-icon">🥗</span>
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}