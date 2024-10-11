import styled from '@emotion/styled'
import ProductMock from '../mocks/ProductMock'

const Market = () => {
  return (
    <MarketWrapper>
      <MarketTitle>마켓</MarketTitle>
      <ProductWrapper>
        {ProductMock.content.map((product) => (
          <ProductContainer key={product.productId}>
            <ProductPhoto>
              <img src={product.imageUrl} alt={product.name} />
            </ProductPhoto>
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductSite>{product.storeName}</ProductSite>
              <ProductPrice>
                {Number(product.price).toLocaleString()}원
              </ProductPrice>
            </ProductInfo>
          </ProductContainer>
        ))}
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
  margin: 5px;
  display: flex;
  flex-direction: row;
`

const ProductPhoto = styled.div`
  margin: 10px;
  width: 90px;
  height: 90px;
  border-radius: 5px;
`

const ProductInfo = styled.div`
  margin-left: 10px;
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
  margin-right: 15px;
`

export default Market
