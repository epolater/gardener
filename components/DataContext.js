import React, { createContext, useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite'

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [beds, setBeds] = useState([]);

  // Open database if not exists and retrieve data from database
  const db = SQLite.openDatabase('mydatabase.db')

  // Retrieve data from the database
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM beds',null,
        (_, result) => setBeds(result.rows._array.reverse()),
        (_, error) => console.log(error)
      )

    })
    console.log("Retrieve data from the database")
  }, [])

  return (
    <DataContext.Provider value={{ beds, setBeds }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;