import alishaTravels from '@/assets/websites/alisha-travels.webp'
import mioPizzeria from '@/assets/websites/mio-pizzeria.webp'

// Websites shown on the `/websites` page. Add new builds to the top of the
// list; screenshots live in `src/assets/websites/` (≈2000px wide, WebP).
export const websites = [
  {
    slug: 'alisha-tours-travels',
    name: 'Alisha Tours & Travels',
    category: 'Travel & Tourism',
    location: 'Kerala, India',
    description:
      'Alisha Tours & Travels creates personalised travel experiences with over a decade of expertise, offering customised leisure, corporate and MICE journeys with seamless planning and exceptional service worldwide.',
    domain: 'alishatravels.in',
    url: 'https://alishatravels.in',
    image: alishaTravels,
    alt: 'Homepage of the Alisha Tours & Travels website with a trip search panel over a night view of Singapore.',
  },
  {
    slug: 'mio-pizzeria',
    name: 'Mio Pizzeria',
    category: 'Restaurant',
    location: 'Qatar',
    description:
      'A website for Mio Pizzeria in Qatar, giving the restaurant a polished online home that reflects its brand and makes it easy for customers to find and choose it. Built in collaboration with Hiwaga Makers.',
    domain: 'mio-pizzeria.com',
    url: 'https://mio-pizzeria.com',
    image: mioPizzeria,
    alt: 'Homepage of the Mio Pizzeria website showing a pepperoni pizza and an Order Now button.',
  },
]
