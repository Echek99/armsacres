import { defineQuery } from "next-sanity";

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"]{
    _id,
    title,
    slug,
    "imageUrl": image.asset->url,
    description,
    categoryDeal
  }
`)

export const PRODUCTS_QUERY = defineQuery(`
  *[_type == "product"]{
    title,
    slug,
    "imageUrl": image.asset->url,
    price,
    category->{
      slug,
      title,
      categoryDeal
    },
    description,
    additionalInfo
  }
`)

export const BLOG_QUERY = `
  *[_type == "blog"]{
    _id,
    title,
    slug,
    "imageUrl": image.asset->url,
    text[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          "href": @.href
        }
      }
    }
  }
`;

export const BLOG_QUERY_BY_SLUG = `
*[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    author,
    slug,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    text[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          "href": @.href
        }
      }
    }
  }
`;

export const EIGHTHS_OUNCES_QUERY = defineQuery(`
*[_type == "product" && category->title in ["Eighths", "Ounces"]]
  | order(_createdAt desc)[0...12] {
    _id,
    title,
    slug,
    "imageUrl": image.asset->url,
    price,
    category->{
      slug,
      title
    },
    description,
    additionalInfo
  }
`)

export const EIGHTHS_QUERY = defineQuery(`
    *[_type == "product" && category->title=="Eighths"]{
      title,
      slug,
      "imageUrl": image.asset->url,
      price,
      category->{
        title,
        description,
        "imageUrl": image.asset->url,
      },
      description,
      additionalInfo
    }
`)

export const OUNCES_QUERY = defineQuery(`
    *[_type == "product" && category->title=="Ounces"]{
      title,
      slug,
      "imageUrl": image.asset->url,
      price,
      category->{
        title,
        description,
       "imageUrl": image.asset->url,
      },
      description,
      additionalInfo
    }
`)

export const EDIBLES_QUERY = defineQuery(`
    *[_type == "product" && category->title=="Edibles"]{
      title,
      slug,
      "imageUrl": image.asset->url,
      price,
      category->{
        title,
        description,
        "imageUrl": image.asset->url,
      },
      description,
    }
`)

export const PRE_ROLLS_QUERY = defineQuery(`
    *[_type == "product" && category->title=="Pre-Rolls"]{
      title,
      slug,
      "imageUrl": image.asset->url,
      price,
      category->{
        title,
        description,
        "imageUrl": image.asset->url,
      },
      description,
      additionalInfo
    }
`)

export const VAPES_QUERY = defineQuery(`
    *[_type == "product" && category->title=="VAPES"]{
      title,
      slug,
      "imageUrl": image.asset->url,
      price,
      category->{
        title,
        description,
        "imageUrl": image.asset->url,
      },
      description,
      additionalInfo
    }
`)