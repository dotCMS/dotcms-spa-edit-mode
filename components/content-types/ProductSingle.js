import React, { useContext } from 'react';
import { Button } from '../../styles/shared.styles';
const { currencyFormatter } = require('../../utilities/shared');
import Head from 'next/head';
import Carousel from '../Carousel';

import {
    ProductContainer,
    ProductDetail,
    Price,
    Quantity
} from '../../styles/products/product.styles';
import { resetWarningCache } from 'prop-types';

function ProductSingle({
    title,
    description,
    retailPrice,
    salePrice,
    identifier,
    image,
    image2,
    image3,
    specifications1
}) {
    const imagesFound = () => {
        return !!image || !!image2 || !!image3;
    };

        const renderSpecs = () => {
        const specs = Object.entries(specifications1).length > 0 && JSON.parse(specifications1);
        const specsArr = []
            for (var key in specs) {
              specsArr.push(
                  <li>
                      <b>{key}</b>: {specs[key]}
                  </li>
              );
            }
         
            return specsArr;
        }

        return (
            <ProductContainer className="container">
                {imagesFound() && (
                    <Carousel
                        images={{ image, image2, image3 }}
                        identifier={identifier}
                        title={title}
                    />
                )}

                <ProductDetail>
                    <div className="meta">
                        <h3 className="meta__title">{title}</h3>
                        <Price salePrice={!!salePrice}>
                            {currencyFormatter.format(retailPrice.replace(/\,/g, ''))}
                        </Price>
                        {salePrice && <Price>{currencyFormatter.format(salePrice)}</Price>}
                    </div>

                    <div style={{marginBottom: '1.6rem'}} dangerouslySetInnerHTML={{ __html: description }} />

                    {renderSpecs().length > 1 && (
                        <>  
                            <h4>Specifications</h4>
                            <ul>{renderSpecs()}</ul>
                        </>
                    )}

                    <Quantity
                        type="number"
                        name="product_quantity"
                        id="product_quantity"
                        placeholder="1"
                    />
                    <Button href="#">Add to cart</Button>
                </ProductDetail>
            </ProductContainer>
        );
}

export default ProductSingle;
