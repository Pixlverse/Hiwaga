import card1 from '@/assets/4.png'
import card2 from '@/assets/5.png'
import card3 from '@/assets/6.png'
import card4 from '@/assets/7.png'
import card5 from '@/assets/9.png'

// Used by both the home `ClientImpactStories` cards and the
// dedicated `/case-studies` page. Keep these in sync.
export const caseStudies = [
  {
    slug: 'ed-tech-uk-lead-cost',
    industry: 'Ed-Tech',
    caption: '70% Lower CPL',
    headline: 'Reduced UK lead costs by 70% while improving lead quality.',
    stat: { value: '70%', label: 'Lower cost per lead' },
    image: card1,
    alt: 'Ed-tech case study: reducing UK lead cost by 70% while improving lead quality.',
    body: [
      'Our Ed-tech client was running Meta ads targeting the UK Skill Training & Education market, where lead costs are typically high due to intense competition and saturated audiences. While they were generating enquiries, the cost per lead and overall efficiency were not aligned with their growth expectations, especially for scaling internationally.',
      'We restructured the campaigns using a data-driven approach, refining audience targeting, creatives and bidding strategies in real time. In the first month itself, lead volume increased by 65% while the cost per lead dropped by nearly 50%.',
      'By the second month, further optimisation helped maintain the same lead volume while reducing the cost per lead by an additional 45%, bringing it to nearly 70–75% lower than the standard cost per lead typically seen in the UK Skills Training & Education sector.',
      'The impact went beyond numbers, resulting in a consistent pipeline of high-intent, ready-to-convert leads aligned with the client’s business goals. Student enquiries and course sign-ups improved, supporting faster conversions and revenue growth. This case demonstrates how precise targeting, continuous optimisation and strategic execution can outperform industry benchmarks and turn paid advertising into a scalable growth engine across global markets.',
    ],
  },
  {
    slug: 'clothing-order-growth',
    industry: 'Clothing',
    caption: '10X Order Growth',
    headline: 'From 40 orders a month to 500+ orders.',
    stat: { value: '12.5×', label: 'Monthly order growth' },
    image: card2,
    alt: 'Clothing case study: growth from 40 orders to 500+ monthly orders.',
    body: [
      'When we first partnered with the online clothing store, their sales averaged around 40 orders per month. The brand had strong potential, but gaps in communication, positioning and content consistency were limiting growth and visibility.',
      'We rebuilt the client’s brand narrative, refined the content strategy and strengthened the visual identity to create a cohesive experience across every touchpoint. From product storytelling to social rhythm and paid performance, every piece was aligned to the same intent — making the brand feel recognisable, trustworthy and worth coming back to.',
      'Within months the brand crossed 500+ monthly orders — a 10×+ jump driven not by louder marketing, but by clearer communication and consistent presence.',
    ],
  },
  {
    slug: 'travel-tourism-audience-leads',
    industry: 'Travel & Tourism',
    caption: 'Explosive Audience & Lead Growth',
    headline:
      'From 400 followers to 12.5K, with 800+ leads coming in every month.',
    stat: { value: '800+', label: 'Inbound leads / month' },
    image: card3,
    alt: 'Travel & tourism case study: from 400 followers to 12.5K followers and 800+ leads every month.',
    body: [
      'A boutique travel and tourism client came to us with a small audience and inconsistent lead flow. The brand was rich in experience and stories, but those weren’t reaching the right people online.',
      'We built a content engine grounded in destination storytelling, traveller intent and seasonal demand — paired with targeted performance campaigns that captured both top-of-funnel curiosity and bottom-of-funnel enquiries.',
      'The audience grew from around 400 to 12.5K engaged followers, and the brand now receives 800+ qualified leads every month — turning social presence into a reliable acquisition channel.',
    ],
  },
  {
    slug: 'personal-branding-healthcare',
    industry: 'Personal Branding & Healthcare',
    caption: 'Personal Branding Growth',
    headline: 'Built a 42K organic audience for a healthcare brand — pre-launch.',
    stat: { value: '42K', label: 'Organic audience pre-launch' },
    image: card4,
    alt: 'Personal branding & healthcare case study: 42K organic audience created pre-launch.',
    body: [
      'A healthcare professional preparing to launch a new venture wanted to enter the market with an audience already trusting their voice — not start from zero on day one.',
      'We shaped a personal-branding strategy centred on credibility, lived experience and educational content, designing every post and video to compound trust over time. The visual system, narrative tone and posting rhythm were calibrated to feel personal yet authoritative.',
      'By the time the venture officially launched, a 42K-strong organic audience was already engaged, asking questions and ready to convert — transforming a launch into a continuation, not an introduction.',
    ],
  },
  {
    slug: 'premium-restaurant-brand',
    industry: 'Restaurant',
    caption: 'Premium Restaurant Branding',
    headline: 'Establishing a premium restaurant brand.',
    stat: { value: 'Day 1', label: 'Premium positioning, from launch' },
    image: card5,
    alt: 'Restaurant case study: establishing a premium restaurant brand in a new market.',
    body: [
      'When the client decided to enter a new location with a new branch, the objective was to establish a strong presence in the premium restaurant category. The brand needed clarity in positioning and communication from day one.',
      'We built their digital identity from the ground up, focusing on visual aesthetics, tone and storytelling. The emphasis was on creating an experience-driven narrative that reflected quality, ambience and attention to detail.',
      'The result was a refined and premium brand identity that stood out in the region. Customers began connecting with the brand emotionally even before visiting the restaurant. The online presence effectively mirrored the in-store experience and strengthened brand recall.',
    ],
  },
]
