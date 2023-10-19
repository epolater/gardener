import React, { createContext, useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite'

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [beds, setBeds] = useState([])
  const [divisions, setDivisions] = useState([])
  const [products, setProducts] = useState([])

  // Open database (if not exists)
  const db = SQLite.openDatabase('mydatabase.db')

  // CREATING TABLES
  useEffect(() => {
    const createDatabase = () => {
      db.transaction(tx => {
        // Create the Beds table
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS beds (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            number INTEGER,
            width INTEGER,
            length INTEGER
          )`,
          [],
          (_, error) => {
            if (error.rowsAffected === 0) {null}
            else {console.log('Error creating table "beds":', error)}
          }
        );

        // Create the Divisions table
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS divisions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            divdata TEXT,
            bed_id INTEGER,
            FOREIGN KEY (bed_id) REFERENCES beds(id)
          )`,
          [],
          (_, error) => {
            if (error.rowsAffected === 0) {null}
            else {console.log('Table "divisions" created successfully.')}
          }
        );

        // Create Products Table
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            div_id INTEGER,
            FOREIGN KEY (div_id) REFERENCES divisions(id)
          )`,
          [],
          (_, error) => {
            if (error.rowsAffected === 0) {null}
            else {console.log('Table "products" created successfully.')}
          }
        );

      })
    }

    createDatabase();

  }, [])


  // EDIT BEDS TABLE
  // Insert a new bed into the database
  const insertBed = (bed) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO beds (name, number, width, length) VALUES (?, ?, ?, ?)',
        [bed.name, bed.number, bed.width, bed.length],
        (_, result) => {
          // Get the ID of the newly inserted bed
          const newBedId = result.insertId;
          // Add the new bed to the existing beds state
          setBeds((prevBeds) => [...prevBeds, { id: newBedId, ...bed }].reverse());
        },
        (_, error) => console.log(error)
      );
    });
  }
  // Update a bed in the database
  const updateBed = (bed) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE beds SET name=?, number=?, width=?, length=? WHERE id=?',
        [bed.name, bed.number, bed.width, bed.length, bed.id],
        () => {
          setBeds((prevBeds) =>
            prevBeds.map((prevBed) => (prevBed.id === bed.id ? bed : prevBed))
          )
        },
        (_, error) => console.log(error)
      );
    });
  }
  // Delete a bed from the database
  const deleteBed = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM beds WHERE id=?', [id], () => {
          setBeds((prevBeds) => prevBeds.filter((bed) => bed.id !== id));
        },
        (_, error) => console.log(error)
      );
    });
  }

  // EDIT DIVISIONS TABLE
  // Insert a new division into the database
  const insertDivision = (divdata, bed_id) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO divisions (divdata, bed_id) VALUES (?, ?)',
        [divdata, bed_id],
        (_, result) => {
          // Get the ID of the newly inserted division
          const newDivisionId = result.insertId
          // Add the new bed to the existing divisions state
          setDivisions((prevDivisions) => [
            ...prevDivisions, { id: newDivisionId, divdata: divdata, bed_id: bed_id }
          ]);
        },
        (_, error) => console.log('Error creating divisions:',error)
      );
    });
  }
  // Delete a Division
  const deleteDivision = (id) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETe FROM divisions WHERE id=?', [id], () => {
          setDivisions((prevDivisions) => prevDivisions.filter((div) => div.id !== id))
        }
      )
    })
  }

  // EDIT PRODUCTS TABLE
  // Insert a new Product to a Division
  const addNewProduct = (products, divId) => {
    products.map((product) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO products (name, div_id) VALUES (?, ?)',
          [product, divId],
          (_, result) => {
            // Get the ID of the newly inserted product
            const newProductId = result.insertId
            // Add the new product to the existing products state
            setProducts((prevProducts) => [
              ...prevProducts, { id: newProductId, name: product, div_id: divId }
            ]);
          },
          (_, error) => console.log('Error adding products:',error)
        );
      });
    })
  }

  // RETRIEVE DATA FROM DATABASE
  useEffect(() => {
    db.transaction(tx => {
      // Beds
      tx.executeSql('SELECT * FROM beds',null,
        (_, result) => setBeds(result.rows._array.reverse()),
        (_, error) => console.log(error)
      )
      // Divisions
      tx.executeSql('SELECT * FROM divisions',null,
        (_, result) => setDivisions(result.rows._array),
        (_, error) => console.log(error)
      )
      // Products
      tx.executeSql('SELECT * FROM products',null,
        (_, result) => setProducts(result.rows._array),
        (_, error) => console.log(error)
      )
    })
    //console.log("Retrieve data from the database")
  }, [])

  return (
    <DataContext.Provider
    value={{
      beds,
      insertBed,
      updateBed,
      deleteBed,
      divisions,
      insertDivision,
      deleteDivision,
      products,
      addNewProduct,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext