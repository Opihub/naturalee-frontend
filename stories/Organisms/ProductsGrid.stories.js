import ProductsGrid from '@/components/Organisms/ProductsGrid.vue'
import SVGDefinitions from '@/components/Atoms/SVGDefinitions.vue'
import {
  createResponse,
  createPaginatedResponse,
} from '~/utils/responses'
import { random } from '@/utils/random'
import slugify from 'slugify'

const provenances = ['Italia', 'Germania', 'Costa Rica']
const costDescriptions = ['1 pezzo per 500g', '1 cesta da 750g', '1 mazzo']
const count = 100

const fetchedCategoryProducts = {
  url: '/shop/:category/products?page=true&filters[]&orderby=true&limit=true',
  method: 'GET',
  status: 200,
  response: (request) => {
    const { searchParams } = request
    const { limit, page } = searchParams

    const Product = () => {
      const id = random(1, 1000)
      const title = `Prodotto ${id}`
      const slug = slugify(title, {
        lower: true,
      })
      const provenance = provenances[random(1, provenances.length) - 1]
      const costDescription =
        costDescriptions[random(1, costDescriptions.length) - 1]

      return {
        id,
        title,
        link: `shop/category/${slug}`,
        slug: slug,
        image: `https://picsum.photos/id/${id}/304/391?grayscale&blur=2`,
        price: random(0, 25) + random(0, 99) / 100,
        // discountPrice: '?Number',
        provenance,
        costDescription,
      }
    }

    let length = parseInt(limit)
    let last = false
    const nextLimit = (parseInt(page || 0) + 1) * limit
    if (count < nextLimit) {
      length = limit - (nextLimit - count)
      last = true
    }

    const response = createPaginatedResponse({
      code: 'products_found',
      message: 'Sono stati trovati %d prodotti',
      paginate: {
        last,
        page: page || 0,
        limit: limit || 12,
        count,
      },
      data: Array.from(
        {
          length,
        },
        () => Product()
      ),
    })

    return response
  },
}

const fetchedCategoryProductsWithoutFilters = {
  ...fetchedCategoryProducts,
  url: '/shop/:category/products?page=true&limit=true&orderby=true',
}

const noProductsFound = {
  ...fetchedCategoryProductsWithoutFilters,
  response: createResponse({
    success: false,
    statusCode: 404,
    code: 'no_products_found',
    message: 'Nessun prodotto trovato',
    data: false,
  }),
}

export default {
  title: 'Organisms/Products Grid',
  component: ProductsGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    mockData: [fetchedCategoryProductsWithoutFilters],
  },
}

const Template = (args) => ({
  components: { ProductsGrid, SVGDefinitions },
  setup() {
    return { args }
  },
  template: `
  <SVGDefinitions />
  <ProductsGrid v-bind="args" />
  `,
})

export const Category = Template.bind({})
Category.args = {
  from: 'shop/verdura/products',
}

export const CategoryWithFilters = Template.bind({})
CategoryWithFilters.args = {
  ...Category.args,
  sortable: true,
  filters: [
    {
      slug: 'pesche-albicocche',
      text: 'Pesche e albicocche',
    },
    {
      slug: 'frutta-esotica',
      text: 'Frutta esotica',
    },
    {
      slug: 'meloni-angurie',
      text: 'Meloni e angurie',
    },
    {
      slug: 'agrumi',
      text: 'Agrumi',
    },
    {
      slug: 'frutti-bosco',
      text: 'Frutti di bosco',
    },
    {
      slug: 'mele-pere',
      text: 'Mele e pere',
    },
    {
      slug: 'altro',
      text: 'Altro',
    },
  ],
}
CategoryWithFilters.parameters = {
  mockData: [fetchedCategoryProducts],
}

export const NoProducts = Template.bind({})
NoProducts.args = {
  from: 'shop/verdura/products',
}
NoProducts.parameters = {
  mockData: [noProductsFound],
}
