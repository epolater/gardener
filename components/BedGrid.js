import {
  View,
  Text,
  StyleSheet,
  Pressable,
  PanResponder,
  Alert,
  FlatList, } from 'react-native'
import React, { useState, useContext, useRef, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { 
  faChevronDown,faChevronUp,faBorderNone,faBroom,
  faPlus, } from '@fortawesome/free-solid-svg-icons/'

import DataContext from './DataContext'
import Messages from './Messages'
import AddProducts from './AddProducts'
import { NavigationContainer } from '@react-navigation/native'

export default function BedGrid ({navigation, route}) {

  // Retrieve data from the database
  const {beds, divisions, insertDivision} = useContext(DataContext)
  
  // Selected Bed
  const bed_id = route.params?.data.id
  const bed = beds.filter((bed) => bed.id===bed_id)
  const selectedBed = bed[0]


  // Bed Dropdown Selection Menu
  // const [selectedOption, setSelectedOption] = useState('Select an option ')
  // const DropdownMenu = () => {
  //   const [isOpen, setIsOpen] = useState(false);
  //   const options = beds.map((bed) => ({
  //     id: bed.id,
  //     name: bed.name,
  //     number: bed.number,
  //     width: bed.width,
  //     length: bed.length,

  //   }))
  //   const toggleDropdown = () => {setIsOpen((prevIsOpen) => !prevIsOpen)}

  //   const handleOptionSelect = (option) => {
  //     setSelectedOption(option.name)
  //     setIsOpen(false)
  //     setSelectedBed(option)
  //   };

  //   const renderOptionItem = ({ item }) => (
  //     <Pressable
  //       style={[styles.BSMoptionItem, selectedOption===item.name?styles.BSMoptionItemSelected:{}]}
  //       onPress={() => handleOptionSelect(item)}
  //     >
  //       <Text>{item.name}</Text>
  //     </Pressable>
  //   )

  //   return (
  //     <View style={styles.BSMcontainer}>
  //       <Pressable style={styles.BSMdropdownButton} onPress={toggleDropdown}>
  //         <Text style={styles.BSMdropdownButtonText}>{selectedOption}</Text>
  //         <FontAwesomeIcon icon={ !isOpen? faChevronDown: faChevronUp  } size={15} style={styles.chevroIcon}/>
  //       </Pressable>
  //       {isOpen && (
  //         <FlatList
  //           data={options}
  //           renderItem={renderOptionItem}
  //           keyExtractor={(item) => item.id.toString()}
  //           style={styles.BSMdropdownOptions}
  //         />
  //       )}
  //     </View>
  //   );
  // }

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
        <Pressable disabled={!cellsSeleceted} onPress={() => {createBedDivision()}}>
          <FontAwesomeIcon icon={faPlus} size={24} style={[styles.GRDgridMenuICons , !cellsSeleceted && {color: 'lightgray'}]} />
        </Pressable>
      </View>
    )
  }

  // Show Info Messages
  const [message, setMessage] = useState({status: false, text: ''})
  const ShowMessage = (text) => {
    setMessage({status: true, text: text})
    setTimeout(() => {
      setMessage({status: false, text: ''})
    }, 2000)

  }

  // Lanes and Cell counts
  const laneNum = selectedBed.length===0? 3: selectedBed.number
  let cellsPerLane;
  if (laneNum === 1 ) { cellsPerLane = 12}
    else if (laneNum >= 2 && laneNum <= 4 ) { cellsPerLane = 12 / laneNum}
    else if (laneNum >= 5 && laneNum <= 8) { cellsPerLane = 2}
    else { cellsPerLane = 1}

  let xSide = laneNum * cellsPerLane
  let ySide = 2 * laneNum * cellsPerLane

  // Calculationg cell's width
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [cellHeight, setCellHeight] = useState(0)

  const myRef = useRef(null) // for grid's coordinates
  const [gridCoordinates, setGridCoordinates] = useState({ px: null, py: null })

  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout
    setContainerSize({ width, height })
    //console.log('Native Event.layot',event.nativeEvent.layout)
    //console.log('1Container Size:',height)
    setCellHeight(height / ySide)

    myRef.current.measure((fx, fy, width, height, px, py) => {
      setGridCoordinates({ px, py });
    })
  }

  // Creating the Grid Layout ----------------------------
  const [selectedCells, setSelectedCells] = useState([])
  const [cellsSeleceted, setCellsSelected] = useState(false)
  const [endRow_N, setEndRow_N] = useState()
  const [endCol_N, setEndCol_N] = useState()

  // Grid
  const columns = []
  for (let col_N = 0; col_N < xSide; col_N++) {
    const cells = []
    for (let row_N = 0; row_N < ySide; row_N++) {
      cells.push(
        <View
          key={row_N}
          style={[
            styles.cell,
            {height: cellHeight, width: cellHeight},
            selectedCells.includes(`${col_N}-${row_N}`) && styles.selectedCell,
            gridVisible && {borderWidth: 0}
          ]}
        >
          {/*}
          <Text style={{fontSize: 10,}}>X:{col_N}</Text>
          <Text style={{fontSize: 10,}}>Y:{row_N}</Text>
        */}
        </View>
      )
    }
    columns.push(<View key={col_N} style={styles.column}>{cells}</View>)
  }

  //const [coordinates, setCoordinates] = useState({Cx:'', Cy:''})

  // Single Cell Selection
  const handleCellPress = (cellId) => {
    if (selectedCells.includes(cellId)) {
      // Cell is already selected, so remove it from the selection
      //setSelectedCells(selectedCells.filter((cell) => cell !== cellId));
    } else {
      // Cell is not selected, so add it to the selection
      setSelectedCells([cellId]);
    }

    //console.log(cellId)
  }

  // Multiple Cell Selection
  const [initialCell, setInitialCell] = useState({col_N:'', row_N:''})
  const panResponder = useRef(null)

  panResponder.current = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    /// Finger Touchdown
    onPanResponderGrant: (evt, gestureState) => {
      //console.log('Finger touched down');

      const col_N = Math.floor((gestureState.x0 - gridCoordinates.px) / cellHeight)
      const row_N = Math.floor((gestureState.y0 - gridCoordinates.py) / cellHeight)
      handleCellPress(`${col_N}-${row_N}`)
      setInitialCell({col_N: col_N, row_N: row_N})
      //console.log('Col:', col_N, 'Row:', row_N)

      //console.log('Cell Height:',cellHeight)
      //console.log('gestureState.x0: ',gestureState.x0)

      // setCoordinates({
      //   Cx: Math.floor(gestureState.x0),
      //   Cy: Math.floor(gestureState.y0)
      // })
    },

    /// Finger Moves
    onPanResponderMove: (evt, gestureState) => {
      //console.log('Finger is moving');
      const newSelectedCells = []
      const endCol_N = Math.floor((gestureState.moveX - gridCoordinates.px) / cellHeight);
      const endRow_N = Math.floor((gestureState.moveY - gridCoordinates.py) / cellHeight);

      for (let col_N = initialCell.col_N; col_N <= endCol_N; col_N++ ) {
        for (let row_N = initialCell.row_N; row_N <= endRow_N; row_N++ ) {
          newSelectedCells.push(`${col_N}-${row_N}`)
        }
      }
      setSelectedCells(newSelectedCells)
      setEndCol_N(endCol_N); setEndRow_N(endRow_N)
      //console.log(endCol_N, endRow_N)

      // Enable add division button
      setCellsSelected(true)

      // setCoordinates({
      //   Cx: Math.floor(gestureState.moveX),
      //   Cy: Math.floor(gestureState.moveY)
      // })
    },

    /// Finger Release
    onPanResponderRelease: (evt, gestureState) => {
      //console.log('Finger released');
    },
  })


  // Creating Bed Layout ---------------------------
  const BedLayout = () => {
    const columns = []
    for (let col = 0; col < laneNum; col++) {
      columns.push(
        <View
          key={col}
          style={[
            styles.BLcolumn,
            {width: cellHeight * cellsPerLane, height: cellHeight * ySide}
          ]}
        />
      )
    }

    return (<View style={styles.BLContainer}>{columns}</View>)
  }

  // Creating Division in Bed
  //const [divisions, setDivisions] = useState([])
  const [divCells, setDivCells] = useState([])

  const createBedDivision = () => {

    /// Check for existing Division Cells
    let selectionInDivs = false
    selectedCells.forEach((cell) => {
      if (divCells.includes(cell)) {selectionInDivs = true}
    })

    /// Create Division
    if (selectionInDivs) {
      Alert.alert('Selection Error', 'Selection clashes with other divisions', [{ text: 'OK' }])
    }
    else {
      const newDivision = {
        startCol: initialCell.col_N,
        startRow: initialCell.row_N,
        endCol: endCol_N,
        endRow: endRow_N,
        label: `${initialCell.col_N}-${initialCell.row_N},${endCol_N}-${endRow_N}`,
      }
      //setDivisions([...divisions, newDivision])

      /// Add Division to database
      insertDivision(JSON.stringify(newDivision), selectedBed.id)

      /// Clean selected cells
      setSelectedCells([])

      /// Add selected cells to Divisions' cell array
      setDivCells((prevDivCells) => [...prevDivCells, ...selectedCells])
    }

      /// Show Success Message
      if (!selectionInDivs) {ShowMessage('New bed division created')}

      /// Disable add division button
      setCellsSelected(false)
  }

  // Show Divisions
  const Divisions = () => {
    const filteredDivisions = divisions.filter((div) => div.bed_id === bed_id)
    return filteredDivisions.map((div, index)=>{
      const data = JSON.parse(div.divdata)
      const height = (data.endRow - data.startRow + 1) * cellHeight
      const width = (data.endCol - data.startCol + 1) * cellHeight
      const x = data.startCol * cellHeight
      const y = data.startRow * cellHeight
      return (
        <Pressable key={index} onPress={() =>{navigation.navigate('AddProducts')}}
          style={{
            width: width,
            height: height,
            backgroundColor:'rgba(170,237,121, 0.15)',
            borderWidth: 1,
            borderColor: 'rgba(130,180,60, 1)',
            position: 'absolute',
            top: y,
            left: x,
            zIndex: 5,
          }}
        >
          <Text>Label: {data.label}</Text>
        </Pressable>
      )
    })
  }


  return (
    <View style={styles.GRDContainer}>
      {/*<DropdownMenu />*/}
      <Text style={styles.GRDName}>{route.params?.data.name}</Text>
      <GridMenu />
      { message.status &&
      <Messages message={message.text} duration={1000} />
      }
      <View style={styles.GRDscreenContainer} >
        <View style={styles.gridContainer}>
          <Divisions />
          <View style={styles.grid}
            {...panResponder.current.panHandlers}
            ref={myRef}
            onLayout={handleLayout}
          >
            <BedLayout />
            {columns}
          </View>
        </View>
        {/*
        <Text>No. of Cells: {selectedCells}</Text>
        <Text>No. Div Cells : {divCells}</Text>
        <Text>X: {coordinates.Cx} Y: {coordinates.Cy}</Text>
        <Text>Grid Coordinates {gridCoordinates.px}, {gridCoordinates.py}</Text>
        */}
      </View>
    </View>
  )
}


