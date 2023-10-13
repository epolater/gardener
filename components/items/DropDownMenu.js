import {View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faChevronDown,faChevronUp} from '@fortawesome/free-solid-svg-icons/'

  export const DropdownMenu = (options) => {
    const [selectedOption, setSelectedOption] = useState('Select an option ')
    const [isOpen, setIsOpen] = useState(false);

    // const options = items.map((bed) => ({
    //   id: bed.id,
    //   name: bed.name,
    //   number: bed.number,
    //   width: bed.width,
    //   length: bed.length,

    // }))

    const toggleDropdown = () => {setIsOpen((prevIsOpen) => !prevIsOpen)}

    const handleOptionSelect = (option) => {
      setSelectedOption(option)
      setIsOpen(false)
      //setSelectedBed(option)
    };

    const renderOptionItem = ({ item }) => (
      <Pressable
        style={[styles.BSMoptionItem, selectedOption===item?styles.BSMoptionItemSelected:{}]}
        onPress={() => handleOptionSelect(item)}
      >
        <Text>{item}</Text>
      </Pressable>
    )

    return (
      <View style={styles.BSMcontainer}>
        <Pressable style={styles.BSMdropdownButton} onPress={toggleDropdown}>
          <Text style={styles.BSMdropdownButtonText}>{selectedOption}</Text>
          <FontAwesomeIcon icon={ !isOpen? faChevronDown: faChevronUp  } size={15} style={styles.chevroIcon}/>
        </Pressable>
        {isOpen && (
          <FlatList
            data={options}
            renderItem={renderOptionItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.BSMdropdownOptions}
          />
        )}
      </View>
    );
  }

  // Styles ------------------------------------------------
const styles = StyleSheet.create({
  BSMcontainer: {
    paddingHorizontal: 20,
    alignItems: 'left',
    justifyContent: 'center',
    marginTop: 20,
    zIndex: 5,
  },
  BSMdropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'left',
  },
  BSMdropdownButtonText: {
    fontSize: 16,
  },

  BSMdropdownOptions: {
    marginHorizontal: 20,
    height: 150,
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    borderRadius: 10,
    backgroundColor: 'white',
    zIndex: 19,
  },

  BSMoptionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    zIndex: 19,
  },
  BSMoptionItemSelected: {
    backgroundColor: '#DFF1B7'
  },

  chevroIcon: {
    paddingTop: 4,
    marginLeft: 50,
    color: "#46785a",
  },
})