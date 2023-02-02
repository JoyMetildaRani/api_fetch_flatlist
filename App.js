import React from 'react';

import { View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      loading: false,
    };
  }

  loadproducts = async () => {
    var url = 'https://dummyjson.com/products';

    await fetch(url)
      .then((response) => response.json())
      .then((responsejson) => {
        this.setState({ product: responsejson.products, loading: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.loadproducts();
  }

  renderItem = ({ item, i }) => {
    console.log(item);
    return (
      <View>
        <ListItem key={i} bottomDivider>
          <ListItem.Content>{item.title}</ListItem.Content>
        </ListItem>
      </View>
    );
  };
  render() {
    if (this.state.loading === false) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View>
          <View>
            <FlatList
              data={this.state.product}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold = {0.7}
            />
          </View>
        </View>
      );
    }
  }
}
