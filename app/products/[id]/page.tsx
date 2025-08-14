import ProductDetailClient from './ProductDetailClient'

// 生成静态参数用于静态导出
export async function generateStaticParams() {
  // 返回预定义的产品ID列表
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ]
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return <ProductDetailClient productId={params.id} />
}


