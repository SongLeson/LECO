// 结构化数据组件

import Script from 'next/script'

interface StructuredDataProps {
  type: 'organization' | 'website' | 'product' | 'article' | 'event'
  data: any
}

const StructuredData = ({ type, data }: StructuredDataProps) => {
  const generateStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
    }

    switch (type) {
      case 'organization':
        return {
          ...baseData,
          '@type': 'Organization',
          name: 'LECO Sports',
          alternateName: 'LECO',
          url: 'https://leco-sports.com',
          logo: 'https://leco-sports.com/images/logo.png',
          description: 'LECO是专注于高性能运动装备的高端品牌，致力于为运动员提供突破极限的专业装备。',
          foundingDate: '2020',
          founders: [
            {
              '@type': 'Person',
              name: 'LECO Founder'
            }
          ],
          address: {
            '@type': 'PostalAddress',
            streetAddress: '北京市朝阳区',
            addressLocality: '北京',
            addressRegion: '北京',
            postalCode: '100000',
            addressCountry: 'CN'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+86-400-123-4567',
            contactType: 'customer service',
            availableLanguage: ['Chinese', 'English']
          },
          sameAs: [
            'https://www.facebook.com/LECOSports',
            'https://www.instagram.com/LECOSports',
            'https://www.twitter.com/LECOSports',
            'https://www.youtube.com/LECOSports'
          ],
          ...data
        }

      case 'website':
        return {
          ...baseData,
          '@type': 'WebSite',
          name: 'LECO Sports',
          url: 'https://leco-sports.com',
          description: 'LECO是专注于高性能运动装备的高端品牌，致力于为运动员提供突破极限的专业装备。',
          publisher: {
            '@type': 'Organization',
            name: 'LECO Sports'
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://leco-sports.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          },
          ...data
        }

      case 'product':
        return {
          ...baseData,
          '@type': 'Product',
          name: data.name,
          description: data.description,
          image: data.images?.map((img: any) => img.url) || [],
          brand: {
            '@type': 'Brand',
            name: 'LECO Sports'
          },
          manufacturer: {
            '@type': 'Organization',
            name: 'LECO Sports'
          },
          offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: 'CNY',
            availability: data.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            seller: {
              '@type': 'Organization',
              name: 'LECO Sports'
            }
          },
          aggregateRating: data.rating ? {
            '@type': 'AggregateRating',
            ratingValue: data.rating,
            reviewCount: data.reviewCount || 0,
            bestRating: 5,
            worstRating: 1
          } : undefined,
          category: data.category,
          ...data
        }

      case 'article':
        return {
          ...baseData,
          '@type': 'Article',
          headline: data.title,
          description: data.excerpt,
          image: data.image,
          author: {
            '@type': 'Person',
            name: data.author
          },
          publisher: {
            '@type': 'Organization',
            name: 'LECO Sports',
            logo: {
              '@type': 'ImageObject',
              url: 'https://leco-sports.com/images/logo.png'
            }
          },
          datePublished: data.publishDate,
          dateModified: data.modifiedDate || data.publishDate,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://leco-sports.com/news/${data.id}`
          },
          articleSection: data.category,
          keywords: data.tags?.join(', '),
          wordCount: data.wordCount,
          ...data
        }

      case 'event':
        return {
          ...baseData,
          '@type': 'Event',
          name: data.title,
          description: data.description,
          startDate: data.date,
          endDate: data.endDate,
          location: {
            '@type': 'Place',
            name: data.location,
            address: data.location
          },
          organizer: {
            '@type': 'Organization',
            name: data.organizer || 'LECO Sports'
          },
          offers: data.price ? {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: 'CNY',
            availability: 'https://schema.org/InStock',
            url: `https://leco-sports.com/events/${data.id}`
          } : undefined,
          image: data.image,
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          ...data
        }

      default:
        return baseData
    }
  }

  const structuredData = generateStructuredData()

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}

export default StructuredData

// 预定义的结构化数据组件
export const OrganizationStructuredData = () => (
  <StructuredData type="organization" data={{}} />
)

export const WebsiteStructuredData = () => (
  <StructuredData type="website" data={{}} />
)

export const ProductStructuredData = ({ product }: { product: any }) => (
  <StructuredData type="product" data={product} />
)

export const ArticleStructuredData = ({ article }: { article: any }) => (
  <StructuredData type="article" data={article} />
)

export const EventStructuredData = ({ event }: { event: any }) => (
  <StructuredData type="event" data={event} />
)
