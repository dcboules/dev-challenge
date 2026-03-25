## Liquid Challenge

#### These questions should be answered with real world solutions in liquid

##### \*Please provide these answers in written form

---

### 1. Describe how you would add an editable text setting to a section using schema, and render it in Liquid. Include both the schema and Liquid example.

```liquid
{% schema %}
{
  "name": "Hero Banner",
  "settings": [
    {
      "type": "text",
      "id": "banner_heading",
      "label": "Banner Heading",
      "default": "Shop Our Latest Collection"
    }
  ]
}
{% endschema %}
```

```liquid
{% if section.settings.banner_heading != blank %}
  <h2>{{ section.settings.banner_heading }}</h2>
{% endif %}
```

The `text` type creates an editable field in the theme customizer. I wrap the output in a blank check to avoid rendering an empty heading tag.

---

### 2. How would you implement a collection banner using the collection's featured image in a section that can be reused across templates?

```liquid
{% if collection.featured_image %}
  <div class="collection-banner">
    <img
      src="{{ collection.featured_image | image_url: width: 1400 }}"
      alt="{{ collection.featured_image.alt | default: collection.title }}"
    />
    <h1>{{ collection.title }}</h1>
    {% if collection.description != blank %}
      <p>{{ collection.description }}</p>
    {% endif %}
  </div>
{% endif %}

{% schema %}
{
  "name": "Collection Banner"
}
{% endschema %}
```

The section doesn't need any custom settings because it pulls everything from the `collection` object. This is what makes it reusable. You include it in `collection.json` (or any template with collection context) and it picks up the correct featured image and title for whatever collection the customer is viewing. The outer `{% if %}` guard handles the case where no featured image has been set.

---

### 3. In a Shopify section, add a setting that allows a merchant to toggle the visibility of a component (e.g., show/hide a banner). Show both the schema and the Liquid needed to implement this.

```liquid
{% schema %}
{
  "name": "Announcement Bar",
  "settings": [
    {
      "type": "checkbox",
      "id": "show_announcement",
      "label": "Show announcement bar",
      "default": true
    },
    {
      "type": "text",
      "id": "announcement_text",
      "label": "Announcement text",
      "default": "Free shipping on all orders"
    }
  ]
}
{% endschema %}
```

```liquid
{% if section.settings.show_announcement %}
  <div class="announcement-bar">
    <p>{{ section.settings.announcement_text }}</p>
  </div>
{% endif %}
```

The `checkbox` type returns a boolean. Wrapping the markup in the `{% if %}` removes it from the DOM entirely when toggled off, which I prefer over hiding with CSS since it keeps the rendered output clean.

---

### 4. In a Shopify section, how would you access and render the current product's title, price, and featured image? Briefly explain the context required for this to work.

```liquid
<div class="product-details">
  <h1>{{ product.title }}</h1>
  <img
    src="{{ product.featured_image | image_url: width: 600 }}"
    alt="{{ product.featured_image.alt | default: product.title }}"
  />
  <p>{{ product.price | money }}</p>
</div>
```

Context is the key part of this question. The `product` object is only available within product templates (`product.json` or `product.liquid`) and any sections rendered inside them. A section using `product.title` will work fine on a product page, but if the same section were added to the homepage or a collection page, `product` would be nil.

To use product data outside of product templates, you would need to define a `"type": "product"` setting in the schema, which lets the merchant select a specific product. Then you'd access it through `section.settings.product` instead of the global `product` object.

---

### 5. Using section schema, define a repeatable block (e.g., items with a title and text). Show how you would loop through and render those blocks in Liquid.

```liquid
{% schema %}
{
  "name": "Testimonials",
  "blocks": [
    {
      "type": "testimonial",
      "name": "Testimonial",
      "settings": [
        {
          "type": "text",
          "id": "author",
          "label": "Author Name"
        },
        {
          "type": "richtext",
          "id": "quote",
          "label": "Quote"
        }
      ]
    }
  ]
}
{% endschema %}
```

```liquid
<div class="testimonials">
  {% for block in section.blocks %}
    <div class="testimonial" {{ block.shopify_attributes }}>
      <div>{{ block.settings.quote }}</div>
      <p>{{ block.settings.author }}</p>
    </div>
  {% endfor %}
</div>
```

Each block type defines its own settings. The `{% for %}` loop iterates through however many the merchant has added. `block.shopify_attributes` outputs data attributes that the theme editor needs to identify and highlight individual blocks during customization.