// Styles ------------------------------------------------
const styles = StyleSheet.create({
  GRDContainer: {
    flex: 0.95,
    backgroundColor: 'white',
  },
  GRDscreenContainer: {
    flex: 1,
    padding: 20,
    //borderWidth: 2,
    //borderColor: 'red'
  },

  gridContainer: {
    flex: 1,
    alignItems: 'left',
    //borderWidth: 2,
    //borderColor: 'blue'
  },
  GRDName:{
    fontSize: 20,
    fontWeight:'bold',
    marginLeft: 20,
    marginTop:10,
  },

  grid: {
    flex: 1,
    flexDirection: 'row',
    //borderWidth: 1,
    //borderColor: 'green'
  },

  column: {
    flexDirection: 'column',
    //borderWidth: 0.5,
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
    backgroundColor: 'rgba(125, 125, 125, 0.15)'
  },

  GRDgridMenu: {
    height: 300,
    width: 50,
    alignItems:'center',
    paddingTop: 20,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    position: 'absolute',
    top: 100,
    right: -10,
    marginHorizontal: 20,
    zIndex: 4,

    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  GRDgridMenuICons: {
    marginBottom: 20,
    color: '#46785a'
  },

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

  BLContainer: {
    //flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    borderWidth:1,
    borderColor: 'gray',
  },
  BLcolumn: {
    borderWidth: 1,
    //borderRightWidth: 1,
    borderColor: 'gray',
  },

})