import React, { Component } from 'react';
import { array } from 'prop-types';
import { Card, InputNumber } from 'antd';
import { Link } from 'react-router-dom';

const { Grid, Meta } = Card;


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
                ? products.map((item, index) => {
                    const { product } = item;
                    return (
                    <Card
                        key={index}
                        className="product"
                        title={<span>NO.{product.no}</span>}
                        style={{ width: 1000, marginLeft: 60, marginTop: 20 }}
                    >
                        <Grid style={{ padding: 0, marginRight: 10, width: 80, height: 80 }}>
                            <img alt="example" src={product.imageUrl} />
                        </Grid>
                        <Meta
                            title={<Link to={`/products/${product.no}`}>{product.name}</Link>}
                            className="productInfo"
                        />
                        <div className="productInfo">
                            <Meta
                                title={<div>
                                        <span>单价：</span>
                                        <InputNumber
                                            disabled
                                            defaultValue={product.price}
                                            formatter={value =>
                                                `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                            }
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        />
                                       </div>}
                            />
                        </div>
                        <div className="productInfo">
                            <Meta
                                title={<div>
                                            <span>数量：</span>
                                            <InputNumber
                                                disabled
                                                defaultValue={item.amount}
                                                formatter={value =>
                                                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                }
                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            />
                                       </div>}
                                />
                        </div>
                        <div className="productInfo">
                            <Meta
                                title={<div>
                                        <span>总价：</span>
                                        <InputNumber
                                            disabled
                                            defaultValue={item.sum}
                                            formatter={value =>
                                                `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                            }
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        />
                                       </div>}
                                />
                        </div>
                        {/* <Grid style={{height:80}}>
                        <Meta
                            avatar={<img src={product.imageUrl} />}
                            title={product.name}
                            // description={product.num}
                        /></Grid> */}
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
