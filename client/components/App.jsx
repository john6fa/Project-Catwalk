/* eslint-disable no-use-before-define */
import React from 'react';
import $ from 'jquery';
import { IoBagOutline, IoWaterOutline } from 'react-icons/io5';
import { AiOutlineFire } from 'react-icons/ai';

import ProductContext from './ProductContext.jsx';
import Overview from './overview/Overview.jsx';
import QuestionsAndAnswersWidget from './qa/QuestionsAndAnswersWidget.jsx';
import RatingsReviewsWidget from './ratings-reviews/RatingsReviewsWidget.jsx';
import RelatedProductsWidget from './related/RelatedProductsWidget.jsx';

import mockProduct from '../mock-data/sample-product.json';
import mockStyles from '../mock-data/sample-styles.json';
import mockReviews from '../mock-data/sample-reviews.json';

const findDefault = ({ results }) => {
  let defaultStyle;
  results.forEach((style) => {
    if (style['default?']) { defaultStyle = style; }
  });
  return defaultStyle;
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      color: 'cornflowerblue',
      theme: true,
      product: mockProduct,
      styles: mockStyles,
      clickedStyle: findDefault(mockStyles),
      reviews: mockReviews.results.length,
      related: [40450, 40641, 40551, 40751, 40932, 41032, 40800],
      productId: 404579,
      rating: 5,
    };

    this.updateProduct = this.updateProduct.bind(this);
    this.selectStyle = this.selectStyle.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.updateProductId = this.updateProductId.bind(this);
  }

  updateProduct(product, styles, reviews, metaData, related, rating) {
    this.setState({
      product,
      styles,
      clickedStyle: findDefault(styles),
      reviews: reviews.results.length,
      allReviews: reviews.results,
      reviewMeta: metaData,
      related: related,
      rating: rating,
    });
  }

  updateProductId(id) {
    this.setState({
      productId: id,
    });
  }

  selectStyle(style) {
    this.setState({
      clickedStyle: style,
    });
  }

  toggleTheme() {
    $(document.body).toggleClass('active');
    this.setState({
      color: this.state.color === 'cornflowerblue' ? 'indianred' : 'cornflowerblue',
      theme: !this.state.theme,
    });
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <div>
            {this.state.theme
              ? <IoWaterOutline className="logo" onClick={this.toggleTheme} />
              : <AiOutlineFire className="logo" onClick={this.toggleTheme} />}
          </div>
          <div>
            <span className="brand-name">Team Katara</span>
          </div>
          <div>
            <IoBagOutline className="bag" />
          </div>
        </div>
        <ProductContext.Provider value={this.state.productId}>
          <Overview
            selectStyle={this.selectStyle}
            product={this.state.product}
            styles={this.state.styles}
            clickedStyle={this.state.clickedStyle}
            reviews={this.state.reviews}
            updateProduct={this.updateProduct}
            color={this.state.color}
          />

          <RelatedProductsWidget
            updateProductId={this.updateProductId}
            rel={this.state.related}
            currentId={this.state.productId}
            currentProduct={this.state.product}
            rating={this.state.rating}
          />

          <QuestionsAndAnswersWidget color={this.state.color} />

          <RatingsReviewsWidget reviews={this.state.allReviews} reviewMeta={this.state.reviewMeta} />
        </ProductContext.Provider>
      </div>
    );
  }
}

export default App;
