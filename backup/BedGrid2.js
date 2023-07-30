import {
  View,
  Text,
  StyleSheet,
  Pressable,
  PanResponder,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal, } from 'react-native'
import React, { useState, useContext, useRef, useEffect } from 'react'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faBorderNone } from '@fortawesome/free-solid-svg-icons'
import { faBroom } from '@fortawesome/free-solid-svg-icons'

import DataContext from './DataContext'


export default function BedGrid () {

  const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Select an option ');
  
    // Retrieve data from the database by DataContext
    const {beds} = useContext(DataContext)
    const options = beds.map((bed) => bed.name)
  
    const toggleDropdown = () => {setIsOpen((prevIsOpen) => !prevIsOpen)}
  
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
    };
  
    const renderOptionItem = ({ item }) => (
      <Pressable
        style={[styles.BSMoptionItem, selectedOption===item?styles.BSMoptionItemSelected:{}]}
        onPress={() => handleOptionSelect(item)}
      >
        <Text>{item}</Text>
      </Pressable>
    );
  
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

  // Grid Menu
  const [gridVisible, setGridVisible] = useState(false)
 
  const GridMenu = () => {
    return (
      <View style={styles.GRDgridMenu}>
        <Pressable onPress={() => setGridVisible(!gridVisible)}>
          <FontAwesomeIcon icon={faBorderNone} size={24} style={styles.GRDgridMenuICons}/>
        </Pressable>
        <Pressable onPress={() => setSelectedCells([])}>
          <FontAwesomeIcon icon={faBroom} size={24} style={styles.GRDgridMenuICons}/>
        </Pressable>
      </View>
    )
  }

  // Cell counts
  const [xSide,ySide] = [12, 20]

  // Calculationg cell's width
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [cellHeight, setCellHeight] = useState(0)

  const myRef = useRef(null) // for grid's coordinates
  const [gridCoordinates, setGridCoordinates] = useState({ px: null, py: null })

  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout
    setContainerSize({ width, height })
    //console.log('Native Event.layot',event.nativeEvent.layout)
    console.log('1Container Size:',height)
    setCellHeight(height / ySide)

    myRef.current.measure((fx, fy, width, height, px, py) => {
      setGridCoordinates({ px, py });
    })
  }

  // Selecting Cells
  const [selectedCells, setSelectedCells] = useState([]);
  const [coordinates, setCoordinates] = useState({Cx:'', Cy:''})

  const handleCellPress = (cellId) => {
    if (selectedCells.includes(cellId)) {
      // Cell is already selected, so remove it from the selection
      //setSelectedCells(selectedCells.filter((cell) => cell !== cellId));
    } else {
      // Cell is not selected, so add it to the selection
      setSelectedCells([...selectedCells, cellId]);
    }

    //console.log(cellId)
  }

  const [initialCell, setInitialCell] = useState({row:'', col:''})

  const panResponder = useRef(null);
  panResponder.current = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    // Finger Touchdown
    onPanResponderGrant: (evt, gestureState) => {
      console.log('Finger touched down');

      const row = Math.floor((gestureState.x0 - gridCoordinates.px) / cellHeight)
      const col = Math.floor((gestureState.y0 - gridCoordinates.py) / cellHeight)
      handleCellPress(`${row}-${col}`)
      setInitialCell({row: row, col: col})
      console.log('Row:',row, 'Col:' ,col)

      //console.log(`${row}-${col}`, cellHeight)
      //console.log('Cell Height:',cellHeight)
      //console.log('gestureState.x0: ',gestureState.x0)

      // setCoordinates({
      //   Cx: Math.floor(gestureState.x0),
      //   Cy: Math.floor(gestureState.y0)
      // })
    },

    // Finger Moves
    onPanResponderMove: (evt, gestureState) => {
      //console.log('Finger is moving');

      const endRow = Math.floor((gestureState.moveX - gridCoordinates.px) / cellHeight);
      const endCol = Math.floor((gestureState.moveY - gridCoordinates.py) / cellHeight);
      //console.log('Current Row and Column: ',endRow, endCol)

      for (let row = initialCell.row; row <= endRow; row++ ) {
        for (let col = initialCell.col; col <= endCol; col++ ) {
          handleCellPress(`${row}-${col}`)
        }
      }

      // const row = Math.floor((gestureState.moveX - gridCoordinates.px) / cellHeight);
      // const col = Math.floor((gestureState.moveY - gridCoordinates.py) / cellHeight);
      // handleCellPress(`${row}-${col}`)

      // setCoordinates({
      //   Cx: Math.floor(gestureState.moveX),
      //   Cy: Math.floor(gestureState.moveY)
      // })
    },

    // Finger Release
    onPanResponderRelease: (evt, gestureState) => {
      console.log('Finger released');
    },
  })

  // Creating the Layout Grid
  const rows = []
  for (let row = 0; row < xSide; row++) {
    const cells = []
    for (let col = 0; col < ySide; col++) {
      cells.push(
        <View
          key={col}
          style={[
            styles.cell,
            {height: cellHeight, width: cellHeight},
            selectedCells.includes(`${row}-${col}`) && styles.selectedCell,
            gridVisible && {borderWidth: 0}
          ]}
        >
          <Text style={{fontSize: 8,}}>Col:{col}</Text>
        </View>
      )
    }
    rows.push(<View key={row} style={styles.row}>{cells}</View>)
  }

  return (
    <>
    <DropdownMenu />
    <GridMenu />
    <View style={styles.GRDscreenContainer} >
      <View style={styles.gridContainer}>
        <View
          {...panResponder.current.panHandlers}
          style={styles.grid}
          ref={myRef}
          onLayout={handleLayout}
        >
            {rows}
        </View>
      </View>
      {/*
      <Text>Number of Beds: {beds.length} | Number of Cells: {selectedCells.length}</Text>
      <Text>X: {coordinates.Cx} Y: {coordinates.Cy}</Text>
      <Text>Grid Coordinates {gridCoordinates.px}, {gridCoordinates.py}</Text>
      */}
    </View>
    </>
  )
}


// Styles ------------------------------------------------
const styles = StyleSheet.create({
  GRDscreenContainer: {
    flex: 1,
    padding: 20,
    //borderWidth: 2,
    //borderColor: 'red'
  },

  gridContainer: {
    flex: 1,
    alignItems: 'center',
    //borderWidth: 2,
    //borderColor: 'blue'
  },

  grid: {
    flex: 1,
    flexDirection: 'row',
    //borderWidth: 1,
    //borderColor: 'green'
  },

  row: {
    flexDirection: 'column',
    //borderWidth: 1,
    //borderColor: 'yellow'
  },

  cell: {
    //width: 30,
    //height: 30,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },

  coordinates: {
    fontSize: 10,
    color: 'grey',
  },

  selectedCell: {
    backgroundColor: 'lightgreen'
  },

  GRDgridMenu: {
    height: 300,
    width: 60,
    alignItems:'center',
    paddingTop: 20,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    position: 'absolute',
    top: 100,
    right: 0,
    marginHorizontal: 20,
    zIndex: 9,

    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  BSMcontainer: {
    paddingHorizontal: 20,
    alignItems: 'left',
    justifyContent: 'center',
    marginTop: 20,
    zIndex: 9,
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
    zIndex: 9,
  },

  BSMoptionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    zIndex: 9,
  },
  BSMoptionItemSelected: {
    backgroundColor: '#DFF1B7'
  },

  chevroIcon: {
    paddingTop: 4,
    marginLeft: 50,
    color: "#46785a",
  },

  GRDgridMenuICons: {
    marginBottom: 20,
    color: '#46785a'
  },


})