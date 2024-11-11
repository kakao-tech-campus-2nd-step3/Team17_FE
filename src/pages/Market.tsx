import styled from '@emotion/styled'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'
import getMarket, { MarketResponse } from '../api/getMarket'
import Loading from '../components/Loading'
import Error from '../components/Error'
import marketTag from '../mocks/marketTag'
import MarketTagFilter from '../components/MarketTagFilter'
import getMarketView from '../api/getMarketView'

const Market = () => {
  const [tagId, setTagId] = useState<number | undefined>(undefined)
  const [activeTag, setActiveTag] = useState<number | null>(null)
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  )

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery<MarketResponse>({
      queryKey: ['market', tagId],
      queryFn: ({ pageParam = 0 }) => getMarket(tagId, pageParam as number),
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined,
      initialPageParam: 0,
    })

  const { ref } = useIntersectionObserver({
    threshold: 0.1,
    onChange: () => {
      if (hasNextPage) fetchNextPage()
    },
  })

  const toggleFilter = (tagIdTmp: number) => {
    const newActiveTag = activeTag === tagIdTmp ? null : tagIdTmp
    setActiveTag(newActiveTag)
    setTagId(newActiveTag || undefined)
  }

  const onProductClick = (productId: number) => {
    setSelectedProductId(productId)
  }

  const { isLoading: isMarketViewLoading, isError: isMarketViewError } =
    useQuery({
      queryKey: ['marketView', selectedProductId],
      queryFn: () => getMarketView(selectedProductId!),
      enabled: !!selectedProductId,
      retry: 1,
    })

  if (isLoading) return <Loading />
  if (isError) return <Error name="마켓화면" />

  if (isMarketViewLoading) return <Loading />
  if (isMarketViewError) return <Error name="상품 조회" />

  return (
    <MarketWrapper>
      <MarketTitle>마켓</MarketTitle>
      <MarketTagFilter
        tags={marketTag.tagList}
        activeTag={activeTag}
        onToggleFilter={toggleFilter}
      />
      <ProductWrapper>
        {data?.pages
          .flatMap((page) => page.content)
          .map((product) => (
            <ProductLink
              key={product.productId}
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ProductContainer
                onClick={() => onProductClick(product.productId)}
              >
                <ProductPhoto
                  src={product.imageUrl}
                  alt={product.name}
                  width={90}
                  height={90}
                />
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductSite>{product.storeName}</ProductSite>
                  <ProductPrice>
                    {Number(product.price).toLocaleString()}원
                  </ProductPrice>
                </ProductInfo>
              </ProductContainer>
            </ProductLink>
          ))}
        <div ref={ref} />
      </ProductWrapper>
    </MarketWrapper>
  )
}

const MarketWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 55px);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

const MarketTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 18px;
  font-weight: 500;
`

const ProductWrapper = styled.div`
  overflow-y: auto;
`

const ProductContainer = styled.div`
  border-radius: 10px;
  border: 2px solid #b5c3e9;
  margin: 10px 5px;
  display: flex;
  flex-direction: row;
`

const ProductLink = styled.a`
  text-decoration: none;
  color: inherit;
`

const ProductPhoto = styled.img`
  margin: 10px;
  width: 90px;
  height: 90px;
  border-radius: 5px;
  padding: 2px 10px;
`

const ProductInfo = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 65%;
`

const ProductName = styled.div`
  margin-top: 20px;
`

const ProductSite = styled.div`
  color: #8e8e8e;
  margin-top: 7px;
  font-size: 14px;
`

const ProductPrice = styled.div`
  margin-top: 10px;
  align-self: flex-end;
  margin-right: 20px;
`

export default Market
