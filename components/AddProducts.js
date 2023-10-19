import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, SectionList } from 'react-native'
import { useState, useEffect, useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons/'

import DataContext from './DataContext'

export default function AddProducts({navigation, route}) {

  // Retrieve data from the database
  const {products, addNewProduct} = useContext(DataContext)

  // List of Products ( This will be seperate component later)
  const productsData = [
    {
      title: 'Alliums',
      data: ['Chives', 'Garlic', 'Leeks', 'Onions', 'Shallots'],
    },
    {
      title: 'Berries',
      data: ['Blackberries', 'Blueberries', 'Elderberries','Raspberries', 'Strawberries'],
    },
    {
      title: 'Cole Crops',
      data: ['Bok Choy', 'Broccoli', 'Brussels Sprouts', 'Cabbage', 'Cauliflower', 'Collard Greens', 'Kale', 'Kohlrabi'],
    },
    {
      title: 'Flowers',
      data: ['Bee Balm', 'Chamomile', 'Ecchinacea', 'Feverfew', 'Marigold', 'Nasturtium', 'Sunflower'],
    },
    {
      title: 'Fruits',
      data: ['Apple', 'Cherry','Fig', 'Grapes', 'Lemon', 'Lime', 'Orange', 'Peach', 'Pear'],
    },
    {
      title: 'Greens',
      data: ['Arugula', 'Chard', 'Endive/Escarole', 'Lettuce', 'Spinach'],
    },
    {
      title: 'Herbs',
      data: ['Basil', 'Borage', 'Catnip', 'Chervil', 'Cilantro', 'Dill', 'Fennel', 'Ginger', 'Lavender', 'Lemon Balm', 'Lemon Verbana', 'Lemongrass', 'Marjoram', 'Mint', 'Mustard', 'Oregano', 'Parsley', 'Rosemary', 'Sage', 'Stevia', 'Tarragorn', 'Thyme'],
    },
    {
      title: 'Legumes',
      data: ['Beans', 'Peanuts', 'Peas'],
    },
    {
      title: 'Melons/Squashes',
      data: ['Cantaloupe', 'Cucumbers', 'Gourds', 'Honeydew', 'Pumpkin', 'Squash', 'Watermelon'],
    },
    {
      title: 'Night Shades',
      data: ['Eggplant', 'Ground Cherries', 'Peppers', 'Tomatillos', 'Tomatoes'],
    },
    {
      title: 'Other Vegetables',
      data: ['Artichoke', 'Asparagus', 'Celery', 'Corn', 'Okra', 'Rhubarb'],
    },
    {
      title: 'Roots',
      data: ['Beets', 'Carrots', 'Horseradish', 'Parsley Root', 'Parsnips', 'Potatoes', 'Radishes', 'Rutabaga', 'Sweet Potatoes', 'Turnips'],
    },
  ]
  
  // Selected Divisions Id
  const selectedDivisionId = route.params?.data

  // Searching Products
  const [search, onChangeSearch] = useState('')

  // Filter products based on search input
  const filteredProductsData = productsData.filter((section) =>
    section.data.some((item) => item.toLowerCase().includes(search.toLowerCase()))
  )

  // Products selection
  const [selectedProducts, setSelectedProducts] = useState([])
  const [addButtonState, setAddButtonState] = useState(false)

  const handleSelection = (product) => {
    // Select-Unselect product
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter((item) => item !== product ))
    } else {
      setSelectedProducts([...selectedProducts, product])
    }
    // Enable-Disable Add Button
    const newSelectedProducts = selectedProducts.includes(product)
      ? selectedProducts.filter((item) => item !== product)
      : [...selectedProducts, product];
    setAddButtonState(newSelectedProducts.length !== 0);
  }

  const handleAddProduct = (products) => {
    addNewProduct(products, selectedDivisionId)
    setSelectedProducts([])
    //setAddButtonState(false)
    navigation.goBack()
  }

  // Pruducts Section View
  const ProductsCard = ({title}) => {
    return (
      <Pressable 
        style={[
          styles.ANPproductsCard,
          selectedProducts.includes(title) && {backgroundColor: 'rgba(125, 125, 125, 0.15)'}
        ]}
        onPress={() => handleSelection(title)}
      >
        <Text>{title}</Text>
      </Pressable>
    )
  }

  const Products = () => {
    return (
      filteredProductsData.map((section) => {
        const filteredItems = section.data.filter((item) =>
          item.toLowerCase().includes(search.toLowerCase())
        );

        if (filteredItems.length > 0) {
          return (
            <View key={section.title}>
              <Text style={styles.ANPSectionTitle}>{section.title}</Text>
              <View style={styles.ANPproductSections}>
                {filteredItems.map((item) => (
                  <ProductsCard title={item} key={item} />
                ))}
              </View>
            </View>
          );
        }
      })
    );
  };


  return (
    <View style={styles.ANPContainer} >
      <View style={styles.ANPTopBar}>
        <View style={styles.ANPSearchBar} >
          <FontAwesomeIcon icon={faMagnifyingGlass} size={16} style={styles.ANPSearchIcon}/>
          <TextInput
            style={{width: 150}}
            placeholder='Search'
            value={search}
            onChangeText={onChangeSearch}
          ></TextInput>
        </View>
        <Pressable
          style={[styles.ANPAddButton, !addButtonState && {backgroundColor: 'grey'}]}
          onPress={() => {handleAddProduct(selectedProducts)}}
        >
          <FontAwesomeIcon icon={faPlus} size={24} style={styles.ANPAddIcon }
          />
        </Pressable>

      </View>
      <ScrollView style={styles.ANPProductSelection}>
        <Products />
      </ScrollView>
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  ANPContainer : {
    flex: 1
  },
  ANPTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'lightgray',
  },
  ANPSearchBar: {
    flexDirection:'row',
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  ANPAddButton:{
    padding: 8,
    backgroundColor: '#8BC907',
    borderColor: 'none',
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 20,
  },
  ANPAddIcon: {
    color: 'white',
  },
  ANPAddButtonDisabled:{
    backgroundColor: 'lightgrey',
  },
  ANPAddButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  ANPProductSelection:{
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#f6f6f6',
  },
  ANPSelectedProducts:{
    minHeight: 150,
    marginTop: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white'
  },
  ANPproductsCard: {
    height: 120,
    width: 105,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
    margin: 5,
  },
  ANPproductSections: {
    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  ANPSectionTitle : {
    fontSize: 20,
    marginVertical: 10,

  },
  ANPSearchIcon: {
    color: 'lightgrey',
    marginRight: 10,
  },


})