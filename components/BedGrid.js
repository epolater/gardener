import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useContext, useMemo } from 'react'
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

import DataContext from './DataContext'

export default function BedGrid () {

  // Retrieve data from the database by DataContext
  const {beds} = useContext(DataContext)

  // Calculationg cell's width
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({ width, height });
  }

  // Cell counts
  let [xSide,ySide] = [10, 20]
  // Setting Cell height acoording to View Screen height
  let cellHeight = containerSize.height / ySide

  // Selecting Cells
  const [selectedCells, setSelectedCells] = useState([]);

  const handleCellPress = (cellId) => {
    if (selectedCells.includes(cellId)) {
      // Cell is already selected, so remove it from the selection
      setSelectedCells(selectedCells.filter((cell) => cell !== cellId));
    } else {
      // Cell is not selected, so add it to the selection
      setSelectedCells([...selectedCells, cellId]);
    }

    //console.log(cellId)
  }

  const [longPressStart, setLongPressStart] = useState(null)

  const handleLongPressStateChange = ({ nativeEvent }) => {
    const { state, x, y } = nativeEvent;
    const row = Math.floor(x / cellHeight);
    const col = Math.floor(y / cellHeight);

    if (state === State.ACTIVE) {
      setLongPressStart({ row, col });
    } else {
      if (longPressStart) {
        const { row: startRow, col: startCol } = longPressStart;
        const endRow = row;
        const endCol = col;
        handleSelection(startRow, startCol, endRow, endCol);
        setLongPressStart(null);
      }
    }

    console.log(row)
  };

  const handleSelection = (startRow, startCol, endRow, endCol) => {
    const newSelectedCells = [];

    for (let row = Math.min(startRow, endRow); row <= Math.max(startRow, endRow); row++) {
      for (let col = Math.min(startCol, endCol); col <= Math.max(startCol, endCol); col++) {
        newSelectedCells.push(`${row}-${col}`);
      }
    }

    setSelectedCells(newSelectedCells);
  };


  // Creating the Layout Grid
  const GridLayout = () => {
    const rows = []
    for (let row = 0; row < xSide; row++) {
      const cells = []
      for (let col = 0; col < ySide; col++) {
        cells.push(
          <Pressable
            key={col}
            style={[
              styles.cell,
              {height: cellHeight, width: cellHeight},
              selectedCells.includes(`${row}-${col}`) && styles.selectedCell
            ]}
            onPress={() => handleCellPress(`${row}-${col}`)}
          >

          </Pressable> 
        )
      }
      rows.push(
        <View key={row} style={styles.row}>
          {cells}
        </View>
      );
    }

    return (
      <LongPressGestureHandler onHandlerStateChange={handleLongPressStateChange}>
        <View style={styles.grid}>
          {rows}
        </View>
      </LongPressGestureHandler>
    )

  }

  return (
    <View style={styles.GRDscreenContainer} >
      <Text>Number of Beds: {beds.length}</Text>
      <View style={styles.gridContainer} onLayout={handleLayout}>
        <GridLayout />
      </View>
    </View>
  )
}


// Styles ------------------------------------------------
const styles = StyleSheet.create({
  GRDscreenContainer: {
    flex: 1,
    padding:20,
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
    zIndex: 9,
  },

  coordinates: {
    fontSize: 10,
    color: 'grey',
  },

  selectedCell: {
    backgroundColor: 'lightgreen'
  },

})