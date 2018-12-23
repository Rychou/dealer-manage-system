import React, { Component } from 'react';
import { array, string } from 'prop-types';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Grid, Meta } = Card;

const formatter = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

formatter.propTypes = {
    value: string,
};


class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        const { products } = this.props;
        return (
        <div>
            {products
                ? products.map((item) => {
                    const { product } = item;
                    return (
                    <Card
                        key={product.no}
                        className="product"
                        title={<span>NO.{product.no}</span>}
                        style={{ width: 1000, marginLeft: 60, marginTop: 20 }}
                    >
                        <Grid style={{ padding: 0, marginRight: 10, width: 80, height: 80 }}>
                            <img alt="example" src={product.detailImages[0]} style={{ width: 80, height: 80 }} />
                        </Grid>
                        <Meta
                            title={<Link to={`/products/${product.no}`}>{product.name}</Link>}
                            className="productInfo"
                        />
                        <div className="productInfo">
                            <Meta
                                title={<div>
                                        <span>单价：</span>
                                        <span>
                                            ￥{formatter(String(product.price))}
                                        </span>

                                       </div>}
                            />
                        </div>
                        <div className="productInfo">
                            <Meta
                                title={<div>
                                            <span>数量：</span>
                                            <span>
                                                {formatter(String(item.amount))}
                                            </span>
                                       </div>}
                                />
                        </div>
                        <div className="productInfo">
                            <Meta
                                title={<div>
                                        <span>总价：</span>
                                        <span>
                                            ￥{formatter(String(item.totalMoney))}
                                        </span>
                                       </div>}
                                />
                        </div>
                    </Card>
                );
            })
            : null}
        </div>
        );
}
}

Products.propTypes = {
    products: array,
};

export default Products;
